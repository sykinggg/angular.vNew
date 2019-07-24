/**
 *
 * 音频数据结构
 * @export
 * @interface IMusicOption
 */
export interface IMusicOption {
    /**
     *
     * 播放器容器id
     * @type {string}
     * @memberof IMusicOption
     */
    id?: string;

    /**
     *
     * 音频对象集合
     * @type {Array<IMusicOptionUrl>}
     * @memberof IMusicOption
     */
    url?: Array<IMusicOptionUrl>

    /**
     *
     * 音量大小
     * @type {number}
     * @memberof IMusicOption
     */
    volume?: number;

    /**
     *
     * 音频播放器宽度
     * @type {number}
     * @memberof IMusicOption
     */
    width?: number;

    /**
     *
     * 音频播放器高度
     * @type {number}
     * @memberof IMusicOption
     */
    height?: number;

    /**
     *
     * 音频音量控制
     * @example
     * true开启音量控制，false关闭音量控制。默认false
     * @type {boolean}
     * @memberof IMusicOption
     */
    volumeShow?: boolean;

    /**
     *
     * 开启预加载下一曲功能
     * @example
     * 当前歌曲播放到一半或列表循环顺序发生改变时会提前请求下一曲并存储在IndexedDB中
     * @type {boolean}
     * @memberof IMusicOption
     */
    preloadNext?: boolean;

    /**
     *
     * 当前播放模式
     * @example
     * 'order'为顺序播放, 'random'为随机播放, 'loop'为循环播放
     * @type {string}
     * @memberof IMusicOption
     */
    mode?: string;

    /**
     *
     * 歌曲快进或后退的时间间隔
     * @example
     * 单位为秒，默认15秒
     * @type {number}
     * @memberof IMusicOption
     */
    timeScale?: number;
}

/**
 *
 * 音频对象数组
 * @export
 * @interface IMusicOptionUrl
 */
export interface IMusicOptionUrl {

    /**
     *
     * 音频资源地址
     * @type {string}
     * @memberof IMusicOptionUrl
     */
    src?: string;

    /**
     *
     * 音频名称
     * @type {string}
     * @memberof IMusicOptionUrl
     */
    name?: string;

    /**
     *
     * 音频唯一编号
     * @type {string}
     * @memberof IMusicOptionUrl
     */
    vid?: string;

    /**
     *
     * 音频专辑封面图
     * @type {string}
     * @memberof IMusicOptionUrl
     */
    poster?: string;
}
