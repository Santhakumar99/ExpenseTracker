import React from "react";
const Avator = (props) => {
  return (
    <div className="img_section">
      <img src={props.img} className="img_file" />
    </div>
  );
};

export default Avator;
