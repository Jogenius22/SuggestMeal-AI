import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyForm from "./MyForm";
import "./RLayout.css"
import RefreshButton from "./RefreshButton";

const RLayout = () => {
  return (
    <div className="container col-md-4 col-12">
      <div className="row">
        <div className=" ">
          <MyForm />
          
        </div>
        <div className="result" >
          
        </div>
      </div>
    </div>
  );
};

export default RLayout;
