import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, Spinner } from 'reactstrap';
import './criarDesenhos.css';
import { MdPhotoCamera } from 'react-icons/md';
import defaultPhoto from '../../img/default.jpg';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      imagem: null,
      photo: defaultPhoto,
      loading: false,
      admin: false,
      password: ''
    }

    this.toastError = this.toastError.bind(this);
    this.toastSuccess = this.toastSuccess.bind(this);
    this.unlock = this.unlock.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.save = this.save.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  async save(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    await this.setState({ loading: true })
    const { imagem, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4 } = this.state;

    let response
    if (imagem !== null) {
      response = await firebaseService.createDesenhoImagem(imagem, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4);
    } else {
      response = await firebaseService.createDesenho(nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4);
    }
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
      imagem: null,
      photo: defaultPhoto,
      loading: false
    })
    window.scrollTo(0, 0);
  }

  unlock(e) {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h5 className="color800">Desbloquear</h5>
            <p>Insira a Senha para Desbloquear o Cadastro</p>
            <Form>
              <FormGroup>
                <Input id="input-unlock" type='password' placeholder="******" onChange={(e) => this.setState({ password: e.target.value })} />
              </FormGroup>
            </Form>
            <div className="text-center">
              <Button color="success" className="buttonUnlock mt-3"
                onClick={() => {
                  if (this.state.password === '7502') {
                    this.setState({ admin: true })
                    this.toastSuccess();
                    window.scrollTo(0, 0);
                    onClose();
                  } else {
                    this.setState({ password: '' })
                    let input = document.getElementById('input-unlock');
                    input.value = '';
                    this.toastError()
                  }
                }}>
                Desbloquear
				  			</Button>
              <Button color="danger" className="buttonUnlock mt-3 mx-2"
                onClick={() => {
                  onClose();
                }}>
                Fechar
				  			</Button>
            </div>
          </div>
        );
      }
    });
  }

  toastError = () => {
    toast.error('Senha Incorreta!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  toastSuccess = () => {
    toast.success('Cadastro Desbloqueado!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  async handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      let reader = new FileReader();
      let url = reader.readAsDataURL(image);

      if (image.type === "image/png" || image.type === "image/jpeg" || image.type === "image/jpg") {
        const reader = new FileReader();
        reader.addEventListener('load', () =>
          this.setState({ photo: reader.result, imagem: image })
        );
        reader.readAsDataURL(e.target.files[0]);
      } else {
        this.setState({ imageStatus: true, image: null }, () => {
          window.setTimeout(() => { this.setState({ imageStatus: false }) }, 4000)
        })
        return null;
      }
    }
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

        <ToastContainer />

        <Form onSubmit={(e) => this.save(e)} method="post"
          className={this.state.loading ?
            "recuo op" : "recuo"
          }>

          <input id="file" disabled={this.state.loading} ref="file" type="file" onChange={(e) => this.handleFile(e)}></input>

          <Row form>
            <Col md={12} sm={12} className="d-flex justify-content-center align-items-center">
              {state.admin ?
                <FormGroup>
                  <label for="file" id="label-file" style={{ opacity: 1 }} className="d-flex justify-content-center align-items-center">
                    <img id="image-photo-profile" src={this.state.photo} width="350px" height="350px" />
                    <div className="icon-camera-div d-flex justify-content-center align-items-center">
                      <MdPhotoCamera id="camera" />
                    </div>
                  </label>
                </FormGroup>
                :
                <FormGroup>
                  <img id="image-photo-profile" src={this.state.photo} width="350px" height="350px" />
                </FormGroup>
              }
            </Col>
            <Col md={12} sm={12}>
              <FormGroup>
                <Label for="nomeTecido">Nome do Tecido</Label>
                <Input readOnly={!state.admin} type="text" name="nomeTecido" id="nomeTecido" placeholder="Nome do Tecido"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ nomeTecido: e.target.value })} value={state.nomeTecido} required />
              </FormGroup>
            </Col>
            <Col md={12} sm={12}>
              <FormGroup>
                <Label for="nomeDesenho">Nome do Desenho</Label>
                <Input type="text" readOnly={!state.admin}  name="nomeDesenho" id="nomeDesenho" placeholder="Nome do Desenho"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ nomeDesenho: e.target.value })} value={state.nomeDesenho} required />
              </FormGroup>
            </Col>
            <Col md={6} sm={12}>
              <FormGroup>
                <Label for="do">Quantidade de Repetição (DO)</Label>
                <Input type="number" readOnly={!state.admin}  name="do" id="do" placeholder="DO"
                  disabled={this.state.loading}
                  onChange={(e) => this.setState({ DO: e.target.value })} value={state.DO} required />
              </FormGroup>
            </Col>
            
            {!state.admin ?
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="categoria">Categoria</Label>
                  <Input type="text" name="categoria" id="categoria" placeholder="Categoria"
                    readOnly={!state.admin}
                    className={state.read ? "text-danger font-weight-bold" : ""}
                    onChange={(e) => this.setState({ categoria: e.target.value })} value={state.categoria.toUpperCase()} required />
                </FormGroup>
              </Col>
              :
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="categoria">Categoria</Label>
                  <Input type="select" name="categoria" id="categoria"
                    className={state.read ? "text-danger font-weight-bold" : ""}
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
            }
            
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona1">Zona 1</Label>
                <Input type="number" name="zona1" id="zona1" placeholder="Zona 1"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ zona1: e.target.value })} value={state.zona1} required />
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona2">Zona 2</Label>
                <Input type="number" name="zona2" id="zona2" placeholder="Zona 2"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ zona2: e.target.value })} value={state.zona2} />
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona3">Zona 3</Label>
                <Input type="number" name="zona3" id="zona3" placeholder="Zona 3"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ zona3: e.target.value })} value={state.zona3} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre1">Pre 1</Label>
                <Input type="text" name="pre1" id="pre1" placeholder="Pre 1"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ pre1: e.target.value })} value={state.pre1} required />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre2">Pre 2</Label> 
                <Input type="text" name="pre2" id="pre2" placeholder="Pre 2"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ pre2: e.target.value })} value={state.pre2} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre3">Pre 3</Label>
                <Input type="text" name="pre3" id="pre3" placeholder="Pre 3"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ pre3: e.target.value })} value={state.pre3} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre4">Pre 4</Label>
                <Input type="text" name="pre4" id="pre4" placeholder="Pre 4"
                  disabled={this.state.loading} readOnly={!state.admin} 
                  onChange={(e) => this.setState({ pre4: e.target.value })} value={state.pre4} />
              </FormGroup>
            </Col>

            <Col md={12} sm={12}>
              {state.admin ?
                <Row>
                  <Col md={6} sm={12}>
                    <FormGroup className="d-flex justify-content-center">
                      <Button type="submit" color="success" className="w-100"
                        disabled={this.state.loading}>
                        Salvar</Button>
                    </FormGroup>
                  </Col>
                  <Col md={6} sm={12}>
                    <FormGroup className="d-flex justify-content-center">
                      <Button color="danger" className="w-100"
                        onClick={() => this.resetValues()}
                        disabled={this.state.loading}>
                        Cancelar</Button>
                    </FormGroup>
                  </Col>
                </Row>
                :
                <FormGroup className="d-flex justify-content-center">
                  <Button color="warning" className="w-100"
                    onClick={(e) => this.unlock(e)}>
                    Desbloquear</Button>
                </FormGroup>
              }
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}
