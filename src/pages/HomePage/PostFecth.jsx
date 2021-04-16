
import axios from 'axios';
import React, { Component } from 'react';
import optionsIcon from '../../options.svg';
import star from '../../star.svg';

class PostFetch extends Component{
   
    constructor(props){

        super(props);

        this.state = {
            items : [],
            position : "static",
            display : "none",
            isDisplayed : false
        }
        localStorage.setItem("bookmarks",{});
    }

    async componentDidUpdate(prevProps, prevState){
        if(this.props.checkRequest !== prevProps.checkRequest){
            
            await this.fetch();
            

            if(this.state.items !== [] && document.querySelector('.fetch-response-container')){
                document.querySelector('.fetch-response-container').scrollIntoView({behavior:'smooth'})
                }
         }
    }
    fetch = async ()=>{
        let items = [];
        let resSingleMeal = null;
        let resCategory = null;
        let resMainIngredient = null
        let resArea = null

        if(this.props.entry){
             try{
                resSingleMeal     = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.entry}`);
                resCategory       = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.props.entry}`);
                resMainIngredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.props.entry}`);
                resArea           = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.entry}`);
                items.push(resSingleMeal.data.meals);
                items.push(resCategory.data.meals);
                items.push(resMainIngredient.data.meals);
                items.push(resArea.data.meals);
                items = items.filter(el => el !== null);
                items = items.reduce((a,b)=> a.concat(b),[])
                await this.setState({items});
                this.check = false;
             }
            catch(err){console.log(err)}
         }
    }

     handleOptions = async(e) =>{
       await this.setState({isDisplayed : ! this.state.isDisplayed});
       this.state.isDisplayed ? this.setState({display: "block"}) : this.setState({display: "none"});
        e.target.nextSibling.style.display = this.state.display;
    }

    addToBookmarks = (e)=>{
        const id   = e.target.getAttribute('data-id');
        const img  = e.target.getAttribute('data-img');
        const name = e.target.getAttribute('data-name')
        const meal = JSON.stringify({ id: id, img: img, name: name});
        const favList = [];
        favList.push(localStorage.getItem('bookmarks'));
        favList.push(meal);
        localStorage.setItem('bookmarks',favList);
        e.target.parentElement.nextSibling.nextSibling.style.display = "block"
        console.log(localStorage.getItem('bookmarks'))
        

    }

    showDetails = (e) =>{
        const id = e.target.getAttribute('data-id');
        this.props.redirect.push(`/details/${id}`);
    }



    render(){
            switch( true ){

                case this.state.items.length !== 0 : 
                                            return(
                                                <div className="fetch-response-container">
                                                    { this.state.items.map(el=>{
                                                        return (
                                                            <div key={ el.idMeal } className='fetch-result-wrapper'>
                                                                <img style={{cursor: "pointer"}}className="options-icon" src={ optionsIcon } onClick = { this.handleOptions } alt="options-icon"/>
                                                                <div style= {{display : "none"}} className ='options-params'>
                                                                    <h5 data-id={el.idMeal} data-img ={el.strMealThumb} data-name={el.strMeal} onClick ={this.addToBookmarks}>Add to bookmarks</h5>
                                                                    <h5 data-id={el.idMeal} data-img ={el.strMealThumb} data-name={el.strMeal} onClick={this.showDetails}>Show details</h5>
                                                                </div>
                                                                <img  className="fetch-image"   src={ el.strMealThumb } alt=""/>
                                                                <img className='favorite' style={ { display:"none" } } src={ star } alt="favorite-icon"/>

                                                            </div>
                                                        )
                                                    })}
                                               </div>)
                
                default : 
                        return <i></i>

            }                           
            
             
        }
}        

export default PostFetch;