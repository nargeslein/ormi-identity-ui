import React from "react";
import "./index.scss";
import Avatar from "./Avatar/Avatar";
import Option from "./Option/Option";
import InfoCard from "./InfoCard/InfoCard";
import List from "./List/List";
import EditProfileDialog from "./EditProfileDialog";

const Profile = () => {
  return (
    <div className="content flex-center">
      <Avatar />
      <div className={"white-container"}></div>
      <div className="main">
        <EditProfileDialog /> 
        <InfoCard />
        <div className="box">
          <div className="loginState"></div>
          <Option optionIndex={1}>
            <List title="Transactions History" />
          </Option>
          <Option optionIndex={2}>
            <List title="Reports" />
          </Option>
          <Option optionIndex={3}>
            <List title="Credits" />
          </Option>
          <Option optionIndex={4}>
            <List title="Contact" />
          </Option>
        </div>
      </div>
    </div>
  );
};

export default Profile;
