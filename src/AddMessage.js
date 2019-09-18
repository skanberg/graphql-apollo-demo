import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MESSAGES } from "./App";

const ADD_MESSAGE = gql`
  mutation addMessage($name: String!, $message: String!) {
    addMessage(name: $name, message: $message) {
      id
      name
      message
      date
    }
  }
`;

const AddMessage = ({ name }) => {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, {
    update: (cache, result) => {
      const { messages } = cache.readQuery({ query: MESSAGES });
      cache.writeQuery({
        query: MESSAGES,
        data: { messages: [result.data.addMessage, ...messages] }
      });
    },
    optimisticResponse: {
      __typename: "Mutation",
      addMessage: {
        __typename: "Message",
        id: -1,
        name,
        message,
        date: new Date().toJSON()
      }
    }
  });

  return (
    <div className="addMessage">
      <form
        onSubmit={e => {
          e.preventDefault();
          addMessage({
            variables: {
              name,
              message
            }
          });
          setMessage("");
        }}
      >
        <input
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          autoFocus
          placeholder="Add message"
        />
      </form>
    </div>
  );
};

export default AddMessage;
