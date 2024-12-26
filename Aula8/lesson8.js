const form = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagemValidacao');

// Elementos de erro
const nomeErro = document.getElementById('nomeErro');
const emailErro = document.getElementById('emailErro');
const senhaErro = document.getElementById('senhaErro');
const dataNascimentoErro = document.getElementById('dataNascimentoErro');
const telefoneErro = document.getElementById('telefoneErro');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Formulário submetido'); // Log inicial

  // Obter valores dos campos
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const senha = form.senha.value.trim();
  const dataNascimento = form.dataNascimento.value;
  const telefone = form.telefone.value.trim();
  const pais = form.pais.value;

  console.log('Valores dos campos:', {
    nome,
    email,
    senha,
    dataNascimento,
    telefone,
    pais,
  });

  // Resetar mensagens de erro e estilos
  resetarErros();

  let erros = 0;

  // Validações
  if (!nome || nome.length < 3) {
    console.log('Erro no nome');
    exibirErro(form.nome, nomeErro, 'O nome deve ter pelo menos 3 caracteres.');
    erros++;
  }

  if (!email || !validarEmail(email)) {
    console.log('Erro no email');
    exibirErro(form.email, emailErro, 'Digite um email válido.');
    erros++;
  }

  if (!senha || senha.length < 6) {
    console.log('Erro na senha');
    exibirErro(
      form.senha,
      senhaErro,
      'A senha deve ter pelo menos 6 caracteres.'
    );
    erros++;
  }

  if (!dataNascimento || !validarDataNascimento(dataNascimento)) {
    console.log('Erro na data de nascimento');
    exibirErro(
      form.dataNascimento,
      dataNascimentoErro,
      'Você deve ter pelo menos 18 anos.'
    );
    erros++;
  }

  if (!pais) {
    console.log('Erro no país');
    exibirErro(form.pais, paisErro, 'Selecione um país.');
    erros++;
  }

  if (!telefone || !validarTelefone(telefone)) {
    console.log('Erro no telefone');
    exibirErro(form.telefone, telefoneErro, 'Telefone inválido.');
    erros++;
  }

  // Exibir mensagem final
  if (erros === 0) {
    console.log('Formulário válido, exibindo mensagem de sucesso');
    mensagem.textContent = 'Formulário enviado com sucesso!';
    mensagem.style.color = 'green';

    form.reset();
  } else {
    console.log(`Formulário inválido com ${erros} erros`);
    mensagem.textContent = ''; // Garante que nenhuma mensagem de sucesso apareça com erros
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const selectPais = document.getElementById('pais');

  // Busca o arquivo JSON
  fetch('./countries.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados.');
      }
      return response.json();
    })
    .then((data) => {
      // Adiciona as opções dinamicamente
      data.forEach((country) => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        selectPais.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Erro:', error);
      const errorOption = document.createElement('option');
      errorOption.textContent = 'Erro ao carregar os países';
      errorOption.disabled = true;
      selectPais.appendChild(errorOption);
    });
});

function validarDataNascimento(dataNascimento) {
  const hoje = new Date();
  const dataNascimentoDate = new Date(dataNascimento);

  // Verificar se a data é válida
  if (isNaN(dataNascimentoDate.getTime())) {
    return false;
  }

  // Calcular a diferença de anos
  const idade = hoje.getFullYear() - dataNascimentoDate.getFullYear();

  // Verificar se a idade é inferior a 18
  if (
    idade < 18 ||
    (idade === 18 &&
      (hoje.getMonth() < dataNascimentoDate.getMonth() ||
        (hoje.getMonth() === dataNascimentoDate.getMonth() &&
          hoje.getDate() < dataNascimentoDate.getDate())))
  ) {
    return false;
  }

  return true;
}

function validarEmail(email) {
  // Expressão regular para validar e-mail
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Retorna true se o e-mail passar na validação, caso contrário false
  return regexEmail.test(email);
}

function resetarErros() {
  // Lista de campos do formulário para limpar erros
  const campos = [
    form.nome,
    form.email,
    form.senha,
    form.dataNascimento,
    form.pais,
    form.telefone,
  ];

  // Remove a classe de erro de cada campo
  campos.forEach((campo) => {
    campo.classList.remove('error-field');
  });

  // Limpa as mensagens de erro
  nomeErro.textContent = '';
  emailErro.textContent = '';
  senhaErro.textContent = '';
  dataNascimentoErro.textContent = '';
  paisErro.textContent = '';
  telefoneErro.textContent = '';
}

function validarTelefone(telefone) {
  // Expressão regular para validar telefone (mínimo 8, máximo 15 dígitos)
  const regexTelefone = /^[0-9]{8,15}$/;

  // Retorna true se o telefone passar na validação, caso contrário false
  return regexTelefone.test(telefone);
}

function exibirErro(campo, erroElemento, mensagem) {
  campo.classList.add('error-field'); // Adiciona a classe de erro
  erroElemento.textContent = mensagem; // Exibe a mensagem de erro
}
