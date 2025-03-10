import {writable} from 'svelte/store';
import {Presentation} from "../lib/models/Presentation.js";

export let _presentation = writable(new Presentation());
export let _activeSlide = writable(0);
export let _selectedObject = writable(null);