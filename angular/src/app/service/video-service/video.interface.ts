/**
 *
 * 视频播放器配置
 * @export
 * @interface IOption
 */
export interface IOption {
    required?: Irequired;
    optional?: IOptional;
}

/**
 *
 * 必填选项
 * @export
 * @interface Irequired
 */
export interface Irequired {

    /**
     *
     * dom id 选择器
     * @type {string}
     * @memberof Irequired
     */
    id?: string;

    /**
     *
     * dom本身或者id
     * @type {(string | Element)}
     * @memberof Irequired
     */
    el?: string | Element;

    /**
     *
     * 视频源 单一或者视频集
     * @type {(string | Array<any>)}
     * @memberof Irequired
     */
    url?: string | Array<any>
}

/**
 *
 * 可填选项
 * @export
 * @interface IOptional
 */
export interface IOptional {

    /**
     *
     * 宽度
     * @type {number}
     * @memberof IOptional
     */
    width?: number;

    /**
     *
     * 高度
     * @type {number}
     * @memberof IOptional
     */
    height?: number;

    /**
     *
     * 流式布局
     * @type {boolean}
     * @memberof IOptional
     */
    fluid?: boolean;

    /**
     *
     * 音量 0 ~ 1
     * @type {number}
     * @memberof IOptional
     */
    volume?: number;

    /**
     *
     * 自动播放
     * @type {boolean}
     * @memberof IOptional
     */
    autoplay?: boolean;

    /**
     *
     * 配合autoplay 进行自动播放设置
     * @type {boolean}
     * @memberof IOptional
     */
    autoplayMuted?: boolean;

    /**
     *
     * 初始化显示视频首帧
     * @type {boolean}
     * @memberof IOptional
     */
    videoInit?: boolean;

    /**
     *
     * 封面图
     * @type {string}
     * @memberof IOptional
     */
    poster?: string;

    /**
     *
     * 倍速播放
     * @type {Array<number>}
     * @memberof IOptional
     */
    playbackRate?: Array<number>;

    /**
     *
     * 设置可选的倍速集合
     * @type {number}
     * @memberof IOptional
     */
    defaultPlaybackRate?: number;

    /**
     *
     * 视频旋转
     * @type {IRotate}
     * @memberof IOptional
     */
    rotate?: IRotate;

    /**
     *
     * 预览
     * @type {Ithumbnail}
     * @memberof IOptional
     */
    thumbnail?: Ithumbnail;

    /**
     *
     * 下一集
     * @type {IplayNext}
     * @memberof IOptional
     */
    playNext?: IplayNext;

    /**
     *
     * 视频下载 设置download控件显示
     * @type {boolean}
     * @memberof IOptional
     */
    download?: boolean;

    /**
     *
     * 弹幕
     * @type {Idanmu}
     * @memberof IOptional
     */
    danmu?: Idanmu;

    /**
     *
     * 视频加载页logo
     * @type {IenterLogo}
     * @memberof IOptional
     */
    enterLogo?: IenterLogo;

    /**
     *
     * 视频加载页背景
     * @type {IenterBg}
     * @memberof IOptional
     */
    enterBg?: IenterBg;

    /**
     *
     * 视频加载页加载特效
     * @type {IenterTips}
     * @memberof IOptional
     */
    enterTips?: IenterTips;

    /**
     *
     * 控件样式 目前已支持对画面中央按钮(播放、暂停、重播)的svg path进行配置
     * @type {IcenterBtn}
     * @memberof IOptional
     */
    centerBtn?: IcenterBtn;

    /**
     *
     * 外挂字幕设置
     * @type {Array<ItextTrack>}
     * @memberof IOptional
     */
    textTrack?: Array<ItextTrack>;

    /**
     *
     * 字幕相关CSS样式配置
     * @example
     *  textTrackStyle: {
     *      "background-color": "#ff0",
     *      "color": "#000",
     *      "font-size": "26px",
     *  }
     * @type {*}
     * @memberof IOptional
     */
    textTrackStyle?: any;

    /**
     *
     * 外挂字幕控件的触发方式
     * @example 
     * 'hover' | 'click'
     * @type {string}
     * @memberof IOptional
     */
    textTrackActive?: string;
    
