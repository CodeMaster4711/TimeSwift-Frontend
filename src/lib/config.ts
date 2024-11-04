import { load } from '@tauri-apps/plugin-store';
import { writable } from 'svelte/store';

export const store = await load('settings.json', { autoSave: true });

const tokenValue = (await store.get<{value: string | undefined }>('token'))?.value;
export const token = writable(tokenValue);

token.subscribe(async value => {
    await store.set('token', {value});
});