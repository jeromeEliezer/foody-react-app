
const style = {
    display :  "flex",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "center",
    background : "black",
    color : "white",
    fontSize : "1rem",
    height : "12vh",
    width:"100%"
}

function Footer(){
    return(
        <footer style={style}>
            <span>Foody</span>   
            <span>&copy;Foody 2021 all rights reserved</span>
        </footer>
    ) 
}

export default Footer