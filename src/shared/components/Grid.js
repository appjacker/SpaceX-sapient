import React from 'react';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Grid = (props) => {
    return (
        <Container>
               <Row>
                {props.projects.map.length > 0 && props.projects.map((list, index) => {
                    return (
                        <Col md={3} xs={12} key={index}>
                            <Card>
                                <Card.Img variant="top" src={list.links.mission_patch} />
                                <Card.Body>
                                    <Card.Title> {list.mission_name} # {list.flight_number}</Card.Title>
                                    <Card.Text>
                                        <Container>
                                        <div className="row">
                                        <strong>Mission Ids:</strong>
                                        </div>
                                        <div className="row">
                                            <ul>
                                        {list.mission_id.map(option => 
                                            <li className="mission-list" key={option}>{option}</li>
                                        )}
                                        </ul>
                                        </div>
                                     
                                        <div className="row">
                                            <strong>
                                                Launch Year:
                                            </strong> <span>{list.launch_year}</span>
                                        </div>
                                        <div className="row">
                                            <strong>
                                                Successful Launch:
                                            </strong> <span>{list.launch_success===true?'True':'False'}</span>
                                        </div>
                                        <div className="row">
                                            <strong>
                                            Successful Landing:
                                            </strong> <span>{list.rocket.first_stage.cores[0].land_success === true?'True':'False'}</span>
                                        </div>
                                        </Container>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
                { props.projects.length === 0 || props.projects ==='' || props.projects === null && <p>No Missions Found</p>}
            </Row>
            </Container>
 
         
    )
}

export default Grid;