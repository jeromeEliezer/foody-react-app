import React, { Component } from 'react';
//search icon
import search from '../../assets/images/search.svg';
import NavBar from '../../utils/utilsComponents/NavBar';
import Profile from '../../utils/utilsComponents/Profile';
//Header background images
import headerBackground1 from '../../assets/images/headerBackground1.jpg';
import headerBackground2 from '../../assets/images/headerBackground2.jpg';
import headerBackground3 from '../../assets/images/headerBackground3.jpg';
import headerBackground4 from '../../assets/images/headerBackground4.jpg';
import headerBackground5 from '../../assets/images/headerBackground5.jpg';
import headerBackground6 from '../../assets/images/headerBackground6.jpg';
import headerBackground7 from '../../assets/images/headerBackground7.jpg';
import headerBackground8 from '../../assets/images/headerBackground8.jpg';
import headerBackground9 from '../../assets/images/headerBackground9.jpg';
import headerBackground10 from '../../assets/images/headerBackground10.jpg';
import headerBackground11 from '../../assets/images/headerBackground11.jpg';
import headerBackground12 from '../../assets/images/headerBackground12.jpg';

class Header extends Component {
    constructor( props ){
        super( props );

        this.state = { 
            image : headerBackground12,
        }
    }
    getImages(){
        return[
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
            headerBackground12
        ]
    }
    setBackgroundImage_animation = ()=>{
        const image = this.getImages();
        setInterval(()=>{
            this.setState({ image : image[ Math.floor( image.length * Math.random() ) ] })
        },5000)
    }
    componentDidMount(){
        this.setBackgroundImage_animation();
    }

    render() {
        return (
            <header style={{ backgroundImage :`url(${this.state.image})` }}>
                <NavBar backgroundColor ={this.props.menuBurgerBg}/>
                <h1>Foody</h1>
                <Profile/>
                <form className="searchFields" method='GET' onSubmit= {this.props.fetchEntry}>  
                    <input type="text" onChange = { this.props.entry } placeholder="Search by area, ingredient, meal name, meal category "/>
                    <img src={ search } alt="search-icon"/>
                    <input type="submit"/>
                </form>
            </header>
        );
    }
}

export default Header;