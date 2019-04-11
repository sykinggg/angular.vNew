import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

    public qqApiUrl = 'http://127.0.0.1:666/music/qq/';

    constructor(
        public http: HttpClient,
    ) { }

    ngOnInit() {
    }

    /**
     * qq 音乐
     */

    // 轮播图
    qqCarouselData;
    public qqCarousel() {
        this.http.get(this.qqApiUrl + 'carousel').subscribe(res => {
            if (res) {
                this.qqCarouselData = res;
            }
        })
    }

    // 歌单列表
    qqSongListData;
    public qqSongList() {
        this.http.get(this.qqApiUrl + 'songList').subscribe(res => {
            if (res) {
                this.qqSongListData = res;
            }
        })
    }

    // 歌单详情
    qqSongListDetailData;
    public qqSongListDetail() {
        this.http.get(this.qqApiUrl + 'songList/detail').subscribe(res => {
            if (res) {
                this.qqSongListDetailData = res;
            }
        })
    }

    // 歌手数据
    qqSingerData;
    public qqSinger() {
        this.http.get(this.qqApiUrl + 'singer').subscribe(res => {
            if (res) {
                this.qqSingerData = res;
            }
        })
    }

    // 歌手详情
    qqSingerDetailData;
    public qqSingerDetail() {
        this.http.get(this.qqApiUrl + 'singer/detail').subscribe(res => {
            if (res) {
                this.qqSingerDetailData = res;
            }
        })
    }

    // 排行榜
    qqRankData;
    public qqRank() {
        this.http.get(this.qqApiUrl + 'rank').subscribe(res => {
            if (res) {
                this.qqRankData = res;
                console.log(this.qqRankData);
            }
        })
    }

    // 排行榜详情
    qqRankDetailData;
    public qqRankDetail() {
        this.http.get(this.qqApiUrl + 'rank/detail').subscribe(res => {
            if (res) {
                this.qqRankDetailData = res;
            }
        })
    }


}
