import { reactive, computed, ComputedRef, markRaw } from 'vue'

import Core from './core'

export default class Module {

    public static moduleInstance: Module;

    private coreInstance: Core;

    private state: any = reactive({});

    constructor(coreInstance?) {
        if (Module.moduleInstance) {
            return Module.moduleInstance;
        } else {
            Module.moduleInstance = this;
        }
        if (coreInstance) {
            this.coreInstance = coreInstance
        }
    };

    public install(command, module): void {
        this.state[command] = () => {
            return {
                component: module.component,
                option: module.option || {},
                props: module.props || {}
            }
        }
    }

    public gets() {
        let modules: object = {};
        for (let i in this.state) {
            modules[i] = this.state[i]();
        }
        return modules;
    }

    public get(name) {
        if (this.state.hasOwnProperty(name)) {
            return this.state[name]();
        } else {
            return false;
        }
    }

    public clear() {
        this.init();
    }

    public init() {
        this.state = reactive({});
    }
}