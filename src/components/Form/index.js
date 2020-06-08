import React from "react";
import { Avatar, Button, Badge, Tag, Dropdown, Menu } from "antd";
import { chevronMap } from "../../config/map/chevron";
import { SearchOutlined } from "@ant-design/icons";
import Magnify from "../Magnify";
let newPatina = "";

const getImg = function (config, map) {
  return `${map[config][config]}`;
};

function Form(props) {
  newPatina = props.config.Patina;

  const menu = (
    <Menu>
      {Object.values(props.config.Patina).map((attr, i) => (
        <Menu.Item
          onClick={() =>
            window.configurator.setConfiguration({ Patina: `${attr}` })
          }
        >
          <Avatar
            size={"large"}
            style={{ color: "#fffffff", margin: "5px" }}
            src={props.product.bg[i]}
          />

          {/* {attr == "Chevron" ? "Nero Grigio" : attr} */}
          {attr}
        </Menu.Item>
      ))}
    </Menu>
  );

  return props.config ? (
    <div>
      {props.product.magnify ? <Magnify map={chevronMap} /> : <p></p>}
      <Dropdown overlay={menu}>
        <Button>Select Patina</Button>
      </Dropdown>
    </div>
  ) : (
    <div></div>
  );
}

export default Form;
