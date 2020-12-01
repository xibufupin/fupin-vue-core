import { computed, reactive, watchEffect } from 'vue'

import Core from './core'

export default class Registry {

    public static registryInstance: Registry;

    private coreInstance: Core;

    private state: any = reactive({
        core: {},
        user: {}
    })

    constructor(coreInstance?) {
        if (Registry.registryInstance) {
            return Registry.registryInstance;
        } else {
            Registry.registryInstance = this;
        }
        if (coreInstance) {
            this.coreInstance = coreInstance
        }
        this.init();
        this.load();
        watchEffect(() => {
            this.save();
        });

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
        localStorage.removeItem('Fcore-registry');
        this.init();
    }

    private init() {
        this.state.core = {
            screen: {
                width: computed(() => window.innerWidth),
                height: computed(() => window.innerHeight),
            }
        };

        this.state.user = {
            background: {
                color: "#fff",
                image: '',
                repeat: 'no-repeat',
                size: 'cover',
                position: '50%'
            }
        }
    }

    private load() {
        let registryData = JSON.parse(localStorage.getItem("Fcore-registry"));
        if (registryData && registryData.core && registryData.user) {
            Object.keys(registryData.core).map((value, key) => {
                this.state.core[value] = registryData.core[value];
            })
            Object.keys(registryData.user).map((value, key) => {
                this.state.user[value] = registryData.user[value];
            })
            // console.info("[Registry] 数据已经载入")
        } else {
            // console.info("[Registry] 数据不完整，没有被载入")
        }
    }

    private save() {
        localStorage.setItem('Fcore-registry', JSON.stringify({ core: this.state.core, user: this.state.user }));
        // console.info("[Registry] 数据已经存储")
    }

}