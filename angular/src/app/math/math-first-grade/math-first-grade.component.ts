import { Component, OnInit } from '@angular/core';
import { MathServiceService } from '../../service/math-service/math-service.service';

@Component({
    selector: 'app-math-first-grade',
    templateUrl: './math-first-grade.component.html',
    styleUrls: ['./math-first-grade.component.scss']
})
export class MathFirstGradeComponent implements OnInit {

    constructor(
        private mathServiceService: MathServiceService
    ) { }

    public setCalculation = {
        maxNumber: 0,
        minNumber: 0,
        severalItems: 2
    }
    public create() {
        // 纯加
        // let equation1 = this.mathServiceService.generatingPurePlusEquation(this.setCalculation);
        // console.log('纯加+');
        // console.log(equation1.question.join('+'));
        // console.log(equation1.answer);
        // 纯减
        // let equation2 = this.mathServiceService.generatingPureLessEquation(this.setCalculation);
        // console.log('纯减-');
        // console.log(equation2.question.join('-'));
        // console.log(equation2.answer);
        // 纯乘
        // let equation3 = this.mathServiceService.generatingPureMultiplyEquation(this.setCalculation);
        // console.log('纯乘*');
        // console.log(equation3.question.join('*'));
        // console.log(equation3.answer);
        // 纯除
        // let equation4 = this.mathServiceService.generatingPureExceptEquation(this.setCalculation);
        // console.log('纯除/');
        // console.log(equation4.question.join('/'));
        // console.log(equation4.answer);
        // 加&减
        let equation5 = this.mathServiceService.generatingPurePlusLessEquation(this.setCalculation);
        console.log('加&减+/');
        console.log(equation5.question.join('/'));
        console.log(equation5.answer);
    }

    ngOnInit() {
        this.defaultNumber();
        this.defaultCalculationType();
    }

    public calculationType = [];
    public defaultCalculationType() {
        this.calculationType = this.mathServiceService.getCalculationType();

        this.calculationType.forEach(item => {
            item.active = false
        })
    }

    public calculationTypeChange(item) {
        console.log(item);
    }

    private defaultNumber() {
        let num = this.mathServiceService.GenerateRandomNumbers(0, 10, 'Integer');
        console.log(num);
    }

}
