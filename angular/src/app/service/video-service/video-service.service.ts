import { Injectable } from '@angular/core';
import Player from 'xgplayer';
import Music from 'xgplayer-music';
import { IOption, IdanmuContent } from './video.interface';
import { IMusicOptionUrl, IMusicOption } from './music.interface';


// player.on('rotate',function(deg) {
//     console.log(deg);// 旋转时会触发rotate事件，角度有四个值90，180，270，0
// })

@Injectable({
    providedIn: 'root'
})
export class VideoServiceService {

    constructor() { }

    /**
     *
     * 判断是否支持H5 video
     * @returns
     * @memberof VideoServiceService
     */
    public isViedeo() {
        return 'MediaSource' in window;
    }

    /**
     *
     * 开源的西瓜播放器初始化
     * @param {IOption} option
     * @returns
     * @memberof VideoServiceService
     */
    public defaultXgplayer(option: IOption) {
        let data = {};
        data = Object.assign(option.optional, option.required);
        let player = new Player(data);

        // 如果要默认下载 难受下载还得绑定到window上
        window['player'] = player;

        return player;
    }

    /**
     *
     * 进行视频下载操作
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerDownload(player) {
        if (player && player.download && (typeof player.download === 'function')) {
            player.download();
        }
    }

    /**
     *
     * 弹幕初始化并播放(内部默认已调用)
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerDanmuStart(player) {
        player.danmu.start();
    }

    /**
     *
     * 弹幕暂停
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerDanmuPause(player) {
        player.danmu.pause();
    }

    /**
     *
     * 弹幕继续播放
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerDanmuPlay(player) {
        player.danmu.play();
    }

    /**
     *
     * 弹幕停止并消失
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerDanmuStop(player) {
        player.danmu.stop();
    }

    /**
     *
     * 发送弹幕
     * @param {*} player
     * @param {IdanmuContent} option
     * @memberof VideoServiceService
     */
    public xgplayerDanmuSendComment(player, option: IdanmuContent) {
        player.danmu.sendComment(option);
    }

    /**
     *
     * 按照id改变某一个弹幕的持续显示时间
     * @param {*} player
     * @param {string} id
     * @param {number} duration
     * @memberof VideoServiceService
     */
    public xgplayerDanmuSetCommentDuration(player, id: string, duration: number) {
        player.danmu.setCommentDuration(id, duration);
    }

    /**
     *
     * 改变所有已加入队列弹幕的持续显示时间
     * @param {*} player
     * @param {string} mode
     * @param {number} duration
     * @memberof VideoServiceService
     */
    public xgplayerDanmuSetAllDuration(player, mode: string, duration: number) {
        player.danmu.setAllDuration(mode, duration);
    }

    /**
     *
     * 改变某一个弹幕的id
     * @param {*} player
     * @param {string} oldID
     * @param {string} newID
     * @memberof VideoServiceService
     */
    public xgplayerDanmuSetCommentID(player, oldID: string, newID: string) {
        player.danmu.setCommentID(oldID, newID);
    }

    /**
     *
     * 屏蔽某一类弹幕(参数可选值 scroll | top | bottom | color)
     * @param {*} player
     * @param {string} mode
     * @memberof VideoServiceService
     */
    public xgplayerDanmuHide(player, mode: string) {
        player.danmu.hide(mode);
    }

    /**
     *
     * 显示某一类弹幕(参数可选值 scroll | top | bottom | color)
     * @param {*} player
     * @param {string} mode
     * @memberof VideoServiceService
     */
    public xgplayerDanmuShow(player, mode: string) {
        player.danmu.show(mode);
    }

    /**
     *
     * 添加标记
     * @param {*} player
     * @param {number} time
     * @memberof VideoServiceService
     */
    public xgplayerAddProgressDot(player, time: number) {
        player.addProgressDot(time);
    }

    /**
     *
     * 删除标记
     * @param {*} player
     * @param {number} time
     * @memberof VideoServiceService
     */
    public xgplayerRemoveProgressDot(player, time: number) {
        player.removeProgressDot(time);
    }

    /**
     *
     * 删除所有标记
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerRemoveAllProgressDot(player) {
        player.removeAllProgressDot();
    }

    /**
     *
     * 初始化音频播放器
     * @param {IMusicOption} option
     * @returns
     * @memberof VideoServiceService
     */
    public defaultXglayerMusic(option: IMusicOption) {
        let music = new Music(option);

        // 如果要默认下载 难受下载还得绑定到window上
        window['music'] = music;

        return music;
    }

