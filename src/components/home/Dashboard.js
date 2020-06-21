import React, { Component } from 'react';
import axios from 'axios'
import Newmap from './Newmap'
import Chartpage from '../pages/Chartpage'
import Adshome from '../ads/Adshome'
import AvgChart from '../pages/AvgChart'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { arr: null,geo:null,graph_data:null,pageid:null,adscountry:null,token:null,states_name:null,country_states:'All',disp_state:'Please click on States button to see targeted states'};
       
      }
    async componentDidMount(){
        let token=localStorage.getItem('Token')
        let new_page=window.location.href.split("=",2)[1]
        console.log(new_page)
        this.setState({pageid:new_page})
        this.geo_data(token,new_page)
        this.graph_data(token,new_page)
        this.get_country(token,new_page)
        
        await axios.get('http://45.77.150.129/secondtry/1',{
            headers:{
                'Authorization':`Bearer ${token}`,
                'productid':new_page,
                'country':'ALL'
            }
        })
        .then(res =>{
            console.log(res.data.status)
            this.setState(
                { arr: res.data.status,token:token}
               
            )
            
        })
        
        .catch(err => {
            console.log(err)
        })
    }
    geo_data= async (token,new_page)=>{
       await axios.get('http://45.77.150.129/geo/',{
              headers:{
                'Authorization':`Bearer ${token}`,
                'productid':new_page,
              }
            })
            .then(res =>{
                this.setState({geo:res.data})
            })
    }
    graph_data= async (token,new_page)=>{
        await axios.get('http://45.77.150.129/graph/',{
              headers:{
                'Authorization':`Bearer ${token}`,
                'productid':new_page,
              }
            })
            .then(res =>{
                this.setState({graph_data:res.data})
            })
    }
    get_country= async (token,new_page)=>{
        await axios.get('http://45.77.150.129/getcountry/',{
            headers:{
              'Authorization':`Bearer ${token}`,
              'productid':new_page,
              'country':this.state.country_states
            }
          })
          .then(res =>{
              if(this.state.country_states != 'All'){
                this.setState({states_name:res.data.status})
              }
              else{
                this.setState({adscountry:res.data})
              }
              
          })
    }
 
    render() {
        return (
            this.state.arr !== null && this.state.graph_data !==null ?
                <div>
                <div className="right_col" role="main">
                    {/* top tiles */}
                    <div className="row" style={{display: 'inline-block', width:'100%'}}>
                    <div className="tile_count">
                        <div className="col-md-2 col-sm-2  tile_stats_count">
                        <span className="count_top"><i className="fa fa-instagram" /> Instagram Followers</span>
                        <div  className={this.state.arr.insatgram_tracker.instagram_status === "Increment" ? "count green" : "count red"}>{this.state.arr === '' ? 'None' : this.state.arr.socialmedia.instagram_followers}</div>
                        <span  className="count_bottom" ><i className={this.state.arr.insatgram_tracker.instagram_status === "Increment" ? "green" : "red"}><i className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "fa fa-sort-asc" : "fa fa-sort-desc"} />{this.state.arr === '' ? 'None' : this.state.arr.insatgram_tracker.new_followers} </i>{this.state.arr === '' ? 'None' : this.state.arr.facebook_tracker.facebook_status} From Yesterday</span>
                        </div>
                        <div className="col-md-2 col-sm-2  tile_stats_count">
                        <span className="count_top"><i className="fa fa-facebook-square" /> Facebook Likes</span>
                        <div className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "count green" : "count red"}>{this.state.arr === '' ? 'None' : this.state.arr.socialmedia.facebook_like}</div>
                        <span  className="count_bottom" ><i className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "green" : "red"}><i className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "fa fa-sort-asc" : "fa fa-sort-desc"} />{this.state.arr === '' ? 'None' : this.state.arr.facebook_tracker.new_likes} </i>{this.state.arr === '' ? 'None' : this.state.arr.facebook_tracker.facebook_status} From Yesterday</span>
                        </div>
                        <div className="col-md-2 col-sm-2  tile_stats_count">
                        <span className="count_top"><i className="fa fa-cloud-upload" />This Week New Ads</span>
                        <div className={this.state.graph_data.curr_ad_status === "Increment" ? "count green" : "count red"}>{this.state.graph_data === null ? 'None' : this.state.graph_data.curr_week_ads}</div>
                        <span className="count_bottom"><i className={this.state.graph_data.curr_ad_status === "Increment" ? "green" : "red"}><i className={ this.state.graph_data.curr_ad_status === "Increment" ? "fa fa-sort-asc" : "fa fa-sort-desc"} />{this.state.graph_data === null ? 'None' :this.state.graph_data.prev_week_ad} </i> From last Week</span>
                        </div>
                        <div className="col-md-2 col-sm-2  tile_stats_count">
                        <span className="count_top"><i className="fa fa-cloud-upload" />Avg. Monthly Ads Upload</span>
                        <div className="count green">{this.state.graph_data.avg.avg_monthly_ad}</div>
                        </div>
                        <div className="col-md-2 col-sm-2  tile_stats_count">
                        <span className="count_top"><i className="fa fa-thumbs-up" />Top Platform Target</span>
                        <div className="count green">{this.state.graph_data.platforms.top_platform}</div>
                        </div>
                        <div className="col-md-2 col-sm-2  ">
                        <div className='fc-right' style={{position:'absolute',top:-30,left:100}}>
                        <a href="dashboard"><h2 style={{display:'inline-block'}}>Graph/</h2></a><a href={`/ads?page=${this.state.pageid}`}><h2 style={{display:'inline-block'}}>Ads</h2></a>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* /top tiles */}
                    <Chartpage pageid={this.state.pageid}/>
                    <br></br>
                    <div classname="row">
                        <div className="col-md-3   widget widget_tally_box">
                            <div className="x_panel fixed_height_390">
                            <div className="x_title">
                                <h2>Social Media</h2>
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
                            <h4>Ads Target Across Social Media</h4>
                            <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F137253%2Fisolated%2Fpreview%2F90dd9f12fdd1eefb8c8976903944c026-facebook-icon-logo-by-vexels.png&f=1&nofb=1'/><h2 style={{marginLeft:'10px',display:'inline-block'}}>Facebook</h2>
                            <div className="widget_summary">
                            
                            <div className="w_center w_55" style={{width:'250px'}}>
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.platforms.platform.facebook/this.state.graph_data.platforms.total)*100).toFixed(2))+'%'}}>
                                   
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20" style={{marginTop:'-7px'}}>
                                <span>{this.state.graph_data.platforms.platform.facebook}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                            <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2F2018-social-media-logotypes%2F1000%2F2018_social_media_popular_app_logo_instagram-512.png&f=1&nofb=1'/><h2 style={{marginLeft:'10px',display:'inline-block'}}>Instagram</h2>
                            <div className="widget_summary">
                            
                            <div className="w_center w_55" style={{width:'250px'}}>
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.platforms.platform.instagram/this.state.graph_data.platforms.total)*100).toFixed(2))+'%'}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20" style={{marginTop:'-7px'}}>
                            <span>{this.state.graph_data.platforms.platform.instagram}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                            <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs18955.pcdn.co%2Fwp-content%2Fuploads%2F2018%2F02%2Ffacebook-messenger-1.png&f=1&nofb=1'/><h2  style={{marginLeft:'10px',display:'inline-block'}}>Messenger</h2>
                            <div className="widget_summary">
                            <div className="w_center w_55" style={{width:'250px'}}>
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.platforms.platform.messenger/this.state.graph_data.platforms.total)*100).toFixed(2))+'%'}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20" style={{marginTop:'-7px'}}>
                                <span>{this.state.graph_data.platforms.platform.messenger}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                        
                        </div>
                            </div>
                        </div>
                        <div className="col-md-3   widget widget_tally_box">
                        <div className="x_panel fixed_height_390">
                            <div className="x_title">
                                <h2>Devices</h2>
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
                            <h4>Targeted Platform/Devices</h4>
                            <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fgradient-ui-1%2F512%2Fbrowser-512.png&f=1&nofb=1'/><h2  style={{marginLeft:'10px',display:'inline-block'}}>Web Browser</h2>
                            <div className="widget_summary">
                            <div className="w_center w_55" style={{width:'250px'}}>
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.ad_target.targets.webbrowser/this.state.graph_data.ad_target.total_target)*100).toFixed(2))+'%'}}>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20" style={{marginTop:'-7px'}}>
                                <span>{this.state.graph_data.ad_target.targets.webbrowser}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                            <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftalesfromthepumpkinpatch.files.wordpress.com%2F2014%2F04%2Fapple-logo-thumb.png&f=1&nofb=1'/><h2 style={{marginLeft:'10px',display:'inline-block'}}>Apple</h2>
                            <div className="widget_summary">
                            
                            <div className="w_center w_55" style={{width:'250px'}}>
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.ad_target.targets.apple/this.state.graph_data.ad_target.total_target)*100).toFixed(2))+'%'}}>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20" style={{marginTop:'-7px'}}>
                            <span>{this.state.graph_data.ad_target.targets.apple}</span>
                            </div>
                            <div className="clearfix" />
                            </div>

                            <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wccftech.com%2Fwp-content%2Fuploads%2F2014%2F10%2Fandroid-L-LOGO.png&f=1&nofb=1'/><h2 style={{marginLeft:'10px',display:'inline-block'}}>Android</h2>
                            <div className="widget_summary">
                            
                            <div className="w_center w_55" style={{width:'250px'}}>
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.ad_target.targets.android/this.state.graph_data.ad_target.total_target)*100).toFixed(2))+'%'}}>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20" style={{marginTop:'-7px'}}>
                            <span>{this.state.graph_data.ad_target.targets.android}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                        
                        </div>
                            </div>
                        </div>
                        
                        <div className="col-md-3   widget widget_tally_box">
                            <div className="x_panel ui-ribbon-container fixed_height_390" style={this.state.adscountry != null ? this.state.adscountry.status.length > 5  ? scro : {overflow:'hidden'} : {overflow:'hidden'}}>
                            <div className="ui-ribbon-wrapper">
                                <div className="ui-ribbon">
                                Countries
                                </div>
                            </div>
                            <div className="x_title">
                                <h2>Ads targeted Countries</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content"  >
                            {this.state.adscountry === null ? <div><h1>Loading</h1></div>:
                            <table className style={{width: '100%'}}>
                            <thead style={{textAlign:'left'}}><tr>
                                
                                <th style={{width:'50px',textAlign:'left'}}>
                                
                                    <p className>S No</p>
                                   
                                </th>
                                <th>
                               
                                    <p className>Targeted Countries</p>
                                   
                                </th>
                                </tr>
                                </thead>
                                    
                                    <tbody>
                                        {this.state.adscountry.status.map((val,i)=>(
                                            <tr>
                                                <td style={{width:'50px',textAlign:'center'}}>{i}</td>
                                                <td style={{textAlign:'center'}}>{val}</td>
                                                <td><button style={{fontSize:'13px'}} className='btn btn-info' onClick={(e)=>{e.preventDefault(); this.setState({country_states:val,disp_state:'Please Wait data is loading'},()=>{this.get_country(this.state.token,this.state.pageid)})}}>States</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                
                            
    }
                        </div>
                            </div>
                        </div>
                        <div className="col-md-3   widget widget_tally_box">
                            <div className="x_panel ui-ribbon-container fixed_height_390" style={this.state.states_name != null ? this.state.states_name.length > 5  ? scro : {overflow:'hidden'} : {overflow:'hidden'}}>
                            <div className="ui-ribbon-wrapper">
                                <div className="ui-ribbon">
                                States
                                </div>
                            </div>
                            <div className="x_title">
                                <h2>Ads targeted States</h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content"  >
                    {this.state.states_name === null ? <div><h3>{this.state.disp_state}</h3></div>:
                            <table className style={{width: '100%'}}>
                            <thead style={{textAlign:'left'}}><tr>
                                
                                <th style={{width:'50px',textAlign:'left'}}>
                                
                                    <p className>S No</p>
                                   
                                </th>
                                <th>
                               
                                    <p className>Targeted States</p>
                                   
                                </th>
                                <th>
                                <p className>No.Of Ads</p>
                                </th>
                                </tr>
                                </thead>
                                    
                                    <tbody style={{textAlign:'center'}}>
                                        {this.state.states_name !=null ? this.state.states_name.map((val,i)=>(
                                            <tr>
                                                <td style={{width:'50px'}}>{i}</td>
                                                <td >{val.state}</td>
                                                     <td>{val.ads}</td>
                                            </tr>
                                        )) : ''}
                                    </tbody>
                                    </table>
                                
                            
    }
                        </div>
                            </div>
                        </div>
                        </div>

                    <br/>
                    <AvgChart graph_data={this.state.graph_data}/>
                    <br/>
                    <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="row">
                        <div className="col-md-12 col-sm-12 ">
                            <div className="x_panel">
                            <div className="x_title">
                                <h2>Admin location <small>geo-presentation</small></h2>
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
                                <div className="dashboard-widget-content">
                                <div className="col-md-4 hidden-small">
                                    <h2 className="line_30">{ this.state.geo != null ? this.state.geo.admin_total :''} Admins from {this.state.geo != null ?this.state.geo.status.length : ''} countries</h2>
                                    <table className="countries_list">
                                    <tbody>
                                    {this.state.geo !==null ? this.state.geo.status.map((val,i)=>(
                                        <tr key={i}>
                                          <td style={{width: "100px"}}>{val.countryname}</td>
                                          <td>
                                              <div className="progress" style={ { height:'10px' }}>
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: String(((val.total/this.state.geo.admin_total)* 100).toFixed(2))+"%"}}>
                                   
                                    </div>
                                    </div>
                                
                                              </td>
                                         
                                         
                                    <td className="fs15 fw700 text-right" style={{width: "50px"}}>{((val.total/this.state.geo.admin_total)* 100).toFixed(2)+"%"}</td> 
                                    
                                        </tr>
                                        
                                    )): <div> Please wait data is loading</div> }
                                    
                                    </tbody>
                                    </table>
                                    <div style={colorpal}>
                                    <h3 className="line_30" style={{fontSize:"16px"}}>Map Color Discription</h3>
                                        <div style={box}>
                                            <span style={{color:'white'}}>Low</span>
                                            <span style={{float: "right",color:'white'}}>High</span>

                                        </div>
                                    </div>
                                </div>
                                <div id="world-map-gdp" className="col-md-8 col-sm-12 " style={this.state.geo === null ? {height: 330} : this.state.geo.status.length > 5 ? {height:550} : {height: 330}} >
                               {this.state.geo !==null ? <Newmap geo={this.state.geo}/> : <div> Please wait data is loading</div>}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                     
                    </div>
                    </div>
                </div>
                {/* /page content */}
                {/* footer content */}
                <footer>
                    <div className="pull-right">
                    Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
                    </div>
                    <div className="clearfix" />
                </footer>
                {/* /footer content */}
                <div style={{display:'none'}}>
                    <Adshome profile_pic={this.state.arr.page_info.profile_photo}/>
                </div>
                </div>
             
            :
            <div>Loading</div>
        );
    }
   
}
const grencol={
    color:'#1abb9c'
}
const redcol={
    color:'#e74c3c'
}
const colorpal = {
    position:'absolute',
    bottom:5,
    left:0,
    width:'400px',
    height:'50px',
    borde:'.5px solid black',
    marginBottom:"-100px"
}
const box={
    width:'300px',
    height:'20px',
    background: 'linear-gradient(to right,#00FFFF, #82CAFA, #488AC7,#1569C7,#0000A0,#151B54)'
}
const scro={
    overflow: 'scroll'
}
const innerim={
    width:'32px',
    height:'32px',
    display: 'inline-block'
}

export default Dashboard;