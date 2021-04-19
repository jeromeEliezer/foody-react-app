import React, { Component } from 'react';
import Header from './Header';
import HomeContent from './HomeContent';
import Footer from '../../utilsComponents/Footer';
import PostFetch from './PostFecth'

class Home extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            valueTofetch : '',
            req : false,
            menuBugerBgcolor: "white"
        }
        this.entry = ""
        this.setFetch = this.setFetch.bind(this);
        this.fetchEntry = this.fetchEntry.bind(this);
        // this.navColorAdapter();
        console.log(this.props)/////////////////
    }


   
    setFetch(e){
        this.entry = e.target.value;
    }
  
    async fetchEntry(e) {
    e.preventDefault();
    this.setState({req : !this.state.req})
     await this.setState({valueTofetch  : this.entry})
     this.entry = "";
    }


    // navColorAdapter = ()=>{
    //     window.addEventListener('scroll',()=>{
            
    //         window.scrollY >= document.querySelector('header').clientHeight && window.scrollY <= document.querySelector('.upper-content-main-wrapper').scrollBottom? this.setState({menuBugerBgcolor : 'black'}) : this.setState({menuBugerBgcolor : 'white'})
    //     })}
                        

    render(){
        return (
                <div className = "Home-wrapper">
                    <div classeName = "upper-content-main-wrapper">
                        <Header entry ={this.setFetch} fetchEntry ={this.fetchEntry} menuBurgerBg = {this.state.menuBugerBgcolor}/>
                        <HomeContent/>
                    </div>
                    <PostFetch entry = {this.state.valueTofetch} redirect={this.props.history} checkRequest = {this.state.req}/>
                    <Footer/>
                </div>
            )
    }
}

export default Home  