    /**
     *
     * 画中画
     * @example
     * 画中画功能支持用户在浏览网页其它内容时继续以小窗的形式观看视频，同时可以拖拽改变小窗在页面中的fix位置
     * true | false
     * @type {boolean}
     * @memberof IOptional
     */
    pip?: boolean;

    /**
     *
     * 网页样式全屏
     * @example
     * 样式全屏功能不会隐藏当前浏览器的标签栏，导航栏，只是在当前页面内部全屏显示
     * true | false
     * @type {boolean}
     * @memberof IOptional
     */
    cssFullscreen?: boolean;

    /**
     *
     * 截图
     * @example
     * 截图功能支持用户对当前视频播放窗口进行即时截屏，截图尺寸即为当前视频播放窗口的尺寸，截图默认为 .png 格式
     * true | false
     * @type {boolean}
     * @memberof IOptional
     */
    screenShot?: boolean;

    /**
     *
     * 预览本地视频
     * @example
     * 支持用户在线预览本地视频
     * @type {Ipreview}
     * @memberof IOptional
     */
    preview?: Ipreview;

    /**
     *
     * 进度条特殊点标记
     * @example
     * 支持在进度条上标出重要的位置
     * @type {Array<IprogressDot>}
     * @memberof IOptional
     */
    progressDot?: Array<IprogressDot>;

    /**
     *
     * 键盘快捷键
     * @example
     * 按 → 键快进10秒， 
     * 按 ← 键后退10秒，
     * 按 ↑ 键调高音量，
     * 按 ↓ 键调低音量，
     * 按 space 键切换播放/暂停状态
     * @type {string}
     * @memberof IOptional
     */
    keyShortcut?: string;

    /**
     *
     * 插件生效前执行
     * @example
     * 播放器使用自执行的插件机制，如需要在插件生效前执行某些方法
     * 可将相关方法写在execBeforePluginsCall配置项数组中
     * @type {Array<any>}
     * @memberof IOptional
     */
    execBeforePluginsCall?: Array<any>;

    /**
     *
     * video触发click事件后视频切换播放/暂停状态
     * @example
     * 可通过closeVideoClick关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closeVideoClick?: boolean;

    /**
     *
     * video触发dblclick事件后进入/退出全屏
     * @example
     * 可通过closeVideoDblclick关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closeVideoDblclick?: boolean;

    /**
     *
     * 移动端下默认video触发touchend事件后视频切换播放/暂停状态
     * @example
     * 可通过closeVideoTouch关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closeVideoTouch?: boolean;

    /**
     *
     * 鼠标移出播放器范围时触发blur事件
     * @example
     * 可通过closePlayerBlur关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closePlayerBlur?: boolean;

    /**
     *
     * 实现延迟触发blur事件
     * @type {number}
     * @memberof IOptional
     */
    leavePlayerTime?: number;

    /**
     *
     * 鼠标移出播放器控制条范围时触发focus事件
     * @example
     * 可通过closeControlsBlur关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closeControlsBlur?: boolean;

    /**
     *
     * 播放器范围时移动鼠标时触发video focus
     * @example
     * 可通过closeFocusVideoFocus关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closeFocusVideoFocus?: boolean;

    /**
     *
     * 播放器触发play事件时触发video focus
     * @example
     * 可通过closePlayVideoFocus关闭
     * @type {boolean}
     * @memberof IOptional
     */
    closePlayVideoFocus?: boolean;

    /**
     *
     * 清晰度切换配置
     * @example
     * player.emit('resourceReady', [{name: '高清', url: 'url1'}, {name: '超清', url: 'url2'}]);
     * 如果不想使用清晰度切换功能，不激活 resourceReady 事件就可以
     * 如果视频地址列表只有一个地址，清晰度切换控件也会自动关闭
     * @type {string}
     * @memberof IOptional
     */
    definitionActive?: string;

