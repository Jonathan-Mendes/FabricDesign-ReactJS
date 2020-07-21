import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, Spinner } from 'reactstrap';
import './criarDesenhos.css'
import firebaseService from '../../BAAS/services/firebaseService';

export default class CriarDesenhos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeTecido: '',
      nomeDesenho: '',
      DO: '',
      categoria: '',
      zona1: '',
      zona2: '',
      zona3: '',
      pre1: '',
      pre2: '',
      pre3: '',
      pre4: '',
      loading: false
    }

    this.save = this.save.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  async save(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    await this.setState({ loading: true })
    const { nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4 } = this.state;
    let response = await firebaseService.createDesenho(nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4);
    if (response)
      this.resetValues()
  }

  resetValues() {
    this.setState({
      nomeTecido: '',
      nomeDesenho: '',
      DO: '',
      categoria: '',
      zona1: '',
      zona2: '',
      zona3: '',
      pre1: '',
      pre2: '',
      pre3: '',
      pre4: '',
      loading: false
    })
    window.scrollTo(0, 0);
  }

  render() {
    const state = this.state;
    return (
      <Container className="d-flex justify-content-center align-items-center containerH">

        {this.state.loading ?
          <div id="divSpinner" className="position-absolute z-index d-flex justify-content-center align-items-center">
            <Spinner style={{ width: '6rem', height: '6rem' }} id="spinner" />
          </div>
          : null
        }

        <Form onSubmit={(e) => this.save(e)} method="post"
          className={this.state.loading ?
            "recuo op" : "recuo"
          }>
          <Row form>
            <Col md={12} sm={12}>
              <FormGroup>
                <Label for="nomeTecido">Nome do Tecido</Label>
                <Input type="text" name="nomeTecido" id="nomeTecido" placeholder="Nome do Tecido"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ nomeTecido: e.target.value })} value={state.nomeTecido} required />
              </FormGroup>
            </Col>
            <Col md={12} sm={12}>
              <FormGroup>
                <Label for="nomeDesenho">Nome do Desenho</Label>
                <Input type="text" name="nomeDesenho" id="nomeDesenho" placeholder="Nome do Desenho"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ nomeDesenho: e.target.value })} value={state.nomeDesenho} required />
              </FormGroup>
            </Col>
            <Col md={6} sm={12}>
              <FormGroup>
                <Label for="do">Quantidade de Repetição (DO)</Label>
                <Input type="number" name="do" id="do" placeholder="DO"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ DO: e.target.value })} value={state.DO} required />
              </FormGroup>
            </Col>
            <Col md={6} sm={12}>
              <FormGroup>
                <Label for="categoria">Categoria</Label>
                <Input type="select" name="categoria" id="categoria"
                disabled={this.state.loading}
                  onChange={(e) => this.setState({ categoria: e.target.value })} value={state.categoria} required >
                  <option value=''></option>
                  <option value='almofadas'>Almofadas</option>
                  <option value='cortinas'>Cortinas</option>
                  <option value='mantas'>Mantas</option>
                  <option value='passadeiras'>Passadeiras</option>
                  <option value='tapetes'>Tapetes</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona1">Zona 1</Label>
                <Input type="number" name="zona1" id="zona1" placeholder="Zona 1"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ zona1: e.target.value })} value={state.zona1} required />
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona2">Zona 2</Label>
                <Input type="number" name="zona2" id="zona2" placeholder="Zona 2"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ zona2: e.target.value })} value={state.zona2} />
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona3">Zona 3</Label>
                <Input type="number" name="zona3" id="zona3" placeholder="Zona 3"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ zona3: e.target.value })} value={state.zona3} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre1">Pre 1</Label>
                <Input type="text" name="pre1" id="pre1" placeholder="Pre 1"
                disabled={this.state.loading}
                  onChange={(e) => this.setState({ pre1: e.target.value })} value={state.pre1} required />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre2">Pre 2</Label>
                <Input type="text" name="pre2" id="pre2" placeholder="Pre 2"
                disabled={this.state.loading}
                  onChange={(e) => this.setState({ pre2: e.target.value })} value={state.pre2} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre3">Pre 3</Label>
                <Input type="text" name="pre3" id="pre3" placeholder="Pre 3"
                disabled={this.state.loading}
                  onChange={(e) => this.setState({ pre3: e.target.value })} value={state.pre3} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre4">Pre 4</Label>
                <Input type="text" name="pre4" id="pre4" placeholder="Pre 4"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ pre4: e.target.value })} value={state.pre4} />
              </FormGroup>
            </Col>
            <Col md={6} sm={12}>
              <FormGroup className="d-flex justify-content-center">
                <Button type="submit" color="success" className="w-100"
                  disabled={this.state.loading}
                >Salvar</Button>
              </FormGroup>
            </Col>
            <Col md={6} sm={12}>
              <FormGroup className="d-flex justify-content-center">
                <Button color="danger" className="w-100"
                  onClick={() => this.resetValues()}
                  disabled={this.state.loading}
                >Cancelar</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}
