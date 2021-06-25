const { SchemaDirectiveVisitor } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");
const jwt = require('jsonwebtoken');
import config from "@app/config"

/// directive for checking if user is authenticated before resolve action
export class CheckAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args: any) {
            const context = args[2];
            const authHeader = context?.req?.headers?.authorization;
            if(authHeader){
                const token = authHeader.split('Bearer ')[1];
                if(token){
                    const user = jwt.verify(token, config.KEY_JWT);
                    if(user){
                        args[2].user = user;
                        return resolve.apply(this, args);
                    }
                }
            }
            throw new Error("Authentication is required!");
          };
    }

  
  }