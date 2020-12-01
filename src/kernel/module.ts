import { reactive, computed, ComputedRef } from 'vue'

import Core from './core'

export default class Module {

    public static moduleInstance: Module;

    private coreInstance: Core;

    private state: any = reactive({});

    private commands: ComputedRef = computed(() => {
        let commands: object = {};
        for (let i in this.state) {
            for (let j in this.state[i].modules) {
                commands[[this.state[i].namespace, j].join(".")] = this.state[i].modules[j]
            }
        }
        return commands;
    })

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

    public install(modules): void {
        this.state = modules;
    }

    public getCommands() {
        return this.commands.value;
    }

    public getCommand(name) {
        return this.getCommands()[name];
    }

    public clear() {
        this.init();
    }

    public init() {
        this.state.value = {};
    }
}