
import Header from './Header';
import HomeContent from './HomeContent';
import Footer from '../../utilsComponents/Footer';



function Home(){
    
    return (
            <div className = "Home-wrapper">
                <Header/>
                <HomeContent/>
                <Footer/>
            </div>
        );
}

export default Home ;