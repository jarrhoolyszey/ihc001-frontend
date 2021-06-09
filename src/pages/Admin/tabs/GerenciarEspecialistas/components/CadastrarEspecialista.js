import React from 'react';

import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

import { Save, Clear } from '@material-ui/icons';

import Input from 'components/form/Input';
import MaskedInput from 'components/form/MaskedInput';
import Select from 'components/form/Select';

import useForm from 'hooks/useForm';
import useAxios from 'hooks/useAxios';

import { CADASTRAR_ESPECIALISTA } from 'services/api';

import theme from 'themes/theme';


const useStyles = makeStyles({
  root: {
    padding: '20px',
  },
  formHeader: {
    padding: '10px 1px',
    color: theme.palette.primary,
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    marginBottom: '1rem',

    '& .expand': {
      flexGrow: '1',
    }
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    marginTop: '30px',
  }
})

const CadastrarEspecialista = ({hidden}) => {
  const css = useStyles();
  const { request, requesting } = useAxios();

   
  // form fields states
  const [habTipo, setHabTipo] = React.useState('CRM');
  const nome = useForm(false);
  const sobrenome = useForm(false);
  const email = useForm(false);
  const telefone = useForm(false);
  const hab_num = useForm(false);
  const hab_uf = useForm(false);
  const hab_espec = useForm(false);

  // form global styles
  const variant = 'filled';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nome: nome.value,
      sobrenome: sobrenome.value,
      email: email.value,
      telefone: telefone.value,
      senha: '123',
      habilitacao: {
        tipo: habTipo,
        numero: hab_num.value,
        uf: hab_uf.value,
        especialidade: hab_espec.value,
      }
    };

    const res = await request(CADASTRAR_ESPECIALISTA(data));
    
    console.log(res);
  }

  const handleClear = () => {
    nome.setValue('');
    sobrenome.setValue('');
    email.setValue('');
    telefone.setValue('');
    hab_num.setValue('');
    hab_uf.setValue('');
    hab_espec.setValue('');
  }

  return (
    <Paper className={css.root} elevation={2} square hidden={hidden}>
      <form onSubmit={handleSubmit}>
        <div className={css.formHeader}>
          <Typography variant="body2">DADOS DO ESPECIALISTA:</Typography>
        </div>
        <div className={css.formRow}>
          <Input 
            id="ef-nome"
            label="Nome"
            type="text"
            variant={variant}
            required
            {...nome}
          />
          <Input
            className="expand"
            id="ef-sobrenome"
            label="Sobrenome"
            type="text"
            variant={variant}
            required
            {...sobrenome}
          />
        </div>
        <div className={css.formRow}>
          <MaskedInput 
            mask="(99) 9999-9999"
            maskChar=" "
            label="Telefone"
            variant={variant}
            {...telefone}
          />
          <Input 
            className="expand"
            label="Email"
            placeholder="exemplo@email.com"
            required
            variant={variant}
            {...email}
          />
        </div>
        
        <div className={css.formHeader}>
          <Typography variant="body2">DADOS SOBRE A HABILITAÇÃO:</Typography>
        </div>
        <div className={css.formRow}>
          <Select
            options={["CRM", "COREN"]}
            label="Tipo"
            value={habTipo}
            onChange={({target}) => setHabTipo(target.value)}
            variant={variant}
            required
          />
          <MaskedInput
            mask={ habTipo === "CRM" ? "999999-9" : "999999" }
            maskChar=" "
            label={`${habTipo} N°`}
            variant={variant}
            required
            {...hab_num}
            style={{
              maxWidth: '8rem',
            }}
          />
          <Input 
            label="UF"
            type="text"
            maxLength="2"
            required
            variant={variant}
            {...hab_uf}
            style={{
              maxWidth: '5rem',
            }}
          />
          <Input
            className="expand"
            label="Especialidade"
            type="text"
            required
            variant={variant}
            {...hab_espec}
          />
        </div>
      
        <div className={css.buttonsRow}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={ <Save /> }
            disabled={ requesting }
          >
            { !requesting ? 'Cadastrar' : 'Cadastrando...' } 
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={ <Clear /> }
            onClick={handleClear}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Paper>
    )
}

export default CadastrarEspecialista;