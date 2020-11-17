import Axios from 'axios';
import React,{useState} from 'react';
import { useHistory } from "react-router-dom";

export const Login = () => {
    const [message, setMessage] = useState({
        type: 'error',
        show : false,
        message : ''
    })
    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, username } = event.target.elements
        const data_login = {
            username: username.value,
            password: password.value
        }
        
        Axios.post("http://localhost:3300/api/admin", data_login)
        .then(response=> {
            if(response.status == 200){
                const token = response.data.token;
                localStorage.setItem('token', token)
                // redirect to list
                
                history.push('/candidaturs')
            } else {
                setMessage({show: true, message:"Error : "+response.data.message, type:"danger"})
            }
        }, error=> {
            console.log(JSON.stringify(error.response))
            setMessage({show: true, message:"Error : "+error.response.data.message, type:"danger"})
        })
        .catch(error => {
            console.log(error)
            setMessage({show: true, message:"somthing went wrong ", type:"danger"})
        })
    }


    return(
        <div class="align-self-center mx-auto">
            <form class="form-signin" onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Psuedo</label>
                <input type="text" id="username" class="form-control" placeholder="Username" required autofocus/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" required/>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
            {message.show && <div className={"m-3 alert alert-"+message.type} role="alert">
                {message.message}
            </div>}
        </div>
    )
}