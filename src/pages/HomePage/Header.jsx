import React, { Component } from 'react';
import request from '../../function';
//search icon
import search from '../../search.svg';
import NavBar from '../../utilsComponents/NavBar'


class Header extends Component {
    constructor(props){
        super(props);
        this.state = { 
            entry : '',
        }
        this.setFetch = this.setFetch.bind(this);
        this.fetchEntry = this.fetchEntry.bind(this);
    }



    async setFetch(e){
        await this.setState({entry : e.target.value});
        if(this.state.entry){
        }
    }

    async fetchEntry() {
       await request(this.state.entry);
    }

    render() {
        return (
            <header>
                <NavBar/>
                <div className="searchFields">  
                    <input type="text" onChange = {this.setFetch} placeholder="Search by area, ingredient, meal name, meal category "/>
                    <img src={search} alt="search-icon" onClick={this.fetchEntry}/>
                </div>
            </header>
        );
    }
}

// function PostSvgIcon(){
      
//     return(
            
//     )
// }

export default Header;