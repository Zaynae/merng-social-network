import { UserInputError } from 'apollo-server-express';
import {
    Kind,
    GraphQLError,
    GraphQLScalarType,
    GraphQLScalarTypeConfig,
  } from 'graphql';
  
  const validate = (value: any) => {
    const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
    if (typeof value !== 'string') {
      throw new UserInputError(`Value is not string: ${value}`);
    }
  
    if (!EMAIL_ADDRESS_REGEX.test(value)) {
      throw new UserInputError(`Value is not a valid email address: ${value}`);
    }
  
    return value;
  };
  
  export const GraphQLCurrencyConfig: GraphQLScalarTypeConfig<
    string,
    string
  > = /*#__PURE__*/ {
    name: 'Email',
  
    description:
      'A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.',
  
    serialize: validate,
  
    parseValue: validate,
  
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new UserInputError(
          `Can only validate strings as email addresses but got a: ${ast.kind}`,
        );
      }
  
      return validate(ast.value);
    },
  
    specifiedByUrl: 'https://www.w3.org/Protocols/rfc822/',
  };
  
  export const GraphQLEmailAddress = /*#__PURE__*/ new GraphQLScalarType(
    GraphQLCurrencyConfig,
  );