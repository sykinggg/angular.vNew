import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'angular-calendar';
import { AlertModule } from 'ngx-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// 总结，ng-bootstrap 以需要引入ngbModule，任何组件，如分页，tab,datapicker......都可以使用了,
// 但是ngx-bootstrap必须使用哪个组件就引入哪个组件


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { LocalStorage } from './common/local.storage';

import { appRoutes } from './app.routes';
import { MapComponent } from './map/map.component';
import { UiComponent } from './ui/ui.component';
import { MyFirstDirectiveDirective } from './directive/my-first-directive/my-first-directive.directive';
import { MySecDirectiveDirective } from './directive/my-sec-directive/my-sec-directive.directive';
import { CustomStructureInstructionDirective } from './directive/custom-structure/custom-structure-instruction.directive';
import { DirectiveExplainComponent } from './directive-explain/directive-explain.component';
import { MapStudyComponent } from './map-study/map-study.component';
import { UiStudyComponent } from './ui-study/ui-study.component';
import { StudyComponent } from './study/study.component';
import { RouterComponent } from './study/router/router.component';
import { DependencyInjectionComponent } from './study/dependency-injection/dependency-injection.component';
import { TemplateDataBindingComponent } from './study/template-data-binding/template-data-binding.component';
import { LifecycleHooksComponent } from './study/lifecycle-hooks/lifecycle-hooks.component';
import { ComponentInteractionComponent } from './study/component-interaction/component-interaction.component';
import { ComponentStylesComponent } from './study/component-styles/component-styles.component';
import { DynamicComponentLoaderComponent } from './study/dynamic-component-loader/dynamic-component-loader.component';
import { AttributeDirectivesComponent } from './study/attribute-directives/attribute-directives.component';
import { SructuralDectivesComponent } from './study/sructural-dectives/sructural-dectives.component';
import { PipesComponent } from './study/pipes/pipes.component';
import { JsAlgorithmComponent } from './js-algorithm/js-algorithm.component';
import { AlgorithmComponent } from './js-algorithm/algorithm/algorithm.component';
import { AnimationsComponent } from './study/animations/animations.component';
import { FormComponent } from './study/form/form.component';
import { JsDesignPatternComponent } from './js-design-pattern/js-design-pattern.component';
import { OpjectOrientedComponent } from './js-design-pattern/opject-oriented/opject-oriented.component';
import { LessMixinsComponent } from './home/less-mixins/less-mixins.component';
import { ComponentInstanceComponent } from './component-instance/component-instance.component';
import { BaseComponentComponent } from './component-instance/base-component/base-component.component';
import { DateListComponent } from './component-library/date-list/date-list.component';
import { NumberResetDirective } from './directive/number-reset/number-reset.directive';
import { NumPipePipe } from './component-library/num-pipe/num-pipe.pipe';
import { CalendarComponent } from './component-instance/calendar/calendar.component';
import { DateTimePickerComponent } from './component-library/date-time-picker/date-time-picker.component';
import { CharLenDetectionDirective } from './directive/char-len-detection/char-len-detection.directive';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        MapComponent,
        UiComponent,
        MyFirstDirectiveDirective,
        CustomStructureInstructionDirective,
        DirectiveExplainComponent,
        MapStudyComponent,
        UiStudyComponent,
        StudyComponent,
        RouterComponent,
        DependencyInjectionComponent,
        TemplateDataBindingComponent,
        LifecycleHooksComponent,
        ComponentInteractionComponent,
        ComponentStylesComponent,
        DynamicComponentLoaderComponent,
        AttributeDirectivesComponent,
        SructuralDectivesComponent,
        PipesComponent,
        JsAlgorithmComponent,
        AlgorithmComponent,
        AnimationsComponent,
        FormComponent,
        JsDesignPatternComponent,
        OpjectOrientedComponent,
        LessMixinsComponent,
        MySecDirectiveDirective,
        ComponentInstanceComponent,
        BaseComponentComponent,
        DateListComponent,
        CharLenDetectionDirective,
        NumberResetDirective,
        NumPipePipe,
        CalendarComponent,
        // DateTimePickerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CommonModule,
        AlertModule.forRoot(),
        NgbModalModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        CalendarModule.forRoot()
    ],
    exports: [
        CalendarComponent
    ],
    providers: [
        LocalStorage
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
