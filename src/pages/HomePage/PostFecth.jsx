
import axios from 'axios';
import React, { Component } from 'react';

class PostFetch extends Component{
   
    constructor(props){
        super(props)
        this.state = {
            items : [],
            checked : false
            
        }
        this.check = false;
        
    }
    componentDidMount(){
            

    }
    componentDidUpdate(prevProps, prevState){
        
        console.log('update')
    }

    fetch = async ()=>{
        let items = [];
        let resSingleMeal = null;
        let resCategory = null;
        let resMainIngredient = null
        let resArea = null
         //recherche par nom
         if(this.props.entry){
             try{

                resSingleMeal= await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.entry}`)
                resCategory = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.props.entry}`)
                resMainIngredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.props.entry}`)
                resArea = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.entry}`)
                items.push(resSingleMeal.data.meals);
                items.push(resCategory.data.meals);
                items.push(resMainIngredient.data.meals);
                items.push(resArea.data.meals);
                items = items.filter(el => el.length > 0 && el !== null) 


                if(items.length > 0){
                    await this.setState({items});
                }
                
                console.log(this.state.items)
                this.check = false;
             }
            catch(err){console.log(err)}

         }
}

    render(){

    

    if(this.state.items)
    {
        this.fetch();
        return(
            <div>
                <img  className="id"  src =" " lt=""/>
            </div>
         )
        }   
     }        
}
export default PostFetch;