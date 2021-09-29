import axios from 'axios';
import React,{ Component } from 'react';
import Footer from '../../utils/utilsComponents/Footer';
import previous from '../../assets/images/previous.svg';
import '../../assets/styleSheets/Details.scss';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            height:window.innerHeight /1.5,
            width: window.innerWidth /1.1,
            lien : "",
            image: "",
            text: "",
            title: "",
         };
         this.resizevideo();
         this.loadContent=this.loadContent.bind(this);
    }
    // modification width pour rendre responsive la video
    resizevideo = () =>{
        window.addEventListener('resize', ()=>{
            this.setState({height:window.innerHeight/1.5})
            this.setState({width:window.innerWidth/1.1})
        });  
    }

    displayVideo = (arg)=>{
        if(arg !== ""){
            return<iframe src = { arg } width={this.state.width} frameBorder="0" height={ this.state.height } allowFullScreen={true} title = 'recipe video'></iframe>   
        }
        return<div className="displayVideoInfo"><h2 >no video available</h2></div>
    } 

   async loadContent(){
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ this.props.match.params.id }`)
        const detailsId = response.data.meals[0];
        const { strMealThumb,strInstructions,strMeal } = detailsId;
        let lien = detailsId.strYoutube;
        lien = lien.replace(/watch\?v=/g,"embed/");
        await this.setState({ lien,image:strMealThumb,text:strInstructions, title:strMeal });
    }

    async componentDidMount(){
         this.loadContent();   
    }

    render() {
        return (
            <div className='details-wrapper'>
                <div className='detailsContent'>
                    <a href="/">
                        <img alt ="previous" className='previous-icon' src={ previous}  />
                    </a>
                    { this.displayVideo(this.state.lien) }
                    <figure className='details' >
                    <img  alt ="mealimage" src={ this.state.image } className='imageDetails'/>
                        <figcaption className = "figCaption">
                            <h2>{ this.state.title }</h2> 
                        </figcaption>
                    </figure>
                    <p>{ this.state.text }</p>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Details;