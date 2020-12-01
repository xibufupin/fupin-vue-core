import { reactive } from 'vue'

import Core from './core'

export default class Variable {

    public static variableInstance: Variable;

    private coreInstance: Core;

    private state: any = reactive({
        core: {},
        user: {}
    })

    constructor(coreInstance?) {
        if (Variable.variableInstance) {
            return Variable.variableInstance;
        } else {
            Variable.variableInstance = this;
        }
        if (coreInstance) {
            this.coreInstance = coreInstance
        }

        this.init();

        setInterval(() => this.state.core.datetime = new Date(), 1000)
    };

    public set(key: string, value, object: object = this.state.user): any {
        if (key == '') {
            throw new Error("[Registry] key must be a string")
        }
        let keys = key.split(".");
        let currentKey = keys.shift();

        if (keys.length == 0) {
            object[currentKey] = value;
            return object[currentKey];
        } else if (typeof object[currentKey] == 'undefined') {
            object[currentKey] = {};
        }

        return this.set(keys.join("."), value, object[currentKey]);
    }

    public get(key: string = '', object: object = this.state.user): any {
        if (key == '') {
            throw new Error("[Registry] key must be a string")
        }
        let keys = key.split(".");
        let currentKey = keys.shift();

        if (keys.length == 0) {
            if (typeof object == 'object' && null != object) {
                return object[currentKey]
            } else {
                return undefined;
            }
        } else if (typeof object[currentKey] == 'object') {
            return this.get(keys.join("."), object[currentKey]);
        } else {
            return undefined;
        }
    }

    public setCore(key: string, value, object: object = this.state.core): any {
        return this.set(key, value, object);
    }

    public getCore(key: string, object: object = this.state.core): any {
        return this.get(key, object);
    }

    public clear() {
        this.init();
    }

    private init() {
        this.state.core = {
            datetime: new Date(),
            hasValidAuthorization: false
        }

        this.state.user = {
        }
    }

}