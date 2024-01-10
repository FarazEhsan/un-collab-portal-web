import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "http://localhost:8080/graphql", // replace with your server's URI
    cache: new InMemoryCache(),
  });