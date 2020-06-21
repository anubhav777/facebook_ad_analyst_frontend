import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom'
import token_genrator from '../extras/Token' 
class Sidenav extends Component {
    state={
        redirect:false
    }
    componentDidMount() {
        if(!token_genrator()){
          
            this.setState({redirect:true})
          }
    }
    render() {
        if(this.state.redirect){
            return (<Redirect to ="/login"/>)
        }
        else{
        return (
                <div className="col-md-3 left_col menu_fixed">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{border: 0}}>
                    <a href="index.html" className="site_title"><span>Rival Peek Ads</span></a>
                    </div>
                    
                    {/* /menu profile quick info */}
                    <br />
                    {/* sidebar menu */}
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                    <div className="menu_section">
                       
                        <ul className="nav side-menu">
                        <li><a><i className="fa fa-home" /> Home <span className="fa fa-chevron-down" /></a>
                            <ul className="nav child_menu">
                            <li><a href="/pages">Pages</a></li>
                          
                            </ul>
                        </li>
                        <li><a><i className="fa fa-edit" /> Compare <span className="fa fa-chevron-down" /></a>
                            <ul className="nav child_menu">
                            <li><a href="/compare">Compare page</a></li>
                           
                            </ul>
                        </li>
                      <li>  <Link onClick={()=>{localStorage.clear()}} to='/login'><a><i className="fa fa-edit" /> Logout </a></Link>
                          
                        </li>
                        </ul>
                    </div>
                    </div>
                

            
                <div className="sidebar-footer hidden-small">
                <a data-toggle="tooltip" data-placement="top" title="Settings">
                    <span className="glyphicon glyphicon-cog" aria-hidden="true" />
                </a>
                <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                    <span className="glyphicon glyphicon-fullscreen" aria-hidden="true" />
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Lock">
                    <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                    <span className="glyphicon glyphicon-off" aria-hidden="true" />
                </a>
                </div>
                {/* /menu footer buttons */}
            </div>
            </div>
        );
        }
    }
}

export default Sidenav;