import React, { Component } from 'react';
import Header from './Header';
import HomeContent from './HomeContent';
import Footer from '../../utilsComponents/Footer';
import PostFetch from './PostFecth'

class Home extends Component{
 
    constructor(){
        super();
        this.state = {
            valueTofetch : '',
            req : false
        }
        this.entry = ""
        this.setFetch = this.setFetch.bind(this);
        this.fetchEntry = this.fetchEntry.bind(this);
    }
    setFetch(e){
        this.entry = e.target.value;
    }
  
    async fetchEntry() {
        this.setState({req : !this.state.req})
     await this.setState({valueTofetch  : this.entry})
     this.entry = "";
    }

    render(){
        
        return (
                <div className = "Home-wrapper">
                    <div classeName = "upper-content-main-wrapper">
                        <Header entry ={this.setFetch} fetchEntry ={this.fetchEntry}/>
                        <HomeContent/>
                    </div>
                    <PostFetch entry = {this.state.valueTofetch} checkRequest = {this.state.req}/>
                    <Footer/>
                </div>
            )
    }
}

export default Home  