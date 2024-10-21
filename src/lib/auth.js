import { writable } from "svelte/store";

// Überprüfen, ob localStorage verfügbar ist
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// Svelte Stores für Token und Benutzerdaten
export const authToken = writable(isLocalStorageAvailable ? localStorage.getItem('authToken') || '' : '');
export const userData = writable(isLocalStorageAvailable ? JSON.parse(localStorage.getItem('userData')) || {} : {});

// Funktion zum Speichern der Daten im localStorage und im Store
export function saveAuthData(token, data) {
    if (isLocalStorageAvailable) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(data));
    }
    authToken.set(token);
    userData.set(data);
}

// Funktion zum Löschen der Auth-Daten
export function clearAuthData() {
    if (isLocalStorageAvailable) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    }
    authToken.set('');
    userData.set({});
}