    /**
     *
     * 设置播放模式
     * @example
     * 数字类型，0 表示顺序播放，1 表示随机播放，2 表示循环播放
     * @param {*} player
     * @param {number} number
     * @memberof VideoServiceService
     */
    public xgplayerMusicMode(player, number: number) {
        player.mode = number;
    }

    /**
     *
     * 设置播放模式
     * @example
     * 设置歌曲快进或后退的时间间隔，单位为秒，默认15秒
     * @param {*} player
     * @param {number} number
     * @memberof VideoServiceService
     */
    public xgplayerMusicTimeScale(player, number: number) {
        player.timeScale = number;
    }

    /**
     *
     * 向播放列表中加入歌曲
     * @example
     * 对象类型，其属性src的值表示歌曲资源地址，属性name的值表示歌曲名
     * @param {*} player
     * @param {IMusicOptionUrl} item
     * @memberof VideoServiceService
     */
    public xgplayerMusicAdd(player, item: IMusicOptionUrl) {
        player.add(item);
    }

    /**
     *
     * 从播放列表中移除歌曲
     * @example
     * 字符串类型，表示所要移除歌曲的资源地址
     * @param {*} player
     * @param {IMusicOptionUrl['src']} url
     * @memberof VideoServiceService
     */
    public xgplayerMusicRemove(player, url: IMusicOptionUrl['src']) {
        player.remove(url);
    }

    /**
     *
     * 随机获取播放列表中某一首歌曲
     * @example
     * 歌曲对象，其属性src的值表示歌曲资源地址，属性name的值表示歌曲名
     * @param {*} player
     * @returns {IMusicOptionUrl}
     * @memberof VideoServiceService
     */
    public xgplayerMusicRandom(player): IMusicOptionUrl {
        let returnData: IMusicOptionUrl;
        returnData = player.random();
        return returnData;
    }

    /**
     *
     * 播放下一首歌曲
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicNext(player): void {
        player.next();
    }

    /**
     *
     * 播放上一首歌曲
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicPrev(player): void {
        player.prev();
    }

    /**
     *
     * 歌曲快进timeScale秒
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicForward(player): void {
        player.forward();
    }

    /**
     *
     * 歌曲后退timeScale秒
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicBackward(player): void {
        player.backward();
    }

    /**
     *
     * 发生切换歌曲事件
     * @example
     * 新歌曲对象，src歌曲资源地址，name歌曲名，vid歌曲唯一编号，poster歌曲专辑封面图
     * @param {*} player
     * @param {IMusicOptionUrl} item
     * @memberof VideoServiceService
     */
    public xgplayerMusicChange(player, item: IMusicOptionUrl): void {
        player.change(item);
    }

    /**
     *
     * 可视化频谱
     * @example
     * 通过页面上的Canvas标签和Html5 AudioContext对象
     * 提供了柱状和波形两种可视化频谱指示器(也可以阅读播放器源码开发其它模式的频谱指示器)
     * 在实例化音乐播放器对象后就可以通过player.analyze(canvasDom)方法获取频谱指示器对象
     * 
     *  频谱指示器属性
     *  mode    频谱指示器模式              'bars'为柱状显示，'wave'为波形显示
     *  size    用于配置确定频域的FFT的大小
     *  status  频谱指示器功能是否开启       'on'为开启状态，'off'为关闭状态
     * @param {*} player
     * @param {Element} dom
     * @returns {*}
     * @memberof VideoServiceService
     */
    public defaultXgplayerMusicAnalyze(player, dom: Element): any {
        return player.analyer(dom);
    }

    /**
     *
     * 设置频谱指示器模式
     * @example
     * 字符串，'bars'为柱状频谱指示器(默认)，'wave'为波形频谱指示器
     * @param {*} an
     * @param {string} type
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeMode(an, type: string) {
        an.mode = type;
    }

    /**
     *
     * 用于配置确定频域的FFT的大小
     * @example
     * 数字，必须是从32到32768范围内的2的非零幂
     * @param {*} an
     * @param {number} num
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeSize(an, num: number) {
        an.size = num;
    }

    /**
     *
     * 歌词滚动显示功能初始化
     * @example
     * 提供页面上已存在的DOM元素作为歌词的容器
     * @param {*} player
     * @param {string} str
     * @param {Element} dom
     * @returns {*}
     * @memberof VideoServiceService
     */
    public defaultXgplayerMusicAnalyzeLyric(player, str: string, dom: Element): any {
        player.lyric(str, dom);
        this.xgplayerMusicAnalyzeLyricShow(player);
        return player;
    }

