import React from "react";
import DashContainer from "./DashContainer";
import Avator from "./Avatar";

const DashCards = (props) => {
  return (
    <div>
      <div class="card">
        <div class="card-body">
          <div className="row">
            <div className="col-8 contentSec">
              <DashContainer
                header={props.header}
                data={props.data}
              />
            </div>
            <div className="col-4 imgsec">
              <Avator img={props.img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCards;
