import { load } from '@tauri-apps/plugin-store';
import { writable } from 'svelte/store';

export const store = await load('settings.json', { autoSave: true });

const tokenValue = (await store.get<{value: string | undefined }>('token'))?.value;
export const token = writable(tokenValue);

token.subscribe(async value => {
    await store.set('token', {value});
});


const usernameValue = (await store.get<{value: string | undefined }>('username'))?.value;
export const fullname = writable(usernameValue);

fullname.subscribe(async value => {
    await store.set('username', {value});
});

const emailValue = (await store.get<{value: string | undefined }>('email'))?.value;
export const Semail = writable(emailValue);

Semail.subscribe(async value => {
    await store.set('email', {value});
});

const totalhours = (await store.get<{value: number | undefined }>('totalhours'))?.value;
export const totalHours = writable(totalhours);

totalHours.subscribe(async value => {
    await store.set('totalhours', {value});
});

const totalinonweek = (await store.get<{value: number | undefined }>('totalinonweek'))?.value;
export const totalInOnWeek = writable(totalinonweek);

totalInOnWeek.subscribe(async value => {
    await store.set('totalinonweek', {value});
});

const uid = (await store.get<{value: number | undefined }>('uid'))?.value;
export const UID = writable(uid);

UID.subscribe(async value => {
    await store.set('uid', {value});
});