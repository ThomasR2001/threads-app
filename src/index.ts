import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
    const app = express();
const PORT=Number(process.env.PORT) || 8000;

app.use(express.json())

//Create server
const gqlserver = new ApolloServer({
    typeDefs : "type Query{hello:String say(name:String):String}",
    resolvers:{
        Query :{hello: () => "Hello I am gqlserver",
        say:(_,{name}:{name:String})=>`Hi ${name}`},
    },
});

//Start the graphql server
await gqlserver.start();

app.get('/',(req, res) =>{
    res.json("Server is up and running");
});

app.use('/graphql',expressMiddleware(gqlserver));

app.listen(PORT,() => console.log('Server started at PORT:${PORT}'));
}

init();