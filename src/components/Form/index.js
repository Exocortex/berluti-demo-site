import React from "react";
import { Avatar, Button } from "antd";
import { chevronMap } from "../../config/map/chevron";
import {
  SearchOutlined,
} from '@ant-design/icons';
let newPatina = "";

const getImg = function (config, map) {
  return `${map[config][config]}`;
};

function Form(props) {
  newPatina = props.config.Patina;
  return props.config ? (
    <div>
      {Object.values(props.config.Patina).map((attr) => (
        <Avatar
          size={"large"}
          style={{ color: "#fffffff", backgroundColor: "grey", margin: "5px" }}
          onClick={() => window.configurator.setConfiguration({ Patina: attr })}
        >
          {attr}
        </Avatar>
      ))}
      {props.product.name == "Chevron" ? (
        <Avatar
          size={"large"}
          style={{ color: "#000000", backgroundColor: "#ffffff", margin: "5px" }}
          onClick={() =>
            window.open(
              getImg(
                window.configurator.getConfiguration().Rotation,
                chevronMap
              ),
              "_blank"
            )
          }
        >
          <SearchOutlined />
        </Avatar>
      ) : (
        <p></p>
      )}
    </div>
  ) : (
    <div></div>
  );
}

export default Form;
