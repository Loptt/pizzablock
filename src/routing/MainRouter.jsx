import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginView from '../views/LoginView';
import SignupView from '../views/SignupView';
import HomeView from '../views/HomeView';
import NonAuthRoute from './NonAuthRoute';
import GameView from '../views/GameView';

function MainRouter() {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path="/" component={HomeView}/>
                <PrivateRoute path="/play" component={GameView}/>
                <NonAuthRoute path="/login" component={LoginView}/>
                <NonAuthRoute path="/signup" component={SignupView}/>
            </Switch>
        </div>
    )
}

export default MainRouter