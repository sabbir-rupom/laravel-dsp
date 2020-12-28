import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Home from './components/Home';
import AdNew from './components/AdNew';
import AdEdit from './components/AdEdit';

function Index() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/ads" exact component={Home} />
                <Route path="/ad/campaigns" exact component={Home} />
                <Route path="/ad/campaign/new" exact component={AdNew} />
                <Route path="/ad/campaign/:id/edit" exact component={AdEdit} />
            </Switch>
        </BrowserRouter>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
