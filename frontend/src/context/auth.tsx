import React, {useReducer, createContext} from 'react';
import jwtDecode from 'jwt-decode';

const initialeState = {user: null};
if(localStorage.getItem('jwtToken')){
    //@ts-ignore
    const decodedToken: any = jwtDecode(localStorage.getItem('jwtToken'));
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken');
    }else{
        initialeState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData: any) => {},
    logout: () => {}
});

function authReducer(state: any, action: any){
    switch(action.type){
        case 'LOGIN': return{
            ...state,
            user: action.payload
        }
        case 'LOGOUT': return{
            ...state,
            user: null
        }
        default: 
            return state;
    }
}

function AuthProvider(props: any){
    const [state, dispatch] = useReducer(authReducer, initialeState);

    function login(userData: any){
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout(){
        localStorage.removeItem('jwtToken');
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <AuthContext.Provider  value={{ user: state.user, login, logout }}  {...props}> 
           
           
        </AuthContext.Provider> 
    );
}

export { AuthContext, AuthProvider }