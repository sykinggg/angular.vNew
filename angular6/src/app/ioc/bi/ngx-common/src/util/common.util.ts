var numbro = require('numbro');

export class CommonUtil {
    /**
     * Created by zyong on 2016/8/2.
     */
    // 生成随机字符串
    static randomStr() {
        return Math.random().toString(36).substring(2);
    }

    static render(template, context, tokenReg, hasDollarPrefix?, resultProcessor?) {
        return template.replace(tokenReg, function (word, slash1, token, slash2) {
            if (slash1 || slash2) {
                return word.replace('\\', '');
            }
            let variables = token.replace(/\s/g, '').split('.');
            let currentObject = context;
            let i, length, variable;

            for (i = 0, length = variables.length; i < length; ++i) {
                variable = variables[i];
                currentObject = currentObject[variable];
                if (currentObject === undefined || currentObject === null) {
                    if (hasDollarPrefix === true) {
                        return '${' + token + '}';
                    } else {
                        return '{' + token + '}';
                    }
                }
            }
            if (resultProcessor) {
                return resultProcessor(currentObject);
            } else {
                return currentObject;
            }
        })
    }

    static dataStructure(d) {
        let dataString = d ? d.toString() : '';
        let isNumber = /^\d+(\.\d+)?$/.test(dataString);
        let intBit = isNumber ? dataString.split('\.')[0].length : 0;
        let floatBit = isNumber && dataString.indexOf('.') !== -1 ? dataString.split('\.')[1].length : 0;

        return {
            isNumber: isNumber,
            intBit: intBit,
            floatBit: floatBit
        };
    }

    static dataFormat(d) {
        let ds = CommonUtil.dataStructure(d);

        if (ds.isNumber) {
            // return numbro(d).format('0.[0000]');
            return numbro(d).format('0');
        } else {
            return d;
        }
    }

    // Verify whether the aggregation expression is valid
    static verifyAggExpRegx(exp: string) {
        let result = {
            isValid: false,
            msg: ''
        };

        exp = exp.replace(/\s/g, '').replace(/(sum|avg|count|max|min)\([\u4e00-\u9fa5_a-zA-Z0-9]+\)/g, '1');
        try {
            eval(exp);
        } catch (e) {
            result.msg = e.message;
            return result;
        }

        result.isValid = true;
        result.msg = 'ok!';

        return result;
    }

    static cboardTranslate(path) {
        let keys = path.split('.');
        let exp = 'CB_I18N';
        for (let i = 0; i < keys.length; i++) {
            exp += '["' + keys[i] + '"]';
        }
        let result = eval(exp);

        return result ? result : path;
    }


    static UserException(message) {
        this.message = message;
        this.name = 'UserException';
    }
}