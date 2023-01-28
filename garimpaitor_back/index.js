require('dotenv').config({ path: '.env' });
const { ApolloServer } = require('apollo-server');
const graphql = require('./src/graphql');
const configApp = require('./src/config');
require('./src/database');

const server = new ApolloServer({
    ...graphql,
    ...configApp,
});

server.listen({ port: process.env.PORT }).then(({ url }) => console.log(url));
