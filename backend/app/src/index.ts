import {ApolloServer} from 'apollo-server';
import config from "@app/config";
import gqlSchema from '@app/src/graphql'

const mongoose = require('mongoose')

const server = new ApolloServer({
	schema: gqlSchema,
	context: ({req}: {req:any}) => {return {req}}
});

mongoose.connect(config.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(()=> {
		console.log("MongoDB connected")
		return server.listen({port: 5000});
	})
	.then((res: any) => {
		console.log(`Server running at ${res.url}`);
	})
	.catch((err: any )=> {
		console.log(err)
	});;


	