/*
 * 新版-时间插件
 * id: 时间插件唯一标识
 * 默认值在外面默认写入
 * date-type
 *      type - 控件选择类型
 *      类型：String，默认值：date
 *           year       年选择器
 *           month      年月选择器
 *           date       日期选择器
 *           time       时间选择器
 *           datetime   日期时间选择器
 * date-range
 *      range - 开启左右面板范围选择
 *      类型：Boolean/String，默认值：false
 * date-format
 *      类型：String，默认值：yyyy-MM-dd
 *      format - 自定义格式
 *           yyyy       年份，至少四位数。如果不足四位，则前面补零
 *           y          年份，不限制位数，即不管年份多少位，前面均不补零
 *           MM         月份，至少两位数。如果不足两位，则前面补零
 *           M          月份，允许一位数
 *           dd         日期，至少两位数。如果不足两位，则前面补零
 *           d          日期，允许一位数
 *           HH         小时，至少两位数。如果不足两位，则前面补零
 *           H          小时，允许一位数
 *           mm         分钟，至少两位数。如果不足两位，则前面补零
 *           m          分钟，允许一位数
 *           ss         秒数，至少两位数。如果不足两位，则前面补零
 *           s          秒数，允许一位数
 * 格式示例：
 *      yyyy-MM-dd HH:mm:ss        2017-08-18 20:08:08
 *      M月d日                     8月18日
 *      北京时间：HH点mm分          北京时间：20点08分
 *      yyyy年的M月某天晚上，大概H点 2017年的8月某天晚上，大概20点
 * date-value
 *      value - 初始值
 *      类型：String，默认值：new Date()
 * date-min/max
 *      min/max - 最小/大范围内的日期时间值
 *      类型：string，默认值：min: '1900-1-1'、max: '2099-12-31'
 * 使用实例
 *      1.如果值为字符类型
 *          年月日必须用 -（中划线）分割、时分秒必须用 :（半角冒号）号分割
 *      2.如果值为整数类型
 *          且数字＜86400000，则数字代表天数，如：min: -7，即代表最小日期在7天前，正数代表若干天后
 *      3.如果值为整数类型
 *          且数字 ≥ 86400000，则数字代表时间戳，如：max: 4073558400000，即代表最大日期在：公元3000年1月1日
 * date-trigger
 *      trigger - 自定义弹出控件的事件
 *      类型：String，默认值：focus，如果绑定的元素非输入框，则默认事件为：click
 * date-show
 *      show - 默认显示
 *      类型：Boolean，默认值：false
 * date-position
 *      position - 定位方式
 *      类型：String，默认值：absolute
 *      abolute         绝对定位，始终吸附在绑定元素周围。默认值
 *      fixed           固定定位，初始吸附在绑定元素周围，不随浏览器滚动条所左右
 *      static          静态定位，控件将直接嵌套在指定容器中
 *      注意：请勿与 show 参数的概念搞混淆。show为 true 时，控件仍然是采用绝对或固定定位。而这里是直接嵌套显示
 * date-zIndex
 *      zIndex - 层叠顺序
 *      类型：Number，默认值：66666666
 *      如果 position 参数设为 static 时，该参数无效
 * date-showButton
 *      showBottom - 是否显示底部栏
 *      类型：Boolean，默认值：true
 *      如果设置 false，将不会显示控件的底部栏区域
 * date-btns
 *      btns - 工具按钮
 *      类型：Array，默认值：['clear', 'now', 'confirm']
 *      右下角显示的按钮，会按照数组顺序排列，内置可识别的值有：clear、now、confirm
 * date-lang
 *      lang - 语言
 *      类型：String，默认值：cn
 * date-theme
 *      theme - 主题
 *      类型：String，默认值：default
 *      theme的可选值有：default（默认简约）、molv（墨绿背景）、#颜色值（自定义颜色背景）、grid（格子主题）
 * date-calendar
 *      calendar - 是否显示公历节日
 *      类型：Boolean，默认值：false
 * date-mark
 *      mark - 标注重要日子
 *      类型：Object，默认值：无
 * 使用实例：
 *      标注          格式                  说明
 *      每年的日期     {'0-9-18': '国耻'}    0 即代表每一年
 *      每月的日期     {'0-0-15': '中旬'}    0-0 即代表每年每月
 *      特定的日期     {'2017-8-21': '发布'}
 * laydate.getEndDate(month, year)
 * 获取指定年月的最后一天
 * var endDate1 = laydate.getEndDate(10); //得到31
 * var endDate2 = laydate.getEndDate(2, 2080); //得到29
 * */
angular.module('app').directive('dateComponents', ['$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            scope: false,
            link: function($scope, element, attrs, model) {
                $timeout(function() {
                    console.log(attrs);
                    laydate.render({
                        elem: '#'+attrs.id,
                        type: attrs['date-type'] || 'date',
                        range: attrs['date-range'] || false,
                        format: attrs['date-format'] || 'yyyy-MM-dd',
                        value: attrs['date-value'] || new Date(),
                        min: attrs['date-min'] || '1900-1-1',
                        max: attrs['date-max'] || '2099-12-31',
                        trigger: attrs['date-trigger'] || 'focus',
                        show: attrs['date-show'] || false,
                        position: attrs['date-position'] || 'absolute',
                        zIndex: attrs['date-zIndex'] || '66666666',
                        showBottom: attrs['date-showBottom'] || true,
                        btns: attrs['date-btns'] || ['clear', 'now', 'confirm'],
                        lang: attrs['date-lang'] || 'cn',
                        theme: attrs['date-theme'] || 'grid',
                        calendar: attrs['date-calendar'] || 'calendar',
                        mark: attrs['date-mark'] || null,
                        /*控件初始打开的回调*/
                        //回调返回一个参数：初始的日期时间对象
                        ready: function(date) {},
                        /*日期时间被切换后的回调   年月日时间被切换时都会触发*/
                        //回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
                        change: function(value, date, endDate) {},
                        /*控件选择完毕后的回调    点击日期、清空、现在、确定均会触发*/
                        //回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
                        done: function(value, date, endDate) {
                            $scope.$parent[attrs.ngModel] = value;
                            element.change();
                        }
                    })
                })
            }
        }
    }])