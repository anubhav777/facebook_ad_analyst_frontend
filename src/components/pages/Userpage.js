import React, { Component } from 'react';
import axios from 'axios'
import DataTable,{defaultThemes} from 'react-data-table-component'
import {Link} from 'react-router-dom'

class User_page extends Component {
    state={
        newarr:null,
        token:null,
        search:[]
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
    search_query=(e)=>{
     
     if(e.target.value.length >=3){
      axios.get('http://127.0.0.1:8000/adsdisplay/',{
        headers:{
            'Authorization':`Bearer ${this.state.token}`,
            'pagename':e.target.value
        }
    })
    .then(res =>{
        console.log(res.data)
        this.setState(
            { search: res.data.stats }
        )
    })
     }
    }
    sendval=(val)=>(e)=>{
      e.preventDefault()
      axios.post('http://127.0.0.1:8000/secondtry/1','',{
        headers:{
            'Authorization':`Bearer ${this.state.token}`,
            'productid':val,
            'country':'ALL'

        }
    })
    .then( async res =>{
        if(res.data.status === 'success'){
        await axios.post('http://127.0.0.1:8000/addpage/1','',{
        headers:{
            'Authorization':`Bearer ${this.state.token}`,
            'productid':val,

        }
    })
    .then(res=>{
      console.log(res.data)
      if(res.data.status === 'success'){
      this.userpages(this.state.token)
      }
    })
        }
        
    })
    }
    blurred = ()=>{
      setTimeout(()=>{this.setState({search:[]})},1000)
    }
    delete_page=(id)=>async (e)=>{
      e.preventDefault()
      await axios.delete(`http://127.0.0.1:8000/addpage/${id}`,{
        headers:{
            'Authorization':`Bearer ${this.state.token}`,
           

        }
    })
    .then(res=>{
      console.log(res.data)
      if(res.data.status === 'success'){
      this.userpages(this.state.token)
      }
    })
    }
    render() {
        const customStyles = {
            header: {
                style: {
                  minHeight: '56px',
                },
              },
              headRow: {
                style: {
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  borderTopColor: defaultThemes.default.divider.default,
                  background:'rgba(52,73,94,0.94)',
                  color:'#ECF0F1',
                  fontFamily:"Helvetica Neue, Roboto, Arial, Droid Sans, sans-serif"
                },
              },
              headCells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px',
                    color:'#ECF0F1',
                    fontFamily: "Helvetica Neue, Roboto, Arial, Droid Sans, sans-serif"
                    
                  },
                },
              },
              cells: {
                style: {
                  '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                    fontSize:'16px'
                    
                    
                  },
                },
              },
            };
        let data = this.state.newarr
        const column=[
            {
                name:'Image',
                cell: row=><img  style={{width:'42px',
                height:'42px',
                borderRadius:'50%',
                objectFit:'cover',
                verticalAlign:'middle'}} alt={"pagesimg"} src={row.productid.page_info.profile_photo}/>,
                width:'100px'
            },
            {
                name:'Pages',
                cell:row=><Link to={`/?page=${row.productid.page_id}`}><h6>{row.productid.page_name}</h6></Link>,
                sortable:true
            },
            {
                name: <span style={{borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                fontSize:'16px',
                color:'#ECF0F1'}}>Added Date</span>,
                selector:'date',
                sortable: true,
            },
            {
              name:'Facebook Like',
              cell:row => <h6>{row.productid.socialmedia.facebook_like}</h6>
            },
            {
              name:'Instagram Followers',
              cell: row=><h6>{row.productid.socialmedia.instagram_followers}</h6>
            },
            {
              name:'',
              cell: row=><button style={{marginTop:'10px'}} className="btn btn-danger" onClick={this.delete_page(row.id)}>Delete</button>,
              button:true,
              
            }

        ]
        return (
            this.state.newarr === null ?
            <div>Loading</div>
            :
            <div>
                <div className="right_col" role="main">
  <div className>
              <div>
                <div className="page-title">
                  
                  <div className="title_right">
                    <div className="col-md-9 col-sm-5   form-group pull-right top_search">
                      <div className="input-group">
                        <input type="text" className="form-control" onChange={this.search_query} onBlur={this.blurred} placeholder="Search for..." />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button">Go!</button>
                        </span><br/>
                  
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-3" style={this.state.search.length === 0 ?{display:'none' }:{position:"absolute",zIndex: 9,marginLeft: '176px',marginTop:'50px'}}>
                        <div className="x_panel">
                          <div className="x_content">
                            {/* start accordion */}
                            <div className="accordion" id="accordion1" role="tablist" aria-multiselectable="true">
                              {this.state.search.length !== 0 ? this.state.search.map((val) =>(<div className="panel">
                                <a className="panel-heading collapsed" role="tab" id="headingTwo1" data-toggle="collapse" data-parent="#accordion1" href="#collapseTwo1" aria-expanded="false" aria-controls="collapseTwo">
                                 
                                  <li className="panel-title"  style={ { listStyleType: 'none' }}>
                                   <img style={imgdis} src={val.imageURI}/><h4 style={{display:'inline-block',marginLeft:'15px'}}>{val.name}</h4>
                                   <button className='btn btn-round btn-success' onClick={this.sendval(val.id)} style={{float:'right'}}>ADD</button>
                                  </li>
                                </a>
                            
                              </div>)) : '' }
                            
                              
                              

                            </div>
                          </div></div></div>

                  </div>
                </div>
                <div className="clearfix" />
              </div>

    <div className="row" style={{display: 'block'}} />
 

                <div className="col-md-12 col-sm-12  ">
                <div className="x_panel">
                    <div className="x_title">
                    <h2>Table design <small>Custom design</small></h2>
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
                    <p>Add class <code>bulk_action</code> to table for bulk actions options on row select</p>
                    <div className="table-responsive">
                    <DataTable
                        
                        data={data}
                        columns={column}
                        customStyles={customStyles}
                        noHeader={true}
                />
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
const imgdis={
  width:'32px',
  height:'32px',
  borderRadius:'50%',
  objectFit:'cover',
  verticalAlign:'middle'
}
export default User_page;