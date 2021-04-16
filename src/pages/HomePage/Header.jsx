import React, { Component } from 'react';
//search icon
import search from '../../search.svg';
import NavBar from '../../utilsComponents/NavBar';

import headerBackground  from '../../headerBackground.jpg';
import headerBackground1 from '../../headerBackground1.jpg';
import headerBackground2 from '../../headerBackground2.jpg';
import headerBackground3 from '../../headerBackground3.jpg';
import headerBackground4 from '../../headerBackground4.jpg';
import headerBackground5 from '../../headerBackground5.jpg';
import headerBackground6 from '../../headerBackground6.jpg';
import headerBackground7 from '../../headerBackground7.jpg';
import headerBackground8 from '../../headerBackground8.jpg';
import headerBackground9 from '../../headerBackground9.jpg';
import headerBackground10 from '../../headerBackground10.jpg';
import headerBackground11 from '../../headerBackground11.jpg';
import headerBackground12 from '../../headerBackground12.jpg';


class Header extends Component {
    constructor({props}){
        super({props});
        this.state = { 
            image : headerBackground12 
        }
        

    }

    getImages(){
        return[
            headerBackground,
            headerBackground1,          
            headerBackground2,                   
            headerBackground3,
            headerBackground4,
            headerBackground5,
            headerBackground6,
            headerBackground7,            
            headerBackground8,
            headerBackground9,
            headerBackground10,
            headerBackground11,
            headerBackground12,
        ]
    }

    setBackgroundImage_animation = ()=>{
        const image = this.getImages();
        setInterval(()=>{
            this.setState({image : image[Math.floor(image.length * Math.random())]})
        },5000)
    }

    componentDidMount(){
        this.setBackgroundImage_animation();
    }

    render() {

        return (
            <header style={{backgroundImage :`url(${this.state.image})`}}>
                <NavBar bgColor ={this.props.menuBurgerBg}/>
                <div className="searchFields">  
                    <input type="text" onChange = {this.props.entry} placeholder="Search by area, ingredient, meal name, meal category "/>
                    <img src={search} alt="search-icon" onClick={this.props.fetchEntry}/>
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