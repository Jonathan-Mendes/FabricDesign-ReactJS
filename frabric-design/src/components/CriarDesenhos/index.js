import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function CriarDesenhos() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    nomeTecido: '',
    nomeDesenho: '',
    do: '',
    categoria: '',
    zona1: '',
    zona2: '',
    zona3: '',
    pre1: '',
    pre2: '',
    pre3: '',
    pre4: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="nomeTecido">Nome do Tecido</InputLabel>
              <OutlinedInput
                id="nomeTecido"
                value={values.nomeTecido}
                onChange={handleChange('nomeTecido')}
                labelWidth={120}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="nomeDesenho">Nome do Desenho</InputLabel>
              <OutlinedInput
                id="nomeDesenho"
                value={values.nomeDesenho}
                onChange={handleChange('nomeDesenho')}
                labelWidth={135}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="do">Quantidade de Repetição</InputLabel>
              <OutlinedInput
                id="do"
                type="number"
                value={values.do}
                onChange={handleChange('do')}
                labelWidth={180}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="categoria">Categoria</InputLabel>
              <Select
                native
                value={values.categoria}
                onChange={handleChange('categoria')}
                label="Categoria"
                labelWidth={70}
                inputProps={{
                  name: 'categoria',
                  id: 'categoria',
                }}
              >
                <option aria-label="None" value="" />
                <option value={'almofadas'}>Almofadas</option>
                <option value={'cortinas'}>Cortinas</option>
                <option value={'mantas'}>Mantas</option>
                <option value={'passadeiras'}>Passadeiras</option>
                <option value={'tapetes'}>Tapetes</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="zona1">Zona 1</InputLabel>
              <OutlinedInput
                id="zona1"
                value={values.zona1}
                onChange={handleChange('zona1')}
                labelWidth={50}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="zona2">Zona 2</InputLabel>
              <OutlinedInput
                id="zona2"
                value={values.zona2}
                onChange={handleChange('zona2')}
                labelWidth={50}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="zona3">Zona 3</InputLabel>
              <OutlinedInput
                id="zona3"
                value={values.zona3}
                onChange={handleChange('zona3')}
                labelWidth={50}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="pre1">Pre 1</InputLabel>
              <OutlinedInput
                id="pre1"
                value={values.pre1}
                onChange={handleChange('pre1')}
                labelWidth={40}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="pre2">Pre 2</InputLabel>
              <OutlinedInput
                id="pre2"
                value={values.pre2}
                onChange={handleChange('pre2')}
                labelWidth={40}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="pre3">Pre 3</InputLabel>
              <OutlinedInput
                id="pre3"
                value={values.pre3}
                onChange={handleChange('pre3')}
                labelWidth={40}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="pre4">Pre 4</InputLabel>
              <OutlinedInput
                id="pre4"
                value={values.pre4}
                onChange={handleChange('pre4')}
                labelWidth={40}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
