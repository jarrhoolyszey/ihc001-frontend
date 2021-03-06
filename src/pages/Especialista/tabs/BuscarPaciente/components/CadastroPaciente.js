import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/styles';

import { Button, Paper } from '@material-ui/core';

import { Save, Clear } from '@material-ui/icons';

import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';
import Select from 'components/form/Select';

import { PacienteContext } from 'context/PacienteCtx';
import { TabContext } from 'context/TabContext'; 

import useForm from 'hooks/useForm';
import useAxios from 'hooks/useAxios';

import {
  CADASTRAR_PACIENTE,
} from 'services/api'


const useStyles = makeStyles({
  root: {
    padding: '20px',
    maxWidth: '680px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& .form-row': {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      width: '100%',
      marginBottom: '10px',

      '& #estado': {
        maxWidth: '100px',
      }
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
  }
})


const CadastroPaciente = ({ close }) => {
  const { changeTab } = React.useContext(TabContext);
  const { pacienteDispatch } = React.useContext(PacienteContext);

  const { loading, request } = useAxios();

  // form fields
  const [sexo, setSexo] = React.useState('');
  const [cep, setCep] = React.useState('');
  const nome = useForm();
  const sobrenome = useForm(false);
  const CPF = useForm('cpf');
  const RG = useForm('rg');
  const nascimento = useForm();
  const telefone = useForm('telefone');
  const logradouro = useForm();
  const numero = useForm('numero');
  const complemento = useForm(false);
  const cidade = useForm();
  const estado = useForm('estado');
  const bairro = useForm();
  const email = useForm('email');

  const css = useStyles();
  const variant = 'filled';
  const size = 'small';


  const handleCepBlur = async ({target}) => { 
    let res;
    try {
      if( target.value.length >= 8) { 
        res = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
    
        if(!res.data.erro) {
          const { data } = res;

          logradouro.setValue(data.logradouro);
          bairro.setValue(data.bairro);
          cidade.setValue(data.localidade);
          estado.setValue(data.uf);
        }
      }
    } catch (err) {
      res = err.response;
    } finally {
      console.log(res);
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const senha = (
      CPF.value
        .replaceAll('.', '')
        .slice(0, 3)
    );

    const dadosPaciente = {
      nome: nome.value,
      sobrenome: sobrenome.value,
      sexo: sexo,
      email: email.value,
      CPF: CPF.value,
      RG: RG.value,
      data_nascimento: nascimento.value,
      telefone: telefone.value,
      endereco: {
        logradouro: logradouro.value,
        numero: numero.value,
        complemento: complemento.value,
        cep: cep,
        estado: estado.value,
        cidade: cidade.value,
        bairro: bairro.value, 
      },
      categorias: [],
      senha: senha,
    }

    // Envia a requisi????o de cadastro para o servidor e aguarda a resposta
    const config = (CADASTRAR_PACIENTE(dadosPaciente));
    const res = await request(config);

    // Insere o novo paciente no PacienteContext e redireciona para a guia de atendimento
    if(res.statusText === 'OK') {
      const paciente = res.data;

      pacienteDispatch({type: 'SELECIONAR_PACIENTE', payload: {
        paciente,
      }});
      
      changeTab(1);
    }
  }
  
  return (
    <Paper className={css.root} elevations={3}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className="form-row">
          <Input 
            id="nome"
            label="Nome"
            type="text"
            variant={variant}
            required
            size={size}
            {...nome}
          />

          <Input 
            id="sobrenome"
            label="Sobrenome"
            type="text"
            variant={variant}
            size={size}
            fullWidth
            {...sobrenome}
          />  
        </div>
        <div className="form-row">
          <Select
            options={["Masculino", "Feminino"]}
            id="sexo"
            label="Sexo"
            value={sexo}
            onChange={({target}) => setSexo(target.value)}
            variant={variant}
            size={size}
            fullWidth
          />

          <MaskedInput 
            id="cpf" 
            label="CPF" 
            type="text"
            placeholder="000.000.000-00"
            mask="999.999.999-99"
            maskChar=""
            variant={variant}
            size={size}
            required
            fullWidth 
            {...CPF}
          />
          
          <MaskedInput 
            id="rg" 
            label="RG" 
            type="text"
            placeholder="00.000.000-0"
            mask="99.999.999-9"
            maskChar=""
            variant={variant}
            size={size}
            fullWidth
            {...RG}
          />
        </div>
        <div className="form-row">
          <Input 
            id="nascimento" 
            label="Nascimento" 
            type="date"
            variant={variant}
            size={size}
            InputLabelProps={{
              shrink: true,
            }}
            {...nascimento}
          />
          
          <MaskedInput
            id="telefone" 
            label="Telefone" 
            type="text"
            mask="(99) 9999-9999"
            maskChar=""
            variant={variant}
            size={size} 
            {...telefone}
          />
          
          <Input 
            id="email" 
            label="Email" 
            type="email"
            placeholder="exemplo@email.com"
            variant={variant}
            size={size}
            {...email}
          />
        </div>
        <div className="form-row">  
          <Input
            id="logradouro"
            label="Logradouro"
            type="text"
            variant={variant}
            size={size}
            fullWidth
            {...logradouro}
          />
        
          <Input
            id="numero"
            label="N??mero"
            type="number"
            variant={variant}
            size={size}
            {...numero}
          />
        
          <Input 
            id="complemento"
            label="Complemento"
            type="text"
            variant={variant}
            size={size}
            {...complemento}
          />
        </div>
        <div className="form-row">
          <Input 
            id="bairro"
            label="Bairro"
            type="text"
            variant={variant}
            size={size}
            {...bairro}
          />
        
          <MaskedInput
            id="cep" 
            label="CEP" 
            type="text"
            placeholder="00000-000"
            mask="99999-999"
            maskChar=""
            variant={variant}
            size={size}
            onBlur={handleCepBlur}
            value={cep}
            onChange={({target}) => setCep(target.value)}
          />
        
          <Input 
            id="cidade"
            label="Cidade"
            type="text"
            variant={variant}
            size={size}
            {...cidade}
          />
        
          <Input 
            id="estado"
            label="Estado"
            type="text"
            variant={variant}
            size={size}
            {...estado}
          />
        </div>

        <div className={css.buttons}>
          { loading ? 
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              startIcon={<Save />}
              disabled
            >
              Cadastrando...
            </Button> :
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              startIcon={<Save />}
            >
              Cadastrar
            </Button>
          }
          <Button
            variant="outlined"
            color="secondary"
            startIcon={ <Clear /> }
            onClick={ close }
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default CadastroPaciente;