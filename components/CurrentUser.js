import React from "react";
import NameIcon from "./NameIcon";

const CurrentUser = ({ name }) => (
  <div className="currentUser">
    <NameIcon name={name} />
    <div>{name}</div>
  </div>
);

export default CurrentUser;
