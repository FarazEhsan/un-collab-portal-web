import {ApolloClient, InMemoryCache} from "@apollo/client";

export const fetchClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // replace with your server's URI
    cache: new InMemoryCache()
});
