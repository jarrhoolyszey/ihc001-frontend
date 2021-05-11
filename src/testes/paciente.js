const paciente = {
  nome: 'Alfredo',
  sobrenome: 'Soarez da Silva',
  sexo: 'masculino',
  email: 'asoarez@email.com',
  CPF: '123.456.789-00',
  RG: '12.345.678-9',
  data_nascimento: '01/01/2000',
  telefone: '(xx) 1234-5678',
  endereco: {
    logradouro: 'Rua dos Alfredo',
    numero: '12',
    complemento: 'Casa 4',
    CEP: '12345-678',
    estado: 'SP',
    cidade: 'Sao Paulo',
    bairro: 'Vila Bololo',
  },
  categorias: [
    {
      title: 'Categoria 1',
      items: [
        'Primeiro item da categoria 1',
        'Segundo item da dategoria 1',
      ]
    },
    {
      title: 'Categoria 2',
      items: [
        'Primeiro item da categoria 2',
        'Segundo item da categoria 2',
        'Terceiro item da categoria 2',
        'Quarto item da categoria 2',
      ]
    }
  ]
}


export default paciente;