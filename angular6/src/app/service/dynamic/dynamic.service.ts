import { Injectable } from '@angular/core';
import {DynamicBase} from "./dynamic-base";
import {Dropdown} from "./dropdown";
import {Textbox} from "./textbox";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable()
export class DynamicService {
  
    getDynamic() {
        let dynamic: DynamicBase<any>[] = [
    
            new Dropdown({
                key: 'brave',
                label: 'Bravery Rating',
                options: [
                    {key: 'solid',  value: 'Solid'},
                    {key: 'great',  value: 'Great'},
                    {key: 'good',   value: 'Good'},
                    {key: 'unproven', value: 'Unproven'}
                ],
                order: 3
            }),
            
            new Textbox({
                key: 'firstName',
                label: 'First name',
                value: 'aaa',
                required: true,
                order: 1
            }),
            
            new Textbox({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
            })
        ];
        
        return dynamic.sort((a, b) => a.order - b.order);
    }
    
    toFormGroup(config: DynamicBase<any>[]) {
        let group: any = {};
        
        config.forEach(cn => {
            group[cn.key] = cn.required ? new FormControl(cn.value || '', Validators.required)
                                        : new FormControl(cn.value || '');
        });
        
        return new FormGroup(group);
    }

    constructor() { }

}
