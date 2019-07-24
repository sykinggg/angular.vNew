import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from '../../service/video-service/video-service.service';
import { BaseService } from '../../service/base/base.service';
import { IOption } from '../../service/video-service/video.interface';
import { IMusicOption } from '../../service/video-service/music.interface';

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

    ngOnInit() {
        // this.defaultVideo();
        // setTimeout(() => {
            // this.defaultVideo();
        // })
    }

    ngAfterViewInit() {
        this.defaultVideo();
        this.defaultMusic();
    }

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

    /**
     *
     * 播放器初始化
     * @memberof VideoStreamComponent
     */
    public defaultVideo() {
        let isViedeo = this.videoServiceService.isViedeo();
        const option: IOption = {
            required: {
                el: document.querySelector('.video-demo-1'),
                url: 'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
            },
            optional: {
                playbackRate: [0.5, 0.75, 1, 1.25, 1.5],
                download: false
            }
        };
        if (isViedeo) {
            // 实例化
            this.player = this.videoServiceService.defaultXgplayer(option);
        }
    }

    /**
     *
     * 音频播放器初始化
     * @memberof VideoStreamComponent
     */
    public defaultMusic() {
        const option: IMusicOption = {
            id: 'music-demo-1'
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
