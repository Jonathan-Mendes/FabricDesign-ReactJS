import React, { Component } from 'react';
import firebaseService from '../../BAAS/services/firebaseService';
import { ListGroupItem, ListGroup, Spinner, Container } from 'reactstrap';
import { IoIosArrowForward } from 'react-icons/io';
import './desenhos.css';

export default class Desenhos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desenhos: [],
            loading: false
        }
    }

    async componentDidMount() {
        const state = this.state;
        let desenhosAux = []
        let response = firebaseService.getDesenhos();
        await response.then(function (val) {
            val.map((value) => {
                desenhosAux.push(value)
            })
        });

        this.setState({
            desenhos: state.desenhos = desenhosAux,
            loading: true
        })
    }

    render() {
        return this.state.loading ? (
            <Container>
                <ListGroup className="recuo listGroup">
                    {this.state.desenhos.map((desenho) => {
                        return (
                            <ListGroupItem className="listItem d-flex justify-content-between"
                            tag="a" href={`/desenho/${desenho.id}`} action>
                                 <span>{desenho.nomeTecido}</span>
                                 <IoIosArrowForward />
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Container>
        ) : (
            <Container className="d-flex vh-100 justify-content-center align-items-center">
                <Spinner style={{ width: '6rem', height: '6rem' }} id="spinner" />
            </Container>
        )
    }
}
