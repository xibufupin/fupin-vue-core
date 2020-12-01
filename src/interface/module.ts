import { Component } from "vue";

export default interface Module {
    option: {
        title?: string,
        icon?: string,
        shortcut?: boolean

        allowMaximize?: boolean,
        allowMinimize?: boolean,
        allowClose?: boolean,
        allowMove?: boolean,
        allowResize?: boolean,
        allowSplit?: boolean,


        isActive?: boolean,
        isWindow?: boolean,
        isTray?: boolean,
        isMaximize?: boolean,
        isMinimize?: boolean,
        isSplit?: boolean,
        splitPosition?: string,
        isLockPinterEvents?: boolean,
        isSingleton?: boolean,

        width?: number,
        height?: number,
        minWidth?: number,
        minHeight?: number,
        maxWidth?: number,
        maxHeight?: number,
        x?: number,
        y?: number,
        status?: string,

        // layer 不直接赋值，由process计算是否采用用户指定值
        layer?: number,

    },

    // props 不直接赋值，由process传入Instance构造方法
    props?: object

    component: Component,
}