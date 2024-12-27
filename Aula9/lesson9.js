document.addEventListener('DOMContentLoaded', () => {
  const postsList = document.getElementById('postsList');
  const loadPostsButton = document.getElementById('loadPosts');
  const addPostForm = document.getElementById('addPostForm');
  const postTitle = document.getElementById('postTitle');
  const postBody = document.getElementById('postBody');
  const modal = document.getElementById('deleteModal');
  const modalConfirmButton = document.getElementById('confirmDelete');
  const modalCancelButton = document.getElementById('cancelDelete');

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  let postToDelete = null;

  // Carregar posts (GET)
  loadPostsButton.addEventListener('click', async () => {
    postsList.innerHTML = '<li>Carregando...</li>';
    try {
      const response = await fetch(API_URL);
      const posts = await response.json();
      postsList.innerHTML = '';
      posts.slice(0, 2).forEach((post) => {
        criarPost(post);
      });
    } catch (error) {
      postsList.innerHTML = '<li>Erro ao carregar posts.</li>';
    }
  });

  // Adicionar novo post (POST)
  addPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitle.value,
      body: postBody.value,
      userId: 1,
    };
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const post = await response.json();
      criarPost(post);
      addPostForm.reset();
    } catch (error) {
      alert('Erro ao adicionar post.');
    }
  });

  // Função para criar um post na lista
  function criarPost(post) {
    const li = document.createElement('li');
    li.dataset.id = post.id;

    // Cria o título do post
    const title = document.createElement('h4');
    title.textContent = post.title;

    // Cria o corpo do post
    const body = document.createElement('p');
    body.textContent = post.body;

    // Cria o contêiner para botões
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    buttonGroup.style.display = 'none';

    // Botão de alterar
    const editButton = document.createElement('button');
    editButton.textContent = 'Alterar';
    editButton.classList.add('button', 'edit');

    // Botão de apagar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Apagar';
    deleteButton.classList.add('button', 'delete');

    // Adiciona os botões ao grupo
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    // Exibe os botões ao clicar no post
    li.addEventListener('click', () => {
      document.querySelectorAll('.posts-list li').forEach((item) => {
        item.classList.remove('selected');
        item.querySelector('.button-group').style.display = 'none';
      });
      li.classList.add('selected');
      buttonGroup.style.display = 'flex';
    });

    // Função para editar o post
    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isEditing = li.classList.contains('editing');

      if (!isEditing) {
        // Transforma o conteúdo em inputs para edição
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = title.textContent;
        titleInput.classList.add('form-input'); // Adiciona a classe de formatação do CSS

        const bodyTextarea = document.createElement('textarea');
        bodyTextarea.textContent = body.textContent;
        bodyTextarea.classList.add('form-textarea'); // Adiciona a classe de formatação do CSS

        li.insertBefore(titleInput, title);
        li.insertBefore(bodyTextarea, body);

        li.removeChild(title);
        li.removeChild(body);

        editButton.textContent = 'Salvar';
        li.classList.add('editing');
      } else {
        const updatedPost = {
          title: li.querySelector('input').value,
          body: li.querySelector('textarea').value,
          userId: 1,
        };

        fetch(`${API_URL}/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPost),
        })
          .then(() => {
            title.textContent = updatedPost.title;
            body.textContent = updatedPost.body;

            li.insertBefore(title, li.querySelector('input'));
            li.insertBefore(body, li.querySelector('textarea'));

            li.removeChild(li.querySelector('input'));
            li.removeChild(li.querySelector('textarea'));

            editButton.textContent = 'Alterar';
            li.classList.remove('editing');
          })
          .catch(() => alert('Erro ao atualizar post.'));
      }
    });

    // Exibe a modal ao clicar no botão "Apagar"
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      postToDelete = li;
      modal.style.display = 'flex';
    });

    // Adiciona título, corpo e grupo de botões ao li
    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(buttonGroup);

    // Adiciona o li à lista
    postsList.appendChild(li);
  }

  // Confirma a exclusão do post
  modalConfirmButton.addEventListener('click', async () => {
    if (postToDelete) {
      try {
        const response = await fetch(`${API_URL}/${postToDelete.dataset.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          postToDelete.remove();
        } else {
          alert('Erro ao remover o post.');
        }
      } catch (error) {
        alert('Erro ao tentar apagar o post.');
      }
    }
    modal.style.display = 'none';
  });

  // Cancela a exclusão do post
  modalCancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
    postToDelete = null;
  });
});
