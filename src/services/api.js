import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 30000,
});

const PACIENTES_URL = 'pacientes';
const AUTH_URL = 'auth';



/*********************  Requests for '/auth' ****************************/
export function VERIFICAR_TOKEN(token) {
  return {
    method: 'post',
    url: `${AUTH_URL}/verify-token`,
    data: {
      token
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


export default api; 