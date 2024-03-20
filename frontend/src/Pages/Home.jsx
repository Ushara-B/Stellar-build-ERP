import AppBar from '../Components/Appbar';
import Drawer from '../Components/menu';

function Home(){
    return(
        <div>
  
        <AppBar />
        <Drawer />

        <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
            <h1>home dashboard</h1>
        </div>


        </div>


    );

}
export default Home