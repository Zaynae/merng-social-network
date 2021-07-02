import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { join } from "path";
import schemaDirectives from "@graphql/directives"

const typeDefs= mergeTypeDefs(loadFilesSync(join(__dirname, './schema/**/*.gql')));
const resolvers= mergeResolvers(loadFilesSync(join(__dirname, './resolvers/**/*.ts')));

export default makeExecutableSchema({
	typeDefs,
	resolvers,
	//@ts-ignore
	schemaDirectives
});

