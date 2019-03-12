import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { voiceData } from './voice';
import * as _ from 'lodash';

@Component({
    selector: 'app-base-interaction',
    templateUrl: './base-interaction.component.html',
    styleUrls: ['./base-interaction.component.scss']
})
export class BaseInteractionComponent implements OnInit {

    text = {
        Input: 'Input',
        Textarea: 'Textarea',
        Select: 'option'
    }

    voiceData: any;

    constructor(
        private http: HttpClient
    ) {
        this.imgAllData = [];
        this.voiceData = voiceData;
    }

    imgAllData: Array<any>;
    ngOnInit() {
        this.imgAllData = [];
        this.imgData.subscribe((res: any) => {
            if (res && res.length) {
                this.imgAllData = res;
            }
        })
    }

    hbSocket;
    ngAfterViewInit() {
        this.socket = io("http://127.0.0.1:8080");
        // 默认事件
        this.socket.on('connect', (...data) => {
            console.log('connect');
            console.log(...data);
        });
        this.socket.on('event', (...data) => {
            console.log('event');
            console.log(...data);
        });
        this.socket.on('disconnect', (...data) => {
            console.log('disconnect');
            console.log(...data);
        });
        // 自定义事件
        this.socket.on('events', (data) => {
            console.log(data);
        })


        // this.hbSocket = io('wss://api.huobi.pro/ws');
        // this.hbSocket.on('open', () => {
        //     console.log('open');
        //     this.hbsubscribe(this.hbSocket);
        // });
        // this.hbSocket.on('message', (data) => {
        //     console.log(data);
        // })

    }

    hbsubscribe(ws) {
        let symbols = ['xrpbtc', 'bchusdt'];
        // 订阅深度
        // 谨慎选择合并的深度，ws每次推送全量的深度数据，若未能及时处理容易引起消息堆积并且引发行情延时
        for (let symbol of symbols) {
            ws.send(JSON.stringify({
                "sub": `market.${symbol}.depth.step0`,
                "id": `${symbol}`
            }));
        }
        // 订阅K线
        for (let symbol of symbols) {
            ws.send(JSON.stringify({
                "sub": `market.${symbol}.kline.1min`,
                "id": `${symbol}`
            }));
        }
    }

