import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const tasks = writable(browser && JSON.parse(localStorage.getItem('tasks')));
tasks.subscribe((v) => browser && localStorage.setItem('tasks', JSON.stringify(v)));
