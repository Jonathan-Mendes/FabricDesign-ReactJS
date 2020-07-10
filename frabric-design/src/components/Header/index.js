import React, { Component, useState } from 'react';
import './header.css';
import {
    FaPencilRuler, FaHome, FaAlignJustify
} from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async componentDidMount() {

    }

    render() {
        return (
            <div>
                <Navbar expand="md" className="navColor fixed-top">
                    <NavbarBrand href="/">
                        <span id="title" className="text-white font-weight-bold">Artesanal Teares</span>
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggle}><FaAlignJustify className="text-white" /></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="mx-2 fontNavbar">
                                <NavLink href="/" className="hoverItem">
                                    <span className="text-white link d-flex align-items-center title">
                                        <FaHome className="mr-2 icon" />Home
                                    </span>
                                </NavLink>
                            </NavItem>

                            <NavItem className="mx-2 fontNavbar">
                                <NavLink href="/criar-desenhos" className="hoverItem">
                                    <span className="text-white link d-flex align-items-center title">
                                        <FaPencilRuler className="mr-2 icon" />Criar Desenhos
                                    </span>
                                </NavLink>
                            </NavItem>

                            <NavItem className="mx-2 fontNavbar">
                                <NavLink href="/desenhos" className="hoverItem">
                                    <span className="text-white link d-flex align-items-center title">
                                        <AiFillAppstore className="mr-2 icon" />Desenhos
                                    </span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}