    get() {
        this.http.get('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    put() {
        this.http.put('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    delete() {
        this.http.delete('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    post() {
        this.http.post('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    options() {
        this.http.options('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    patch() {
        this.http.patch('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    head() {
        this.http.head('http://127.0.0.1:666/test', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    dbpost() {
        this.http.post('http://127.0.0.1:666/cats', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    dbget() {
        this.http.get('http://127.0.0.1:666/cats', {
            params: this.text
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

    set5aavPic() {
        this.http.get('http://127.0.0.1:666/pic/picSet', { params: { type: '5aav' } }).subscribe((res: any) => {
            console.log(res);
        })
    }

    setjiandanPic() {
        this.http.get('http://127.0.0.1:666/pic/picSet', { params: { type: 'jiandan' } }).subscribe((res: any) => {
            console.log(res);
        })
    }

    setMmJpg() {
        this.http.get('http://127.0.0.1:666/pic/picSet', { params: { type: 'mmJpg' } }).subscribe((res: any) => {
            console.log(res);
        })
    }

    movieTypeArr = ['movie_sf', 'movie_tx', 'movie_qj', 'movie_yz', 'movie_ll', 'movie_zw'];
    setOneMovie(type) {
        this.http.get('http://127.0.0.1:666/pic/picSet', { params: { type } }).subscribe((res: any) => { })
    }
    movieType;
    changeMovie(event) {
        this.movieType = event;
    }
    setMovie() {
        this.setOneMovie(this.movieType);
    }

    showMoveList = [];
    moveList = [];
    // getMovie() {
    //     let i = 0;
    //     this.movieTypeArr.map(type => {
    //         this.http.get('http://127.0.0.1:666/pic/dataFind', { params: { type } }).subscribe((res: any) => {
    //             if (i < this.movieTypeArr.length - 1) {
    //                 if (res && res.address) {
    //                     this.moveList = this.moveList.concat(res.address);
    //                 }
    //             } else {
    //                 if (res && res.address) {
    //                     this.moveList = this.moveList.concat(res.address);
    //                     this.setMoviePage();
    //                 }
    //             }
    //             i++;
    //         })
    //     })
    // }
    getMovie() {
        this.http.get('http://127.0.0.1:666/pic/dataFind', { params: { type: this.movieType } }).subscribe((res: any) => {
            if (res && res.address) {
                this.moveList = this.moveList.concat(res.address);
                this.setMoviePage();
            }
        })
    }
    moviePageList = [];
    setMoviePage() {
        let maxNum = 500, page;
        page = this.moveList.length / 500;
        // tslint:disable-next-line:no-bitwise
        if (page > (page | 0)) {
            // tslint:disable-next-line:no-bitwise
            page = page | 0 + 1;
        }
        for (let i = 0; i < page + 1; i++) {
            this.moviePageList.push({
                key: 'page' + i,
                value: this.moveList.splice(0, maxNum)
            })
        }
        this.showMoveList = this.moviePageList[0].value;
    }
    choiceMovie(arr) {
        this.showMoveList = [];
        this.showMoveList = arr;
    }

    imgData = new BehaviorSubject<any>(null);
    get5aavPic() {
        this.http.get('http://127.0.0.1:666/pic/dataFind', { params: { type: '5aav' } }).subscribe((res: any) => {
            console.log(res);
            if (res && res.address) {
                this.imgData.next(res.address);
            }
        })
    }

    getJiandanPic() {
        this.http.get('http://127.0.0.1:666/pic/dataFind', { params: { type: 'jiandan' } }).subscribe((res: any) => {
            console.log(res);
            if (res && res.address) {
                this.imgData.next(res.address);
            }
        })
    }

    getMmJpg() {
        this.http.get('http://127.0.0.1:666/pic/dataFind', { params: { type: 'mmJpg' } }).subscribe((res: any) => {
            console.log(res);
            if (res && res.address) {
                this.imgData.next(res.address);
            }
        })
    }

    deleteMmJpg() {
        this.http.delete('http://127.0.0.1:666/pic/one', { params: { type: 'mmJpg' } }).subscribe((res: any) => {
            console.log(res);
        })
    }

    delete5aavPic() {
        this.http.delete('http://127.0.0.1:666/pic/all').subscribe((res: any) => {
            console.log(res);
        })
    }

    tushare() {
        this.http.post('http://127.0.0.1:666/tushare/list', {}).subscribe((res: any) => {
            console.log(res);
        })
    }
    socket;
    sockerInit() {

    }
    sockerEmit() {
        this.socket.emit('events', { name: 'name' }, (data) => {
            console.log(data);
        });
    }

    file;
    picUpload(form) {
        let formData = new FormData(form);
        this.http.post('http://127.0.0.1:666/pic/upload', formData).subscribe((res: any) => {
            console.log(res);
        })
        // console.log(event.target.files);
        // const files = event.target.files;
        // console.log(this.file);
        // const reader = new FileReader();
        // reader.readAsDataURL(files);
        // reader.onload = (e) => {
        //     console.log(e);
        //     this.http.post('http://127.0.0.1:666/pic/upload', { file: e }).subscribe((res: any) => {
        //         console.log(res);
        //     })
        // }
        // console.log(reader.readAsDataURL(files));
        // const uploadData = {
        //     readAsArrayBuffer: reader.readAsArrayBuffer(files),
        //     readAsBinaryString: reader.readAsBinaryString(files),
        //     readAsDataURL: reader.readAsDataURL(files),
        //     readAsText: reader.readAsText(files)
        // }
        // // ArrayBuffer
        // // ERROR TypeError: Failed to execute 'readAsArrayBuffer' on 'FileReader': parameter 1 is not of type 'Blob'.
        // console.log(reader.readAsArrayBuffer(files));
        // // 二进制串
        // // ERROR TypeError: Failed to execute 'readAsBinaryString' on 'FileReader': parameter 1 is not of type 'Blob'.
        // console.log(reader.readAsBinaryString(files));
        // // 结果用data:url的字符串形式表示
        // // ERROR TypeError: Failed to execute 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'.
        // console.log(reader.readAsDataURL(files));
        // // 按字符读取文件内容，结果用字符串形式表示
        // // ERROR TypeError: Failed to execute 'readAsText' on 'FileReader': parameter 1 is not of type 'Blob'.
        // console.log(reader.readAsText(files));
    }
    exportURL = 'http://127.0.0.1:666/pic/dataFind';
    getfile() {
        this.http.get('http://127.0.0.1:666/pic/dataFind', { params: { type: 'file' } }).subscribe((res: any) => {
            console.log(res);
        })
    }

    getHoubiText() {
        this.http.get('http://127.0.0.1:666/huobi/text').subscribe((res: any) => {
            console.log(res);
        })
    }


    synth = window.speechSynthesis;
    changeSelectData;
    changeSelect(event) {
        this.changeSelectData = new SpeechSynthesisUtterance(event);
    }
    readObj;
    read() {
        this.readObj = this.synth.speak(this.changeSelectData);
        console.log(this.synth);
        console.log(this.synth.getVoices());
        console.log(this.synth.paused);
        console.log(this.synth.pause());
        console.log(this.synth.pending);
        console.log(this.synth.resume());
        console.log(this.synth.onvoiceschanged);
    }
    close() {
        this.synth.cancel();
    }
}
