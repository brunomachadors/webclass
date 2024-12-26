// =======================
// Seleção de elementos DOM
// =======================
const form = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagemValidacao');
const modal = document.getElementById('modalSucesso');
const modalMensagem = document.getElementById('modalMensagem');
const fecharModal = document.getElementById('fecharModal');

// Elementos de erro
const nomeErro = document.getElementById('nomeErro');
const emailErro = document.getElementById('emailErro');
const senhaErro = document.getElementById('senhaErro');
const dataNascimentoErro = document.getElementById('dataNascimentoErro');
const telefoneErro = document.getElementById('telefoneErro');
const paisErro = document.getElementById('paisErro');

// =======================
// Funções Utilitárias
// =======================

/**
 * Valida a data de nascimento para verificar se o usuário tem pelo menos 18 anos.
 * @param {string} dataNascimento - Data de nascimento no formato YYYY-MM-DD.
 * @returns {boolean} - Retorna true se a idade for >= 18, caso contrário false.
 */
function validarDataNascimento(dataNascimento) {
  const hoje = new Date();
  const dataNascimentoDate = new Date(dataNascimento);

  if (isNaN(dataNascimentoDate.getTime())) return false;

  const idade = hoje.getFullYear() - dataNascimentoDate.getFullYear();
  const mes = hoje.getMonth() - dataNascimentoDate.getMonth();
  const dia = hoje.getDate() - dataNascimentoDate.getDate();

  return idade > 18 || (idade === 18 && (mes > 0 || (mes === 0 && dia >= 0)));
}

/**
 * Valida se o email está no formato correto.
 * @param {string} email - Email para validação.
 * @returns {boolean} - Retorna true se o email for válido, caso contrário false.
 */
function validarEmail(email) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
}

/**
 * Valida se o telefone contém entre 8 e 15 dígitos numéricos.
 * @param {string} telefone - Telefone para validação.
 * @returns {boolean} - Retorna true se o telefone for válido, caso contrário false.
 */
function validarTelefone(telefone) {
  const regexTelefone = /^[0-9]{8,15}$/;
  return regexTelefone.test(telefone);
}

/**
 * Limpa os erros exibidos e remove a classe de erro dos campos.
 */
function resetarErros() {
  const campos = [
    form.nome,
    form.email,
    form.senha,
    form.dataNascimento,
    form.pais,
    form.telefone,
  ];

  campos.forEach((campo) => campo.classList.remove('error-field'));

  nomeErro.textContent = '';
  emailErro.textContent = '';
  senhaErro.textContent = '';
  dataNascimentoErro.textContent = '';
  paisErro.textContent = '';
  telefoneErro.textContent = '';
}

/**
 * Exibe uma mensagem de erro em um campo específico.
 * @param {HTMLElement} campo - Campo do formulário onde o erro ocorreu.
 * @param {HTMLElement} erroElemento - Elemento onde a mensagem de erro será exibida.
 * @param {string} mensagem - Mensagem de erro.
 */
function exibirErro(campo, erroElemento, mensagem) {
  campo.classList.add('error-field');
  erroElemento.textContent = mensagem;
}

// =======================
// Manipuladores de Eventos
// =======================

/**
 * Evento de submissão do formulário.
 */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('Formulário submetido');

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

  // Resetar erros antes da validação
  resetarErros();

  let erros = 0;

  // Validações
  if (!nome || nome.length < 3) {
    exibirErro(form.nome, nomeErro, 'O nome deve ter pelo menos 3 caracteres.');
    erros++;
  }
  if (!email || !validarEmail(email)) {
    exibirErro(form.email, emailErro, 'Digite um email válido.');
    erros++;
  }
  if (!senha || senha.length < 6) {
    exibirErro(
      form.senha,
      senhaErro,
      'A senha deve ter pelo menos 6 caracteres.'
    );
    erros++;
  }
  if (!dataNascimento || !validarDataNascimento(dataNascimento)) {
    exibirErro(
      form.dataNascimento,
      dataNascimentoErro,
      'Você deve ter pelo menos 18 anos.'
    );
    erros++;
  }
  if (!pais) {
    exibirErro(form.pais, paisErro, 'Selecione um país.');
    erros++;
  }
  if (!telefone || !validarTelefone(telefone)) {
    exibirErro(form.telefone, telefoneErro, 'Telefone inválido.');
    erros++;
  }

  // Exibir modal de sucesso se não houver erros
  if (erros === 0) {
    console.log('Formulário válido, exibindo mensagem de sucesso');
    modal.style.display = 'flex';
    form.reset();
  } else {
    console.log(`Formulário inválido com ${erros} erros`);
    mensagem.textContent = '';
  }
});

/**
 * Evento para fechar a modal de sucesso.
 */
fecharModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

/**
 * Evento para carregar os países dinamicamente no select.
 */
document.addEventListener('DOMContentLoaded', () => {
  const selectPais = document.getElementById('pais');

  fetch('./countries.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados.');
      }
      return response.json();
    })
    .then((data) => {
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
