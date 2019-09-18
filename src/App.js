import React, { useEffect } from "react";
import { useLocalStorage } from "./hooks/LocalStorageHook";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Messages from "./components/Messages";
import AddMessage from "./AddMessage";
import Login from "./components/Login";
import CurrentUser from "./components/CurrentUser";
import Loading from "./components/Loading";

export const MESSAGES = gql`
  query messages {
    messages {
      id
      name
      message
      date
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessageAdded {
    messageAdded {
      id
      name
      message
      date
    }
  }
`;

const App = () => {
  const [name, setName] = useLocalStorage("name", null);
  const { loading, data, subscribeToMore } = useQuery(MESSAGES);
  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        if (subscriptionData.data.messageAdded.name === name) return prev;
        return {
          messages: [subscriptionData.data.messageAdded, ...prev.messages]
        };
      }
    });
  }, [subscribeToMore, name]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <>
        {name === null ? (
          <Login setName={setName} />
        ) : (
          <>
            <CurrentUser name={name} />
            <Messages messages={data.messages} />
            <AddMessage name={name} />
          </>
        )}
      </>
    </main>
  );
};

export default App;