    /**
     *
     * 显示歌词
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricShow(player) {
        player.lyric.show();
    }

    /**
     *
     * 每行歌词之间的跳转时间点控制参数
     * @param {*} player
     * @param {number} [num]
     * @returns {number}
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricInterval(player, num?: number): number {
        if (!num) {
            player.lyric.interval = num;
        }
        return player.lyric.interval;
    }

    /**
     *
     * 手动同步歌词的总偏差，单位为秒
     * @param {*} player
     * @param {number} [num]
     * @returns {number}
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricOffset(player, num?: number): number {
        if (!num) {
            player.lyric.offset = num;
        }
        return player.lyric.offset;
    }

    /**
     *
     * 手动同步歌词的调整步长，单位为秒
     * @param {*} player
     * @param {number} [num]
     * @returns {number}
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricOffsetScale(player, num?: number): number {
        if (!num) {
            player.lyric.offsetScale = num;
        }
        return player.lyric.offsetScale;
    }

    /**
     *
     * 用于手动同步歌词
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricSynchronize(player) {
        player.lyric.offset = player.lyric.offsetScale;
    }

    /**
     *
     * 调整每句歌词的显示时间，使之按照时间匀速显示
     * @param {*} player
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricAdjust(player) {
        player.lyric.adjust();
    }

    /**
     *
     * 获取播放时间所对应的相关歌词
     * @example
     * 数字，表示歌曲播放时间，单位为秒
     * 字符串数组，歌曲播放时间所对应的歌词
     * @param {*} player
     * @param {number} num
     * @memberof VideoServiceService
     */
    public xgplayerMusicAnalyzeLyricFind(player, num: number) {
        player.lyric.find(num);
    }

    /**
     * 原生的很迷
     */
    // public defaultVideoDemo(video) {
    //     // let video = document.querySelector('#video');
    //         let mediaSource = new MediaSource();
    //         video.src = URL.createObjectURL(mediaSource);
    //         mediaSource.addEventListener('sourceopen', sourceOpen);

    //         function sourceOpen(e) {
    //             URL.revokeObjectURL(video.src);
    //             // 设置 媒体的编码类型
    //             // let mime = 'video/webm; codecs="vorbis,vp8"';
    //             let mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    //             let mediaSource = e.target;
    //             let sourceBuffer = mediaSource.addSourceBuffer(mime);
    //             let videoUrl = 'assets/sourceVideo/fbe8e36b64cfcd127f65819b0896930e.mp4';
    //             fetch(videoUrl).then(function(response) {
    //                     console.log(response)
    //                     return response.arrayBuffer();
    //                 })
    //                 .then(function(arrayBuffer) {
    //                     sourceBuffer.addEventListener('updateend', function(e) {
    //                         console.log(sourceBuffer);
    //                         console.log(mediaSource);
    //                         if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
    //                             mediaSource.endOfStream();
    //                             // 在数据请求完成后，我们需要调用 endOfStream()。它会改变 MediaSource.readyState 为 ended 并且触发 sourceended 事件。
    //                             video.play().then(function() {}).catch(function(err) {
    //                                 console.log(err)
    //                             });
    //                         }
    //                     });
    //                     sourceBuffer.appendBuffer(arrayBuffer);
    //                 });
    //         }

    //         return video;
    // }

    // public defaultVideo(video) {
    //     let mediaSource = new MediaSource();
    //     // let video = document.querySelector('video');
    //     video.src = URL.createObjectURL(mediaSource);
    //     mediaSource.addEventListener('sourceopen', sourceOpen);
    //     function sourceOpen() {
    //         // 这个奇怪的字符串后面再解释
    //         let mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

    //         // 新建一个 sourceBuffer
    //         let sourceBuffer = mediaSource.addSourceBuffer(mime);

    //         // 加载一段 chunk，然后 append 到 sourceBuffer 中
    //         fetchBuffer('assets/sourceVideo/fbe8e36b64cfcd127f65819b0896930e.mp4', buffer => {
    //             sourceBuffer.appendBuffer(buffer)
    //         })
    //     }

    //     // 以二进制格式请求某个url
    //     function fetchBuffer(url, callback) {
    //         let xhr = new XMLHttpRequest;
    //         xhr.open('get', url);
    //         xhr.responseType = 'arraybuffer';
    //         xhr.onload = function () {
    //             callback(xhr.response);
    //         };
    //         xhr.send();
    //     }

    //     return video;
    // }
}
