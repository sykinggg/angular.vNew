import { Component, OnInit, Input } from '@angular/core';
import { VideoServiceService } from '../../service/video-service/video-service.service';
import { BaseService } from '../../service/base/base.service';
import { IOption } from '../../service/video-service/video.interface';
import { IMusicOption } from '../../service/video-service/music.interface';
import { IvideoOption } from '../video-stream-video/video-stream-video.component';



@Component({
    selector: 'app-video-stream',
    templateUrl: './video-stream.component.html',
    styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {

    public player: any;

    constructor(
        private videoServiceService: VideoServiceService,
        private baseService: BaseService
    ) { }

    ngOnInit() { }

    ngAfterViewInit() { }

    /**
     *
     * 禁止右键、选择、复制
     * @memberof VideoStreamComponent
     */
    public prohibitClickSelectCopy() {
        this.baseService.prohibitClickSelectCopy();
    }

    /**
     *
     * 禁止某些键盘事件
     * @memberof VideoStreamComponent
     */
    public banCertainKeyboardEvents() {
        this.baseService.banCertainKeyboardEvents();
    }

    public videoOption: IvideoOption = {
        name: 'video111',
        url: 'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
    }

    /**
     *
     * 音频播放器初始化
     * @memberof VideoStreamComponent
     */
    public defaultMusic() {
        const option: IMusicOption = {
            id: 'music-demo-1',
            url: [
                {
                    src: 'src/assets/sourceVideo/祖娅纳惜 - 大氿歌（Cover：ilem）.mp3',
                    name: '祖娅纳惜 - 大氿歌（Cover：ilem）'
                }
            ]
        }
        let music = this.videoServiceService.defaultXglayerMusic(option);
        console.log(music);
    }

    /**
     *
     * 初始化视频下载
     * @memberof VideoStreamComponent
     */
    public download() {
        // 视频下载
        this.videoServiceService.xgplayerDownload(this.player);
    }
}
