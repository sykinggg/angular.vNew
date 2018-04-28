import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// 自定义结构指令
@Directive({
  selector: '[appCustomStructureInstruction]'
})
export class CustomStructureInstructionDirective {

  @Input('appCustomStructureInstruction')
  set condition(newCondition: boolean) {
    if (!newCondition) { // 创建模板对应的内嵌视图
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>,
     private viewContainer: ViewContainerRef) {
  }

}
