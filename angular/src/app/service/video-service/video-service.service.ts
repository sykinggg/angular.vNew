import { Injectable } from '@angular/core';
import Player from 'xgplayer';

@Injectable({
    providedIn: 'root'
})
export class VideoServiceService {

    constructor() { }

    public isViedeo() {
        return 'MediaSource' in window;
    }

    public isDefault(obj) {
        if (!obj) {
            console.warn('初始化video');
            return false;
        }
    }

    public defaultXgplayer(option) {
        let player = new Player({
            el: option.element,
            url: 'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'
        })

        return player;
    }

    public defaultVideoDemo(video) {
        // let video = document.querySelector('#video');
            let mediaSource = new MediaSource();
            video.src = URL.createObjectURL(mediaSource);
            mediaSource.addEventListener('sourceopen', sourceOpen);

            function sourceOpen(e) {
                URL.revokeObjectURL(video.src);
                // 设置 媒体的编码类型
                // let mime = 'video/webm; codecs="vorbis,vp8"';
                let mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                let mediaSource = e.target;
                let sourceBuffer = mediaSource.addSourceBuffer(mime);
                let videoUrl = 'assets/sourceVideo/fbe8e36b64cfcd127f65819b0896930e.mp4';
                fetch(videoUrl).then(function(response) {
                        console.log(response)
                        return response.arrayBuffer();
                    })
                    .then(function(arrayBuffer) {
                        sourceBuffer.addEventListener('updateend', function(e) {
                            console.log(sourceBuffer);
                            console.log(mediaSource);
                            if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
                                mediaSource.endOfStream();
                                // 在数据请求完成后，我们需要调用 endOfStream()。它会改变 MediaSource.readyState 为 ended 并且触发 sourceended 事件。
                                video.play().then(function() {}).catch(function(err) {
                                    console.log(err)
                                });
                            }
                        });
                        sourceBuffer.appendBuffer(arrayBuffer);
                    });
            }
            
            return video;
    }

    public defaultVideo(video) {
        let mediaSource = new MediaSource();
        // let video = document.querySelector('video');
        video.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', sourceOpen);
        function sourceOpen() {
            // 这个奇怪的字符串后面再解释
            let mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

            // 新建一个 sourceBuffer
            let sourceBuffer = mediaSource.addSourceBuffer(mime);

            // 加载一段 chunk，然后 append 到 sourceBuffer 中
            fetchBuffer('assets/sourceVideo/fbe8e36b64cfcd127f65819b0896930e.mp4', buffer => {
                sourceBuffer.appendBuffer(buffer)
            })
        }

        // 以二进制格式请求某个url
        function fetchBuffer(url, callback) {
            let xhr = new XMLHttpRequest;
            xhr.open('get', url);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                callback(xhr.response);
            };
            xhr.send();
        }

        return video;
    }
}