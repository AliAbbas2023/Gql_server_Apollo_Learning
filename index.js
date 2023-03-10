import { ApolloServer } from 'apollo-server';
import { connect } from 'mongoose';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/UserResolver.js';

const MONGODB = "mongodb+srv://admin:1234@cluster0.g6idydk.mongodb.net/Booking";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });