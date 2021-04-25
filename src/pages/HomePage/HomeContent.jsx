import React, { Component } from 'react';
import axios from 'axios';

class HomeContent extends Component {
    constructor(){
        super()
        this.state = { 
                randomMeal : {},
        }
        this.loadContent();

    }
    loadContent(){
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response=>{
            const randomMeal = response.data.meals[0];
            this.setState({ randomMeal });
        })
        .catch(err=>console.log(err))
    }
    
    render() {
        return (
            <div className='middle-content-wrapper'>
                <figure className = "middle-content-container">
                    <img src={ this.state.randomMeal.strMealThumb } alt=""/>
                        <figcaption>
                            <h2>{ this.state.randomMeal.strMeal }</h2>
                        </figcaption>
                </figure>
                <p style={ { display:"none" } } className='description'><span className='description'>Description</span>{this.state.randomMeal.strInstructions}</p>
            </div>
        );
    }
}


export default HomeContent;