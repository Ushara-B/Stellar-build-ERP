import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UserManage from './Pages/UserManage'
import AllUsers from './Pages/AllUsers';
import AddUsers from './Pages/AddUsers';
import NoPages from './Pages/NoPages';
import Supplier from './Pages/Supplier';





function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>

        <Route index element = {<Home/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/user' element = {<UserManage/>}/>
        <Route path = '/user/addusers' element = {<AddUsers/>}/>
        <Route path = '/user/allusers' element = {<AllUsers/>}/>
        <Route path = '/supplier' element = {<Supplier/>}/>
        <Route path = '*' element = {<NoPages/>}/>





      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
