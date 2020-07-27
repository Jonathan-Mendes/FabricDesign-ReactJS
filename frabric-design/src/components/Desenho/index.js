import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, Spinner, FormFeedback, FormText } from 'reactstrap';
import './desenho.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdPhotoCamera } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebaseService from '../../BAAS/services/firebaseService';

export default class CriarDesenhos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idOld: '',
      nomeTecidoOld: '',
      nomeDesenhoOld: '',
      DOOld: '',
      categoriaOld: '',
      zona1Old: '',
      zona2Old: '',
      zona3Old: '',
      pre1Old: '',
      pre2Old: '',
      pre3Old: '',
      pre4Old: '',
      photoOld: '',
      id: '',
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
      photo: '',
      loading: false,
      read: true,
      imagem: null,
      admin: false,
      password: ''
    }

    this.toastError = this.toastError.bind(this);
    this.toastSuccess = this.toastSuccess.bind(this);
    this.unlock = this.unlock.bind(this);
    this.reload = this.reload.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.remove = this.remove.bind(this);
    this.read = this.read.bind(this);
    this.save = this.save.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.handleFile = this.handleFile.bind(this);
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
    toast.success('Edição Desbloqueada!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  unlock(e) {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h5 className="color800">Desbloquear</h5>
            <p>Insira a Senha para Desbloquear a Edição</p>
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
                    onClose();
                  } else {
                    this.setState({password: ''})
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

  read(e) {
    e.preventDefault();
    this.setState({
      read: false
    })
    window.scrollTo(0, 0);
  }

  removeAlert(e) {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h5>Excluir</h5>
            <p>Deseja Excluir Este Desenho?<br />
              <span className="font-weight-bold fx-20 color800">{this.state.nomeTecido}</span></p>
            <div className="text-center">
              <Button id="sim" color="success" className="w-25 rounded"
                onClick={() => {
                  this.remove();
                  onClose();
                }}>
                Sim
				  			</Button>
              <Button id="nao" color="danger" className="rounded mx-2" onClick={onClose}>Não</Button>
            </div>
          </div>
        );
      }
    });
  }

  async remove() {
    let response = await firebaseService.deleteDesenho(this.state.id);
    if (response)
      this.props.history.replace('/desenhos')
    else
      alert('Erro ao deletar desenho')
  }

  async save(e) {
    e.preventDefault();
    await this.setState({ loading: false })
    window.scrollTo(0, 0);
    const { id, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4, photo, imagem } = this.state;
    let response
    if (imagem !== null) {
      response = await firebaseService.updateDesenhoPhoto(imagem, id, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4);
    } else {
      response = await firebaseService.updateDesenho(id, nomeTecido, nomeDesenho, DO, categoria, zona1, zona2, zona3, pre1, pre2, pre3, pre4);
    }
    if (response) {
      this.setState({ loading: true, read: true })
    }
  }

  async reload() {
    const { id } = this.props.match.params;
    let response = await firebaseService.getDesenho(id);
    this.setState({
      id: response.id,
      nomeTecido: response.nomeTecido,
      nomeDesenho: response.nomeDesenho,
      DO: response.DO,
      categoria: response.categoria,
      zona1: response.zona1,
      zona2: response.zona2,
      zona3: response.zona3,
      pre1: response.pre1,
      pre2: response.pre2,
      pre3: response.pre3,
      pre4: response.pre4,
      photo: response.photo,
      idOld: response.id,
      nomeTecidoOld: response.nomeTecido,
      nomeDesenhoOld: response.nomeDesenho,
      DOOld: response.DO,
      categoriaOld: response.categoria,
      zona1Old: response.zona1,
      zona2Old: response.zona2,
      zona3Old: response.zona3,
      pre1Old: response.pre1,
      pre2Old: response.pre2,
      pre3Old: response.pre3,
      pre4Old: response.pre4,
      photoOld: response.photo,
      loading: true,
      read: false
    })
  }

  resetValues(e) {
    e.preventDefault();
    const state = this.state;
    this.setState({
      id: state.idOld,
      nomeTecido: state.nomeTecidoOld,
      nomeDesenho: state.nomeDesenhoOld,
      DO: state.DOOld,
      categoria: state.categoria,
      zona1: state.zona1Old,
      zona2: state.zona2Old,
      zona3: state.zona3Old,
      pre1: state.pre1Old,
      pre2: state.pre2Old,
      pre3: state.pre3Old,
      pre4: state.pre4Old,
      photo: state.photoOld,
      read: true
    })
    window.scrollTo(0, 0);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    let response = await firebaseService.getDesenho(id);
    this.setState({
      id: response.id,
      nomeTecido: response.nomeTecido,
      nomeDesenho: response.nomeDesenho,
      DO: response.DO,
      categoria: response.categoria,
      zona1: response.zona1,
      zona2: response.zona2,
      zona3: response.zona3,
      pre1: response.pre1,
      pre2: response.pre2,
      pre3: response.pre3,
      pre4: response.pre4,
      photo: response.photo,
      idOld: response.id,
      nomeTecidoOld: response.nomeTecido,
      nomeDesenhoOld: response.nomeDesenho,
      DOOld: response.DO,
      categoriaOld: response.categoria,
      zona1Old: response.zona1,
      zona2Old: response.zona2,
      zona3Old: response.zona3,
      pre1Old: response.pre1,
      pre2Old: response.pre2,
      pre3Old: response.pre3,
      pre4Old: response.pre4,
      photoOld: response.photo,
      loading: true
    })
  }

  render() {
    const state = this.state;
    return this.state.loading ? (
      <Container className="d-flex justify-content-center align-items-center containerH">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <Form className="recuo">
          <Row form>
            <input id="file" ref="file" type="file" onChange={(e) => this.handleFile(e)}></input>
            <Col md={12} sm={12} className="d-flex justify-content-center align-items-center">
              {!this.state.read ?
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
                <Input type="text" name="nomeTecido" id="nomeTecido" placeholder="Nome do Tecido"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ nomeTecido: e.target.value })} value={state.nomeTecido.toUpperCase()} required />
              </FormGroup>
            </Col>
            <Col md={12} sm={12}>
              <FormGroup>
                <Label for="nomeDesenho">Nome do Desenho</Label>
                <Input type="text" name="nomeDesenho" id="nomeDesenho" placeholder="Nome do Desenho"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ nomeDesenho: e.target.value })} value={state.nomeDesenho.toUpperCase()} required />
              </FormGroup>
            </Col>
            <Col md={6} sm={12}>
              <FormGroup>
                <Label for="do">Quantidade de Repetição (DO)</Label>
                <Input type="number" name="do" id="do" placeholder="DO"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ DO: e.target.value })} value={state.DO} required />
              </FormGroup>
            </Col>

            {state.read ?
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="categoria">Categoria</Label>
                  <Input type="text" name="categoria" id="categoria" placeholder="Categoria"
                    readOnly={state.read}
                    className={state.read ? "text-danger font-weight-bold" : ""}
                    onChange={(e) => this.setState({ categoria: e.target.value })} value={state.categoria.toUpperCase()} required />
                </FormGroup>
              </Col>
              :
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="categoria">Categoria</Label>
                  <Input type="select" name="categoria" id="categoria" readOnly={state.read}
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
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ zona1: e.target.value })} value={state.zona1} required />
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona2">Zona 2</Label>
                <Input type="number" name="zona2" id="zona2" placeholder="Zona 2"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ zona2: e.target.value })} value={state.zona2} />
              </FormGroup>
            </Col>
            <Col md={4} sm={12}>
              <FormGroup>
                <Label for="zona3">Zona 3</Label>
                <Input type="number" name="zona3" id="zona3" placeholder="Zona 3"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ zona3: e.target.value })} value={state.zona3} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre1">Pre 1</Label>
                <Input type="text" name="pre1" id="pre1" placeholder="Pre 1"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ pre1: e.target.value })} value={state.pre1.toUpperCase()} required />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre2">Pre 2</Label>
                <Input type="text" name="pre2" id="pre2" placeholder="Pre 2"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ pre2: e.target.value })} value={state.pre2.toUpperCase()} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre3">Pre 3</Label>
                <Input type="text" name="pre3" id="pre3" placeholder="Pre 3"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ pre3: e.target.value })} value={state.pre3.toUpperCase()} />
              </FormGroup>
            </Col>
            <Col md={3} sm={12}>
              <FormGroup>
                <Label for="pre4">Pre 4</Label>
                <Input type="text" name="pre4" id="pre4" placeholder="Pre 4"
                  readOnly={state.read}
                  className={state.read ? "text-danger font-weight-bold" : ""}
                  onChange={(e) => this.setState({ pre4: e.target.value })} value={state.pre4.toUpperCase()} />
              </FormGroup>
            </Col>
          </Row>

          {state.admin ?
            state.read ?
              <Row>
                <Col md={6} sm={12}>
                  <FormGroup className="d-flex justify-content-center">
                    <Button color="warning" className="w-100"
                      onClick={(e) => this.read(e)}>Editar</Button>
                  </FormGroup>
                </Col>
                <Col md={6} sm={12}>
                  <FormGroup className="d-flex justify-content-center">
                    <Button color="danger" className="w-100 fontButton"
                      onClick={(e) => this.removeAlert(e)}>Excluir</Button>
                  </FormGroup>
                </Col>
              </ Row>
              :
              <Row>
                <Col md={6} sm={12}>
                  <FormGroup className="d-flex justify-content-center">
                    <Button color="success" className="w-100"
                      onClick={(e) => this.save(e)}>Salvar</Button>
                  </FormGroup>
                </Col>
                <Col md={6} sm={12}>
                  <FormGroup className="d-flex justify-content-center">
                    <Button color="danger" className="w-100"
                      onClick={(e) => this.resetValues(e)}>Cancelar</Button>
                  </FormGroup>
                </Col>
              </ Row>
            :
            <Row>
              <Col md={12} sm={12}>
                <FormGroup className="d-flex justify-content-center">
                  <Button color="warning" className="w-100"
                    onClick={(e) => this.unlock(e)}>Desbloquear</Button>
                </FormGroup>
              </Col>
            </ Row>
          }
        </Form>
      </Container>
    ) : (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
          <Spinner style={{ width: '6rem', height: '6rem' }} id="spinner" />
        </Container>
      )
  }
}
