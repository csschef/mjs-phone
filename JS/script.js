const contactForm = document.getElementById('create-contact-form'); // Hämtar det korrekta formuläret och sparar i en variabel
const contactName = document.getElementById('name'); // Hämtar namn-inputfältet och sparar i en variabel
const contactPhone = document.getElementById('phone'); // Hämtar telefonnummer-inputfältet och sparar i en variabel
const contactList = document.getElementById('contact-list'); // Hämtar kontaktlistan och sparar i en variabel
const heeHeeSound = document.getElementById('MJ-hee-hee'); // Ljud är kul
const shamonaSound = document.getElementById('MJ-shamona');
const yowSound = document.getElementById('MJ-yow');
const beatitSound = document.getElementById('MJ-beat-it');
const whyNotSound = document.getElementById('MJ-why-not');




// Event listener för formuläret som används för att skapa en ny kontakt
contactForm.addEventListener('submit', (event) => {
    // Förhindrar att sidan laddas om
    event.preventDefault();

    // Validering innan kontakt skapas
    if (
        contactName.value.trim() === '' ||
        contactPhone.value.trim() === ''
    ) {
        return;
    }

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
    nameInput.value = name;
    nameInput.disabled = true;

    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
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



    // Event listener för Ändra/Spara-knappen
    editBtn.addEventListener('click', () => {
        const isDisabled = nameInput.disabled;

        // Om fälten är låsta → gå in i redigeringsläge
        if (isDisabled) {
            nameInput.disabled = false;
            phoneInput.disabled = false;
            editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

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
                return;
            }

            nameInput.value = nameInput.value.trim();
            phoneInput.value = phoneInput.value.trim();

            nameInput.disabled = true;
            phoneInput.disabled = true;
            editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';

            shamonaSound.currentTime = 0;
            shamonaSound.play();
        }
    });



    // Event listener för Ta bort-knappen
    deleteBtn.addEventListener('click', () => {
        li.remove();

        beatitSound.currentTime = 0;
        beatitSound.play();
    });



    // Bygger upp raden
    form.appendChild(nameInput);
    form.appendChild(phoneInput);
    form.appendChild(editBtn);
    form.appendChild(deleteBtn);

    li.appendChild(form);
    contactList.appendChild(li);
}
