import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-form-validate',
    templateUrl: './form-validate.component.html',
    styleUrls: ['./form-validate.component.scss'],
})
export class FormValidateComponent implements OnInit {
    
    //  模版式表单
    model = { name: 'aaa' };
    
    //  响应式表单
    responseGroup: FormGroup;
    
    //  响应式表单——静态提示文案
    validationMessage = {
        "responseName": {
            'minlength': '用户名长度最少为4个字符',
            'maxlength': '用户名长度最多为10个字符',
            'required': '请填写用户名'
        }
    };
    
    //  响应式表单——属性基本错误提示
    formErrors = {
        'responseName': ''
    };
    
    //  响应式表单的另一种
    // reactiveGroup: FormGroup;
    // reactiveFormCtrl: FormControl = new FormControl('');
    
    constructor(
        private fb: FormBuilder,
    ) {
        this.createResponseForm();
    
        // interface ValidationResult {
        //     invalid: boolean;
        //     messages: string;
        // }
    }
    
    ngOnInit(): void {
        // this.reactiveGroup = new FormGroup({});
        // this.reactiveGroup.addControl("formCtrlId", this.reactiveFormCtrl);
    }
    
    //  动态创建响应式表单
    createResponseForm() {
        
        //  利用FormBuilder快速创建表单
        this.responseGroup = this.fb.group({
            'responseName': ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(10)
            ]]
        });
        
        //  利用valueChanges进行事件监听音写入错误数据
        this.responseGroup.valueChanges.subscribe(() => this.onValueChange());
    }
    onValueChange() {
        for (let item in this.formErrors) {
            this.formErrors[item] = '';
            for (let key in this.responseGroup.get(item).errors) {
                this.formErrors[item] += this.validationMessage[item][key] + '';
            }
        }
    }
    
    //  动态创建响应式表单——另一种情况
    // validateFormControl(ctrl: FormControl): ValidationResult {
    //     let validation: ValidationResult = { invalid: false, messages: "" };
    //     if (ctrl.errors && ctrl.errors.required) {
    //         validation.invalid = true;
    //         validation.messages = "Required";
    //     } else if (ctrl.errors && formControl.errors.requiredlength) {
    //         validation.invalid = true;
    //         validation.messages = "Required length";
    //     } else if (ctrl.errors && ctrl.errors.servererror ) {
    //         validation.invalid = true;
    //         validation.messages = "Server has error...";
    //     }
    //     return validation;
    // }
}
