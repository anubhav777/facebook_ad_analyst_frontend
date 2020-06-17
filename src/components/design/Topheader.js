import React, { Component } from 'react';

class Topheader extends Component {
    render() {
        return (
            <div className="top_nav">
            <div className="nav_menu">
                <div className="nav toggle">
                <a id="menu_toggle"><i className="fa fa-bars" /></a>
                </div>
                <nav className="nav navbar-nav">
                <ul className=" navbar-right">
                    <li className="nav-item dropdown open" style={{paddingLeft: 15}}>
                    <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                        John Doe
                    </a>
                    <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="javascript:;"> Profile</a>
                        <a className="dropdown-item" href="javascript:;">
                        <span className="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                        </a>
                        <a className="dropdown-item" href="javascript:;">Help</a>
                        <a className="dropdown-item" href="login.html"><i className="fa fa-sign-out pull-right" /> Log Out</a>
                    </div>
                    </li>
                    </ul>
                    </nav>
                   
            </div>
            </div>
        );
    }
}

export default Topheader;