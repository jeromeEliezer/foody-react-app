import NavBar from '../../utils/utilsComponents/NavBar';
import Footer from '../../utils/utilsComponents/Footer';
import previous from '../../assets/images/previous.svg';
import React, { Component } from 'react';
import getStorage from '../../utils/utilsFuntions/utils_functions';
import '../../assets/styleSheets/Bookmarks.scss';

class Bookmarks extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            addFavorite: [],
        }
    }
// PrevIcon dispappear when scrooling down
    isDisplayPrevIcon = (e)=>{ 
        const imageContent = document.querySelector(".image-content");
        if(e.target.scrollTop > imageContent.scrollTop + imageContent.clientHeight/4 ){
            this.setState({display: "none"});
        }
        else{
            this.setState({display: "block"});
        }
    }
    componentDidMount(){
        this.uploadBookmarks();
    
    }
    componentWillUnmount(){

    }
    showDetails = (e) =>{
        const id = e.target.getAttribute('data-id');
        this.props.history.push(`/details/${id}`);
    }
    removeFavorite = (e) =>{
        //if bin local storage isn't empty we take the content to increment with the next deleted item from bookmarks localStorage
        let binArr = []
        if(localStorage.getItem('bin') !== null && localStorage.getItem('bin') !== ""){
            binArr.push(localStorage.getItem("bin"))
        }
        // meals localStorage is loaded
        let dataFav = getStorage(localStorage.getItem("bookmarks"));    
        const id = e.target.getAttribute('data-id')

        for(let i=0; i<dataFav.length; i++){

            if(Object.values(dataFav[i]).indexOf(id)!== -1){
                //deleted favorite meals are load in a bin localStorage in order to know which ones are been deleted
                let new_item = JSON.stringify(dataFav[i])
                //we'll need later to split correctly in order to get every object from the localStorage
                binArr.push(new_item + "  ");
                localStorage.setItem("bin",binArr)
                // alert delete message
                if (window.confirm("Are you sure?")){
                //meal is deleted from favorites localStorage
                    dataFav.splice(i, 1);
                }
            }
        }
        dataFav = dataFav.map(element => JSON.stringify(element) + "  ");
        localStorage.setItem('bookmarks', dataFav)
        const addFavorite = getStorage(localStorage.getItem("bookmarks"));
        this.setState({addFavorite});
    }

    uploadBookmarks = async () =>{
        const addFavorite = getStorage(localStorage.getItem("bookmarks"));
        await this.setState({addFavorite});
    }
    // grid display favorite localStorage 
    displayFavorites (arr, showDetails, removeFavorite){
        if (arr.length > 0){

            return (arr.map((el,i) => (
                <figure key = {i}className="image-content">    
                    <img className="image" src={el.img} alt=""/>
                    <figcaption className="text-content">
                        <h2>{el.name}</h2>
                    </figcaption>
                    <div className="buttonAddRemove">
                        <button data-id={el.id} onClick={showDetails}>Details</button>
                        <button data-id={el.id} onClick={removeFavorite}>Delete</button>
                    </div>
                </figure>                   
            )))
        }
    
        else{
            return <div className="alertMessage"><h3 style={{color:"white", fontSize:"2rem"}}>You don't have any favorites...</h3></div>
        }
    }

    render() {
        return(
            <div className ="bookmark-wrapper">
                <NavBar backgroundColor = "white"/>
                <a href="/">
                    <img style={{display: this.state.display}} className='prev-icon' src={ previous } alt ="previous icon" />
                </a> 
                <div className = "bookmarks-content" onScroll = { this.isDisplayPrevIcon } >
                    { this.displayFavorites (this.state.addFavorite, this.showDetails, this.removeFavorite) }                    
                </div>    
                <Footer />   
            </div>      
        )
    }
}

export default Bookmarks;


