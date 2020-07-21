import React, { Component } from 'react';
import firebaseService from '../../BAAS/services/firebaseService';
import {
    ListGroupItem, ListGroup, Spinner, Container, Input, Button, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFilter } from 'react-icons/bs';
import './desenhos.css';

export default class Desenhos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desenhos: [],
            desenhosPesquisados: [],
            pesquisar: '',
            loading: false,
            dropdownOpen: false
        }

        this.filter = this.filter.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
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

        await desenhosAux.sort(function (a, b) {
            if (a.nomeTecido < b.nomeTecido) return -1;
            if (a.nomeTecido > b.nomeTecido) return 1;
            return 0;
        });

        this.setState({
            desenhos: state.desenhos = desenhosAux,
            desenhosPesquisados: state.desenhosPesquisados = desenhosAux,
            loading: true
        })
    }

    filter(categoria) {
        if (categoria === 'todas') {
            this.setState({
                desenhosPesquisados: this.state.desenhosPesquisados = this.state.desenhos
            })
        } else{
            this.state.desenhosPesquisados = [];
            this.state.desenhos.map((desenho) => {
                console.log(desenho.categoria.toUpperCase())
                if (desenho.categoria.toUpperCase() === categoria.toUpperCase()) {
                    this.state.desenhosPesquisados.push({
                        id: desenho.id,
                        nomeTecido: desenho.nomeTecido,
                        categoria: desenho.categoria
                    })
                }
            })
            this.setState(this.state);
        }

    }

    pesquisar() {
        this.state.desenhosPesquisados = [];
        if (this.state.pesquisar !== '') {
            this.state.desenhos.map((desenho) => {
                let result = desenho.nomeTecido.toUpperCase().indexOf(this.state.pesquisar.toUpperCase())
                if (result > -1) {
                    this.state.desenhosPesquisados.push({
                        id: desenho.id,
                        nomeTecido: desenho.nomeTecido,
                        categoria: desenho.categoria
                    })
                }
            })
        } else {
            this.state.desenhosPesquisados = this.state.desenhos;
        }
        this.state.pesquisar = ''
        this.setState(this.state);
    }

    render() {
        return this.state.loading ? (
            <Container>
                <Row className="recuo">
                    <Col md={12} sm={12} className="my-2">
                        <Row>
                            <Col md={8} sm={12} className="mb-2">
                                <Input id='pesquisar' type="text" placeholder="Pesquisar"
                                    className="" value={this.state.pesquisar}
                                    onChange={(e) => this.setState({ pesquisar: e.target.value })} />
                            </Col>

                            <Col md={2} sm={12} className="mb-2 d-flex justify-content-center align-items-center">
                                <Dropdown id="dropdown" isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
                                    <DropdownToggle id="dropdownToggle" caret color="warning" className="text-center w-100">
                                        <BsFilter className="" />
                                    </DropdownToggle>
                                    <DropdownMenu className="w-100">
                                        <DropdownItem header className="font-weight-bold color800 text-center" id="headerItem">CATEGORIAS</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem className="dropItem"><Button color="link" className="w-100 buttonItem" onClick={() => this.filter('todas')}>Todas</Button></DropdownItem>
                                        <DropdownItem className="dropItem"><Button color="link" className="w-100 buttonItem" onClick={() => this.filter('almofadas')}>Almofadas</Button></DropdownItem>
                                        <DropdownItem className="dropItem"><Button color="link" className="w-100 buttonItem" onClick={() => this.filter('cortinas')}>Cortinas</Button></DropdownItem>
                                        <DropdownItem className="dropItem"><Button color="link" className="w-100 buttonItem" onClick={() => this.filter('mantas')}>Mantas</Button></DropdownItem>
                                        <DropdownItem className="dropItem"><Button color="link" className="w-100 buttonItem" onClick={() => this.filter('passadeiras')}>Passadeiras</Button></DropdownItem>
                                        <DropdownItem className="dropItem"><Button color="link" className="w-100 buttonItem" onClick={() => this.filter('tapetes')}>Tapetes</Button></DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>

                            <Col md={2} sm={12} className="mb-2 d-flex justify-content-center align-items-center">
                                <Button color="success" className="w-100"
                                    onClick={() => this.pesquisar()}>
                                    Pesquisar</Button>
                            </Col>
                        </Row>
                    </Col>


                    {false ?
                        <Col md={12} sm={12} className="d-flex justify-content-center align-items-center">
                            <h6 id="naoEncontrado">Não foi encontrado nenhum desenho!</h6>
                        </Col>
                        :
                        <Col md={12} sm={12}>
                            <ListGroup className="listGroup">
                                {this.state.desenhosPesquisados.map((desenho) => {
                                    return (
                                        <ListGroupItem className="listItem d-flex justify-content-between"
                                            tag="a" href={`/desenho/${desenho.id}`} action>
                                            <span>{desenho.nomeTecido}</span>
                                            <span className="ml-5 d-flex justify-content-center align-items-center"><IoIosArrowForward /></span>
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>
                        </Col>
                    }
                </Row >
            </Container >
        ) : (
                <Container className="d-flex vh-100 justify-content-center align-items-center">
                    <Spinner style={{ width: '6rem', height: '6rem' }} id="spinner" />
                </Container>
            )
    }
}
