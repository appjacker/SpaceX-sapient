import React, { Component } from 'react';
import "./SpacexProjects.css";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';
import SpacexContainer from './SpacexContainer';
import { SpacexService } from './Service/SpacexService'
import Button from 'react-bootstrap/Button'

class SpaceXProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            date:[]
        };
    }
    componentDidMount() {
        this.loadCompleteList();
    }

    loadCompleteList() {
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100').then((res) => {
            this.setState({ projects: res.data})
            this.setDateFilter();
           
        });
    }
    setDateFilter =() => {
        const dateList = SpacexService.getDateList(this.state.projects)
        this.setState({date: dateList})
    }

    render() {
        return (
            <Container fluid>
                <h4>SpaceX Launch Programs</h4>
                <Row>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Body>
                            <Card.Title > Filters </Card.Title>
                            <div class="filter-head">
                                    <p>Launch Year</p>
                                    <Row>
                                    {this.state.date.map((dt, index) => {
                                        return(
                                            <Col xs={6} md={6} key={index}>
                                            <Button  variant="success">{dt}</Button>
                                        </Col>
                                        )                                     
                                        
                                    })}
                                    </Row>
                            </div>
                            <div class="filter-head">
                                    <p>Successful Launch</p>
                                    <Row>
                                    <Col xs={6} md={6}>
                                    <Button  variant="success">True</Button>
                                    </Col>
                                    <Col xs={6} md={6}>
                                    <Button  variant="success">False</Button>
                                    </Col>
                                    </Row>
                                    
                            </div>
                            <div class="filter-head">
                                    <p>Successful Landing</p>
                                    <Row>
                                    <Col xs={6} md={6}>
                                    <Button  variant="success">True</Button>
                                    </Col>
                                    <Col xs={6} md={6}>
                                    <Button  variant="success">False</Button>
                                    </Col>
                                    </Row>
                                    
                            </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={9}>
                        <SpacexContainer projects={this.state.projects}></SpacexContainer>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SpaceXProjects;