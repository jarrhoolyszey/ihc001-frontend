import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button, Paper } from '@material-ui/core';

import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';
import Select from 'components/form/Select';

import { Context } from 'context/PacienteContext';
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
  },
  form: {
    border: '1px dashed blue',
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
  }
})


const CadastroPaciente = () => {
  const { paciente, selectPaciente } = useContext(Context);
  const { tab, changeTab } = useContext(TabContext);

  const { loading, request } = useAxios();

  const [sexo, setSexo] = useState('');
  const nome = useForm();
  const sobrenome = useForm(false);
  const CPF = useForm('cpf');
  const RG = useForm('rg');
  const nascimento = useForm('data');
  const telefone = useForm('telefone');
  const logradouro = useForm();
  const numero = useForm('numero');
  const complemento = useForm(false);
  const CEP = useForm('cep');
  const cidade = useForm();
  const estado = useForm('estado');
  const bairro = useForm();
  const email = useForm('email');

  const css = useStyles();
  const variant = 'filled';
  const size = 'small';


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
        cep: CEP.value,
        estado: estado.value,
        cidade: cidade.value,
        bairro: bairro.value, 
      },
      categorias: [],
      senha: senha,
    }

    // Envia a requisição de cadastro para o servidor e aguarda a resposta
    const config = (CADASTRAR_PACIENTE(dadosPaciente));
    const res = await request(config);

    // Insere o novo paciente no PacienteContext e redireciona para a guia de atendimento
    if(res.statusText === 'OK') {
      selectPaciente(res.data);
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
            label="Número"
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
            mask="99999-999"
            maskChar=""
            variant={variant}
            size={size}
            placeholder="00000-000"
            {...CEP}
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

        { loading ? 
          <Button variant="contained" color="primary" type="submit" disabled>Cadastrando...</Button> :
          <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
        }
      </form>
    </Paper>
  )
}

export default CadastroPaciente;