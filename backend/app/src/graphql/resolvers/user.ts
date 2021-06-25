import User from "@models/User";
import config from "@app/config";
import {UserInputError} from "apollo-server";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import {confirmPass} from "@utils/validators"

function generateToken(user: {id: string, email: string, username: string}){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, config.KEY_JWT, {expiresIn: '1h'});
}

export default{
    Query:{
        users: async() => {
            try{
				return (await User.find());
			}catch(err){
				console.log(err)
			}
        }
    },
    Mutation:{
        register: async(_: any, 
            args: {input: {username: string, password: string, retypePassword: string, email: string}}, 
            context: any, 
            info: any) => {
                let {username, password, retypePassword, email} = args.input;
                // TODO: validate user data
                // TODO: make sur user doesnt exist 
                // TODO hash password and create auth token

                const user = await User.findOne({email});
                console.log(user);
                if(user){
                    throw new UserInputError('User is taken',{
                        errors: {
                            username: 'this username is taken'
                        }
                    });
                }

                if(!confirmPass(password, retypePassword)){
                    throw new UserInputError('Incorrect password',{
                        errors: {
                            password: 'retype password doesnt match the given password'
                        }
                    });
                }

                password = await bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: Date.now()
                });
                const res = await (newUser.save());
                const token = generateToken(res);
                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
        },
        login: async(_: any, {email, password}: {email: string, password: string}, context: any) => {
            const error = 'Invalid credentials';
            const user = await User.findOne({email});
            if(!user){
                throw new UserInputError(error);
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                throw new UserInputError(error);
            }
           
            const token = generateToken(user);
                return {
                    ...user._doc,
                    id: user._id,
                    token
                }
        }
    }
}