import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class AvgChart extends Component {
    state={
       
     graph_data:null,
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
          
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 400,
             hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '97%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
        
            dataLabels: {
              show: true,
              name: {
                show:false
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#1abb9c',
                fontSize: '36px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        
      },    
      new_options: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -20
        
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                show:false,
                          
              },
              value: {
                offsetY: 10,
                fontSize: '22px',
                color:'#1abb9c',
                formatter: function (val) {
                  return val + "%";
                }
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
          
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#ABE5A1'],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
          },
        },
        stroke: {
          dashArray: 4
        },
        labels: ['Median Ratio'],
      },
    
 
    }
    componentDidMount() {
      this.setState({graph_data:this.props.graph_data})
    }
    render() {
        return (
                <div className="col-md-12">
                <div className="x_panel"  >
                    <div className="x_title">
                    <h2>Overall Average Chart</h2>
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
                 
                      {this.state.graph_data !== null ?    <div className="x_content">
                    <div className="col-md-2" style={{width:'200px',textAlign: 'center'}}  ><Chart options={this.state.options} series={[this.state.graph_data.avg.avg_monthly_ad]} type="radialBar" width={200}/>
                    <h2>Average Monthly Ads</h2>
                    </div>
                    <div className="col-md-2" style={{width:'200px',marginLeft:'45px'}}>
                    <Chart options={this.state.options} series={[(this.state.graph_data.active_ads)-(this.state.graph_data.service_ad)]} type="radialBar" width={200}/>
                    <h2>No.of Promotional Ads</h2>
                    </div>
                    <div className="col-md-2"  style={{width:'200px',marginLeft:'45px'}}>
                    <Chart options={this.state.options} series={[this.state.graph_data.service_ad]} type="radialBar" width={200}/>
                    <h2  style={{width:'100%'}}>No.of Product/Service Ads</h2>
                    </div>
                    <div className="col-md-2"  style={{width:'200px',marginLeft:'45px'}}>
                    <Chart options={this.state.new_options} series={[((this.state.graph_data.avg.avg_fb_weekly)/(this.state.graph_data.avg.avg_fb_weekly + this.state.graph_data.avg.avg_insta_weekly) * 100).toFixed(2)]} type="radialBar" height={230} width={200}/>
                    <h2 >Average Facebook Like Growth</h2>
                    </div>
                    <div className="col-md-2"  style={{width:'200px',marginLeft:'45px'}}>
                    <Chart options={this.state.new_options} series={[((this.state.graph_data.avg.avg_insta_weekly)/(this.state.graph_data.avg.avg_fb_weekly + this.state.graph_data.avg.avg_insta_weekly) * 100).toFixed(2)]} type="radialBar"  height={230} width={200}/>
                    <h2>Average Instagram Followers Growth</h2>
                    </div>
                    </div>
                    
                    :<div>loading</div>}
                    
                  
                    
                    
                </div>
                </div>

        );
    }
}

export default AvgChart;