import { App, reactive } from 'vue'

import Registry from './registry'
import Variable from './variable'
import Module from './module'
import Process from './process'
import Session from './session'

export default class Core {

    public static coreInstance: Core;

    private appInstance: App;

    private registry: Registry;

    private variable: Variable;

    private module: Module;

    private process: Process;

    private session: Session;

    constructor(app) {
        if (Core.coreInstance) {
            return Core.coreInstance
        } else {
            Core.coreInstance = this;
            if (app) {
                this.appInstance = app;
            }
        }

        this.init();

    }

    public clear() {
        this.registry.clear();
        this.variable.clear();
        this.module.clear();
        this.process.clear();
        this.session.clear();
        window.location.href = ""
    }

    public init() {
        this.registry = new Registry(this);
        this.variable = new Variable(this);
        this.module = new Module(this);
        this.process = new Process(this);
        this.session = new Session(this);

        this.appInstance.config.globalProperties.$core = this;
        this.appInstance.config.globalProperties.$registry = this.registry;
        this.appInstance.config.globalProperties.$variable = this.variable;
        this.appInstance.config.globalProperties.$module = this.module;
        this.appInstance.config.globalProperties.$process = this.process;
        this.appInstance.config.globalProperties.$session = this.session;
    }

    public getAppInstance() {
        return this.appInstance;
    }
    public getCoreInstance() {
        return this;
    }
    public getRegistry() {
        return this.registry;
    }
    public getVariable() {
        return this.variable;
    }
    public getModule() {
        return this.module;
    }
    public getProcess() {
        return this.process;
    }
    public getSession() {
        return this.session;
    }

}