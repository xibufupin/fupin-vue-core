import { reactive, Component, markRaw } from 'vue'

import Core from './core'

import Instance from './instance';

import Utils from '../utils'

export default class Process {

	public static processInstance: Process;

	private coreInstance: Core

	private state: any = reactive({});

	private minLayer: number = 1;

	private maxLayer: number = 65535;

	constructor(coreInstance?) {
		if (Process.processInstance) {
			return Process.processInstance;
		} else {
			Process.processInstance = this;
		}
		if (coreInstance) {
			this.coreInstance = coreInstance
		}
	}

	public gets(): object {
		return this.state;
	}

	// TODO 这个方法有问题，不知道怎么处理，gets方法直接返回this.state，可以看到内部都是instance的实例，但是一旦用pid下标选取则会给一个proxy的实例
	public get(pid: number): object {
		if (this.state.hasOwnProperty(pid)) {
			return this.state[pid];
		}
		return null;
	}

	public getSystem(systemType: string): object {
		let instancePid = this.getPids().find((v, k, a) => {
			return this.state[v].system == systemType
		})
		if (instancePid) {
			return this.get(parseInt(instancePid));
		}
		return null;
	}

	public getOrCreateSystem(systemType: string, createFunc) {
		let instance = this.getSystem(systemType)
		if (instance) {
			return instance;
		}

		createFunc();
		return this.getSystem(systemType);
	}

	public getPids(): string[] {
		return Object.keys(this.state);
	}

	public create(module: any, props?: any, extraOption?: any) {
		let originModule = "";
		if (typeof module == 'string') {
			originModule = module;
			module = this.coreInstance.getModule().get(module);
			if (!module) {
				throw new Error(`[Process] command "${originModule}" is not exist`)
			}
		} else if (module.__scopeId) {
			module = {
				component: module,
			}
		} else if (module.component) {
			// do nothing
		} else {
			throw new Error("[Process] module or command is invalid")
		}

		let instance = this.createInstance(module, props, extraOption, originModule || undefined);
		this.state[instance.pid] = instance;
		setTimeout(() => {
			this.active(instance.pid);
		}, 50);
		return instance;
	}

	private destory(pid): void {
		delete this.state[pid]
	}

	// TODO 这里是瞎写的，一定要重写
	private active(pid): void {
		if (!this.state[pid]) return;
		if (this.state[pid].isActive) return;

		this.state[pid].isActive = true;

		let currentActiveLayer = 0;

		for (let i in this.state) {
			if (this.state[i].layer > currentActiveLayer) {
				currentActiveLayer = this.state[i].layer;
			}
		}

		this.state[pid].layer = currentActiveLayer + 1;

		// for(let i in this.state) {
		//     if(i != pid) {
		//         if (this.state[i].isActive) {
		//             let activeLayer = this.state[i].layer;
		//             let oldLayer = this.state[pid].layer;
		//             this.state[pid].layer = activeLayer;
		//             this.state[i].layer = oldLayer
		//         }
		//     }
		// }
		for (let i in this.state) {
			if (i != pid) {
				this.state[i].inActive();
			}
		}
	}

	private inActive(pid): void {
		this.state[pid].isActive = false;
	}

	// 这个也是瞎写的，也要重写
	private handleLayerChange(): void {
		let pids = Object.keys(this.state);

		let layers = {};

		pids.map((value, key) => {
			layers[this.state[value].layer] = this.state[value].pid;
		})

		let sortedLayers = Object.keys(layers).sort();

		let activePid = pids[pids.findIndex((value, key, array) => {
			return this.state[value].isActive == true;
		})]

		if (!activePid) {
			return;
		}


		// let layers = []
		// pids.map((value, key) => {
		// 
		// })

		let active = Object.keys(this.state).findIndex((value, key, array) => {
			return this.state[value].isActive == true;
		})


	}


	// TODO 这个layer的算法是瞎写的
	public createInstance(module, props, extraOption, command) {
		let pid = this.createPid();
		if (!module.props) {
			module.props = {};
		}

		let newProps;
		let newOption;

		if (props) {
			newProps = { ...module.props, ...props }
		} else {
			newProps = { ...module.props }
		}

		if (extraOption) {
			newOption = { ...module.option, ...extraOption };
		} else {
			newOption = { ...module.option }
		}

		if (command) {
			newOption = { ...newOption, command }
		}
		return new Instance({
			pid,
			component: module.component,
			option: newOption,
			props: newProps,

			destory: () => this.destory(pid),
			active: () => this.active(pid),
			inActive: () => this.inActive(pid),

			layer: Object.keys(this.state).length * 2,
		});
	}

	public createPid() {
		let createPid = () => {
			let pid = Utils.createRandomNumber(this.minLayer, this.maxLayer);
			return this.state[pid] ? createPid() : pid;
		}
		return createPid();
	}

	public clear() {
		for (let i in this.state) {
			this.state[i].destory();
		}
		// this.init();
	}

	public init() {
		this.state = reactive({});
	}
}