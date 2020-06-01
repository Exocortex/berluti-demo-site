import React from "react";
import { Avatar } from "antd";

let newPatina = "";

function Form(props) {
  newPatina = props.config.Patina;
  return props.config ? (
    <div>
      {Object.values(props.config.Patina).map((attr) => (
        <Avatar
          size={"large"}
          style={{ color: "#fffffff", backgroundColor: "grey", margin: "5px" }}
          onClick={()=> window.configurator.setConfiguration({Patina: attr})}
        >
          {attr}
        </Avatar>
      ))}
    </div>
  ) : (
    <div></div>
  );
}

export default Form;
