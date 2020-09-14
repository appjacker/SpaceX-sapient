import React from 'react';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const SpacexContainer = (props) => {
    return (
        <Container>
            <Row>
                {props.projects.map((list, index) => {
                    return (
                        <Col md={3} key={index}>
                            <Card>
                                <Card.Img variant="top" src={list.links.mission_patch} />
                                <Card.Body>
                                    <Card.Title> {list.mission_name} # {list.flight_number}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default SpacexContainer;