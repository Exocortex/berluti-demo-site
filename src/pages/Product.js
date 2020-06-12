import React from "react";
import "./Products.css";
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import { ProductList } from "../config/Configs.js";
import { BrowserRouter as Link } from "react-router-dom";

import Form from "../components/Form";

import { apply2DSpin } from "../Helpers/Spin";

import { chevronMap } from "../config/map/chevron";

import isEqual from "lodash/isEqual";

let link = "";

let clicked = false;

let loaded = false;

const hideHand = () => {
  // document.getElementById("hand-indicator").classList.remove("hand");
  // document.getElementById("hand-indicator").classList.remove("bounce-2");
  document.getElementById("hand-indicator") == undefined
    ? window.location.reload()
    : (document.getElementById("hand-indicator").style = "display: none");
};

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      loaded: false,
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];

    if (clicked == false) {
      document
        .getElementById("threekit-container")
        .addEventListener("mousedown", function () {
          // document.getElementById("hand-container").remove();
          hideHand();
        });

      document
        .getElementById("threekit-container")
        .addEventListener("touchstart", function () {
          // document.getElementById("hand-container").remove();
          hideHand();
        });
    }

    !product
      ? console.log("no product")
      : // Put player here
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
            await api.when('loaded')
            await window.configurator.prefetchAttributes(["Rotation"]);
            apply2DSpin({ attrName: "Rotation", direction: -1 })(api)
            // api.on(
            //   window.player.scene.PHASES.PRELOADED,
            //   console.log('preload')
            // );

            api.on(
              window.player.scene.PHASES.LOADED,
              // apply2DSpin({ attrName: "Rotation", direction: -1 })
            );


            // api.when('loaded')

            api.on(
              window.player.scene.PHASES.RENDERED,
              this.setState({ loaded: true })
            );
          });
  }
  render() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];
    return (
      <div id="s">
        {!product ? (
          <div>
            Invalid product URL. Please navigate <a href="/">home</a>
          </div>
        ) : (
          <div>
            <PageHeader
              style={{
                border: "1px solid rgb(235, 237, 240)",
              }}
              onBack={() => window.location.assign("/")}
              title={product.name}
            />

            <div id="threekit-container">
              {this.state.loaded ? (
                <div className="stage" id="hand-container">
                  <div id="hand-indicator" className="hand bounce-2">
                    <img
                      style={{ height: "30px", width: "30px" }}
                      src="https://solutions-engineering.s3.amazonaws.com/media/web-assets/hand.png"
                    />
                  </div>
                </div>
              ) : (
                <p></p>
              )}

              <div
                id="player"
                style={{
                  height: "50vh",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  background: "#ffffff",
                }}
              ></div>
            </div>

            <Form config={product.config} product={product} />
          </div>
        )}
      </div>
    );
  }
}

export default Product;
