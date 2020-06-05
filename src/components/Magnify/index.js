import React from "react";
import { Avatar, Button, Badge, Tag } from "antd";
import { chevronMap } from "../../config/map/chevron";
import { SearchOutlined } from "@ant-design/icons";
let newPatina = "";

const getImg = function (config, map) {
  return `${map[config][config]}`;
};

function Magnify(props) {
  return (
    <div>
      {/* <Tag style={{ margin: "5px" }}> */}
        <Avatar
          size={"large"}
          style={{
            color: "#000000",
            backgroundColor: "#ffffff",
            margin: "5px",
          }}
          onClick={() =>
            window.open(
              getImg(
                window.configurator.getConfiguration().Rotation,
                props.map
              ),
              "_blank"
            )
          }
        >
          <SearchOutlined />
        </Avatar>
      {/* </Tag> */}
    </div>
  );
}

export default Magnify;
