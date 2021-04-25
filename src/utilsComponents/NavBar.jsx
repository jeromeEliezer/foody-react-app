
import React, { Component } from 'react';

//nav
const navStyle = {
    position : "fixed",
    overflow:"hidden",
    height : '100vh',
    right:0,
    // width: 0,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    background:"black",
    zIndex : 10,
    transition : "0.5s ease-out"
    
}

//div
const menuBurgerIconStyle = {
    display : "flex",
    flexDirection : "column",
    width : 35,
    height : 38,
    justifyContent : "space-evenly",
    position: "fixed",
    top : "5%",
    left : "85%",
    // background : "transparent",
    zIndex : 3
}

//span
const MenuBurgerIconLines = {
    width  :  "100%",
    height : "3px",
    background : "white"
    
}

//ul
const menuOptionsListStyle = {
    height : "50%",
    width : "30%",
    listStyleType : "none",
    display :"flex",
    flexDirection : "column",
    justifyContent : "space-around",
    alignItems :"flex-start",
}

//li
const optionStyle = {
}
//a
const optionLinkStyle = {
    textDecoration : "none",
    fontSize : "1.7rem",
    textAlign : "left",
    width : "100%",
    color : 'white'
}

class NavBar extends Component {
    constructor(props){

        super(props);
        this.state = {
            active : false,
            width : 0,
            opacity : 0
          }
          this.menu_active = this.menu_active.bind(this);
    }
    
    async menu_active(e){
        await this.setState({active : ! this.state.active});
        
        this.state.active ? this.setState({width : "100vw"}) :  this.setState({width : 0});
        const nav = document.querySelector('nav');
        const navWidth = window.getComputedStyle(nav).getPropertyValue('width')
        

        console.log(this.state.active,navWidth,this.state.width)
    }

    componentDidUpdate(){
       
    }

    render() {
        return (
            <nav style={{ ...navStyle, width:this.state.width}}>   
                <div style={menuBurgerIconStyle} onClick={this.menu_active}>
                    <span className="menuBurgerIconLines" style={{...MenuBurgerIconLines, backgroundColor: this.props.backgroundColor}}></span>
                    <span className="menuBurgerIconLines" style={{...MenuBurgerIconLines, backgroundColor: this.props.backgroundColor}}></span>
                    <span className="menuBurgerIconLines" style={{...MenuBurgerIconLines, backgroundColor: this.props.backgroundColor}}></span>
                </div>
                <ul style={menuOptionsListStyle}>
                    <li style={optionStyle}><a href="/" style={optionLinkStyle} >Home</a></li>
                    <li style={optionStyle}><a style={optionLinkStyle} href="/Bookmarks">Bookmarks</a></li>
                </ul>
            </nav>     
        )
    }
}

export default NavBar;

