import React, { Component } from 'react';
import profile_image from '../user.png';
import getStorage from '../utilsComponents/utils_functions';

const style={
    position : "fixed",
    overflow:"hidden",
    height : '100vh',
    left:0,
    display : "flex",
    justifyContent : "center",
    // paddingTop : "30%",
    // alignItems : "center",
    background:"white",
    zIndex : 20,
    transition : "0.5s ease-out"
}

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
        profile_block_width:0,
        profile_block_active : false,
        profile_icon_block_position : "absolute",
        profile_icon_block_top : "30%",
        profile_icon_block_left : "5%"

       }
    }
   
     profile_block_active = async()=> {
        await this.setState({ profile_block_active : !this.state.profile_block_active });
        
        if(this.state.profile_block_active){

            this.setState( { profile_block_width : "100vw" } )
            this.setState( { profile_icon_block_position : "fixed" } );
            this.setState({profile_icon_block_top:"5%"})
            this.setState({profile_icon_block_left : "37%"})
        }

        else{
            this.setState({profile_icon_block_left : "7%"})
            this.setState({profile_icon_block_top:"30%"})
            this.setState( { profile_block_width : 0 } );
            this.setState( { profile_icon_block_position : "absolute"} );
        }
        
    }

    render() {
        return (
            <React.Fragment>
                <div className='profile-block' style={ { position: this.state.profile_icon_block_position, top: this.state.profile_icon_block_top, left: this.state.profile_icon_block_left}}>
                    <img  src={profile_image} onClick={this.profile_block_active} alt="avatar" />
                    <label htmlFor="file-upload">choose a pic</label>
                    <input type="file"  id='file-upload' accept="image/*"/>
                </div>

                <div style={ { ...style, width: this.state.profile_block_width} }>
                    <MyFavorites/>
                    
                </div>
            </React.Fragment>  
        );
    }
}


class MyFavorites extends Component{
    constructor(props){
        super(props);
        this.state={
            items_number : 0,
            items : [],
            localStorage_changed : false
        }
    }

    componentDidMount(){
        const items = getStorage(localStorage.getItem("bookmarks"));
        console.log(items)
        this.setState({items});
        this.setState({ items_number : items.length });
    }

    componentDidUpdate(prevPros, prevState){
        const items = getStorage(localStorage.getItem("bookmarks"));
        if(items.length !== this.state.items_number){
            this.setState({items});
            this.setState({ items_number : items.length });
        }
    }

    render(){
        return(
            <div className='history'>
                <p>You have : {this.state.items_number} favorite(s)</p>
                <ul>
                    {this.state.items.map(el => (
                        <a href={`/details/${el.id}`}>
                            <li>{el.name}</li>
                        </a>    
                    ))}
                </ul>
                <Deleted_Items_From_Bookmarks/>
            </div>
        )
    }
}



class Deleted_Items_From_Bookmarks extends Component{

    constructor(){
        super()
         this.state = {

             deleted_items : [],
             number : 0
         }
    }
    componentDidMount(){
        const deleted_items = getStorage(localStorage.getItem("bin"));
        this.setState({deleted_items});
        this.setState({number : deleted_items.length})
    }

    componentDidUpdate(){
        const deleted_items = getStorage(localStorage.getItem("bin"));
        if(deleted_items.length !== this.state.number){
            this.setState({deleted_items});
            this.setState({ number : deleted_items.length });
        }
    }

    render(){
        return(
            <div className='history'>
                <p>You deleted {this.state.number} item(s)</p>
                <ul>
                    {this.state.deleted_items.map(el =>(
                        <a href={`/details/${el.id}`}>
                            <li>{el.name}</li>
                        </a>
                    ))}
                </ul>
            </div>
        )
    }
}


export default Profile;