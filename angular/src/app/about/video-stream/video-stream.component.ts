import { Component, OnInit } from '@angular/core';
import { VideoServiceService } from '../../service/video-service/video-service.service';
import { BaseService } from '../../service/base/base.service';

@Component({
    selector: 'app-video-stream',
    templateUrl: './video-stream.component.html',
    styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {

    public videoObj: any;

    constructor(
        private videoServiceService: VideoServiceService,
        private baseService: BaseService
    ) { }

    ngOnInit() {
        // this.defaultVideo();
        setTimeout(() => {
            this.defaultVideo();

            this.videoObj = document.querySelector('.video-demo-2');
        })
    }

    ngAfterViewInit() {
        // this.defaultVideo();
    }

    public prohibitClickSelectCopy() {
        this.baseService.prohibitClickSelectCopy();
    }

    public banCertainKeyboardEvents() {
        this.baseService.banCertainKeyboardEvents();
    }

    public defaultVideo() {
        // console.log(this.videoServiceService.isViedeo());
        let isViedeo = this.videoServiceService.isViedeo();
        if (isViedeo) {
            // this.videoServiceService.defaultVideo(document.querySelector('.video-demo-1'));
            // this.videoServiceService.defaultVideoDemo(document.querySelector('.video-demo-1'));
            // this.videoObj = this.videoServiceService.defaultVideoDemo(document.querySelector('.video-demo-1'));
            // console.log(this.videoObj);
            this.videoObj = this.videoServiceService.defaultXgplayer({ element: document.querySelector('.video-demo-1') });
            console.log(this.videoObj);
        }
    }

    public playPause() {
        console.log('playPause');
        // this.videoServiceService.isDefault(this.videoObj);

        if (this.videoObj.pause) {
            this.videoObj.play();
        } else {
            this.videoObj.pause();
        }
    }

    public makeBig() {
        // this.videoServiceService.isDefault(this.videoObj);

        this.videoObj.width = 560;
    }

    public makeSmall() {
        // this.videoServiceService.isDefault(this.videoObj);

        this.videoObj.width = 320;
    }

    public makeNormal() {
        // this.videoServiceService.isDefault(this.videoObj);

        this.videoObj.width = 420;
    }
}
