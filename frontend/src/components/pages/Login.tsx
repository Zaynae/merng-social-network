import { gql } from '@apollo/client';
import { useContext, useState } from 'react';
import {Form, Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import {useForm} from './../../utils/hooks';
import {AuthContext} from './../../context/auth'

function Login(props: any) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState('');
    const {onChange, onSubmit, values} = useForm(loginUser, {
        username: '',
        password: '',
    })
    //@ts-ignore
    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(_, result: any){
            context.login(result.data.login);
            props.history.push('/')
        },
        onError(err: any){
            setErrors(err.message);
        },
        variables: values
    });

    function loginUser(){
        login();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} >
                <Form.Input label="Email" placeholder="email" type="text" name="email" error={errors?.hasOwnProperty('email') ? true:false} value = {values.email} onChange={onChange} />
                <Form.Input label="Password" placeholder="password" type="password" name="password" error={errors?.hasOwnProperty('password') ? true:false} value = {values.password} onChange={onChange} />
                <Button type="submit" primary>Login</Button>
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

const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ){
        login(
                email: $email,
                password: $password,            
        ){
            id email username token createdAt
        }
    }
`;

export default Login;