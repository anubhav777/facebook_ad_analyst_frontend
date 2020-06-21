import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Verification extends Component {
    state={
        redirect:false
    }
    componentDidMount() {
        let pageref=window.location.href.split('%27',2)[1]
        console.log(pageref)
        this.send_tok(pageref)


    }
    send_tok=(token)=>{
        let data={
            'token':token
        }
        axios.post('http://45.77.150.129/verification/',data,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
            if (res.status === 200){
        
                this.setState({redirect:true})
            }
        })
    }
    render() {
        if(this.state.redirect){
            return (<Redirect to ="/login"/>)
        }
        else{
        return (
            <div>
                <div className="right_col" role="main">
                    <div className='row' >
                    <div className="col-md-12" style={{marginTop:'200px'}}>
                <div className="x_panel" style={{width:'600px',marginLeft:'400px'}} >
                    <div className="x_title">
                    <h2>Verification</h2>
                    <ul className="nav navbar-right panel_toolbox">
                        <li><a className="collapse-link"><i className="fa fa-chevron-up" /></a>
                        </li>
                        <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench" /></a>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="#">Settings 1</a>
                            </li>
                            <li><a href="#">Settings 2</a>
                            </li>
                        </ul>
                        </li>
                        <li><a className="close-link"><i className="fa fa-close" /></a>
                        </li>
                    </ul>
                    <div className="clearfix" />
                    </div>
                 
                        <div className="x_content">
                        <h2>Your account is being verified Plaease wait for a minute </h2>
                    </div>
                    
                    
                  
                    
                    
                </div>
                </div>
                    </div>
                    </div>
                
            </div>
        );
        }
    }
}

export default Verification;