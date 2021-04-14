// import { render } from "@testing-library/react";
import axios from "axios";


 

async function request(entry){
        console.log(entry)
        const items = [];
        //recherche par nom
       const resSingleMeal = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${entry}`)
       items.push(resSingleMeal.data.meals);

       const resCategory = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${entry}`)
       items.push(resCategory.data.meals);

       const resMainIngredient = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${entry}`)
       items.push(resMainIngredient.data.meals);

       const resArea = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${entry}`)
       items.push(resArea.data.meals);
       console.log(items);                    
}       


export default request;
