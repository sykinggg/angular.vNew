import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-css-special',
    templateUrl: './css-special.component.html',
    styleUrls: ['./css-special.component.scss']
})
export class CssSpecialComponent implements OnInit {

    private cssSpectalData: any[];

    constructor() { }

    ngOnInit() {
        this.defaultCssSpectalData();
    }

    private defaultCssSpectalData() {
        this.cssSpectalData = [
            { id: 'square', name: '正方形' },
            { id: 'rectangle', name: '长方形' },
            { id: 'circle', name: '圆形' },
            { id: 'oval', name: '椭圆形' },
            { id: 'triangle-up', name: '上三角' },
            { id: 'triangle-down', name: '下三角' },
            { id: 'triangle-left', name: '左三角' },
            { id: 'triangle-right', name: '右三角' },
            { id: 'triangle-topleft', name: '左上角' },
            { id: 'triangle-topright', name: '右上角' },
            { id: 'triangle-bottomleft', name: '左下角' },
            { id: 'triangle-bottomright', name: '右下角' },
            { id: 'curvedarrow', name: '箭头' },
            { id: 'trapezoid', name: '梯形' },
            { id: 'parallelogram', name: '平行四边形' },
            { id: 'star-six', name: '星星（6角）' },
            { id: 'star-five', name: '星星（5角）' },
            { id: 'pentagon', name: '五边形' },
            { id: 'hexagon', name: '六边形' },
            { id: 'octagon', name: '八边形' },
            { id: 'heart', name: '爱心' },
            { id: 'infinity', name: '无穷大' },
            { id: 'diamond', name: '菱形' },
            { id: 'diamond-shield', name: '钻石1' },
            { id: 'cut-diamond', name: '钻石2' },
            { id: 'diamond-narrow', name: '钻戒' },
            { id: 'egg', name: '鸡蛋' },
            { id: 'pacman', name: '吃豆人' },
            { id: 'talkbubble', name: '对话泡泡' },
            { id: 'burst-12', name: '12点爆发' },
            { id: 'burst-8', name: '8点爆发' },
            { id: 'yin-yang', name: '太极' },
            { id: 'badge-ribbon', name: '徽章丝带' },
            { id: 'space-invader', name: '太空入侵者（电脑游戏名）' },
            { id: 'tv', name: '电视' },
            { id: 'chevron', name: '雪佛龙' },
            { id: 'magnifying-glass', name: '放大镜' },
            { id: 'facebook-icon', name: 'Facebook图标' },
            { id: 'moon', name: '月亮' },
            { id: 'flag', name: '旗' },
            { id: 'cone', name: '圆锥' },
            { id: 'cross', name: '十字架' },
            { id: 'base', name: '根基' },
            { id: 'pointer', name: '指示器' },
            { id: 'lock', name: '锁' },
        ]
    }

}
