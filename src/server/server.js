const { ApolloServer, gql, PubSub } = require("apollo-server");

const MESSAGE_ADDED = "MESSAGE_ADDED";

let id = 0;
const messages = [
  {
    id: ++id,
    name: "ReactJS Göteborg Meetup",
    message: "Welcome to Etraveli Group",
    date: new Date().toJSON()
  }
];

const typeDefs = gql`
  type Message {
    id: Int
    name: String
    message: String
    date: String
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    addMessage(name: String!, message: String!): Message
  }

  type Subscription {
    messageAdded: Message
  }
`;

const pubSub = new PubSub();

const resolvers = {
  Query: {
    messages: () => messages
  },
  Mutation: {
    addMessage: (_, { name, message }) => {
      messages.unshift({
        id: ++id,
        name,
        message,
        date: new Date().toJSON()
      });
      const messageAdded = messages[0];
      pubSub.publish(MESSAGE_ADDED, {
        messageAdded
      });
      return messageAdded;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.asyncIterator([MESSAGE_ADDED])
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
