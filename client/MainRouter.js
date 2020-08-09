import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// pages
import Home from './ui/pages/Home';

export default () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </BrowserRouter>
    )
}