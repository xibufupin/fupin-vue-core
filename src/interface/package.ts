import Module from './module'

export default interface Package {
    namespace: string,
    modules: {
        [key: string]: Module
    },
}