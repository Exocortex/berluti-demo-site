import React from "react";
// import './Product.css';
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import { ProductList } from "../config/Configs.js";
import Form from "../components/Form"


class Product extends React.Component {
  render() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];
    return (
      <div>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => window.history.back()}
          title={product.name}
        />

        <div id="tk-container">
          <div
            id="player"
            style={{
              height: 400,
              width: "96%",
              marginLeft: "auto",
              marginRight: "auto",
              background: "#ffffff",
            }}
          ></div>
        </div>
        <Form config={product.config}/>
  
      </div>
    );
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];

    const makeConfig = function (config) {
      let newRotation = JSON.stringify(config);
      newRotation = JSON.parse(newRotation);
      return newRotation;
    };

    // Put player here
    window
      .threekitPlayer({
        authToken: "fafe1cc5-0486-4b2f-8e0e-3a416f97f9d9",
        display: "image",
        el: document.getElementById("player"),
        assetId: `${product.threekit}`,
        stageId: `${product.stageId}`,

        showConfigurator: false,
        initialConfiguration: product.config,
      })
      .then(async (api) => {
        window.player = api;
        window.configurator = await api.getConfigurator();
        api.on(
          window.player.scene.PHASES.RENDERED,
          document.addEventListener("mousemove", onMouseMove, false),
          document.addEventListener("touchmove", handleTouchMove, false),
          document.addEventListener("touchstart", handleTouchStart, false)
        );
      });

    document.addEventListener("mousedown", onMouseDown, false);
    let clicked = false;
    let rotation = 0;

    const rotateLeft = (power) => {
      // console.log(rotation);
      if (rotation > 10) {
        rotation = 0;
      }
      // setTimeout((rotation += 1), 6000);
      rotation += power;

      //
      if (Number.isInteger(rotation)) {
        window.configurator.setConfiguration(
          makeConfig({ Rotation: `${rotation}` })
        );
        console.log(JSON.stringify(window.configurator.getConfiguration()));
      }
    };

    const rotateRight = (power) => {
      if (rotation <= 1) {
        rotation = 11;
      }
      // setTimeout((rotation -= 1), 6000);
      rotation -= power;

      // setTimeout((rotation -= 1), 6000);

      // window.configurator.setConfiguration(makeConfig({ Rotation: `${rotation}` }));
      if (Number.isInteger(rotation)) {
        window.configurator.setConfiguration(
          makeConfig({ Rotation: `${rotation}` })
        );
        console.log(JSON.stringify(window.configurator.getConfiguration()));
      }
    };

    const rotateShoe = (e) => {
      if (e.movementX > 0) {
        rotateRight(0.25);
        // console.log(window.configurator.getConfiguration());
      } else if (e.movementX < 0) {
        rotateLeft(0.25);
        // console.log(window.configurator.getConfiguration());
      }
    };

    function onMouseDown(e) {
      e.preventDefault(); //prevents browser to follow links or move images
      // code to execute on mouse click\
      clicked = true;
      // console.log(clicked);
    }

    function onMouseMove(e) {
      // console.log(e);
      // code to execute on mouse mouse move
      if (clicked) {
        rotateShoe(e);
      }
    }

    document.addEventListener("mouseup", onMouseUp, false);

    function onMouseUp(e) {
      // code to execute on mouse mouse up
      clicked = false;
      // console.log(clicked);
    }

    let firstX;

    const handleTouchStart = function (e) {
      firstX = e.touches[0].clientX;
    };

    const handleTouchMove = function (e) {
      if (firstX > e.touches[0].clientX) {
        rotateRight(0.25);
      } else {
        rotateLeft(0.25);
      }

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      // console.log(firstX);
    };
  }
}

export default Product;
