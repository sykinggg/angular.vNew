import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-js-arr-de-weighting',
    templateUrl: './js-arr-de-weighting.component.html',
    styleUrls: ['./js-arr-de-weighting.component.scss']
})
export class JsArrDeWeightingComponent implements OnInit {

    public code = {
        ArraySet: this.sanitizer.bypassSecurityTrustHtml(`
一
function unique(arr){
    return Array.from(new Set(arr));
}
二
function unique(arr){
    return [...new Set(arr)];
}
        `),
        ArrayIndexOf: this.sanitizer.bypassSecurityTrustHtml(`
function unique(arr){
    var newArr = [];
    for(var i in arr) {
        if(newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i])
        }
    }
    return newArr;
}
        `),
        ObjectKey: this.sanitizer.bypassSecurityTrustHtml(`
function unique(arr) {  
    let hashTable = {};
    let newArr = [];
    for(let i=0,l=arr.length;i<l;i++) {
        if(!hashTable[arr[i]]) {
            hashTable[arr[i]] = true;
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
        `),
        fourWay: this.sanitizer.bypassSecurityTrustHtml(`
function unique(arr) {
    var newArr = [];
    var end; //end其实就是一道卡
    arr.sort();
    end = arr[0];
    newArr.push(arr[0]);
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] != end) {
            newArr.push(arr[i]);
            end = arr[i]; //更新end
        }
    }
    return newArr;
}
        `),
        fiveWay: this.sanitizer.bypassSecurityTrustHtml(`
function unique(arr){
    let unique = {};
    arr.forEach(function(item){
        unique[JSON.stringify(item)]=item;//键名不会重复
    })
    arr = Object.keys(unique).map(function(u){ 
    //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
        return JSON.parse(u);
    })
    return arr;
 }



 map方法使用示例:
 var map = Array.prototype.map
 var a = map.call("Hello World", function(x) { return x.charCodeAt(0); })
 // a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]



 存在的问题:
 {x:1,y:2}与{y:2,x:1}通过JSON.stringify字符串化值不同，但显然他们是重复的对象
        `),
        sixWay: this.sanitizer.bypassSecurityTrustHtml(`
var songs = [
        {name:"羽根",artist:"air"},
        {name:"羽根",artist:"air"},
        {name:"晴天",artist:"周杰伦"},
        {name:"晴天",artist:"周杰伦"},
        {artist:"周杰伦",name:"晴天"}
    ];

function unique(songs){
    let result = {};
    let finalResult=[];
    for(let i=0;i<songs.length;i++){
        result[songs[i].name]=songs[i];
        //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
    }
    //console.log(result);{"羽根":{name:"羽根",artist:"air"},"晴天":{name:"晴天",artist:"周杰伦"}}
    //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
    for(item in result){
        finalResult.push(result[item]);
    }
    //console.log(finalResult);[{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]
    return finalResult;
}

 console.log(unique(songs));
        `)
    }

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
