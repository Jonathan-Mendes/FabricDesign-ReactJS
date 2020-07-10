import React, { Component } from 'react';
import firebaseService from '../../BAAS/services/firebaseService';

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
        console.log(state.desenhos)
    }

    render() {
        return this.state.loading ? (
            <div>
                <h1>teste</h1>
                {this.state.desenhos.map((desenho) => {
                    return(
                        <h1>{desenho.nomeTecido}</h1>
                    )
                })}
            </div>
        ) : <h1>Carregando</h1>;
    }
}
