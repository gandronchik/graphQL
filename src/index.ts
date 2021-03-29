import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';
import { dataSources } from './datasources';

const server = new ApolloServer({
    typeDefs: gql`
        ${typeDefs}
    `,
    resolvers,
    dataSources
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
