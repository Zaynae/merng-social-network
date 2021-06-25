import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { join } from "path";
import schemaDirectives from "@graphql/directives"
const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive')

const typeDefs= mergeTypeDefs(loadFilesSync(join(__dirname, './schema/**/*.gql')));
const resolvers= mergeResolvers(loadFilesSync(join(__dirname, './resolvers/**/*.ts')));

export default makeExecutableSchema({
	typeDefs: [constraintDirectiveTypeDefs, typeDefs],
	resolvers,
	schemaTransforms: [constraintDirective()],
	//@ts-ignore
	schemaDirectives
});