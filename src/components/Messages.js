import React from "react";
import MessageItem from "./MessageItem";

const Messages = ({ messages }) => {
  if (messages.length === 0) {
    return <div className="noMessages">No messages added</div>;
  }
  return (
    <div className="messages">
      {messages.map(({ id, name, message, date }) => (
        <MessageItem
          key={id}
          name={name}
          message={message}
          date={date}
          id={id}
        />
      ))}
    </div>
  );
};

export default Messages;
