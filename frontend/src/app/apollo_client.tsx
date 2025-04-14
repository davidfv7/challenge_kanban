import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:5001/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;