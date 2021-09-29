import React, { Component } from 'react';
import Header from './Header';
import HomeContent from './HomeContent';
import Footer from '../../utils/utilsComponents/Footer';
import PostFetch from './PostFecth';
import '../../assets/styleSheets/Home.scss';

class Home extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            valueTofetch : '',
            req : false,
            menuBugerBgcolor: "white",
        }
        this.entry = "";
        this.setFetch = this.setFetch.bind(this);
        this.fetchEntry = this.fetchEntry.bind(this);
    }

    setFetch(e){
        this.entry = e.target.value;
    }
    async fetchEntry(e) {
        e.preventDefault();
        this.setState({ req : !this.state.req });
        await this.setState({ valueTofetch  : this.entry });
        this.entry = "";
    }

    render(){
        return(
            <div className = "Home-wrapper">
                <div className = "upper-content-main-wrapper">
                    <Header entry ={ this.setFetch } fetchEntry={ this.fetchEntry } menuBurgerBg= { this.state.menuBugerBgcolor } />
                    <HomeContent/>
                </div>
                <PostFetch entry ={ this.state.valueTofetch } redirect= {this.props.history} checkRequest ={ this.state.req }/>
                <Footer/>
            </div>
        )
    }
}
export default Home ;