import React, { Component } from 'react';
import axios from 'axios'
import Newmap from './Newmap'
import Chartpage from '../pages/Chartpage'
import Adshome from '../ads/Adshome'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { arr: null,geo:null,graph_data:null,pageid:null,adscountry:null,token:null};
       
      }
    async componentDidMount(){
        let token=localStorage.getItem('Token')
        let new_page=window.location.href.split("=",2)[1]
        console.log(new_page)
        this.setState({pageid:new_page})
        this.geo_data(token,new_page)
        this.graph_data(token,new_page)
        this.get_country(token,new_page)
        
        await axios.get('http://127.0.0.1:8000/secondtry/1',{
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
       await axios.get('http://127.0.0.1:8000/geo/',{
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
        await axios.get('http://127.0.0.1:8000/graph/',{
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
        await axios.get('http://127.0.0.1:8000/getcountry/',{
            headers:{
              'Authorization':`Bearer ${token}`,
              'productid':new_page,
              'country':'ALL'
            }
          })
          .then(res =>{
              this.setState({adscountry:res.data})
          })
    }
 
    render() {
        return (
            this.state.arr !== null && this.state.graph_data !==null ?
                <div>
                <div className="right_col" role="main">
                    {/* top tiles */}
                    <div className="row" style={{display: 'inline-block'}}>
                    <div className="tile_count">
                        <div className="col-md-3 col-sm-4  tile_stats_count">
                        <span className="count_top"><i className="fa fa-instagram" /> Instagram Followers</span>
                        <div  className={this.state.arr.insatgram_tracker.instagram_status === "Increment" ? "count green" : "count red"}>{this.state.arr === '' ? 'None' : this.state.arr.socialmedia.instagram_followers}</div>
                        <span  className="count_bottom" ><i className={this.state.arr.insatgram_tracker.instagram_status === "Increment" ? "green" : "red"}><i className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "fa fa-sort-asc" : "fa fa-sort-desc"} />{this.state.arr === '' ? 'None' : this.state.arr.insatgram_tracker.new_followers} </i>{this.state.arr === '' ? 'None' : this.state.arr.facebook_tracker.facebook_status} From Yesterday</span>
                        </div>
                        <div className="col-md-3 col-sm-4  tile_stats_count">
                        <span className="count_top"><i className="fa fa-facebook-square" /> Facebook Likes</span>
                        <div className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "count green" : "count red"}>{this.state.arr === '' ? 'None' : this.state.arr.socialmedia.facebook_like}</div>
                        <span  className="count_bottom" ><i className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "green" : "red"}><i className={this.state.arr.facebook_tracker.facebook_status === "Increment" ? "fa fa-sort-asc" : "fa fa-sort-desc"} />{this.state.arr === '' ? 'None' : this.state.arr.facebook_tracker.new_likes} </i>{this.state.arr === '' ? 'None' : this.state.arr.facebook_tracker.facebook_status} From Yesterday</span>
                        </div>
                        <div className="col-md-3 col-sm-4  tile_stats_count">
                        <span className="count_top"><i className="fa fa-cloud-upload" />This Week New Ads</span>
                        <div className={this.state.graph_data.curr_ad_status === "Increment" ? "count green" : "count red"}>{this.state.graph_data === null ? 'None' : this.state.graph_data.curr_week_ads}</div>
                        <span className="count_bottom"><i className={this.state.graph_data.curr_ad_status === "Increment" ? "green" : "red"}><i className={ this.state.graph_data.curr_ad_status === "Increment" ? "fa fa-sort-asc" : "fa fa-sort-desc"} />{this.state.graph_data === null ? 'None' :this.state.graph_data.prev_week_ad} </i> From last Week</span>
                        </div>
                        <div className="col-md-3 col-sm-4  tile_stats_count">
                        <span className="count_top"><i className="fa fa-thumbs-up" />Top Platform Target</span>
                        <div className="count green">{this.state.graph_data.platforms.top_platform}</div>
                        </div>
                        

                    </div>
                    </div>
                    {/* /top tiles */}
                    <Chartpage pageid={this.state.pageid}/>
                    <br></br>
                    <div className="row">
                    <div className="col-md-4 col-sm-4 ">
                        <div className="x_panel tile fixed_height_320">
                        <div className="x_title">
                            <h2>App Versions</h2>
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
                            <h4>App Usage across versions</h4>
                            <div className="widget_summary">
                            <div className="w_left w_25">
                                <span>Facebook</span>
                            </div>
                            <div className="w_center w_55">
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.platforms.platform.facebook/this.state.graph_data.platforms.total)*100).toFixed(2))+'%'}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20">
                                <span>{this.state.graph_data.platforms.platform.facebook}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                            <div className="widget_summary">
                            <div className="w_left w_25">
                                <span>Instagram</span>
                            </div>
                            <div className="w_center w_55">
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.platforms.platform.instagram/this.state.graph_data.platforms.total)*100).toFixed(2))+'%'}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20">
                            <span>{this.state.graph_data.platforms.platform.instagram}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                            <div className="widget_summary">
                            <div className="w_left w_25">
                                <span>Messenger</span>
                            </div>
                            <div className="w_center w_55">
                                <div className="progress">
                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width:String(((this.state.graph_data.platforms.platform.messenger/this.state.graph_data.platforms.total)*100).toFixed(2))+'%'}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                                </div>
                            </div>
                            <div className="w_right w_20">
                                <span>{this.state.graph_data.platforms.platform.messenger}</span>
                            </div>
                            <div className="clearfix" />
                            </div>
                        
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 ">
                        <div className="x_panel tile fixed_height_320 overflow_hidden"  style={scro}>
                        <div className="x_title">
                            <h2>Device Usage</h2>
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
                        <div className="x_content" >
                            {this.state.adscountry === null ? <div><h1>Loading</h1></div>:
                            <table className style={{width: '100%'}}>
                            <thead><tr>
                                
                                <th style={{width:'135px'}}>
                                
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
                                                <td style={{width:'135px'}}>{i}</td>
                                                <td>{val}</td>
                                                <td><button className='btn btn-info'>Stataes</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                
                            
    }
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 ">
                        <div className="x_panel tile fixed_height_320">
                        <div className="x_title">
                            <h2>Quick Settings</h2>
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
                            <ul className="quick-list">
                                <li><i className="fa fa-calendar-o" /><a href="#">Settings</a>
                                </li>
                                <li><i className="fa fa-bars" /><a href="#">Subscription</a>
                                </li>
                                <li><i className="fa fa-bar-chart" /><a href="#">Auto Renewal</a> </li>
                                <li><i className="fa fa-line-chart" /><a href="#">Achievements</a>
                                </li>
                                <li><i className="fa fa-bar-chart" /><a href="#">Auto Renewal</a> </li>
                                <li><i className="fa fa-line-chart" /><a href="#">Achievements</a>
                                </li>
                                <li><i className="fa fa-area-chart" /><a href="#">Logout</a>
                                </li>
                            </ul>
                            <div className="sidebar-widget">
                                <h4>Profile Completion</h4>
                                <canvas width={150} height={80} id="chart_gauge_01" className style={{width: 160, height: 100}} />
                                <div className="goal-wrapper">
                                <span id="gauge-text" className="gauge-value pull-left">0</span>
                                <span className="gauge-value pull-left">%</span>
                                <span id="goal-text" className="goal-value pull-right">100%</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="row">
                        <div className="col-md-12 col-sm-12 ">
                            <div className="x_panel">
                            <div className="x_title">
                                <h2>Visitors location <small>geo-presentation</small></h2>
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
                                    <h2 className="line_30">125.7k Views from 60 countries</h2>
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
                        <div className="row">
                        {/* Start to do list */}
                        <div className="col-md-6 col-sm-6 ">
                            <div className="x_panel">
                            <div className="x_title">
                                <h2>To Do List <small>Sample tasks</small></h2>
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
                            
                            </div>
                        </div>
                        {/* End to do list */}
                        {/* start of weather widget */}
                        <div className="col-md-6 col-sm-6 ">
                            <div className="x_panel">
                            <div className="x_title">
                                <h2>Daily active users <small>Sessions</small></h2>
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
                                <div className="row">
                                <div className="col-sm-12">
                                    <div className="temperature"><b>Monday</b>, 07:30 AM
                                    <span>F</span>
                                    <span><b>C</b></span>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-4">
                                    <div className="weather-icon">
                                    <canvas height={84} width={84} id="partly-cloudy-day" />
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="weather-text">
                                    <h2>Texas <br /><i>Partly Cloudy Day</i></h2>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-12">
                                <div className="weather-text pull-right">
                                    <h3 className="degrees">23</h3>
                                </div>
                                </div>
                                <div className="clearfix" />
                                <div className="row weather-days">
                                <div className="col-sm-2">
                                    <div className="daily-weather">
                                    <h2 className="day">Mon</h2>
                                    <h3 className="degrees">25</h3>
                                    <canvas id="clear-day" width={32} height={32} />
                                    <h5>15 <i>km/h</i></h5>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="daily-weather">
                                    <h2 className="day">Tue</h2>
                                    <h3 className="degrees">25</h3>
                                    <canvas height={32} width={32} id="rain" />
                                    <h5>12 <i>km/h</i></h5>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="daily-weather">
                                    <h2 className="day">Wed</h2>
                                    <h3 className="degrees">27</h3>
                                    <canvas height={32} width={32} id="snow" />
                                    <h5>14 <i>km/h</i></h5>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="daily-weather">
                                    <h2 className="day">Thu</h2>
                                    <h3 className="degrees">28</h3>
                                    <canvas height={32} width={32} id="sleet" />
                                    <h5>15 <i>km/h</i></h5>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="daily-weather">
                                    <h2 className="day">Fri</h2>
                                    <h3 className="degrees">28</h3>
                                    <canvas height={32} width={32} id="wind" />
                                    <h5>11 <i>km/h</i></h5>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="daily-weather">
                                    <h2 className="day">Sat</h2>
                                    <h3 className="degrees">26</h3>
                                    <canvas height={32} width={32} id="cloudy" />
                                    <h5>10 <i>km/h</i></h5>
                                    </div>
                                </div>
                                <div className="clearfix" />
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* end of weather widget */}
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

export default Dashboard;