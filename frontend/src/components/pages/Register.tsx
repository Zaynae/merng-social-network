import { gql } from '@apollo/client';
import { useState } from 'react';
import {Form, Button} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

function Register(props: any) {
    const [errors, setErrors] = useState('');
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        retypePassword: ''
    });
    const onChange = (event: any) => {
        setValues({...values, [event.target.name]: event.target.value});
    }
   
    //@ts-ignore
    const [register, {loading}] = useMutation(REGISTER_USER, {
        update(_, result){
            console.log('----result',result);
            props.history.push('/')
        },
        onError(err: any){
            console.log('-----err', err.message,'--------');
            setErrors(err.message);
        },
        variables: values
    });
    const onSubmit = (event: any) => {
        event.preventDefault();
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
        $email: Email!
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