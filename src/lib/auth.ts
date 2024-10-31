import { writable } from "svelte/store";

// Überprüfen, ob localStorage verfügbar ist
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// Type definitions for authToken and userData
type UserData = {
    [key: string]: any;
};

// Svelte Stores für Token und Benutzerdaten
export const authToken = writable<string>(isLocalStorageAvailable ? localStorage.getItem('authToken') || '' : '');
export const userData = writable<UserData>(isLocalStorageAvailable ? JSON.parse(localStorage.getItem('userData') || '{}') : {});

// Funktion zum Speichern der Daten im localStorage und im Store
export function saveAuthData(token: string, data: UserData): void {
    if (isLocalStorageAvailable) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(data));
    }
    authToken.set(token);
    userData.set(data);
}

// Funktion zum Löschen der Auth-Daten
export function clearAuthData(): void {
    if (isLocalStorageAvailable) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    }
    authToken.set('');
    userData.set({});
}