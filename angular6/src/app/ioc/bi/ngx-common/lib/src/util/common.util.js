"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numbro = require('numbro');
var CommonUtil = /** @class */ (function () {
    function CommonUtil() {
    }
    /**
     * Created by zyong on 2016/8/2.
     */
    // 生成随机字符串
    CommonUtil.randomStr = function () {
        return Math.random().toString(36).substring(2);
    };
    CommonUtil.render = function (template, context, tokenReg, hasDollarPrefix, resultProcessor) {
        return template.replace(tokenReg, function (word, slash1, token, slash2) {
            if (slash1 || slash2) {
                return word.replace('\\', '');
            }
            var variables = token.replace(/\s/g, '').split('.');
            var currentObject = context;
            var i, length, variable;
            for (i = 0, length = variables.length; i < length; ++i) {
                variable = variables[i];
                currentObject = currentObject[variable];
                if (currentObject === undefined || currentObject === null) {
                    if (hasDollarPrefix === true) {
                        return '${' + token + '}';
                    }
                    else {
                        return '{' + token + '}';
                    }
                }
            }
            if (resultProcessor) {
                return resultProcessor(currentObject);
            }
            else {
                return currentObject;
            }
        });
    };
    CommonUtil.dataStructure = function (d) {
        var dataString = d ? d.toString() : '';
        var isNumber = /^\d+(\.\d+)?$/.test(dataString);
        var intBit = isNumber ? dataString.split('\.')[0].length : 0;
        var floatBit = isNumber && dataString.indexOf('.') !== -1 ? dataString.split('\.')[1].length : 0;
        return {
            isNumber: isNumber,
            intBit: intBit,
            floatBit: floatBit
        };
    };
    CommonUtil.dataFormat = function (d) {
        var ds = CommonUtil.dataStructure(d);
        if (ds.isNumber) {
            // return numbro(d).format('0.[0000]');
            return numbro(d).format('0');
        }
        else {
            return d;
        }
    };
    // Verify whether the aggregation expression is valid
    CommonUtil.verifyAggExpRegx = function (exp) {
        var result = {
            isValid: false,
            msg: ''
        };
        exp = exp.replace(/\s/g, '').replace(/(sum|avg|count|max|min)\([\u4e00-\u9fa5_a-zA-Z0-9]+\)/g, '1');
        try {
            eval(exp);
        }
        catch (e) {
            result.msg = e.message;
            return result;
        }
        result.isValid = true;
        result.msg = 'ok!';
        return result;
    };
    CommonUtil.cboardTranslate = function (path) {
        var keys = path.split('.');
        var exp = 'CB_I18N';
        for (var i = 0; i < keys.length; i++) {
            exp += '["' + keys[i] + '"]';
        }
        var result = eval(exp);
        return result ? result : path;
    };
    CommonUtil.UserException = function (message) {
        this.message = message;
        this.name = 'UserException';
    };
    return CommonUtil;
}());
exports.CommonUtil = CommonUtil;

//# sourceMappingURL=../../sourcemaps/src/util/common.util.js.map
