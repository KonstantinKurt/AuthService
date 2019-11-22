import { Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appChangePassword]'
})
export class ChangePasswordDirective {
    @Input('appChangePassword')
    set viewCondition(cond: boolean) {
        if (cond) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

  constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef,
  ) { }

}
