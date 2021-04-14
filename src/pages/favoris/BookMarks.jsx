import NavBar from '../../utilsComponents/NavBar';
import Footer from '../../utilsComponents/Footer';
import React, { Component } from 'react'
import { render } from '@testing-library/react';
import axios from 'axios';
import Image from "../../headerBackground.jpg"



class Bookmarks extends Component {
    
        constructor() {
            super();
                this.state = {
                    filter: "",
                
                }
        }

render() {
    return(
        <div>
            <NavBar/>            
            <div className="bookmarks-content">
                <figure className="image-content">    
                    <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                    <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                 <figure className="image-content">
                    <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>

                <figure className="image-content">    
                <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                    <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                    <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                    <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                <figure className="image-content">
                <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
        
                 <figure className="image-content">
                 <img src={Image} alt=""/>
                    <figcaption>
                        <h2></h2>
                    </figcaption>
                </figure>
            </div>        

            <Footer/>
        </div>
        
    )
}

}
export default Bookmarks;


