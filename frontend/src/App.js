import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import UploadHome from './main';

function App() {
    return(
        <todoLayout>
            <Router>
                <Switch>
                    <Route>
                        <UploadHome />
                    </Route>
                </Switch>
            </Router>
        </todoLayout>
    )
}

export default App;