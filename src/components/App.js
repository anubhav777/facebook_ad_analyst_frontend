import React from 'react';
import Dashboard from './/home/Dashboard'
import Topheader from './/design/Topheader'
import Sidenav from './/design/Sidenav'
import {Switch,BrowserRouter as Router, Route} from 'react-router-dom'
import Newmap from './home/Newmap'
import Login from './extras/Login';
import Userpage from './pages/Userpage'
import Adshome from './ads/Adshome'
import Comparepage from './pages/Comparepage'
function App() {
  return (
      <Router>
          <React.Fragment>
              <Switch>
              <Route exact path="/" render={(props)=>(
              <React.Fragment>
              <body className="nav-md">
              <div className="container body">
              <div className="main_container">
              <Topheader/>
              <Sidenav/>
              <Dashboard/>
            </div>
            </div>
            </body>
            </React.Fragment>
          )}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/map' component={Newmap}/>
            <Route exact path ='/pages' render={(props)=>(
              <React.Fragment>
              <body className="nav-md">
              <div className="container body">
              <div className="main_container">
              <Topheader/>
              <Sidenav/>
              <Userpage/>
            </div>
            </div>
            </body>
              </React.Fragment>
            )}/>
            <Route exact path='/ads' render={(props)=>(
               <React.Fragment>
               <body className="nav-md">
               <div className="container body">
               <div className="main_container">
               <Topheader/>
               <Sidenav/>
               <Adshome/>
               </div>
               </div></body>
               </React.Fragment>
            )}/>
            <Route exact path='/compare' render={(props)=>(
              <React.Fragment>
                  <body className="nav-md">
               <div className="container body">
               <div className="main_container">
               <Topheader/>
               <Sidenav/>
               <Comparepage/>
               </div>
               </div></body>
              </React.Fragment>

            )}/>

          
              </Switch>
          </React.Fragment>
         
         
              
              
      </Router>
    
  );
}

export default App;
