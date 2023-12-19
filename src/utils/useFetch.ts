import {
    ApolloClient,
    DocumentNode,
    InMemoryCache,
    TypedDocumentNode
} from "@apollo/client";
import {useState} from "react";

export const fetchClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // replace with your server's URI
    cache: new InMemoryCache()
});

const useFetch = (QUERY: DocumentNode | TypedDocumentNode) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError]: any = useState(null)
    const [data, setData]: any = useState([])

    try {
        setIsLoading(true)
        fetchClient.query({query: QUERY})
            .then(response => {
                console.log(response.data);
                setData(response.data)
                setError(null);
            })
            .catch(error => {
                console.error(error)
                setData([]);
                setError(error);
            }).finally(() => {
            setIsLoading(false);
        })

    } catch (e) {
        setData([]);
        setError(e);
        setIsLoading(false);
    }
    return {isLoading, error, data};
}

export default useFetch;
