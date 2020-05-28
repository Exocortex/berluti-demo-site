import React from "react";
// import './Product.css';
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import { ProductList } from "../config/Configs.js";

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
      </div>
    );
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];

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
      });

    document.addEventListener("mousedown", onMouseDown, false);

    let clicked = false;
    let rotation = 1;

    const rotateShoe = (e) => {
      if (e.movementX > 0) {
        // console.log(rotation);
        if (rotation > 11) {
          rotation = 1;
        }
        setTimeout(rotation += 1, 3000);
        // rotation += 1;

        let newRotation = JSON.stringify({ Rotation: `${rotation}` });
        newRotation = JSON.parse(newRotation);
        window.configurator.setConfiguration(newRotation);
        console.log(window.configurator.getConfiguration());
      } else if (e.movementX < 0) {
        if (rotation < 2) {
          rotation = 11;
        }
        setTimeout(rotation -= 1, 3000);
        // rotation -= 1;

        let newRotation = JSON.stringify({ Rotation: `${rotation}` });
        newRotation = JSON.parse(newRotation);
        console.log(window.configurator.getConfiguration());

        window.configurator.setConfiguration(newRotation);
      }
    };

    function onMouseDown(e) {
      e.preventDefault(); //prevents browser to follow links or move images
      // code to execute on mouse click\
      clicked = true;
      // console.log(clicked);
    }
    document.addEventListener("mousemove", onMouseMove, false);

    function onMouseMove(e) {
      // code to execute on mouse mouse move
      if (clicked) {
        console.log("movement x ", e.movementX);
        // console.log("drag");
        // setTimeout(rotateShoe(), 400000)
        rotateShoe(e);
        // window.configurator.setConfiguration(rotateShoe())
        // console.log(e)
      }
    }

    document.addEventListener("mouseup", onMouseUp, false);

    function onMouseUp(e) {
      // code to execute on mouse mouse up
      clicked = false;
      // console.log(clicked);
    }
  }
}

export default Product;
