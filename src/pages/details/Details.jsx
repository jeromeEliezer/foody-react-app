import axios from 'axios';
import React,{Component} from 'react';
import Footer from '../../utilsComponents/Footer'
import previous from '../../previous.svg'



class Details extends Component {
    constructor(props) {

        super(props);
        this.state = { 
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
            this.setState({width:window.innerWidth/1.1})
        });  
    }
   async loadContent(){
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.id}`)

        
    console.log(response)
    const detailsId = response.data.meals[0];
   const {strMealThumb,strInstructions,strMeal} = detailsId;







let lien = detailsId.strYoutube
lien = lien.replace(/watch\?v=/g,"embed/")
await this.setState({lien,image:strMealThumb,text:strInstructions, title:strMeal});
        
    }
async componentDidMount(){

    this.loadContent();   
}

render() {
    return (
        
        <div className='details-wrapper'>
                 <h2>{this.state.title}</h2> 
        <div className='detailsContent'>
        <a href="/">
            <img className='previous-icon' src={previous} />
                <img src={this.state.image} className='imageDetails'></img>
        </a>
            <iframe src = {this.state.lien}  width={this.state.width} frameborder="0" height="259px"></iframe>
            <div className='details' >
                <p>{this.state.text}</p>
            </div>
        </div>
        <Footer/>
        </div>
        
        
    );
    }
}


export default Details;