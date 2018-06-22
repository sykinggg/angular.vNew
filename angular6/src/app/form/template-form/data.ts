// TypeScript 编译器为每个public构造函数参数生成一个公共字段，
// 在创建新的实例时，自动把参数值赋给这些公共字段
export class formData {
    constructor(
        public id: number,
        public name: string,
        public power: string,
        public alterEgo?: string
    ) {}
}