import React, { Component } from 'react';
import axios from 'axios'
import { Player } from 'video-react'
class Adshome extends Component {
    state={
        newarr:null,
        pageid:'',
        filters:'Default',
        dates:'Default',
        stats:'Default',
        datesort:'Default',
        multimed:'Default',
        vidid:null,
        previd:null
    }
    componentDidMount() {
      
        let new_page=window.location.href.split("=",2)[1]
        this.setState({pageid:new_page},()=>{
            this.adsdata()
        })
        console.log(this.props.profile_pic)
    }
    adsdata=()=>{
        let token=localStorage.getItem('Token')
        axios.get('http://45.77.150.129/newtry/',{
            headers:{
                'Authorization':`Bearer ${token}`,
                'productid':this.state.pageid,
                'filters':this.state.filters,
                'dates':this.state.dates,
                'stats':this.state.stats,
                'datesort':this.state.datesort,
                'multimed':this.state.multimed
            }
        })
        .then(res=>{
            console.log(res.data)
            this.setState(
                { newarr:res.data.stats }
            )
        })
    }
    changes=(e)=>{
        if(e.target.name === 'dates'){
                let new_date=e.target.value.split("-",3)
                let curr_date=`${new_date[2]}/${new_date[1]}/${new_date[0]}`
                this.setState(
                    { [e.target.name]:curr_date,stats:'Default' }
                )
            }
        else if (e.target.name == 'stats'){
            this.setState({stats:e.target.value,dates:'Default',filters:'Default'})
        }
    
        
        else{
            this.setState(
                { [e.target.name]:e.target.value,stats:'Default' }
            )
        }
       
    }
    videoplayer=(adid,stat)=>{
        const video = document.getElementById(adid);
        const previd = this.state.previd
        if (stat === 'play'){
           if (previd != adid && previd!=null){
               const previ=document.getElementById(previd);
               previ.pause()
               this.setState({previd:adid})

           }

                console.log('hi')
                video.play()

        }
        else{
            video.pause()
        }
        

    }
    render() {
        let d=new Date()
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
        let funv=()=>{
            return'hi'
        }
        return (
            this.state.newarr === null ? <div><h1>Loading</h1></div>:
            
        
<div className="right_col" role="main">
     <div className>
         <div style={{width:'100%',height:'100px'}}>
         <div>
  <div className="col-md-2 col-sm-2 ">
 
                                  <input type="date" name="dates" id="reservation-time" class="form-control"  onChange={this.changes}/>
                              
  </div>
  <div className="col-md-2 col-sm-2 ">
    <select name='filters' onChange={this.changes} className="form-control">
      <option value='Default'>All</option>
      <option value='facebook'>Facebook</option>
      <option value='instagram'>Instagram</option>
      <option value='messenger'>Messenger</option>
      
      
    </select>
  </div>
  <div className="col-md-2 col-sm-2 ">
    <select name='stats' onChange={this.changes} className="form-control">
        <option value="Default">Default</option>
      <option value='promotional'>Promotion</option>
      <option value='services'>Product/Services</option>
      
      
    </select>
  </div>
  <div className="col-md-2 col-sm-2 ">
    <select name='datesort' onChange={this.changes} className="form-control">
        <option value="Default">Default</option>
      <option value='dec'>Oldest to Latest</option>
      <option value='asc'>Latest to Oldest</option>
      
      
    </select>
    
  </div>
  <div className="col-md-2 col-sm-2 ">
    <select name='multimed' onChange={this.changes} className="form-control">
        <option value="Default">Default</option>
      <option value='image'>Image</option>
      <option value='video'>Video</option>
      
      
    </select>
  </div>
                        </div>
                        <button className='btn btn-info' onClick={(e)=>{e.preventDefault(); this.adsdata()}}>Update</button>

                        <div className='fc-right' style={{display:'inline-block', marginLeft:'20px'}}>
                        <a href={`/dashboard?page=${this.state.pageid}`}><h2 style={{display:'inline-block'}}>Graph/</h2></a><a href={`/ads?page=${this.state.pageid}`}><h2 style={{display:'inline-block'}}>Ads</h2></a>
                        </div>
                        
         </div>
         {this.state.newarr.map((val)=>(
              <div className="col-md-4" style={{height:'600px',marginTop:'10px'}}>
              <div className="x_panel">
                  <div className="x_title">
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
                  <h2 style={{position:'absolute'}}><span style={dot}></span> Active </h2><br/>
                  <h5 style={{marginTop:'10px',display: 'inline-block',width:'350px'}}> Started on {monthNames[(Number(val.start_date.split(',',2)[0].split('-',2)[1].replace("0",""))-1)]} {val.start_date.split(',',2)[0].split('-',3)[2]},{val.start_date.split(',',2)[0].split('-',3)[0]}{val.ad_info.platform.length >= 2 ? <img style={  {width:'64px',height:'32px',float:'right'}} src='https://www.nicepng.com/png/detail/206-2068252_fb-twitter-instagram-logo-png.png'/> : val.ad_info.platform.map((val)=>(
                      val === 'instagram' ? <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2F2018-social-media-logotypes%2F1000%2F2018_social_media_popular_app_logo_instagram-512.png&f=1&nofb=1'/>
                    :val === 'facebook' ? <img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F137253%2Fisolated%2Fpreview%2F90dd9f12fdd1eefb8c8976903944c026-facebook-icon-logo-by-vexels.png&f=1&nofb=1'/> :<img style={innerim} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.searchpng.com%2Fwp-content%2Fuploads%2F2019%2F02%2FMessenger-iCON-png-715x715.png&f=1&nofb=1'/>
                  ))} </h5>
                 
                  <div className="clearfix" />
                  </div>
                  <div className="x_content" style={ { marginTop:'-7px' }}>
                  <article className="media event">
                  <img  style={{width:'42px',
                  height:'42px',
                  borderRadius:'50%',
                  objectFit:'cover',
                  verticalAlign:'middle'}} alt={"pagesimg"} src={val.productid.page_info.profile_photo}/>
                      <div className="media-body" style={{marginLeft:'10px',marginTop: '10px',fontSize:'20px'}}>
                  <a className="title" href="#">{val.ad_info.owner}</a>
                     
                      </div>
                  </article>
                  <article className="media event" style={{height:'300px',width:'300px',marginTop: '20px', marginLeft: '25px'}}>
                      {val.mul_type === 'image' ? <img style={imst} src={val.ad_info.image_src}/> : 
                    <video  id={val.adid} onEnded={()=>{this.setState({vidid:null})}} controlslist="nodownload" height="100%" poster={val.ad_info.image_src} src={val.mul_type_link} width="100%"></video>
                                            }
                     
                     
                  </article>
                 
                  <article className="media event" style={{marginTop: '20px'}}>
                    
                      <div className="media-body">
         <a>{val.ad_info.discription === '' ? 'Promotional Ads' :val.ad_info.discription}</a>
                     <a style={val.mul_type_link === 'No Link' ? {display:'none'} :{display:'inline'}}>{this.state.vidid === val.adid ?<button className='btn btn-round btn-danger btn-sm' style={{float:"right"}} onClick={(e)=>{e.preventDefault();this.setState({vidid:null},()=>{this.videoplayer(val.adid,'pause')})  }}>Pause Video</button> :<button className='btn btn-round btn-info btn-sm' style={{float:"right"}} onClick={(e)=>{e.preventDefault();this.setState({vidid:val.adid},()=>{this.videoplayer(val.adid,'play'); this.state.previd === null ? this.setState({previd:val.adid}) :''})  }}>Watch Video</button>}</a>
                      </div>
                  </article>
                  </div>
              </div>
              </div>
         ))}
           
           

  </div>
            </div>
            
        );
    }
}
const dot= {
    height: '15px',
    width:'15px',
    backgroundColor: '#008000',
    borderRadius: '50%',
    display: 'inline-block',
  }
const imst={
    width:'100%',
    height:'100%'
}
const innerim={
    width:'32px',
    height:'32px',
    float:'right'
}

export default Adshome;