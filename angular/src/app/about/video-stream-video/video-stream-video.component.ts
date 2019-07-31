import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { VideoServiceService } from '../../service/video-service/video-service.service';
import { IOption } from '../../service/video-service/video.interface';
import * as $ from 'jquery';

/**
 *
 * video 配置
 * @export
 * @interface IvideoOption
 */
export interface IvideoOption {
    url: string;
    name: string;
}

@Component({
    selector: 'app-video-stream-video',
    templateUrl: './video-stream-video.component.html',
    styleUrls: ['./video-stream-video.component.scss']
})
export class VideoStreamVideoComponent implements OnInit {
    player: any;

    @Input() videoOption: IvideoOption;

    constructor(
        private videoServiceService: VideoServiceService,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.defaultVideo();
    }

    /**
     *
     * 初始化视频播放器
     * @memberof VideoStreamVideoComponent
     */
    public defaultVideo() {
        let isViedeo = this.videoServiceService.isViedeo();
        const option: IOption = {
            required: {
                el: $(this.elementRef.nativeElement).find('.video-demo').get(0),
                url: this.videoOption.url || 'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
            },
            optional: {
                playbackRate: [0.5, 0.75, 1, 1.25, 1.5],
                download: false,
                fluid: true
            }
        };
        if (isViedeo) {
            // 实例化
            this.player = this.videoServiceService.defaultXgplayer(option);
        }
    }

    /**
     *
     * 初始化视频下载
     * @memberof VideoStreamVideoComponent
     */
    public download() {
        // 如果要默认下载 难受下载还得绑定到window上
        window['player'] = this.player;
        // 视频下载
        this.videoServiceService.xgplayerDownload(this.player);
    }

}
