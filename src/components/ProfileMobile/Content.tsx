import React, { FC, useState } from "react";
import "./index.scss";
import Avatar from "./Avatar/Avatar";
import Option from "./Option/Option";
import InfoCard from "./InfoCard/InfoCard";
import List from "./List/List";

const ProfileMobile = () => {
    const [selected,setSelected] = useState(false);
    return (
        <div className="content flex-center">
            <Avatar />
            <div className={"white-container"}></div>
            <div className="main">
                <InfoCard/>
                <div className="box">
                    <div className="loginState"></div>
                    <Option optionIndex={1} selected={selected} setSelected={setSelected}><List Title="Transactions History"/></Option>
                    <Option optionIndex={2} selected={selected} setSelected={setSelected}><List Title="Reports"/></Option>
                    <Option optionIndex={3} selected={selected} setSelected={setSelected}><List Title="Credits"/></Option>
                    <Option optionIndex={4} selected={selected} setSelected={setSelected} ><List Title="Contact"/></Option>
                </div>
            </div>
        </div>
    );
}

export default ProfileMobile;