    /**
     *
     * 关闭内置控件
     * @example
     * xgplayer播放器对于原生video的基本功能进行了优化和封装
     * 如果不想使用xgplayer内置控件，可以通过ignores配置项关闭，使用自己开发的相同功能插件进行替换
     * ['time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'poster', 'progress', 'replay', 'start', 'volume']
     * time	        当前播放时间/视频时长
     * definition   清晰度切换
     * error        报错提示
     * fullscreen   全屏切换
     * i18n         多语种切换
     * loading      加载提示
     * mobile       手机交互
     * pc           桌面视频交互
     * play         控制条的播放、暂停按钮
     * poster       封面图插件
     * progress     视频进度条
     * replay       重播交互与提示
     * start        初始化播放按钮
     * volume       音量控制
     * @type {Array<string>}
     * @memberof IOptional
     */
    ignores?: Array<string>;

    /**
     *
     * 关闭控制条
     * @example
     * 播放器控制条由播放/暂停、定位、音量、全屏切换等元素组成
     * 可通过controls:false 将其全部关闭
     * true | false
     * @type {boolean}
     * @memberof IOptional
     */
    controls?: boolean;

    /**
     *
     * 控制条选项配置
     * @example
     * 选择关闭部分控制条选项可以通过配置controlsList选项实现
     * ['nodownload','nofullscreen','noremoteplayback']
     * @type {Array<string>}
     * @memberof IOptional
     */
    controlsList?: Array<string>;

    /**
     *
     * 播放镜像
     * @example
     * 开启airplay选项可以将iOS设备上的视频传送到支持airplay的设备上进行播放
     * true | false
     * @type {boolean}
     * @memberof IOptional
     */
    airplay?: boolean;

    /**
     *
     * 国际化
     * @example
     * 支持中文、英文、日文
     * 'zh-cn' | 'en' | 'jp'
     * @type {string}
     * @memberof IOptional
     */
    lang?: string;

    /**
     *
     * 白名单
     * @example
     * 为了安全起见，播放器在手机上会关掉自定义UI功能
     * 可以通过白名单的方式开启此项功能
     * whitelist是数组，数组的每项值可以是字符串、正则表达式、函数（箭头函数）均可，
     * 字符串和正则表达式都是对navigator.userAgent来判断，函数不限
     * @type {Array<string>}
     * @memberof IOptional
     */
    whitelist?: Array<string>;
}

/**
 *
 * 特殊动态标记点时间
 * @export
 * @interface IprogressDot
 */
export interface IprogressDot {
    /**
     *
     * 时间
     * @type {number}
     * @memberof IprogressDot
     */
    time: number;
}

/**
 *
 * 预览本地视频
 * @example
 * 支持用户在线预览本地视频
 * @export
 * @interface Ipreview
 */
export interface Ipreview {

    /**
     *
     * Dom元素
     * @example
     * 用于放置上传视频文件的相关控件
     * @type {Element}
     * @memberof Ipreview
     */
    uploadEl: Element;
}

/**
 *
 * 视频旋转
 * @export
 * @interface IRotate
 */
export interface IRotate {
    /**
     *
     * 只旋转内部video  当innerRotate为false时，播放器的宽高需要与视频的分辨率一致
     * @type {boolean}
     * @memberof IRotate
     */
    innerRotate?: boolean;

    /**
     *
     * 旋转方向是否为顺时针
     * @type {boolean}
     * @memberof IRotate
     */
    clockwise?: boolean;
}

/**
 *
 * 预览
 *  用户将鼠标指针移动到进度条某处时进度条上方会出现该时刻的视频预览图
 *  服务端提供sprite图(由多张视频预览小图组成)作为预览图资源
 * @export
 * @interface Ithumbnail
 */
export interface Ithumbnail {

    /**
     *
     * 该视频资源所需预览小图数量
     * @type {number}
     * @memberof Ithumbnail
     */
    pic_num?: number;

    /**
     *
     * 预览小图宽度
     * @type {number}
     * @memberof Ithumbnail
     */
    width?: number;

    /**
     *
     * 预览小图高度
     * @type {number}
     * @memberof Ithumbnail
     */
    height?: number;

    /**
     *
     * sprite图每列的预览小图数量
     * @type {number}
     * @memberof Ithumbnail
     */
    col?: number;

