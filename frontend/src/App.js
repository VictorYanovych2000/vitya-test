import React from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

import GlobalStyles from './styles/global.styles';

import Header from './shared/components/header/header.component';
import DashboardPage from './dashboard/pages/dashboard/dashboard.component';
import SignUpPage from './auth/pages/sign-up/sign-up.component';
import SignInPage from './auth/pages/sign-in/sign-in.component';
import UsersPage from './users/pages/users.component';
import ProfilesPage from './profiles/pages/profiles.component';
import UserPage from './users/pages/user.component';

import {AuthContext} from './shared/context/auth.context';
import {useAuth} from './hooks/auth.hook';

const App = () => {
    const {token, login, logout, userId, role, email} = useAuth();
    const location = useLocation();
    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route exact path={'/'} component={DashboardPage}/>
                <Route
                    exact
                    path={'/users'}
                    render={() => <UsersPage key={'user'}/>}
                />
                <Route path={'/profiles/user/:id'} component={ProfilesPage}/>
                <Route path={'/users/:id/'} component={UserPage}/>
                <Redirect to={'/'}/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path={'/sign-up'} component={SignUpPage}/>
                <Route path={'/sign-in'} component={SignInPage}/>
                <Redirect to={'/sign-in'}/>
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token,
                userId: userId,
                login,
                logout,
                role,
                email,
            }}
        >
            <GlobalStyles/>
            {location.pathname !== '/sign-up' && location.pathname !== '/sign-in' && (
                <Header/>
            )}
            <main>
                <Switch>{routes}</Switch>
            </main>
        </AuthContext.Provider>
    );
};

export default App;
