let showShiny = true;

const container = document.getElementById('pokemon-container');
const toggleBtn = document.getElementById('toggle-shiny');
const searchBar = document.getElementById('search-bar');

// Load the checked Pokémon from localStorage if it exists
let checkedPokemon = JSON.parse(localStorage.getItem("checkedPokemon")) || {};

function renderPokemonList() {
  const query = searchInput.value.toLowerCase();
  container.innerHTML = ""; // Clear the container to re-render the list

  shinyPokemon.forEach(pokemon => {
    const nameMatches = pokemon.name.toLowerCase().includes(query);
    if (!nameMatches) return;

    // Create the card for each Pokémon
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = showingShiny ? pokemon.shiny : pokemon.normal;
    img.alt = pokemon.name;

    const name = document.createElement("h3");
    name.textContent = `#${pokemon.dex} ${pokemon.name}`;

    card.appendChild(img);
    card.appendChild(name);

    // If checklist mode is enabled, show checkboxes
    if (checklistMode) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = checkedPokemon[pokemon.dex] || false; // Check if it's checked from checkedPokemon

      // Event listener to handle checkbox checking/unchecking
      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          checkedPokemon[pokemon.dex] = true;
        } else {
          delete checkedPokemon[pokemon.dex];
        }

        localStorage.setItem("checkedPokemon", JSON.stringify(checkedPokemon)); // Save to localStorage
        renderPokemonList(); // Re-render the list to update checkbox states
      });

      card.appendChild(checkbox);
    }

    container.appendChild(card); // Add the card to the container
  });
}

const resetChecklistButton = document.getElementById("reset-checklist");

// Event listener for the reset checklist button
resetChecklistButton.addEventListener("click", () => {
  checkedPokemon = {}; // Clear the checklist state
  localStorage.setItem("checkedPokemon", JSON.stringify(checkedPokemon)); // Save the empty state to localStorage

  renderPokemonList(); // Re-render the list to show all Pokémon again
});

function filterAndRender() {
  const query = searchBar.value.toLowerCase();
  const filtered = shinyPokemon.filter(p =>
    p.name.toLowerCase().includes(query)
  );
  renderPokemon(filtered);
}

toggleBtn.addEventListener('click', () => {
  showShiny = !showShiny;
  toggleBtn.textContent = showShiny ? 'Show Normal' : 'Show Shiny';
  filterAndRender();
});

searchBar.addEventListener('input', filterAndRender);

renderPokemon(shinyPokemon);

const themeToggle = document.getElementById('theme-toggle');

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const resetChecklistButton = document.getElementById("reset-checklist");

// Add this after the other event listeners in `main.js`
resetChecklistButton.addEventListener("click", () => {
  checkedPokemon = {}; // Clear all checked Pokémon
  localStorage.setItem("checkedPokemon", JSON.stringify(checkedPokemon));
  renderPokemonList(); // Re-render the list to reset the checkbox state
});
