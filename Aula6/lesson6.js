function fetchPokemon() {
  const container = document.getElementById('pokemonCards');
  container.innerHTML = '';

  fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((details) => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = details.sprites.front_default;
            img.alt = `${details.name}`;

            const name = document.createElement('h3');
            name.textContent = details.name;

            const info = document.createElement('p');
            info.textContent = `Altura: ${details.height} | Peso: ${details.weight}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(info);
            container.appendChild(card);
          });
      });
    })
    .catch((error) => {
      console.error('Erro ao buscar Pokémon:', error);
      container.innerHTML = `<p>Erro ao buscar os dados. Tente novamente.</p>`;
    });
}

document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  if (taskInput.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    li.addEventListener('click', () => completeTask(li));
    taskList.appendChild(li);
    taskInput.value = '';
  }
});

function completeTask(taskItem) {
  const completedTasksList = document.getElementById('completedTasksList');
  taskItem.remove();
  completedTasksList.appendChild(taskItem);
}
