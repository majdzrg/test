import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import {Candidatur} from './candidatur/Candidatur';
import {CandidaturEdit} from './candidatur/CandidaturEdit';
import {List} from './list/List';
import {Login} from './login/Login';
import {Error} from './error/Error'
export default function Main() {
    return (
        <Switch>
            <Route path="/candidatur" component={Candidatur} exact/>
            <Route path="/candidatur/:id" component={CandidaturEdit} exact/>
            <Route path="/candidaturs" component={List}/>
            <Route path="/login" component={Login}/>
            <Route path="/">
                <Redirect to="/candidatur" />
            </Route>
            <Route component={Error} />
        </Switch>
    )
}