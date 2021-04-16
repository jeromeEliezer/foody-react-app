import React from 'react';
import Home from './pages/HomePage/Home';
import Bookmarks from './pages/favoris/BookMarks'
import './Home.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './Bookmarks.scss';



const App = () => {
    return (
        <div>
        <Router>
        <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/Bookmarks" component={Bookmarks}/>
        </Switch>
        </Router>
        </div>
        
    )
}

export default App;