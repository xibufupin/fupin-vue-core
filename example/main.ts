import {
    createApp
} from 'vue'

import Fcore from '../src/index';

import app from './app/app.vue'

createApp(app)
    .use(new Fcore)
    .mount('body');