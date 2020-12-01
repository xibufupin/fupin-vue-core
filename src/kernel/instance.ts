import { Component, computed, ComputedRef, markRaw, ref } from 'vue'

type SplitPosition = 'left' | 'right' | 'top' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom '

export default class Instance {

    /**
     * 
     * Instance 基本属性
     * 
     * pid - ID
     * component - 实例载入的视图组件
     * props - 启动参数
     * destory - process传来的实例销毁方法
     * active - process传来的实例激活方法
     * inActive - process传来的实例反激活方法
     */
    public pid: number;

    public component: Component;

    public destory: Function;

    public active: Function;

    public inActive: Function;


    /**
     * 
     * Instance 可被用户自定义控制属性 - 第一部分
     * 
     * title - 标题
     * icon - 图标
     * 展示桌面图标 - shortcut
     */
    public title: any = ref('无标题窗口');

    public icon: any = ref(undefined);

    public shortcut: any = ref(false);


    /**
     * 
     * Instance 可被用户自定义控制属性 - 第二部分
     * 
     * title - 标题
     * ionc - 图标
     * allowMaximize - 是否允许最大化
     * allowMinimize - 是否允许最小化
     * allowClose - 是否允许关闭
     * allowMove - 是否允许拖动
     * allowResize - 是否允许改变大小
     * allowSplit - 是否允许切分屏幕
     */
    public allowMaximize: any = ref(true);

    public allowMinimize: any = ref(true);

    public allowClose: any = ref(true);

    public allowMove: any = ref(true);

    public allowResize: any = ref(true);

    public allowSplit: any = ref(true);


    /**
     * 
     * Instance 可被用户自定义控制属性 - 第三部分
     * 
     * 是否活动 - isActive
     * 是否包裹窗口 - isWindow
     * 是否显示托盘图标 - isTray
     * 是否最大化 - isMaximize
     * 是否最小化 - isMinimize
     * 是否分割屏幕 - isSplit
     * 分割屏幕位置 - splitPosition
     * 锁定鼠标事件（拖拽或移动时防止鼠标穿透） - isLockPinterEvents
     * 是否单例 - isSingleton
     */
    public isActive: any = ref(false);

    public isWindow: any = ref(true);

    public isTray: any = ref(false);

    public isMaximize: any = ref(false);

    public isMinimize: any = ref(false);

    public isSplit: any = ref(false);

    public splitPosition: any = ref(null);

    public isLockPinterEvents: any = ref(false);

    public isSingleton: any = ref(false);


    /**
     * 
     * Instance 可被用户自定义控制属性 - 第二部分
     * 
     * 定义宽度 - width
     * 定义高度 - height
     * 定义最小宽度 - minWidth
     * 定义最小宽度 - minHeight
     * 定义最大宽度 - maxWidth
     * 定义最大高度 - maxHeight
     * X坐标 - x
     * Y坐标 - y
     * 层级位置 - layer
     */

    public width: any = ref(1024);

    public height: any = ref(768);

    public minWidth: any = ref(480);

    public minHeight: any = ref(240);

    public maxWidth: any = ref(1200);

    public maxHeight: any = ref(900);

    public x: any = ref(100);

    public y: any = ref(100);

    public layer: any = ref(0);

    public status: any = ref("Done");

    /**
     *  
     * Instance 可被用户自定义控制属性 - 第三部分
     * 
     * 启动参数 - props
     */
    public props: any = ref({});


    /**
     * Instance 不可被用户控制属性 - 自动计算
     * 窗口实际宽度 - actualWidth
     * 窗口实际高度 - actualHeight
     * 窗口到上边距值 - top
     * 窗口到下边距值 - bottom
     * 窗口到左边距值 - left
     * 窗口到右边距值 - right
     * 实际窗口内部宽度 - innerWidth
     * 实际窗口内部高度 - innerHeight
     * 实际窗口内容区域宽度 - contentWidth
     * 实际窗口内容区域高度 - contentHeight
     */
    public actualWidth: ComputedRef = computed(() => {
        if (this.isMaximize.value) {
            return window.innerWidth;
        } else if (this.isMinimize.value) {
            return 0;
        } else if (this.width.value < this.minWidth.value) {
            return this.minWidth.value;
        } else if (this.width.value > this.maxWidth.value) {
            return this.maxWidth.value;
        } else {
            return this.width.value;
        }
    })

    public actualHeight: ComputedRef = computed(() => {
        if (this.isMaximize.value) {
            return window.innerHeight - 30;
        } else if (this.isMinimize.value) {
            return 0;
        } else if (this.height.value < this.minHeight.value) {
            return this.minHeight.value;
        } else if (this.height.value > this.maxHeight.value) {
            return this.maxHeight.value;
        } else {
            return this.height.value;
        }
    })

    public top: ComputedRef = computed(() => {
        if (this.isMaximize.value) {
            return 0;
        } else if (this.isMinimize.value) {
            return null;
        }
        else {
            return this.y.value;
        }
    });