    /**
     *
     * sprite图每行的预览小图数量
     * @type {number}
     * @memberof Ithumbnail
     */
    row?: number;

    /**
     *
     * sprite图的源地址数组
     * @type {Array<string>}
     * @memberof Ithumbnail
     */
    urls?: Array<string>;
}

/**
 *
 * 下一集
 *  自动播放下一集
 * @export
 * @interface IplayNext
 */
export interface IplayNext {
    urlList?: Array<string>;
}

/**
 *
 * 弹幕
 * 西瓜播放器通过算法设计实现了多条弹幕之间的不重叠和不碰撞
 *      屏蔽类型	滚动弹幕 顶部弹幕 底部弹幕 彩色弹幕
 *      显示区域    弹幕显示区为播放器可视区顶部到底部, 0 1/4屏 1/2屏 3/4屏 全屏
 *      不透明度    控制显示弹幕的透明度
 *      弹幕速度    通过显示时长控制弹幕速度,慢[15000ms] 中[10000ms] 快[5000ms]
 *      字体大小    控制弹幕字体大小, 小[10px] 中[20px] 大[30px]
 * @export
 * @interface Idanmu
 */
export interface Idanmu {

    /**
     *
     * 弹幕面板
     * @type {boolean}
     * @memberof Idanmu
     */
    panel?: boolean;

    /**
     *
     * 弹幕数组
     * @type {Array<IdanmuContent>}
     * @memberof Idanmu
     */
    comments?: Array<IdanmuContent>;

    /**
     *
     * 弹幕显示区域
     * @type {IdanmuArea}
     * @memberof Idanmu
     */
    area?: IdanmuArea;

    /**
     *
     * 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
     * @type {boolean}
     * @memberof Idanmu
     */
    closeDefaultBtn?: boolean;

    /**
     *
     * 开启此项后弹幕不会初始化，默认初始化弹幕
     * @type {boolean}
     * @memberof Idanmu
     */
    defaultOff?: boolean;
}

/**
 *
 * 弹幕显示区域
 * @export
 * @interface IdanmuArea
 */
export interface IdanmuArea {
    /**
     *
     * 区域顶部到播放器顶部所占播放器高度的比例
     * @type {number}
     * @memberof IdanmuArea
     */
    start?: number;

    /**
     *
     * 区域底部到播放器顶部所占播放器高度的比例
     * @type {number}
     * @memberof IdanmuArea
     */
    end?: number;
}

/**
 * 弹幕数组
 * @export
 * @interface IdanmuContent
 */
export interface IdanmuContent {
    /**
     *
     * 弹幕持续显示时间,毫秒(最低为5000毫秒)
     * @type {number}
     * @memberof IdanmuContent
     */
    duration?: number;

    /**
     *
     * 弹幕id，需唯一
     * @type {string}
     * @memberof IdanmuContent
     */
    id?: string;

    /**
     *
     * 弹幕出现时间，毫秒
     * @type {number}
     * @memberof IdanmuContent
     */
    start?: number;

    /**
     *
     * 该条弹幕优先显示，默认false
     * @type {boolean}
     * @memberof IdanmuContent
     */
    prior?: boolean;

    /**
     *
     * 该条弹幕为彩色弹幕，默认false
     * @type {boolean}
     * @memberof IdanmuContent
     */
    color?: boolean;

    /**
     *
     * 弹幕文字内容
     * @type {string}
     * @memberof IdanmuContent
     */
    txt?: string;

    /**
     *
     * 弹幕自定义样式
     * @type {IdanmuContentStyle}
     * @memberof IdanmuContent
     */
    style?: IdanmuContentStyle;

    /**
     *
     * 显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
     * @type {string}
     * @memberof IdanmuContent
     */
    mode?: string;

    /**
     *
     * 直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt和style
     * @type {Element}
     * @memberof IdanmuContent
     */
    el?: Element;
}

/**
 *
 * 弹幕自定义样式
 * @export
 * @interface IdanmuContentStyle
 */
export interface IdanmuContentStyle {
    /**
     *
     * 颜色
     * @type {string}
     * @memberof IdanmuContentStyle
     */
    color?: string;

