const contactForm = document.getElementById('create-contact-form'); // Hämtar det korrekta formuläret och sparar i en variabel
const deleteAllBtn = document.getElementById('delete-all-contacts-btn') // raderar alla kontakter
const contactName = document.getElementById('name'); // Hämtar namn-inputfältet och sparar i en variabel
const contactPhone = document.getElementById('phone'); // Hämtar telefonnummer-inputfältet och sparar i en variabel
const contactList = document.getElementById('contact-list'); // Hämtar kontaktlistan och sparar i en variabel
const heeHeeSound = document.getElementById('MJ-hee-hee'); // Ljud är kul
const shamonaSound = document.getElementById('MJ-shamona');
const yowSound = document.getElementById('MJ-yow');
const beatitSound = document.getElementById('MJ-beat-it');
const whyNotSound = document.getElementById('MJ-why-not');
const rejectedSound = document.getElementById('MJ-rejected');




// Event listener för formuläret som används för att skapa en ny kontakt
contactForm.addEventListener('submit', (event) => {
    // Förhindrar att sidan laddas om
    event.preventDefault();

    // Validering innan kontakt skapas och visa error meddelande om det finns tomma fält
    if (
        contactName.value.trim() === '' ||
        contactPhone.value.trim() === ''
    ) {
        showError("You can't save an empty contact...<br>get some friends first");
        rejectedSound.currentTime = 0;
        rejectedSound.play();
        return;
    }

    clearError();

    // Anropar funktionen addContact med namn och telefonnummer som argument
    addContact(contactName.value.trim(), contactPhone.value.trim());

    heeHeeSound.currentTime = 0;
    heeHeeSound.play();

    // Rensar inputfälten efter att kontakten har lagts till
    contactName.value = '';
    contactPhone.value = '';
});




// Funktion för att skapa ny kontakt
// Kontakten skapas som en rad (li) med inputs och knappar inline
function addContact(name, phone) {
    const li = document.createElement('li');
    const form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.value = name;
    nameInput.classList.add('contact-name');
    nameInput.disabled = true;

    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.name = 'phone';
    phoneInput.value = phone;
    phoneInput.disabled = true;

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editBtn.classList.add('icon-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add('icon-btn');
    deleteBtn.setAttribute('aria-label', 'Ta bort kontakt');

    const actions = document.createElement('div');
    actions.classList.add('contact-actions');

     // Event listener för Ändra/Spara-knappen
    editBtn.addEventListener('click', () => {
        const isDisabled = nameInput.disabled;

        // Om fälten är låsta → gå in i redigeringsläge
        if (isDisabled) {
            nameInput.disabled = false;
            phoneInput.disabled = false;

            nameInput.style.pointerEvents = 'auto';
            phoneInput.style.pointerEvents = 'auto';

            li.classList.add('editing');
            editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            nameInput.focus();

            whyNotSound.currentTime = 0;
            whyNotSound.play();
        }
        // Om fälten är redigerbara → spara
        else {
            // Validering
            if (
                nameInput.value.trim() === '' ||
                phoneInput.value.trim() === ''
            ) {
                showError("You can't save an empty contact...");
                rejectedSound.currentTime = 0;
                rejectedSound.play();
                return;
            }

            clearError();

            nameInput.value = nameInput.value.trim();
            phoneInput.value = phoneInput.value.trim();

            nameInput.disabled = true;
            phoneInput.disabled = true;

            nameInput.style.pointerEvents = 'none';
            phoneInput.style.pointerEvents = 'none';

            li.classList.remove('editing');
            editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';

            shamonaSound.currentTime = 0;
            shamonaSound.play();
        }
    });


    deleteBtn.addEventListener('click', () => {
        li.remove();

        beatitSound.currentTime = 0;
        beatitSound.play();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // Bygger upp raden
    form.appendChild(nameInput);
    form.appendChild(phoneInput);
    form.appendChild(actions);

    li.appendChild(form);
    contactList.appendChild(li);
}

 // Event listener för Ta bort-knappen
const confirmDeleteAllBtn = document.getElementById('confirm-delete-all');
const cancelDeleteAllBtn = document.getElementById('cancel-delete-all');
const deleteConfirmGroup = document.getElementById('delete-confirm-group');

deleteAllBtn.addEventListener('click', () => {
    if (!contactList.children.length) return;

    deleteAllBtn.hidden = true;
    deleteConfirmGroup.hidden = false;

    whyNotSound.currentTime = 0;
    whyNotSound.play();
});

confirmDeleteAllBtn.addEventListener('click', () => {
    contactList.innerHTML = '';

    deleteConfirmGroup.hidden = true;
    deleteAllBtn.hidden = false;

    beatitSound.currentTime = 0;
    beatitSound.play();
});

cancelDeleteAllBtn.addEventListener('click', () => {
    deleteConfirmGroup.hidden = true;
    deleteAllBtn.hidden = false;

    shamonaSound.currentTime = 0;
    shamonaSound.play();
});

//Error hantering vid tomma fält, OBS får ej ha required hårdkodat i html. Då sköter webläsaren valideringen och inte min kod.

function showError(message) {
    const errorBox = document.getElementById('error-message');
    errorBox.innerHTML = `<p class="warning">${message}</p>`;
}

function clearError() {
    const errorBox = document.getElementById('error-message');
    errorBox.innerHTML = '';
}

