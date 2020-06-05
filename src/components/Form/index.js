import React from "react";
import { Avatar, Button, Badge, Tag } from "antd";
import { chevronMap } from "../../config/map/chevron";
import { SearchOutlined } from "@ant-design/icons";
import Magnify from "../Magnify";
let newPatina = "";

const getImg = function (config, map) {
  return `${map[config][config]}`;
};

function Form(props) {
  newPatina = props.config.Patina;
  return props.config ? (
    <div>
      {props.product.magnify ? <Magnify map={chevronMap} /> : <p></p>}
      <br />
      {Object.values(props.config.Patina).map((attr, i) => (
        <Tag style={{ margin: "5px" }}>
          <Avatar
            size={"large"}
            style={{ color: "#fffffff", margin: "5px" }}
            src={props.product.bg[i]}
            onClick={() =>
              window.configurator.setConfiguration({ Patina: attr })
            }
          >
            {attr}
          </Avatar>
          {attr == "Chevron" ? "Nero Grigio" : attr}
        </Tag>
      ))}
    </div>
  ) : (
    <div></div>
  );
}

export default Form;
