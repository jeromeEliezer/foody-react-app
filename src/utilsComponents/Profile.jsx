import React, { Component } from 'react';
import profile_image from '../user.png';
import getStorage from '../utilsComponents/utils_functions';
import closeIcon from '../../src/close.svg';

const history_items_list_style={

        position : "fixed",
        overflow:"hidden",
        height : '100vh',
        left:0,
        display : "flex",
        justifyContent : "center",
        background:"white",
        zIndex : 10,
        transition : "0.1s ease-out"
}

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            //properties are described by element className
            profile_block_width:0,
            profile_block_active : false,
            profile_block_zIndex : 5,
            profile_icon_block_position : "absolute",
            profile_icon_block_top : "30%",
            profile_icon_block_left : "5%",
            submit_button_display : "none",
            chooseAvatarOptionDisplay : "none",
            avatar : profile_image,
            
       }
    }

    //if an avatar's already been set in the last session
    setAvatar = async()=>{
        if(localStorage.getItem('avatar') !== null){
            
            const avatar = localStorage.getItem('avatar');
            await this.setState({ avatar : avatar });
            return
          }
    }

    componentDidMount(){
        this.setAvatar();

    }
   
     profile_block_active = ()=> {
        
            this.setState({ chooseAvatarOptionDisplay : "block" });
            this.setState({ profile_block_width : "100vw" });
            this.setState({ profile_block_zIndex : 20 });
            this.setState({ profile_icon_block_position : "fixed" });
            this.setState({ profile_icon_block_top:"5%" })
            this.setState({ profile_icon_block_left : "40%"} )
    }

    profile_block_closed = () =>{


        this.setState({ submit_button_display : "none" });

        this.setState({ profile_block_zIndex : 5 });

        this.setState({ chooseAvatarOptionDisplay : "none" });
        this.setState({ profile_icon_block_left : "7%"})
        this.setState({ profile_icon_block_top:"30%"})
        this.setState({ profile_block_width : 0 } );
        this.setState({ profile_icon_block_position : "absolute"} );
    }
    
    submit_active = ()=>{


            setTimeout(() => this.setState({ submit_button_display : "block"  }), 1000);
        
    }

    load_avatar =  (e)=>{
        e.preventDefault();
        this.setState({ submit_button_display : "none" });
        const avatar_file = e.target.elements.avatar.files[0];
        let fileReader =  new FileReader()
       
        //we need to ckeck if the user has selected a file
        if(avatar_file){

            //the selected file is encoded in Base64
            fileReader.readAsDataURL(avatar_file);

            fileReader.addEventListener('load',async()=>{
                const avatar_dataUrl = fileReader.result;
                localStorage.setItem('avatar', avatar_dataUrl)
                const avatar = localStorage.getItem('avatar')
                this.setState({ avatar});
            })
        }
        // this.setState({ avatar : e.target.elements.avatar.value })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit = { this.load_avatar } className='profile-block' style={{ position: this.state.profile_icon_block_position, top: this.state.profile_icon_block_top, left: this.state.profile_icon_block_left, zIndex : this.state.profile_block_zIndex }} encType='multipart/form-data'>
                    <img  src= { this.state.avatar } onClick= { this.profile_block_active } alt="avatar" />
                    <label style={{ display: this.state.chooseAvatarOptionDisplay }}   htmlFor="file-upload">choose</label>
                    <input style={{ display: this.state.chooseAvatarOptionDisplay }} type="file"  name='avatar' id='file-upload'  onClick ={ this.submit_active } accept="image/*"/>
                    <input type="submit" value='validate' style={{ display : this.state.submit_button_display }}/>
                </form>

                <div className='history-items-list' style={{ ...history_items_list_style, width: this.state.profile_block_width }}>
                    <img className= "close-icon" src={closeIcon} alt="close-icon" onClick={ this.profile_block_closed } />
                    <MyFavorites/>
                    <Deleted_Items_From_Bookmarks/>
                </div>
            </React.Fragment>  
        );
    }
}

// ••••••••••••••••••••••••••••••••••
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
             <div className= "history-content-wrapper">
                <p>You have { this.state.items_number } favorite(s)</p>
                    <ul className='history'>
                        { this.state.items.map(el => (
                            <a key={el.id}href={`/details/${ el.id }`}>
                                <li>{ el.name }</li>
                            </a>    
                        ))}
                    </ul>
             </div>
        )
    }
}

// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••@@
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
        this.setState({ deleted_items });
        this.setState({ number : deleted_items.length })
    }

    componentDidUpdate(){
        const deleted_items = getStorage(localStorage.getItem("bin"));
        if(deleted_items.length !== this.state.number){
            this.setState({ deleted_items });
            this.setState({ number : deleted_items.length });
        }
    }

    render(){
        return(
            <div className= 'history-content-wrapper'>
                <p>You deleted { this.state.number } item(s)</p>
                    <ul className='history'>
                        {this.state.deleted_items.map(el =>(
                            <a key={el.id} href={ `/details/${el.id}`}>
                                <li>{ el.name }</li>
                            </a>
                        ))}
                    </ul>
             </div>
        )
    }
}


export default Profile;