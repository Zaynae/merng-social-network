import { gql } from '@apollo/client';
import { useContext, useState } from 'react';
import {Form, Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import {useForm} from './../../utils/hooks';
import {AuthContext} from './../../context/auth'

function Register(props: any) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState('');
    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        retypePassword: ''
    })
    //@ts-ignore
    const [register, {loading}] = useMutation(REGISTER_USER, {
        update(_, result: any){
            context.login(result.data.register);
            props.history.push('/')
        },
        onError(err: any){
            setErrors(err.message);
        },
        variables: values
    });

    function registerUser(){
        register();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} >
                <Form.Input label="Username" placeholder="username" type="text" name="username" error={errors?.hasOwnProperty('username') ? true:false} value = {values.username} onChange={onChange} />
                <Form.Input label="Email" placeholder="email" type="text" name="email" error={errors?.hasOwnProperty('email') ? true:false} value = {values.email} onChange={onChange} />
                <Form.Input label="Password" placeholder="password" type="password" name="password" error={errors?.hasOwnProperty('password') ? true:false} value = {values.password} onChange={onChange} />
                <Form.Input label="Confirm password" placeholder="confirm password" type="password" name="retypePassword" error={errors?.hasOwnProperty('retypePassword') ? true:false} value = {values.retypePassword} onChange={onChange} />
                <Button type="submit" primary>Register</Button>
            </Form>
            { errors ? (
                <div className="ui error message">
                    <ul className="list">                 
                         
                        <li>{errors}</li>

                    </ul>
                </div>
           ): '' }
            
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $retypePassword: String!
    ){
        register(
            input:{
                username: $username,
                email: $email,
                password: $password,
                retypePassword: $retypePassword
            }
        ){
            id email username token createdAt
        }
    }
`;

export default Register;