import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

export const viacep = axios.create();

const AUTH_URL = 'auth';
const PACIENTES_URL = 'pacientes';
const ESPECIALISTAS_URL = 'especialistas';
const ATENDIMENTOS_URL = 'atendimentos';



/*********************  Requests for '/auth' ****************************/
export function LOGIN(email, senha) {
  return {
    method: 'post',
    url: `${AUTH_URL}/login`,
    data: {
      email,
      senha
    }
  }
}

export function VERIFICAR_TOKEN(token) {
  return {
    method: 'post',
    url: `${AUTH_URL}/verify-token`,
    data: {
      token
    }
  }
}

export function MUDAR_SENHA(id, senha, novaSenha) {
  return {
    method: 'post',
    url: `${AUTH_URL}/change-password/${id}`,
    data: {
      senha,
      novaSenha,
    }
  }
}


/*********************  Requests for '/paciente' ****************************/
export function BUSCAR_PACIENTE(query) {
  return {
    method: 'get',
    url: `${PACIENTES_URL}/buscar`,
    params: query,
  }
}

export function LISTAR_PACIENTES() {
  return {
    method: 'get',
    url: PACIENTES_URL,
  }
}

export function CADASTRAR_PACIENTE(dadosPaciente) {
  return {
    method: 'post',
    url: PACIENTES_URL,
    data: dadosPaciente
  }
}

export function ATUALIZAR_PACIENTE(id, dadosPaciente) {
  return {
    method: 'put',
    url: `${PACIENTES_URL}/${id}`,
    data: dadosPaciente
  }
}


/*********************  Requests for '/especialistas' ****************************/
export function LISTAR_ESPECIALISTAS() {
  return {
    method: 'get',
    url: `${ESPECIALISTAS_URL}`,
  }
}


/*********************  Requests for '/atendimentos' ****************************/
export function CADASTRAR_ATENDIMENTO(dadosAtendimento) {
  return {
    method: 'post',
    url: `${ATENDIMENTOS_URL}`,
    data: dadosAtendimento,
  }
}

export function BUSCAR_ATENDIMENTOS_DO_PACIENTE(id_paciente) {
  return {
    method: 'get',
    url: `${ATENDIMENTOS_URL}/${id_paciente}`,
  }
}


/********************* Requisições para terceiros ****************************/
export function BUSCAR_ENDERECO(cep) {
  if (cep.length > 8)
    cep = cep.replace('-', '').replace('.', '');
  
  return {
    method: 'get',
    url: `http://viacep.com.br/ws/${cep}/json/`,
  }
}



export default api; 