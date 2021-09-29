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
            displayOptions : "none",
            areOptionsDisplayed : false,
            errorMessageHeight : 0
        }
        this.mealNameStyle = {
            position : "absolute",
            left : "45%",
            transform : "translateX(-50%)",
            textAlign : "center",
            color:"white",
            border : "1px solid white",
            padding: "2%",
            width : "40%",
            borderRadius : "8px"
        }; 
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props.checkRequest !== prevProps.checkRequest){
            await this.fetch();
            if(this.state.items !== [] && document.querySelector('.fetch-response-container')){
                document.querySelector('.fetch-response-container').scrollIntoView({behavior:'smooth'});
            }
         }
    }
    //search engine
    fetch = async ()=>{
        let items = [];
        let resSingleMeal = null;
        let resCategory = null;
        let resMainIngredient = null;
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
                items = items.reduce((a,b)=> a.concat(b),[]);
                await this.setState({items});
                this.check = false;
                //check if match found
                const NoMatch = items.every(el => el === null);
                if(NoMatch){
                    this.setState({ errorMessageHeight: "20px" });
                    setTimeout(()=>this.setState({ errorMessageHeight: 0 }), 4000);
                }
            }
            catch(err){console.log(err)}
         }
    }

    // addTofavorite and show detail options in result views if match
     handleOptions = async(e) =>{
       await this.setState({areOptionsDisplayed : ! this.state.areOptionsDisplayed});
       this.state.areOptionsDisplayed ? this.setState({ displayOptions: "block" }) : this.setState({ displayOptions:"none" });
        e.target.nextSibling.style.display = this.state.displayOptions;
    }

    // Save favorite in  localStorage
    addToBookmarks = (e)=>{
        const id   = e.target.getAttribute('data-id');
        const img  = e.target.getAttribute('data-img');
        const name = e.target.getAttribute('data-name');
        //we select errBox in the same box
        const errBox = e.target.parentElement.parentElement.firstElementChild;
        // document.querySelector('p.error-message').style.height = "30px"
        //boolean that check if we can add the item in the localStorage
        let weCanAddThisOne = true;
         //useful if we need to add element in localStorage ...if localStorage don't exist yet it's created
        const favList = [];
        //if localStorage exists we need to load it's content and increment it with the selected element
        if(localStorage.getItem('bookmarks') !== null && localStorage.getItem('bookmarks') !== ""){
            const bookmarks = localStorage.getItem('bookmarks');
            //we check if the item id's already in localStorage
            const reg = new RegExp(`${id}`) ;
            if(reg.test(bookmarks)){
                weCanAddThisOne = false;
            }
            favList.push(localStorage.getItem('bookmarks'));
        }
        /// we add to space to split our datas in order to use them in bookmarks section
        if(weCanAddThisOne){
            //We need to make a string from our data before storing in localStorage
            const meal = JSON.stringify({ id: id, img: img, name: name});
            //later to take meals from localStorage we'll need to split
            favList.push(meal+ "  ");
            localStorage.setItem('bookmarks',favList);
            e.target.parentElement.nextSibling.nextSibling.style.display = "block";
        }
        else{
            errBox.style.height = "25px";
            setTimeout(() => errBox.style.height = 0, 3000)
        }
    }
    ///show detail button event
    showDetails = (e) =>{
        const id = e.target.getAttribute('data-id');
        this.props.redirect.push(`/details/${id}`);
    }
    render(){
            switch( true ){
                /// if we found a match so result are shown...
                case this.state.items.length !== 0 : 
                                            return(
                                                    <div className="fetch-response-container">
                                                        { this.state.items.map(el=>{
                                                            return (
                                                                // each block
                                                                <div key={ el.idMeal } className='fetch-result-wrapper'>
                                                                    <p className= "error-message">Already in your favorites</p>
                                                                    {/* imge option to click ON */}
                                                                    <img style={{cursor: "pointer"}}className="options-icon" src={ optionsIcon } onClick = { this.handleOptions } alt="options-icon"/>
                                                                    {/* options (addTobookmarks | show details*/}
                                                                    <div style= {{display : "none"}} className ='options-params'>
                                                                        <h5 data-id={el.idMeal} data-img ={el.strMealThumb} data-name={el.strMeal} onClick ={this.addToBookmarks}>Add to favorites</h5>
                                                                        <h5 data-id={el.idMeal} data-img ={el.strMealThumb} data-name={el.strMeal} onClick={this.showDetails}>Show details</h5>
                                                                    </div>
                                                                    {/* main image */}
                                                                    <img  className="fetch-image"   src={ el.strMealThumb } alt=""/>
                                                                    {/* star appear if meal is added to favorites */}
                                                                    <img className='favorite' style={ { display:"none" } } src={ star } alt="favorite-icon"/>
                                                                    <h3 style={this.mealNameStyle}>{el.strMeal}</h3>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )
                default : 
                        return (
                            <React.Fragment>
                                <p className= "fetch-error-message" style={{ height : this.state.errorMessageHeight }}>No match found</p>
                                <i></i> 
                            </React.Fragment>
                            )
            }
        }
}        

export default PostFetch;