import React, { Component,Fragment } from 'react';
import L from 'leaflet'
import {Map,TileLayer,Marker,Popup,GeoJSON} from 'react-leaflet'
import axios from 'axios'


class Newmap extends Component{
    state = {
        lat: 37.8,
        lng: -96,
        zoom: 4,
        newarr:null
      }
      componentDidMount(){
        
        // console.log(res.data.start_point.latitude, res.data.start_point.longitude)
        var myGeoJSON = {};
        myGeoJSON.type = "FeatureCollection";
        myGeoJSON.features = this.props.geo.status;

        this.setState({ newarr:[myGeoJSON],lat:this.props.geo.start_point.latitude,lng:this.props.geo.start_point.longitude })
       
      }
      getcolor=(d)=>{
        return d > 1000 ? '#800026' :
           d > 90  ? '#151B54' :
           d > 50  ? '#0000A0' :
           d > 20  ? '#1569C7' :
           d > 10   ? '#488AC7' :
           d > 1   ? '#82CAFA' :
                      '#00FFFF';
        
      }
      style=(feature)=>{
        return {
          fillColor: this.getcolor(feature.total),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      }
      }
      render() {
        const position = [this.state.lat, this.state.lng]
        var myIcon = L.icon({
            iconUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
            iconSize:[25,41],
            iconAnchor:[12,5,41],
            popupAnchor: [0,5,-41]
        })
        var mapAcessToken='pk.eyJ1IjoiYW51YmhhdjAwNyIsImEiOiJja2FrdTR5MW0wM3RzMnJxd3p1ZjF1c2R4In0.ehGjrESh_R28fssG960a5g'
        return (
          this.state.newarr === null ? <div>loading</div> :
          <Fragment>
          <Map className="map" center={position} zoom={this.state.zoom} style={newdisp}>
              
            <TileLayer
             url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapAcessToken}`}
             id={'mapbox/light-v9'}
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              
            />{this.state.newarr[0].features.map((val,i)=>(
              <Marker position={[val.latitude,val.longitude]} icon = {myIcon} key={i}>
              <Popup>
            <h2 style={{color: '#73879C'}}>Country:{val.countryname}</h2>
              <h4 style={{color: '#73879C'}}>Total number of Admins: {val.total}</h4>
              </Popup>
            </Marker>

            ))}
            
            <GeoJSON
            data = {this.state.newarr}
            style = { this.style }
            />
          </Map>
          {/* <div className="col-md-4 col-sm-6 " style={pops}>
  <div className="x_panel fixed_height_100">
    <div className="x_content">
      <div className="dashboard-widget-content">
        <ul className="quick-list">
          <li><div style={{  width:'15px',height:'10px',border:'.5px solid black',display: 'inline-block',backgroundColor:'#151B54'}}></div> > 90</li>
          <li><i className="fa fa-bar-chart" /><a href="#">Auto Renewal</a> </li>
          <li><i className="fa fa-support" /><a href="#">Help Desk</a> </li>
          <li><i className="fa fa-heart" /><a href="#">Donations</a> </li>
        </ul>
      </div>
    </div>
  </div>
</div> */}

   </Fragment>
        )
      }
    }
const newdisp={
    width: '100%',
  height: '100%'
}
const pops={
    zIndex:'999',
    position: 'absolute',
    top:0,
    right:0,
    width:'200px',
    height: '100px'
}
const smallbox={
    width:'15px',
    height:'10px',
    border:'.5px solid black',
    display: 'inline-block'
}
export default Newmap;