import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios'
import update from 'immutability-helper'
class Chartpage extends Component {
    state={
        disp:false,
        dropdisp:false,
        month:'Jun',
        week:'Default',
        chartdisp:'socilamedia',
        chartfilter:'monthly',
        total:0,
        tablegraph:null,
        series: [{
            name: 'Total ads',
            data: [21, 22, 10, 28, 16, 21, 13, 30]
          },
          
        ],
          options: {
            chart: {
              height: 400,
              width: '100%',
              type: 'bar',
           
            },
           
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true
              }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val;
                },
                offsetY: -1,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },
              stroke: {
                show: false,
                
              },
            legend: {
              show: true
            },
        
            xaxis: {
              categories: [
                
              ],
              labels: {
                style: {
                  fontSize: '12px'
                }
              }
            },
            fill: {
              opacity: 1
            }
          }
    }
    componentDidMount() {
      
        this.graph_data()
    }
    graph_data= async ()=>{
      
        let token=localStorage.getItem('Token')
        let chartdisp=this.state.chartdisp
        const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue)
        if (chartdisp === 'ads'){
        await axios.get('http://45.77.150.129/adanalysis/',{
            headers:{
              'Authorization':`Bearer ${token}`,
              'productid':this.props.pageid,
              'stats':this.state.chartfilter,
              'month':this.state.month,
              'week':this.state.week
          
            }
          })
          .then(res =>{
             let bla= res.data.status
            

            
              let new_key=Object.keys(bla)
              let new_val=Object.values(bla)
              console.log(new_val)
              // let new_tot=null
               let new_tot=new_val.map((val)=>{
                  return val.total
                })
              let facebook=new_val.map((val)=>{
                return val.facebook
              })
              let instagram=new_val.map((val)=>{
                return val.instagram
              })
              console.log(facebook,instagram)
              let old_state=this.state.options
              let old_series=this.state.series
              if (old_series.length >1){
                old_series.pop()
              }
              let new_state=update(old_state,{xaxis:{categories:{$set:new_key}}})
              
              let new_series=update(old_series,{[0]:{data:{$set:new_tot}}})
              let new_title=update(new_series,{[0]:{name:{$set:'Ads Uploaded'}}})
              let updated_distribut=update(new_state,{plotOptions:{bar:{distributed:{$set:true}}}})
              console.log(new_val)
     
              let total=new_tot.reduce(reducer)
              let tablegraph=[]
              for (let i = 0; i < new_key.length; i++) {
                tablegraph.push({'key':new_key[i],'value':new_tot[i]})
                
              }
              console.log(tablegraph)
              this.setState({options:updated_distribut,series:new_series,disp:true,total:total,tablegraph:tablegraph})
              

         
             
          })
        }
        else{
          await axios.get('http://45.77.150.129/getsocial/',{
            headers:{
              'Authorization':`Bearer ${token}`,
              'productid':this.props.pageid,
              'seldate':'Default',
              'month':this.state.month,
              'week':this.state.week
          
            }
          })
          .then(res => {
            console.log(res.data)
            let all_data=res.data.status
            let facebook_key=Object.keys(all_data.facebook_like)
            let facebook_like=Object.values(all_data.facebook_like)
            let instagram_like=Object.values(all_data.instagram_like)
            console.log(facebook_like,instagram_like)
            let facebook_total=facebook_like.reduce(reducer)
            let instagram_total=instagram_like.reduce(reducer)
            let total=facebook_total+instagram_total
            console.log(facebook_total,instagram_total,total)
            let old_series=this.state.series
            let old_state=this.state.options
            let new_series=update(old_series,{[0]:{data:{$set:facebook_like}}})
            let new_title=update(new_series,{[0]:{name:{$set:'Facebook Likes'}}})
            console.log(new_title)
            let new_stroke={'show': true,'width': 5,'colors': ['transparent']}
            if (new_title.length<= 1){
              new_title.push({'name':'Instagram Followers','data':instagram_like})
            }
            else{
              new_title.pop()
              new_title.push({'name':'Instagram Followers','data':instagram_like})
            }
            
            let new_option=update(old_state,{xaxis:{categories:{$set:facebook_key}}})
            let updated_option=update(new_option,{stroke:{$set:new_stroke}})
            let updated_distribut=update(updated_option,{plotOptions:{bar:{distributed:{$set:false}}}})
            // new_option.push({'stroke':})
            let tablegraph={'facebook_total':facebook_total,'instagram_total':instagram_total}
            this.setState({series: new_title,options:updated_distribut,disp:true,total:total,tablegraph:tablegraph})
          })
        }
    }   
    displaychng=()=>{
      this.setState({dropdisp:!this.state.dropdisp})
  } 
  updatedata=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
    render() {
        return (
          this.state.disp ?
          <div className="row">
          <div className="col-md-12 col-sm-12 " style={{height:'450px'}}>
              <div className="dashboard_graph" style={{height:'450px'}}>
              <div className="row x_title">
                  <div className="col-md-6">
        <h3>{this.state.chartdisp == 'socilamedia' ? 'Social Media Tracker' : 'Ads Tracker'}</h3>
                  </div>
                  <div className="col-md-6">
                  <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up" /></a>
                      </li>
                      <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-cogs" /></a>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item" onClick={()=>{this.setState({chartdisp:'ads'},()=>{
                            this.graph_data()
                          })}}>Ads</a>
                          <a className="dropdown-item" onClick={()=>{this.setState({chartdisp:'socilamedia'},()=>{
                            this.graph_data()
                          })}}>Social Media</a>
                          </div>
                      </li>
                      <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench" /></a>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item"  onClick={()=>{this.setState({chartfilter:'monthly',week:'Default',dropdisp:!this.state.dropdisp},()=>{
                            this.graph_data()
                          })}}>Monthly</a>
                          <a className="dropdown-item" onClick={()=>{this.setState({chartfilter:'weekly',dropdisp:!this.state.dropdisp})}}>Weekly</a>
                          </div>
                      </li>
                      <li className="dropdown">
                          <a className="dropdown-toggle" aria-expanded="false" onClick={this.displaychng}><i className="fa fa-calendar" /></a>
                          <div  style={this.state.dropdisp ?disp :{display: 'none'}} >
                          <div className='row' >
          <div className="col-5" style={{marginLeft:'15px'}}>
            
          <select name='month' style={this,this.state.chartfilter === 'monthly'?{marginLeft:'77px'} :{marginLeft:'0px'} }  onChange={this.updatedata} className="form-control">
                <option value='Jan'>Jan</option>
                <option value='Feb'>Feb</option>
                <option value='Mar'>Mar</option>
                <option value='Apr'>Apr</option>
                <option value='May'>May</option>
                <option value='Jun'>Jun</option>
                <option value='Jul'>Jul</option>
                <option value='Aug'>Aug</option>
                <option value='Sep'>Sep</option>
                <option value='Oct'>Oct</option>
                <option value='Nov'>Nov</option>
                <option value='Dec'>Dec</option>
          </select>
        </div>
        {this.state.chartfilter === 'weekly'?
        <div className="col-6">
          <select name='week'  onChange={this.updatedata} className="form-control">
                <option value='1'>First Week</option>
                <option value='2'>Second Week</option>
                <option value='3'>Third Week</option>
                <option value='4'>Fourth Week</option>
                <option value='5'>Fifth Week</option>
                </select>
                </div>
    : ''}
        </div>
        <div style={ml} className="col-4">
          <button type='button' class="btn btn-info" onClick={async (e) =>{ e.preventDefault(); await this.graph_data(); this.setState({dropdisp : false})}}>Update</button>
        </div>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close" /></a>
                      </li>
                      </ul>
                  </div>
              </div>
              <div className="col-md-9 col-sm-9 ">
              <div className="demo-placeholder">
                    <Chart options={this.state.options} series={this.state.series} type="bar" height={380}/>
                    </div> 
              </div>
              <div className="col-md-3 col-sm-3  bg-white">
                  <div className="x_title">
                  <h2>Top Campaign Performance</h2>
                  <div className="clearfix" />
                  </div>
                  
                  {this.state.chartdisp === 'socilamedia' ?  
                   <div className="col-md-12 col-sm-12 ">       
                  <div>
                      <p>Facebook Campaign</p>
                      <div className="progress" style={ { height:'10px',width:'200px',float:'left' }}>
                                <div className={this.state.tablegraph.facebook_total > 1 ? "progress-bar bg-green" : "progress-bar bg-red"} role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: String(((this.state.tablegraph.facebook_total/this.state.total)* 100).toFixed(2))+"%"}}>
                                   
                                    </div>
                                    
                                    </div><h2 style={{display:'inline-block', marginTop: '-15px',marginLeft:'15px'}}>{this.state.tablegraph.facebook_total}</h2>
                  </div>
                  <div>
                      <p>Instagram Followers</p>
                      <div className="progress" style={ { height:'10px',width:'200px',float:'left' }}>
                                <div className={this.state.tablegraph.facebook_total > 1 ? "progress-bar bg-green" : "progress-bar bg-red"} role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: String(((this.state.tablegraph.instagram_total/this.state.total)* 100).toFixed(2))+"%"}}>
                                   
                                    </div>
                                    
                                    </div><h2 style={{display:'inline-block', marginTop: '-15px',marginLeft:'15px'}}>{this.state.tablegraph.instagram_total}</h2>
                  </div>
                </div>
                            
                :<div className="col-md-12 col-sm-12 "> {this.state.tablegraph.length >1 ? this.state.tablegraph.map((val)=>(
                  <div>
                  <p>{val.key}</p>
                  <div className="progress" style={ { height:'10px',width:'200px',float:'left' }}>
                            <div className={val.value > 1 ? "progress-bar bg-green" : "progress-bar bg-red"} role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: String(((val.value/this.state.total)* 100).toFixed(2))+"%"}}>
                               
                                </div>
                                
                                </div><h2 style={{display:'inline-block', marginTop: '-15px',marginLeft:'15px'}}>{val.value}</h2>
              </div>
                )) : <div>Loading</div>} </div> }
                  
                <h4 style={{marginLeft:'9px'}}>Total:{this.state.total}</h4>
              </div>
              <div className="clearfix" />
              </div>
          </div>
          </div>
            
            :
            <div>Loading</div>
        );
    }
}
const disp={
  
  position: 'absolute',
  willChange: 'transform',
  left: '0px',
  transform: 'translate3d(-116px, 19px, 0px)',
  top: '100%',
  zIndex: '1000',
  float: 'left',
  minWidth: '10rem',
  padding: '.5rem 0',
  margin: '.125rem 0 0',
  fontSize: '1rem',
  color: '#212529',
  textAlign: 'left',
  listStyle: 'none',
  backgroundColor:'#fff',
  backgroundClip: 'padding-box',
  border: '1px solid rgba(0,0,0,.15)',
  borderRadius: '.25rem',
  boxShadow: '0 0.5rem 1rem rgba(0,0,0,.175)',
  width:'300px',height:'100px',marginLeft:'-100px',
  

}
const ml={
  marginTop:'10px',
  marginLeft:'35%',
  
}
export default Chartpage;