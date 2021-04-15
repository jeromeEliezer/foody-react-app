
import axios from 'axios';
import React, { Component } from 'react';


class PostFetch extends Component{
   
    constructor(props){

        super(props);

        this.state = {
            items : [],
            position : "static",
        }
    }

    async componentDidUpdate(prevProps, prevState){
        if(this.props.checkRequest !== prevProps.checkRequest){
            
              await this.fetch()
            
           
            console.log(document.querySelector('.Home-wrapper'), "inner   "+window.innerHeight)

            if(this.state.items.length > 0){
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
                items = items.filter(el => el !== null) 
                await this.setState({items:items});
                // console.log("items   :"+ items)
                console.log(this.state.items)
                this.check = false;
             }
            catch(err){console.log(err)}
         }
}

    render(){
    
    if(this.state.items)

    {
        if(this.state.items.length > 0){
            return(
                <div className="fetch-response-container">
                    <img  className="id"  src =" " lt=""/>
                </div>
             )
        }
        return <i></i>
        }   
     }        
}
export default PostFetch;