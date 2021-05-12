import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 30000,
});

const PACIENTES_URL = 'pacientes';


// Requests for '/paciente'
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


export default api; 