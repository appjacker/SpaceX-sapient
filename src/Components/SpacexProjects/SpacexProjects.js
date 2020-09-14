import React, { Component } from 'react';
import "./SpacexProjects.css";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';
import SpacexContainer from './SpacexContainer';

class SpaceXProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],

        };
    }
    componentDidMount() {
        this.loadCompleteList();
    }

    loadCompleteList() {
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100').then((res) => {
            this.setState({ projects: res.data })
        });
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

                            </div>
                            <div class="filter-head">
                                    <p>Successful Launch</p>
                                    
                            </div>
                            <div class="filter-head">
                                    <p>Successful Landing</p>
                                    
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