import React from 'react';
import Home from './pages/HomePage/Home';
import Bookmarks from './pages/favoris/BookMarks'
// import './Home.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import './Bookmarks.scss';
import Details from './pages/details/Details.jsx';
// import './Details.scss';

const App = () => {
    return (
        <div>
        <Router>
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="./Bookmarks" component={Bookmarks}/>
               <Route path="./details/:id" component={Details}/>
            </Switch>
        </Router>
        </div>
    )
}

export default App;