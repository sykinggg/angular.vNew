import { Component, OnInit } from '@angular/core';
import {DynamicService} from "../../service/dynamic/dynamic.service";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    providers: [DynamicService]
})
export class DynamicFormComponent implements OnInit {
    
    dynamicData: any[];
    form: FormGroup;
    payLoad = '';
  
    constructor(private service: DynamicService) {
        this.dynamicData = this.service.getDynamic();
    }
  
    ngOnInit() {
        this.form = this.service.toFormGroup(this.dynamicData);
    }
    
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }

}
