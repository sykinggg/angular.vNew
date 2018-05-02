import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependencyComponent } from './dependency.component';
import { DependencyPatternComponent } from './dependency-pattern/dependency-pattern.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DependencyComponent, DependencyPatternComponent]
})
export class DependencyModule { }