    public bottom: ComputedRef = computed(() => {
        if (this.isMaximize.value) {
            return 30;
        } else if (this.isMinimize.value) {
            return null;
        } else {
            return window.innerHeight - this.top.value - this.actualHeight.value;
        }
    })

    public left: ComputedRef = computed(() => {
        if (this.isMaximize.value) {
            return 0;
        } else if (this.isMinimize.value) {
            return null;
        }
        else {
            return this.x.value;
        }
    });

    public right: ComputedRef = computed(() => {
        if (this.isMaximize.value) {
            return 0;
        } else if (this.isMinimize.value) {
            return null;
        } else {
            return window.innerWidth - this.left.value - this.actualWidth.value;
        }
    })

    public innerWidth: ComputedRef = computed(() => {
        if (this.isMinimize.value) {
            return 0;
        } else if (this.isMaximize.value) {
            return this.actualWidth;
        } else {
            return this.actualWidth.value - 1 * 2;
        }
    });

    public innerHeight: ComputedRef = computed(() => {
        if (this.isMinimize.value) {
            return 0;
        } else if (this.isMaximize.value) {
            return this.actualHeight;
        } else {
            return this.actualHeight.value - 1 * 2
        }
    });

    public contentWidth: ComputedRef = computed(() => {
        if (this.isMinimize.value) {
            return 0
        } else {
            this.innerWidth.value
        }
    });

    public contentHeight: ComputedRef = computed(() => {
        if (this.isMinimize.value) {
            return 0
        } else {
            this.innerHeight.value - 30 - 24
        }
    });

    constructor(module) {
        this.pid = module.pid;
        this.component = markRaw(module.component);

        this.destory = module.destory;
        this.active = module.active;
        this.inActive = module.inActive;

        this.layer = module.layer;

        if (module.option) this.setOption(module.option);
        if (module.props) this.setProps(module.props);
    }


    public minimize: Function = (): void => {
        if (this.allowMinimize.value === false) return;
        this.isMinimize.value = true;
    }

    public unMinimize: Function = (): void => {
        this.isMinimize.value = false;
    }

    public maximize: Function = (): void => {
        if (this.allowMaximize.value === false) return;
        this.isMaximize.value = true;
    }
    public unMaximize: Function = (): void => {
        this.isMaximize.value = false;
    }



    private setOption(option) {
        if (option.hasOwnProperty('title')) this.title.value = option.title;
        if (option.hasOwnProperty('icon')) this.icon.value = option.icon;
        if (option.hasOwnProperty('shortcut')) this.shortcut.value = option.shortcut;


        if (option.hasOwnProperty('allowMaximize')) this.allowMaximize.value = option.allowMaximize;
        if (option.hasOwnProperty('allowMinimize')) this.allowMinimize.value = option.allowMinimize;
        if (option.hasOwnProperty('allowClose')) this.allowClose.value = option.allowClose;
        if (option.hasOwnProperty('allowMove')) this.allowMove.value = option.allowMove;
        if (option.hasOwnProperty('allowResize')) this.allowResize.value = option.allowResize;
        if (option.hasOwnProperty('allowSplit')) this.allowSplit.value = option.allowSplit;

        if (option.hasOwnProperty('isActive')) this.isActive.value = option.isActive;
        if (option.hasOwnProperty('isWindow')) this.isWindow.value = option.isWindow;
        if (option.hasOwnProperty('isTray')) this.isTray.value = option.isTray;
        if (option.hasOwnProperty('isMaximize')) this.isMaximize.value = option.isMaximize;
        if (option.hasOwnProperty('isMinimize')) this.isMinimize.value = option.isMinimize;
        if (option.hasOwnProperty('isSplit')) this.isSplit.value = option.isSplit;
        if (option.hasOwnProperty('splitPosition')) this.splitPosition.value = option.splitPosition;
        if (option.hasOwnProperty('isLockPinterEvents')) this.isLockPinterEvents.value = option.isLockPinterEvents;
        if (option.hasOwnProperty('isSingleton')) this.isSingleton.value = option.isSingleton;

        if (option.hasOwnProperty('width')) this.width.value = option.width;
        if (option.hasOwnProperty('height')) this.height.value = option.height;
        if (option.hasOwnProperty('minWidth')) this.minWidth.value = option.minWidth;
        if (option.hasOwnProperty('minHeight')) this.minHeight.value = option.minHeight;
        if (option.hasOwnProperty('maxWidth')) this.maxWidth.value = option.maxWidth;
        if (option.hasOwnProperty('maxHeight')) this.maxHeight.value = option.maxHeight;
        if (option.hasOwnProperty('x')) this.x.value = option.x;
        if (option.hasOwnProperty('y')) this.y.value = option.y;

        if (option.hasOwnProperty('status')) this.status.value = option.status;
    }

    private setProps(props) {
        if (Object.keys(props).length > 0) this.props = props;
    }


}