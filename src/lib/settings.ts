import { load, Store } from '@tauri-apps/plugin-store';
import { writable } from 'svelte/store';

export let store : Store | undefined;
export const tempfullname = writable<string | undefined>();
export const tempemail = writable<string | undefined>();
export const tempICON = writable<string | undefined>();
export const tempdelete = writable<boolean | undefined>(false);

load('temp.json', { autoSave: true }).then(async s => {
    store = s;
    tempfullname.set((await store.get<{value: string | undefined }>('username'))?.value);
    tempemail.set((await store.get<{value: string | undefined }>('email'))?.value);
    tempICON.set((await store.get<{value: string | undefined }>('icon'))?.value);
    tempdelete.set((await store.get<{value: boolean | undefined }>('delete'))?.value);
});

tempfullname.subscribe(async value => {
    await store?.set('username', {value});
});

tempemail.subscribe(async value => {
    await store?.set('email', {value});
});

tempICON.subscribe(async value => {
    await store?.set('icon', {value});
});

tempdelete.subscribe(async value => {
    await store?.set('delete', {value});
});