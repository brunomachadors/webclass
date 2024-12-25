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

  // Obter valores dos campos
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const senha = form.senha.value.trim();
  const dataNascimento = form.dataNascimento.value;
  const telefone = form.telefone.value.trim();
  const pais = form.pais.value;

  // Resetar mensagens de erro e estilos
  [
    form.nome,
    form.email,
    form.senha,
    form.dataNascimento,
    form.pais,
    form.telefone,
  ].forEach((campo) => {
    campo.classList.remove('error-field');
  });
  nomeErro.textContent = '';
  emailErro.textContent = '';
  senhaErro.textContent = '';
  dataNascimentoErro.textContent = '';
  paisErro.textContent = '';
  telefoneErro.textContent = '';
  mensagem.textContent = '';

  // Validação
  let erros = 0;

  if (!nome || nome.length < 3) {
    nomeErro.textContent = 'O nome deve ter pelo menos 3 caracteres.';
    form.nome.classList.add('error-field');
    erros++;
  }

  if (!email || !validarEmail(email)) {
    emailErro.textContent = 'Digite um email válido.';
    form.email.classList.add('error-field');
    erros++;
  }

  if (!senha || senha.length < 6) {
    senhaErro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    form.senha.classList.add('error-field');
    erros++;
  }

  if (!dataNascimento) {
    dataNascimentoErro.textContent = 'Preencha a data de nascimento.';
    form.dataNascimento.classList.add('error-field');
    erros++;
  } else if (!validarDataNascimento(dataNascimento)) {
    dataNascimentoErro.textContent = 'Você deve ter pelo menos 18 anos.';
    form.dataNascimento.classList.add('error-field');
    erros++;
  }

  if (!pais || pais === '') {
    paisErro.textContent = 'Selecione um país.';
    form.pais.classList.add('error-field');
    erros++;
  }

  if (!telefone || !validarTelefone(telefone)) {
    telefoneErro.textContent = 'Telefone inválido.';
    form.telefone.classList.add('error-field');
    erros++;
  }

  if (erros === 0) {
    mensagem.textContent = 'Formulário enviado com sucesso!';
    mensagem.style.color = 'green';
    form.reset();
  } else {
    mensagem.style.color = 'red';
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
