import {
    createApp
} from 'vue'

import Core from '../src/index';

import app from './app/app.vue'

createApp(app)
    .use(new Core)
    .mount('body');