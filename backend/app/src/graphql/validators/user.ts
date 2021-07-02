import { UserInputError } from 'apollo-server-express';
import passwordValidator from 'password-validator';
//@ts-ignore
import { isEmail, isLength } from 'validator';

const passwordSchema = new passwordValidator()
    .is().min(8)
    .is().max(100)
    .has().letters()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

export const userValidator = (input: { username: string, password: string, retypePassword: string, email: string }) => {
            const { username, password, retypePassword, email } = input;
            if (!isEmail(email)) {
                throw new UserInputError('Invalid Email address!');
            }

            if (password !== retypePassword) {
                throw new UserInputError('Passwords don\'t match!');
            }

            if (!passwordSchema.validate(password)) {
                throw new UserInputError('Password is not strong enough!');
            }

            if(!isLength(username, {min: 2, max: 40})){
                throw new UserInputError('Invalid format username');
            }
    
}