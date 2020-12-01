import { reactive, ref } from 'vue'

import jsCookie from 'js-cookie'

import Core from './core'

export default class Session {

    public static sessionInstance: Session;

    private coreInstance: Core;

    private state: any = ref(undefined)

    constructor(coreInstance?) {
        if (Session.sessionInstance) {
            return Session.sessionInstance;
        } else {
            Session.sessionInstance = this;
        }
        if (coreInstance) {
            this.coreInstance = coreInstance
        }

        this.state.value = jsCookie.get('session');
    };

    public get() {
        return this.state.value;
    }

    public set(value) {
        this.state.value = value;
        jsCookie.set("session", value);
    }

    public clear() {
        jsCookie.remove("session");
        this.init();
    }

    public init() {
        this.state.value = undefined 
    }

}