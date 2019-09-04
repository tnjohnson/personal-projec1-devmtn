import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login';
import MainPage from './mainPage';
import MyJobsPage from './myJobsPage';

export default (
    <Switch>
        <Route path='/login' component={Login}/>
        <Route exact path='/' component={MainPage}/>
    </Switch>
)