import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './component/Dashboard';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Contextstate from './context/Contextstate';
import Rent from './component/Rent';
import Carlist from './component/Carslist';
import Listofcars from './component/Listofcars';
import Servicelist from './component/Servicelist';
import Services from './component/Services';
import PaymentStatusSuccess from './component/PaymentStatusSuccess';
import PaymentStatusFailed from './component/PaymentStatusFailed';

function App() {
  return (
      <Router>
        <Contextstate>
          <Routes>
              <Route path='/' element={<Dashboard/>}></Route>
              <Route path='/dashboard' element={<Dashboard/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>              
              <Route path='/carlist' >
                <Route path='' element={<Carlist />}></Route>
                <Route path=':state' element={<Listofcars/>}></Route>
                <Route path=':state/:rent' element={<Rent />}></Route>
              </Route>
              <Route path='/servicelist' >
              <Route path='' element={<Servicelist />}></Route>
              <Route path=':state' element={<Services/>}></Route>              
              </Route>
              <Route path='/paymentstatussuccess' element={<PaymentStatusSuccess />}></Route>         
              <Route path='/paymentstatusfailed' element={<PaymentStatusFailed />}></Route>     
          </Routes>
        </Contextstate>
      </Router>
    );
}

export default App;
