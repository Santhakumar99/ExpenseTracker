import React from "react";

const DashContainer = (props) => {
  return (
    <div>
      <h5 class="card-title">{props.header}</h5>
      <h2
        class="card-subtitle mb-2 text-muted"
        style={{
          color:
            props.header == "Total Balance"
              ? "var(--color-green) !important"
              : "red",
        }}
      >
        ₹{props.data}
      </h2>
    </div>
  );
};

export default DashContainer;
