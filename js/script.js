const contactForm = document.getElementById('create-contact-form'); // Hämtar det korrekta formuläret och sparar i en variabel
const deleteAllBtn = document.getElementById('delete-all-contacts-btn') // raderar alla kontakter
const contactName = document.getElementById('name'); // Hämtar namn-inputfältet och sparar i en variabel
const contactPhone = document.getElementById('phone'); // Hämtar telefonnummer-inputfältet och sparar i en variabel
const contactList = document.getElementById('contact-list'); // Hämtar kontaktlistan och sparar i en variabel
const heeHeeSound = document.getElementById('MJ-hee-hee'); // Ljud är kul
const shamonaSound = document.getElementById('MJ-shamona');
const beatitSound = document.getElementById('MJ-beat-it');
const whyNotSound = document.getElementById('MJ-why-not');
const rejectedSound = document.getElementById('MJ-rejected');

// Läser in sparade kontakter från localstorage (eller startar med tom lista) Alla funktioner jobbar mot detta objekt
let contacts = localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : [];

// Anropas vid sidladdning, create, update eller delete, den tömmer ul listan, loopar igenom contacts och anropar addContact.
displayContacts();

contactName.addEventListener('focus', clearError);
contactPhone.addEventListener('focus', clearError);


// Sparar hela contacts-arrayen till localStorage
// Används av:
// createContact
// updateContact
// deleteContact
// deleteAllContacts
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Anropas ab submit-event
// Skapar ett nytt kontaktobjekt (med unikt id) och sparar det genom att anropa saveContacts
function createContact(name, phone) {
    const newContact = {
        id: crypto.randomUUID(),
        name: name.trim(), // Trim tar bort mellanslag före och efter strängen
        phone: phone.trim()
    };

    contacts.push(newContact);
    saveContacts();

    // Returnera kontakten så vi kan rendera just den
    return newContact;
}

// Anropas av editBtn click event.
// Letar efter id, uppdaterar datan och sparar.
function updateContact(id, newName, newPhone) {
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) return false;

    contact.name = newName.trim();
    contact.phone = newPhone.trim();

    saveContacts();
    return true;
}

// Anropas av deleteBtn click event
// Filtrerar bort kontakten - viktigt, den raderar inte, den filtrerar bort.
// Sparar
function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    saveContacts();
}

// Anropas av confirmDeleteAllBtn
// Den tömmer contacts arrayen och sparar.
function deleteAllContacts() {
    contacts = [];
    saveContacts();
}






// Event listener för formuläret som används för att skapa en ny kontakt.
contactForm.addEventListener('submit', (event) => {
    // Förhindrar att sidan laddas om
    event.preventDefault();

    // Validering innan kontakt skapas och visa error meddelande om det finns tomma fält
    if (
        contactName.value.trim() === '' ||
        contactPhone.value.trim() === ''
    ) {
        showError("You can't save an empty contact...<br>get some friends first!"); //Denna visas även om man har en sparad kontakt men försöker skapa en ny tom kontakt. Dumt. Borde ändra formulering eller lägga till fler if-satser.
        rejectedSound.currentTime = 0;
        rejectedSound.play();
        return;
    }

    clearError();

    // Skapar kontakt via createContact funktionen (som även sparar i localStorage och uppdaterar UI)
    const newContact = createContact(contactName.value, contactPhone.value);
    addContact(newContact);

    heeHeeSound.currentTime = 0;
    heeHeeSound.play();

    // Rensar inputfälten efter att kontakten har lagts till
    contactName.value = '';
    contactPhone.value = '';
});




// Anropas av displayContacts
// Skapar html och kopplar knappar.
// Ritar upp EN kontakt i listan. Kontaktens data kommer från contacts-arrayen.
function addContact(contact) {
    const { id, name, phone } = contact;
    const li = document.createElement('li');
    li.dataset.id = id;
    const form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.value = name;
    nameInput.classList.add('contact-name');
    nameInput.disabled = true;

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.name = 'phone';
    phoneInput.value = phone;
    phoneInput.disabled = true;

    // Rensar ev. felmeddelande när användaren börjar redigera en skapad kontakt
    nameInput.addEventListener('focus', clearError); // Behöver ligga i detta scope då nameInput inte finns fören det körs
    phoneInput.addEventListener('focus', clearError); // Behöver ligga i detta scope då phoneInput inte finns fören det körs

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editBtn.classList.add('icon-btn', 'edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add('icon-btn', 'delete-btn');
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
            updateContact(id, nameInput.value, phoneInput.value);

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
        deleteContact(id);   // uppdaterar array + localStorage
        li.remove();         // tar bort från UI

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
    deleteAllContacts();
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

// Funktion för local storage som tömmer listan och ritar om den från arrayen

function displayContacts() {
    contactList.innerHTML = '';
    for (let contact of contacts) {
        addContact(contact);
    }
}

displayContacts();


// Bonus Time shows correct on phone
function updateTime() {
    const timeEl = document.querySelector('.time');
    if (!timeEl) return;

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'pm' : 'am';
    const displayHour = hours % 12 || 12;

    timeEl.textContent = `${displayHour}:${minutes} ${period}`;
}

updateTime();

setInterval(updateTime, 60 * 1000);


// Bonus 2 Batteristatus som räknar ner
function startFakeBattery() {
    const batteryIcon = document.getElementById('battery-icon');
    const batteryText = document.getElementById('battery-text');

    let batteryLevel = 99;

    function updateBatteryUI(level) {
        batteryText.textContent = `${level}%`;

        // Ta bort alla batteri-klasser
        batteryIcon.className = 'fa-solid';

        if (level > 75) {
            batteryIcon.classList.add('fa-battery-full');
        } else if (level > 50) {
            batteryIcon.classList.add('fa-battery-three-quarters');
        } else if (level > 25) {
            batteryIcon.classList.add('fa-battery-half');
        } else if (level > 5) {
            batteryIcon.classList.add('fa-battery-quarter');
        } else {
            batteryIcon.classList.add('fa-battery-empty');
        }
    }

    // Kör var X sekund
    setInterval(() => {
        updateBatteryUI(batteryLevel);

        batteryLevel--;

        if (batteryLevel < 0) {
            batteryLevel = 99;
        }
    }, 3500); //3,5sek mellan körningen
}

startFakeBattery();