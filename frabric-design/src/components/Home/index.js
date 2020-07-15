import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container, Card, CardTitle, CardSubtitle, CardBody, CardText, Row, Col, Form
} from 'reactstrap';
import { FaPencilRuler } from 'react-icons/fa';
import { AiFillAppstore } from 'react-icons/ai';
import './home.css';

export default class Teste extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Container className="d-flex justify-content-center align-items-center containerH">
                <Row className="recuo">
                    <Col md={6} sm={12} className="d-flex justify-content-center align-items-center mt-2 mb-2">
                        <Link to={{ pathname: "/criar-desenhos" }} className="link">
                            <Card className="cardHome d-flex justify-content-center align-items-center">
                                <FaPencilRuler className="iconsHome" />
                                <CardText className="text-center mt-3">Criar Desenhos</CardText>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={6} sm={12} className="d-flex justify-content-center align-items-center mt-2 mb-2">
                        <Link to={{ pathname: "/desenhos" }} className="link">
                            <Card className="cardHome d-flex justify-content-center align-items-center">
                                <AiFillAppstore className="iconsHome" />
                                <CardText className="text-center mt-3">Desenhos</CardText>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}
