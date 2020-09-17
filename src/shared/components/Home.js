import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';
import Grid from './Grid';
import { SpacexService } from '../service/spacexService';
import Footer from './Footer/Footer'

import '../../static/index.css';

class Home extends Component {
  constructor(props) {
    super(props)

    let missions
    if (__isBrowser__) {
      missions = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      missions =  this.props.staticContext.data;
    }
    const dateList = SpacexService.getDateList();
    this.state = {
      missions,
      loading: missions ? false : true,
      launch_year: null,
      land_success:null,
      launch_success: null,
      date:dateList
    }
    
    this.applyYearFilter = this.applyYearFilter.bind(this);
    this.insertParam = this.insertParam.bind(this);
    this.applyLaunchSucessFilter = this.applyLaunchSucessFilter.bind(this);
    this.applyLandSuccessFilter = this.applyLandSuccessFilter.bind(this);
  }
  componentDidMount () {
    if(document.location.search !== ''){
      let url = document.location.search;
      url = url.substring(1);
      const splitArray = url.split('&');
      splitArray.map((str)=>{
        let params  = str.split('=');
        if(params[0] === 'launch_year'){
          this.setState(() => ({
            launch_year:params[1],
            date:[]
          }))
          this.setState(() => ({
            date:SpacexService.getDateList()
          }))
        
         
        }else if(params[0] === 'launch_success'){
          this.setState(() => ({
            launch_success:params[1]
          }))
        }else if(params[0] === 'land_success'){
          this.setState(() => ({
            land_success:params[1]
          }))
        }
      })
        
    }
  }

  applyYearFilter(year){
    this.insertParam('launch_year', year);
    this.setState({launch_year: year});
  }
  applyLaunchSucessFilter(success){
    this.insertParam('launch_success', success);
    this.setState({launch_success: success});
  }
  applyLandSuccessFilter(success){
    this.insertParam('land_success', success);
    this.setState({land_success: success});
  }

  insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);
    let params;
    var kvp = document.location.search;
    if(!kvp){
     params = `${key}=${value}`;
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${key}=${value}`;
    window.history.pushState({path:newurl},'',newurl);
    }
    else{
     kvp = document.location.search.substr(1).split('&');
      let i=0;
  
      for(; i<kvp.length; i++){
          if (kvp[i].startsWith(key + '=')) {
              let pair = kvp[i].split('=');
              pair[1] = value;
              kvp[i] = pair.join('=');
              break;
          }
      }
  
      if(i >= kvp.length){
          kvp[kvp.length] = [key,value].join('=');
      }
  
      params = kvp.join('&');
      const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
      window.history.pushState({path:newurl},'',newurl);
      }
      this.setState({loading:true, missions:null})
      this.props.fetchInitialData(params)
      .then((data) => this.setState(() => ({
        missions:data,
        loading: false,
      })))
    
}

  render() {
    const { loading } = this.state
   
    return (
       <Container fluid>
                <h4>SpaceX Launch Programs</h4>
                <Row>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Body>
                            <Card.Title > Filters </Card.Title>
                            <div className="filter-head">
                                    <p>Launch Year year</p>
                                    <Row>
                                    {this.state.date.map((dt, index) => {
                                      let btnClass = 'btn btn-success';
                                      btnClass = this.state.launch_year == dt? `${btnClass} active`: btnClass;
                                        return(
                                            <Col xs={6} md={6} key={index}>
                                            <input onClick={e => this.applyYearFilter(e.target.value)} type="button" className={btnClass} value={dt} />
                                        </Col>
                                        )                                     
                                        
                                    })}
                                    </Row>
                            </div>
                            <div className="filter-head">
                                    <p>Successful Launch</p>
                                    <Row>
                                    <Col xs={6} md={6}>
                                    <input type="button" className={'btn btn-success ' + (this.state.launch_success == 'true' ? 'active' : '')} value='true' onClick={e => this.applyLaunchSucessFilter(e.target.value)}  />
                                    </Col>
                                    <Col xs={6} md={6}>
                                    <input type="button" className={'btn btn-success ' + (this.state.launch_success == 'false' ? 'active' : '')} value='false' onClick={e => this.applyLaunchSucessFilter(e.target.value)}  />
                                    </Col>
                                    </Row>
                                    
                            </div>
                            <div className="filter-head">
                                    <p>Successful Landing</p>
                                    <Row>
                                    <Col xs={6} md={6}>
                                    <input type="button" className={'btn btn-success ' + (this.state.land_success == 'true' ? 'active' : '')} value='true' onClick={e => this.applyLandSuccessFilter(e.target.value)}  />
                                    </Col>
                                    <Col xs={6} md={6}>
                                    <input type="button" className={'btn btn-success ' + (this.state.land_success == 'false' ? 'active' : '')} value='false' onClick={e => this.applyLandSuccessFilter(e.target.value)}/>
                                    </Col>
                                    </Row>
                            </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={9}>
                        {this.state.missions && <Grid projects={this.state.missions}></Grid>} 
                        {this.state.missions && this.state.missions.length === 0 && <h5 className="no-missions">No Missions Found, Please re-apply filters</h5>} 
                        {loading === true && <p className="loading"></p>}
                    </Col>
                </Row>
                <Footer></Footer>
            </Container>
    )
  }
}

export default Home;