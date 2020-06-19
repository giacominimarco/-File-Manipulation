import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import UploadHome from './main';

function App() {
    return(
        <>
            <Router>
                <Switch>
                    <Route>
                        <UploadHome />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default App;