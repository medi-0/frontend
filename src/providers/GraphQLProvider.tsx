import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
	uri: "https://api.studio.thegraph.com/query/41674/commitment-indexer/1",
	cache: new InMemoryCache(),
});

export const GraphQLProvider: React.FC<PropsWithChildren> = function ({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
