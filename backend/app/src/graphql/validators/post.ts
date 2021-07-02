import { UserInputError } from 'apollo-server-express';
//@ts-ignore
import { isLength } from 'validator';


export const postValidator = (input: { body: string }) => {
            const { body } = input;

            if(!isLength(body, {min: 1})){
                throw new UserInputError('The body is empty!');
            }
    
}