    /**
     *
     * 字体大小
     * @type {string}
     * @memberof IdanmuContentStyle
     */
    fontSize?: string,

    /**
     *
     * 边框
     * @type {string}
     * @memberof IdanmuContentStyle
     */
    border?: string,

    /**
     *
     * 边框圆角
     * @type {string}
     * @memberof IdanmuContentStyle
     */
    borderRadius?: string,

    /**
     *
     * 内边距
     * @type {string}
     * @memberof IdanmuContentStyle
     */
    padding?: string,

    /**
     *
     * 背景颜色
     * @type {string}
     * @memberof IdanmuContentStyle
     */
    backgroundColor?: string
}

/**
 *
 * 视频加载页logo
 * @export
 * @interface IenterLogo
 */
export interface IenterLogo {
    /**
     *
     * logo 地址
     * @type {string}
     * @memberof IenterLogo
     */
    url?: string;

    /**
     *
     * logo 宽度
     * @type {number}
     * @memberof IenterLogo
     */
    width?: number;

    /**
     *
     * logo 高度
     * @type {number}
     * @memberof IenterLogo
     */
    height?: number;
}

/**
 *
 * 视频加载页背景
 * @export
 * @interface IenterBg
 */
export interface IenterBg {

    /**
     *
     * 背景颜色
     * @type {string}
     * @memberof IenterBg
     */
    color?: string;
}

/**
 *
 * 视频加载页加载特效
 * @export
 * @interface IenterTips
 */
export interface IenterTips {
    /**
     *
     * 背景特效设置
     * @type {string}
     * @memberof IenterTips
     */
    background?: string;
}

/**
 *
 * 控件样式
 * 目前已支持对画面中央按钮(播放、暂停、重播)的svg path进行配置
 * @export
 * @interface IcenterBtn
 */
export interface IcenterBtn {
    /**
     *
     * svg 设置 暂停 样式
     * @type {string}
     * @memberof IcenterBtn
     */
    pausePath?: string;

    /**
     *
     * svg 设置 播放 样式
     * @type {string}
     * @memberof IcenterBtn
     */
    playPath?: string;

    /**
     *
     * svg 设置 重播 样式
     * @type {string}
     * @memberof IcenterBtn
     */
    replayPath?: string;

    /**
     *
     * img 类型 设置
     * @type {string}
     * @memberof IcenterBtn
     */
    type?: string;

    /**
     *
     * 自定义图片设置
     * @type {IcenterBtnUrl}
     * @memberof IcenterBtn
     */
    url?: IcenterBtnUrl;

    /**
     *
     * 自定义图片 宽度
     * @type {string}
     * @memberof IcenterBtn
     */
    width?: string;

    /**
     *
     * 自定义图片 高度
     * @type {string}
     * @memberof IcenterBtn
     */
    height?: string;
}

/**
 *
 * 自定义图片设置
 * @export
 * @interface IcenterBtnUrl
 */
export interface IcenterBtnUrl {
    /**
     *
     * 自定义图片 播放 样式
     * @type {string}
     * @memberof IcenterBtnUrl
     */
    play?: string;

    /**
     *
     * 自定义图片 暂停 样式
     * @type {string}
     * @memberof IcenterBtnUrl
     */
    pause?: string;

    /**
     *
     * 自定义图片 重播 样式
     * @type {string}
     * @memberof IcenterBtnUrl
     */
    replay?: string;
}

/**
 *
 * 外挂字幕设置
 * @export
 * @interface ItextTrack
 */
export interface ItextTrack {
    /**
     *
     * 字幕文件的URL，必需
     * @type {string}
     * @memberof ItextTrack
     */
    src?: string;
    /**
     *
     * 字幕类型，可选
     * @type {string}
     * @memberof ItextTrack
     */
    kind?: string;
    /**
     *
     * 字幕标签，必需
     * @type {string}
     * @memberof ItextTrack
     */
    label?: string;
    /**
     *
     * 字幕文本语言，可选
     * @type {string}
     * @memberof ItextTrack
     */
    srclang?: string;
    /**
     *
     * 默认字幕
     * @type {boolean}
     * @memberof ItextTrack
     */
    default?: boolean;
}
