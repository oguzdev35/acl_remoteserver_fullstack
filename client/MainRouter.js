import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// pages
import Home from './ui/pages/Home';
import Master from './ui/pages/Master';

export default () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/master" component={Master} />
        </Switch>
    </BrowserRouter>
    )
}