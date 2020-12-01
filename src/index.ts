import { App } from 'vue';

import Core from './kernel/core';

export default class Fcore {

    public static fcoreinstance: Fcore

    private appInstance: App

    private core: Core

    constructor() {
        if (Fcore.fcoreinstance) {
            return Fcore.fcoreinstance;
        } else {
            Fcore.fcoreinstance = this;
        }
    }

    install(app) {
        this.appInstance = app;
        this.core = new Core(app);
    }
}