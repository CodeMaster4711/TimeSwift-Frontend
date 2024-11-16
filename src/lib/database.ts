import { load, Store } from '@tauri-apps/plugin-store';
import { writable } from 'svelte/store';

export let store : Store | undefined;
export const database = writable<string | undefined>();

load('database.json', { autoSave: true }).then(async s => {
    store = s;
    database.set((await store.get<{value: string | undefined }>('id'))?.value);
});

database.subscribe(async value => {  
    await store?.set('id', {value});
});