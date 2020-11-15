import React from 'react'

export const Login = () => {


    return(
        <div class="align-self-center mx-auto">
            <form class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Psuedo</label>
                <input type="text" id="inputEmail" class="form-control" placeholder="Psuedo" required autofocus/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </div>
    )
}