const style = {
    display :  "flex",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "space-evenly",
    background : "black",
    color : "white",
    fontSize : "1.3rem",
    height : "12vh",
    width:"100%",
}
function Footer(){
    return(
        <footer style={style} >
            <span style={{fontFamily:"Ananda"}}>Foody</span>   
            <span >&copy;Foody 2021 all rights reserved</span>
        </footer>
    ) 
}

export default Footer