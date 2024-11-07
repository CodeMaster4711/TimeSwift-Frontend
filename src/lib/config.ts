import { load, Store } from '@tauri-apps/plugin-store';
import { writable } from 'svelte/store';

export let store : Store | undefined;
export const token = writable<string | undefined>();
export const fullname = writable<string | undefined>();
export const Semail = writable<string | undefined>();
export const totalHours = writable<number | undefined>();
export const totalInOnWeek = writable<number | undefined>();
export const UID = writable<string | undefined>();
export const ICON = writable<string | undefined>();

load('settings.json', { autoSave: true }).then(async s => {
    store = s;
    token.set((await store.get<{value: string | undefined }>('token'))?.value);
    fullname.set((await store.get<{value: string | undefined }>('username'))?.value);
    Semail.set((await store.get<{value: string | undefined }>('email'))?.value);
    totalHours.set((await store.get<{value: number | undefined }>('totalhours'))?.value);
    totalInOnWeek.set((await store.get<{value: number | undefined }>('totalinonweek'))?.value);
    UID.set((await store.get<{value: string | undefined }>('uid'))?.value);
    ICON.set((await store.get<{value: string | undefined }>('icon'))?.value);
});



token.subscribe(async value => {
    await store?.set('token', {value});
});


fullname.subscribe(async value => {
    await store?.set('username', {value});
});

Semail.subscribe(async value => {
    await store?.set('email', {value});
});



totalHours.subscribe(async value => {
    await store?.set('totalhours', {value});
});


totalInOnWeek.subscribe(async value => {
    await store?.set('totalinonweek', {value});
});



UID.subscribe(async value => {
    await store?.set('uid', {value});
});

ICON.subscribe(async value => {
    await store?.set('icon', {value});
});