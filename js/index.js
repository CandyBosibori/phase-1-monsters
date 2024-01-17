// Constants
const URL_PREFIX = 'http://localhost:3000/';
const MONSTERS_PER_PAGE = 50;

// Variables
let page = 1;

// DOM Elements
const monsterContainer = document.querySelector('#monster-container');
const createMonsterButton = document.querySelector('#create-monster');
const loadMoreButton = document.querySelector('#load-more');

// Initialization function
const init = () => {
    getMonsters();
    createMonsterForm();
    addLoadMoreListener();
};

// Function to get monsters from the API
const getMonsters = () => {
    console.log('Fetching monsters...');
    fetch(`${URL_PREFIX}monsters/?_limit=${MONSTERS_PER_PAGE}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(monster => {
                console.log('Monster', monster);
                createMonsterCard(monster);
            });
        });
};

// Function to create a monster card
const createMonsterCard = (monster) => {
    const monsterCard = document.createElement('div');
    const nameHeading = document.createElement('h2');
    const ageHeading = document.createElement('h4');
    const bioParagraph = document.createElement('p');

    nameHeading.innerHTML = `${monster.name}`;
    ageHeading.innerHTML = `Age: ${monster.age}`;
    bioParagraph.innerHTML = `Bio: ${monster.description}`;

    monsterCard.appendChild(nameHeading);
    monsterCard.appendChild(ageHeading);
    monsterCard.appendChild(bioParagraph);

    monsterContainer.appendChild(monsterCard);
};

// Function to create the monster form
const createMonsterForm = () => {
    const monsterForm = document.createElement('form');
    const nameInput = createFormInput('name', 'name...');
    const ageInput = createFormInput('age', 'age...');
    const descriptionInput = createFormInput('description', 'description...');
    const submitButton = document.createElement('button');

    monsterForm.id = 'monster-form';

    submitButton.innerHTML = 'Create';

    monsterForm.appendChild(nameInput);
    monsterForm.appendChild(ageInput);
    monsterForm.appendChild(descriptionInput);
    monsterForm.appendChild(submitButton);

    createMonsterButton.appendChild(monsterForm);

    addSubmitEventListener();
};

// Function to create an input element for the form
const createFormInput = (id, placeholder) => {
    const input = document.createElement('input');
    input.id = id;
    input.placeholder = placeholder;
    return input;
};

// Function to add event listener for form submission
const addSubmitEventListener = () => {
    document.querySelector('#monster-form').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Submitted', getFormData());
        const newMonster = getFormData();
        postNewMonster(newMonster);
        createMonsterCard(newMonster); // Add the new monster to the list immediately
        clearForm();
    });
};

// Function to get form data
const getFormData = () => {
    const nameInput = document.querySelector('#name');
    const ageInput = document.querySelector('#age');
    const descriptionInput = document.querySelector('#description');

    return {
        name: nameInput.value,
        age: parseFloat(ageInput.value),
        description: descriptionInput.value,
    };
};

// Function to post a new monster to the API
const postNewMonster = (monster) => {
    const url = `${URL_PREFIX}monsters`;
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(monster),
    };

    fetch(url, options)
        .then(response => response.json())
        .then(newMonster => console.log('New monster', newMonster));
};

// Function to clear the form after submission
const clearForm = () => {
    document.querySelector('#monster-form').reset();
};

// Function to add load more button listener
const addLoadMoreListener = () => {
    loadMoreButton.addEventListener('click', () => {
        page++;
        getMonsters();
    });
};

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);
