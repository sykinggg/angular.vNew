import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { Address, Hero, states } from '../../data/data-name';
import { HeroServiceService } from '../../service/hero-service/hero-service.service';

@Component({
  selector: 'app-form-response-detail',
  templateUrl: './form-response-detail.component.html',
  styleUrls: ['./form-response-detail.component.scss'],
  providers: [ HeroServiceService ]
})
export class FormResponseDetailComponent implements OnInit {

    seasons = [
        'Flight',
        'X-ray vision',
        'strength'
    ];

    @Input() hero: Hero;
    
    heroForm: FormGroup;
    nameChangeLog: string[] = [];
    states = states;

    constructor(
        private fb: FormBuilder,
        private heroService: HeroServiceService
    ) {
        this.createForm();
        this.logNameChange();
    }

    ngOnInit() {}
    
    ngOnChanges() {
        this.heroForm.reset({
            name: this.hero.name
        });
        this.setAddresses(this.hero.addresses);
    }

    createForm() {
        this.heroForm = this.fb.group({
            name: ['', Validators.required],
            secretLairs: this.fb.array([]),
            power: '',
            sidekick: ''
        });
    }
    
    get secretLairs(): FormArray {
        return this.heroForm.get('secretLairs') as FormArray;
    }
    
    setAddresses(addresses: Address[]) {
        const addressFGs = addresses.map(address => this.fb.group(address));
        const addressFormArray = this.fb.array(addressFGs);
        this.heroForm.setControl('secretLairs', addressFormArray);
    }
    
    addLair() {
        this.secretLairs.push(this.fb.group(new Address()));
    }

    delLair(i) {
        this.secretLairs.controls.splice(i, 1);
    }
    
    onSubmit() {
        this.hero = this.prepareSaveHero();
        this.heroService.updateHero(this.hero).subscribe(/* error handling */);
        this.ngOnChanges();
    }
    
    prepareSaveHero(): Hero {
        const formModel = this.heroForm.value;
    
        const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
            (address: Address) => Object.assign({}, address)
        );
    
        const saveHero: Hero = {
            id: this.hero.id,
            name: formModel.name as string,
            addresses: secretLairsDeepCopy
        };
        return saveHero;
    }
    
    revert() { this.ngOnChanges(); }
    
    logNameChange() {
        const nameControl = this.heroForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        );
    }

}
