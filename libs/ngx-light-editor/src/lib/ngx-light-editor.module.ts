import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightEditorComponent } from './ngx-light-editor.component';
import { EditableDirective } from './directives/editable.directive';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [EditableDirective, DropdownComponent, LightEditorComponent],
  exports: [LightEditorComponent]
})
export class NgxLightEditorModule {}
