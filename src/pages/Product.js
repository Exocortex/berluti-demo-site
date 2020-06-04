import React from "react";
// import './Product.css';
import "antd/dist/antd.css";
import { PageHeader, Button } from "antd";
import { ProductList } from "../config/Configs.js";
import { BrowserRouter as Link } from "react-router-dom";

import Form from "../components/Form";

import { apply2DSpin } from "../Helpers/Spin";

import { chevronMap } from "../config/map/chevron";

import isEqual from "lodash/isEqual";

let link = "";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
    };
  }



  componentDidMount() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];

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

            api.on(
              window.player.scene.PHASES.RENDERED,
              apply2DSpin({ attrName: "Rotation", direction: -1 })
            );
          });
  }
  render() {
    const productId = this.props.match.params.productId;
    const product = ProductList[productId];
    return (
      <div id="s">
        {!product ? (
          <div>Invalid product URL. Please navigate <a href="/">home</a></div>
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
            <Form config={product.config} product={product}/>
    
          </div>
        )}
      </div>
    );
  }
}

export default Product;
