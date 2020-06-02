import React from "react";
// import './Product.css';
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import { ProductList } from "../config/Configs.js";
import Form from "../components/Form";
import Hammer from "hammerjs";

let clicked = false;
let rotation = 0;


const makeConfig = function (config) {
  let newRotation = JSON.stringify(config);
  newRotation = JSON.parse(newRotation);
  return newRotation;
};
const rotateLeft = (power) => {
  // console.log(rotation);
  if (rotation >= 11) {
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
    rotation = 12;
  }
  // setTimeout((rotation -= 1), 6000);
  rotation -= power;
  // console.log(rotation)

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
    rotateRight(0.125);
    // console.log(window.configurator.getConfiguration());
  } else if (e.movementX < 0) {
    rotateLeft(0.125);
    // console.log(window.configurator.getConfiguration());
  }
};
function onMouseUp(e) {
  // code to execute on mouse mouse up
  clicked = false;
  // console.log(clicked);
}
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

class Product extends React.Component {
  render() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];
    return (
      <div id="s">
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => window.location.assign('/')}
          title={product.name}
        />

        <div id="threekit-container">
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
        <Form config={product.config} />
      </div>
    );
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];

    var hammertime = new Hammer(document.getElementById("threekit-container"));
    hammertime.on("pan", function (ev) {
      if (ev.direction == 2) {
        rotateLeft(.0625);
      } else if (ev.direction == 4) {
        rotateRight(.0625);
      }
      // console.log(ev.direction);
    });

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
          document
            .getElementById("threekit-container")
            .addEventListener("mousemove", onMouseMove, false)
        );
      });

    document
      .getElementById("threekit-container")
      .addEventListener("mousedown", onMouseDown, false);

    document
      .getElementById("threekit-container")
      .addEventListener("mouseup", onMouseUp, false);
  }

  componentWillUnmount() {
    document
      .getElementById("threekit-container")
      .removeEventListener("mousemove", onMouseMove);
    document
      .getElementById("threekit-container")
      .removeEventListener("mmousedown", onMouseDown);
    document
      .getElementById("threekit-container")
      .removeEventListener("mouseup", onMouseUp);

    console.log("unmounted");
  }
}

export default Product;
