# 📱 MJ's Phone – Contact List App

A JavaScript contact list application built as a school assignment.  
The app allows users to create, edit, delete and persist contacts using Local Storage.

---

## 📚 Assignment Overview

The task was to build a contact list application with:

- Create contact (name + phone)
- Edit existing contact
- Delete single contact
- Delete entire list
- Validation with custom error messages (no alerts)
- Data persistence using Local Storage

VG requirements included stricter validation, reusable functions in global scope, and persistent storage.

---

## 🚀 Features

- ➕ Create new contacts  
- ✏️ Edit contacts (toggle between edit/save)  
- 🗑 Delete individual contacts  
- 🧹 Delete entire contact list (with confirmation)  
- ❌ Prevent empty contacts  
- ⚠️ Custom error messages rendered in HTML  
- 💾 Local Storage persistence (survives hard refresh)  
- 🔊 Sound effects for actions  
- ⏰ Live clock (updates every minute)  
- 🔋 Simulated battery indicator  

---

## 🛠️ Tech Stack

- HTML  
- CSS (custom phone UI design)  
- Vanilla JavaScript  
- Local Storage API  
- Font Awesome  

---

## 🧠 Code Structure

Core logic is written as reusable functions in global scope:

- `createContact()`
- `updateContact()`
- `deleteContact()`
- `deleteAllContacts()`
- `saveContacts()`
- `displayContacts()`

All contacts are stored in an array and synchronized with Local Storage.

---

## 💾 Data Handling

Contacts are stored as objects:

```js
{
  id: "uuid",
  name: "Contact Name",
  phone: "123456789"
}
```
Data is automatically saved to localStorage after:

- Create
- Update
- Delete
- Delete All

## 🎨 Design

The application is styled as a simulated smartphone interface with:

- Animated background
- Glassmorphism effects
- Dynamic status bar (time + battery)
- Interactive UI states
