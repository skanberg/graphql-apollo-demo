import React from "react";
import format from "date-fns/format";
import NameIcon from "./NameIcon";

const MessageItem = ({ name, message, date, id }) => {
  return (
    <div className="messageItem">
      <NameIcon name={name} />
      <div>
        <div>
          <b>{name}</b> {format(new Date(date), "HH:mm")}
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default MessageItem;
