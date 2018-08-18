export declare class CommonUtil {
    /**
     * Created by zyong on 2016/8/2.
     */
    static randomStr(): string;
    static render(template: any, context: any, tokenReg: any, hasDollarPrefix?: any, resultProcessor?: any): any;
    static dataStructure(d: any): {
        isNumber: boolean;
        intBit: any;
        floatBit: any;
    };
    static dataFormat(d: any): any;
    static verifyAggExpRegx(exp: string): {
        isValid: boolean;
        msg: string;
    };
    static cboardTranslate(path: any): any;
    static UserException(message: any): void;
}
