import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login';
import MainPage from './mainPage';
import MyJobsPage from './myJobsPage';

export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/mainPage' component={MainPage}/>
        <Route path='/myJobs' component={MyJobsPage}></Route>
    </Switch>
)