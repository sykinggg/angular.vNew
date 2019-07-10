import { Injectable } from '@angular/core';

export interface IOption {
    minNumber: number;
    maxNumber: number;
    severalItems?: number;
    numberType?: string;
    calculationType?: string;
}

export interface IEquation {
    question: Array<any>;
    answer: number;
    calculationTypes?: Array<any>;
}

@Injectable({
    providedIn: 'root'
})
export class MathServiceService {

    constructor() { }

    private calculationType = [
        {
            name: '加',
            code: 'plus'
        },
        {
            name: '减',
            code: 'less'
        },
        {
            name: '乘',
            code: 'multiply'
        },
        {
            name: '除',
            code: 'except'
        },
    ]
    /**
     * 返回运算法则
     * 
     * name: 名称
     * code: 值
     */
    public getCalculationType() {
        return this.calculationType;
    }

    /**
     * 生成随机数
     * 
     * min: number 最小值
     * max: number 最大值
     * numberType: string 数字类型 Integer(整数) Decimal(小数)
     * number
     */
    public GenerateRandomNumbers(min, max, numberType = 'Integer') {
        let number = Math.ceil(Math.random() * max);
        if ((min > number) || (max === number)) {
            return this.GenerateRandomNumbers(min, max, numberType);
        }
        return number;
    }

    /**
     * 初始化
     */
    public defaultOption(option: IOption): IOption {
        if (!option.minNumber && !option.maxNumber) {
            option.maxNumber = 100;
        }
        if (!option.calculationType) {
            option.calculationType = 'plus';
        }
        if (!option.numberType) {
            option.numberType = 'Integer';
        }
        if (!option.severalItems) {
            option.severalItems = 2
        }
        return option;
    }

    /**
     * 生成等式(加)
     * 
     * minNumber: number 最小值
     * maxNumber: number 最大值
     * severalItems: number 项式
     * numberType: string 数字类型 Integer(整数) Decimal(小数)
     * calculationType: 运算法则
     */
    public generatingPurePlusEquation(option: IOption): IEquation {
        option = this.defaultOption(option);
        let returnData = { question: [], answer: 0 }, min, max = option.maxNumber;
        for (let i = 0; i < option.severalItems; i++) {
            min = returnData.question[0] || option.minNumber;
            max = max - min;
            if (max && (max - min > 1)) {
                returnData.question.push(this.GenerateRandomNumbers(0, max));
            } else {
                return this.generatingPurePlusEquation(option);
            }
        }
        returnData.question.forEach(item => {
            returnData.answer += item;
        })
        if (returnData.answer >= option.maxNumber) {
            return this.generatingPurePlusEquation(option);
        }
        return returnData;
    }

    /**
     * 生成等式(减)
     * 
     * minNumber: number 最小值
     * maxNumber: number 最大值
     * severalItems: number 项式
     * numberType: string 数字类型 Integer(整数) Decimal(小数)
     * calculationType: 运算法则
     */
    public generatingPureLessEquation(option: IOption): IEquation {
        option = this.defaultOption(option);
        let returnData = { question: [], answer: 0 }, min, max = option.maxNumber;
        for (let i = 0; i < option.severalItems; i++) {
            min = returnData.question[0] || option.minNumber;
            if (returnData.question[0]) {
                returnData.answer = min;
                max = min;
            }
            if (max) {
                returnData.question.push(this.GenerateRandomNumbers(0, max));
            } else {
                return this.generatingPureLessEquation(option);
            }
        }
        returnData.question.forEach((item, key) => {
            if (key !== 0) {
                returnData.answer = returnData.answer - item;
            } else {
                returnData.answer = item;
            }
        })
        if (returnData.answer <= option.minNumber) {
            return this.generatingPureLessEquation(option);
        }
        return returnData;
    }

    /**
     * 生成等式(乘)
     * 
     * minNumber: number 最小值
     * maxNumber: number 最大值
     * severalItems: number 项式
     * numberType: string 数字类型 Integer(整数) Decimal(小数)
     * calculationType: 运算法则
     */
    public generatingPureMultiplyEquation(option: IOption): IEquation {
        option = this.defaultOption(option);
        let returnData = { question: [], answer: 0 }, min, max = option.maxNumber;
        for (let i = 0; i < option.severalItems; i++) {
            min = returnData.question[0] || option.minNumber;
            if (returnData.question[0]) {
                returnData.answer = min;
                max = min;
            }
            if (max && (max > 1)) {
                returnData.question.push(this.GenerateRandomNumbers(0, max));
            } else {
                return this.generatingPureMultiplyEquation(option);
            }
        }
        returnData.question.forEach((item, key) => {
            if (key !== 0) {
                returnData.answer = returnData.answer * item;
            } else {
                returnData.answer = item;
            }
        })
        if ((returnData.answer <= option.minNumber) || (returnData.answer >= option.maxNumber)) {
            return this.generatingPureMultiplyEquation(option);
        }
        return returnData;
    }

    /**
     * 生成等式(除)
     * 
     * minNumber: number 最小值
     * maxNumber: number 最大值
     * severalItems: number 项式
     * numberType: string 数字类型 Integer(整数) Decimal(小数)
     * calculationType: 运算法则
     */
    public generatingPureExceptEquation(option: IOption): IEquation {
        option = this.defaultOption(option);
        let returnData = { question: [], answer: 0 }, min, max = option.maxNumber;
        for (let i = 0; i < option.severalItems; i++) {
            min = returnData.question[0] || option.minNumber;
            if (returnData.question[0]) {
                returnData.answer = min;
                max = min;
            }
            if (max && (max > 1)) {
                returnData.question.push(this.GenerateRandomNumbers(0, max));
            } else {
                return this.generatingPureExceptEquation(option);
            }
        }
        returnData.question.forEach((item, key) => {
            if (key !== 0) {
                returnData.answer = returnData.answer / item;
            } else {
                returnData.answer = item;
            }
        })
        if ((returnData.answer <= option.minNumber) || (returnData.answer >= option.maxNumber) || ((returnData.answer + '').indexOf('.') >= 0)) {
            return this.generatingPureExceptEquation(option);
        }
        return returnData;
    }

    /**
     * 生成等式(加 & 减)
     * 
     * minNumber: number 最小值
     * maxNumber: number 最大值
     * severalItems: number 项式
     * numberType: string 数字类型 Integer(整数) Decimal(小数)
     * calculationType: 运算法则
     */
    public generatingPurePlusLessEquation(option: IOption): IEquation {
        option = this.defaultOption(option);
        let returnData = { question: [], answer: 0, calculationTypes: [] }, min, max = option.maxNumber;

        for (let i = 0; i < option.severalItems; i++) {
            min = returnData.question[0] || option.minNumber;
            returnData.calculationTypes.push(this.calculationType[this.GenerateRandomNumbers(-1, 2)].code);
            console.log(returnData.calculationTypes);
            max = max - min;
            if (max && (max - min > 1)) {
                returnData.question.push(this.GenerateRandomNumbers(0, max));
            } else {
                return this.generatingPurePlusLessEquation(option);
            }
        }

        returnData.question.forEach(item => {
            returnData.answer += item;
        })
        if (returnData.answer >= option.maxNumber) {
            return this.generatingPurePlusLessEquation(option);
        }
        return returnData;
    }
}
