import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import UploadHome from './components/UploadHome';

import './App.css';

function App() {
    return(
        <todoLayout>
            <Router>
                <Switch>
                    <Route path="/upload">
                        <UploadHome />
                    </Route>
                </Switch>
            </Router>
        </todoLayout>
    )
}

export default App;
