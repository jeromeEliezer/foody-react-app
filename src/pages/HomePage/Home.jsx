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
        console.log("entry :"+ this.entry)
        // if(this.state.entry){
        // }
    }

  
    async fetchEntry() {
     await this.setState({valueTofetch  : this.entry})
     
     console.log(this.state.valueTofetch)
    }

    render(){
        
        return (
                <div className = "Home-wrapper">
                    <Header entry ={this.setFetch} fetchEntry ={this.fetchEntry}/>
                    <HomeContent/>
                    <PostFetch entry = {this.state.valueTofetch} isClicked = {this.state.req}/>
                    <Footer/>
                </div>
            )
    }
}

export default Home  