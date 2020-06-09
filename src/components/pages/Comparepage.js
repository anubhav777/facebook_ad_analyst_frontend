import React, { Component } from 'react';
import axios from 'axios'
class Comparepage extends Component {
    state={
        newarr:[],
        token:null,
        first:'',
        second: '',
        firstarr:null,
        secondarr:null
    }
    componentDidMount(){
        let token=localStorage.getItem('Token')
        this.userpages(token)
    }
    userpages=(token)=>{
        axios.get('http://127.0.0.1:8000/addpage/1',{
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        })
        .then(res =>{
            console.log(res.data)
            this.setState(
                { newarr:res.data.status,token:token }
            )
        })

    }

    adsdata=(params)=>{
        if (params=='first') {
       let prodid=this.state.first
      
       this.getdata(prodid,'first')
        
    }
    else {
        let prodid=this.state.second
        this.getdata(prodid,'second')
     
    }
    }
    changes=(e)=>{
        this.setState(
        { [e.target.name]:e.target.value }
    )
    }
    getdata=(id,params)=>{
        let dats=''
        axios.get('http://127.0.0.1:8000/compare/',{
            headers:{
                'Authorization':`Bearer ${this.state.token}`,
                'productid':id,
                
            }
        })
        .then(res=>{
            if(params === 'first'){
                this.setState(
                { firstarr:res.data}
            )
            }
            else {
            this.setState({
                secondarr:res.data
            })
        }
            
           
        })
     
    }
    resetarr=(params)=>{
        if(params == 'first'){
            this.setState({firstarr:null})
        }
        else{
            this.setState({secondarr:null})
        }
    }
    render() {
        return (
            this.state.newarr === null ? <div>Loading</div> :
                <div className="right_col" role="main">
                <div className>
                    <div className="page-title">
                    <div className="title_left">
                    <div className="col-md-9 col-sm-9 ">
    <select name='first' onChange={this.changes} className="form-control" style={{display:'inline-block',width:'187.38px'}}>
        <option>Default</option>
        {this.state.newarr.map((val)=>( 
            <option value={val.productid.page_id}>{val.productid.page_name}</option>
        ))}
    </select><button className='btn btn-info' style={{marginLeft:'10px'}} onClick={(e)=>{e.preventDefault(); this.adsdata('first')}}>
        Update</button><button className='btn btn-danger' style={this.state.firstarr!=null ? {marginLeft:'10px'} : {display:'none'}} onClick={(e)=>{e.preventDefault(); this.resetarr('first')}}>Remove</button>

  </div>
                    </div>
                    <div className="title_right">
                    <div className="col-md-9 col-sm-9 ">
                    <select name='second' onChange={this.changes} className="form-control" style={{marginLeft:'64px',display:'inline-block',width: '187.38px'}} >
                    <option>Default</option>
        {this.state.newarr.map((val)=>(
            <option value={val.productid.page_id}>{val.productid.page_name}</option>
        ))}
    </select> <button className='btn btn-info' style={{marginLeft:'10px'}} onClick={(e)=>{e.preventDefault(); this.adsdata('second')}}>Update</button><button className='btn btn-danger' style={this.state.secondarr!=null ? {marginLeft:'10px'} : {display:'none'}} onClick={(e)=>{e.preventDefault(); this.resetarr('second')}}>Remove</button>

  </div>
                    </div>
                    </div>
                    <div className="clearfix" />
                    <div className="row" style={{display: 'block'}}>
                    <div className="col-md-6 col-sm-6  ">
                        <div className="x_panel">
                        <div className="x_title">
                        {this.state.firstarr != null ? 
                        <h2 >
                        <img  style={{width:'42px',
                height:'42px',
                borderRadius:'50%',
                objectFit:'cover',
                        verticalAlign:'middle'}} src={this.state.firstarr.status.page_info.profile_photo}/> {this.state.firstarr.status.page_name}</h2>
                : ''}
                            <ul className="nav navbar-right panel_toolbox">
                            <li><a className="collapse-link"><i className="fa fa-chevron-up" /></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench" /></a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Settings 1</a>
                                <a className="dropdown-item" href="#">Settings 2</a>
                                </div>
                            </li>
                            <li><a className="close-link"><i className="fa fa-close" /></a>
                            </li>
                            </ul>
                            <div className="clearfix" />
                        </div>
                        <div className="x_content">
                       
                  
                            <div className="table-responsive">
                            <table className="table table-striped jambo_table bulk_action">
                                <thead>
                                <tr className="headings">
                                   
                                    <th className="column-title"># </th>
                                    <th className="column-title">Titles </th>
                                    <th className="column-title">Discription </th>
                                   
                                </tr>
                                </thead>
                             
                                    {this.state.firstarr!=null ? 
                                       <tbody>
                                <tr className="even pointer">
                                    <td>1</td>
                                    <td>Page Created</td>
                                    <td>{this.state.firstarr.status.page_info.page_created.split(',',2)[0]}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                        <td>2</td>
                                    <td>Total active ads</td>
                                    <td>{this.state.firstarr.active_ads}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>3</td>
                                    <td>FB Likes</td>
                                    <td>{this.state.firstarr.status.socialmedia.facebook_like}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                    <td>4</td>
                                    <td>Insta Followers</td>
                                    <td>{this.state.firstarr.status.socialmedia.instagram_followers}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>5</td>
                                    <td>Average Monthly Ads</td>
                                    <td>{this.state.firstarr.avg.avg_monthly_ad}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                    <td>6</td>
                                    <td>No of Admins</td>
                                    <td>{this.state.firstarr.total_admin}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>7</td>
                                    <td>Top Social Media Target</td>
                                    <td>{this.state.firstarr.top_data.platforms.top_platform}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                    <td>8</td>
                                    <td>Top Platform Target</td>
                                    <td>{this.state.firstarr.top_data.ad_target.top_device}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>10</td>
                                    <td>Average Growth/Decline of FB Like</td>
                                    <td>{this.state.firstarr.avg.avg_fb_weekly}{this.state.firstarr.avg.avg_fb_weekly ? <i className='success fa fa-long-arrow-up' style={{marginLeft:'5px',color:'green'}}/>  : <i className='error fa fa-long-arrow-down' style={{marginLeft:'5px',color:'red'}} />}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                        <td>11</td>
                                    <td>Average Growth/Decline of Insta Followers</td>
                                    <td>{this.state.firstarr.avg.avg_insta_weekly} {this.state.firstarr.avg.avg_insta_weekly ? <i className='success fa fa-long-arrow-up' style={{marginLeft:'5px',color:'green'}}/>  : <i className='error fa fa-long-arrow-down' style={{marginLeft:'5px',color:'red'}}/>}</td>
                                    </tr>
                                    <tr className="even pointer">
                                    <td>12</td>
                                    <td>Page Name changed</td>
                                    <td>{this.state.firstarr.status.page_info.page_name_changed}</td>
                                    </tr>
                                    </tbody>
    :<tbody><tr></tr></tbody>}
                                
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6  ">
                        <div className="x_panel">
                        <div className="x_title">
                        {this.state.secondarr != null ? 
                        <h2 >
                        <img  style={{width:'42px',
                height:'42px',
                borderRadius:'50%',
                objectFit:'cover',
                        verticalAlign:'middle'}} src={this.state.secondarr.status.page_info.profile_photo}/> {this.state.secondarr.status.page_name}</h2>
                : ''}
                            <ul className="nav navbar-right panel_toolbox">
                            <li><a className="collapse-link"><i className="fa fa-chevron-up" /></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench" /></a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Settings 1</a>
                                <a className="dropdown-item" href="#">Settings 2</a>
                                </div>
                            </li>
                            <li><a className="close-link"><i className="fa fa-close" /></a>
                            </li>
                            </ul>
                            <div className="clearfix" />
                        </div>
                        <div className="x_content">
                            
                            <div className="table-responsive">
                            <table className="table table-striped jambo_table bulk_action">
                                <thead>
                                <tr className="headings">
                                <th className="column-title"># </th>
                                    <th className="column-title">Titles </th>
                                    <th className="column-title">Discription </th>
                                </tr>
                                </thead>
                                {this.state.secondarr!=null ? 
                                       <tbody>
                                <tr className="even pointer">
                                    <td>1</td>
                                    <td>Page Created</td>
                                    <td>{this.state.secondarr.status.page_info.page_created.split(',',2)[0]}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                        <td>2</td>
                                    <td>Total active ads</td>
                                    <td>{this.state.secondarr.active_ads}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>3</td>
                                    <td>FB Likes</td>
                                    <td>{this.state.secondarr.status.socialmedia.facebook_like}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                    <td>4</td>
                                    <td>Insta Followers</td>
                                    <td>{this.state.secondarr.status.socialmedia.instagram_followers}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>5</td>
                                    <td>Average Monthly Ads</td>
                                    <td>{this.state.secondarr.avg.avg_monthly_ad}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                    <td>6</td>
                                    <td>No of Admins</td>
                                    <td>{this.state.secondarr.total_admin}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>7</td>
                                    <td>Top Social Media Target</td>
                                    <td>{this.state.secondarr.top_data.platforms.top_platform}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                    <td>8</td>
                                    <td>Top Platform Target</td>
                                    <td>{this.state.secondarr.top_data.ad_target.top_device}</td>
                                    </tr>
                                    <tr className="even pointer">
                                        <td>9</td>
                                    <td>Average Growth/Decline of FB Like</td>
                                    <td>{this.state.secondarr.avg.avg_fb_weekly}{this.state.secondarr.avg.avg_fb_weekly ? <i className='success fa fa-long-arrow-up' style={{marginLeft:'5px',color:'green'}}/>  : <i className='error fa fa-long-arrow-down' style={{marginLeft:'5px',color:'red'}} />}</td>
                                    </tr>
                                    <tr className="odd pointer">
                                        <td>10</td>
                                    <td>Average Growth/Decline of Insta Followers</td>
                                    <td>{this.state.secondarr.avg.avg_insta_weekly} {this.state.secondarr.avg.avg_insta_weekly ? <i className='success fa fa-long-arrow-up' style={{marginLeft:'5px',color:'green'}}/>  : <i className='error fa fa-long-arrow-down' style={{marginLeft:'5px',color:'red'}}/>}</td>
                                    </tr>
                                    <tr className="even pointer">
                                    <td>11</td>
                                    <td>Page Name changed</td>
                                    <td>{this.state.secondarr.status.page_info.page_name_changed}</td>
                                    </tr>
                                    </tbody>
    :<tbody><tr></tr></tbody>}
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


        );
    }
}

export default Comparepage;