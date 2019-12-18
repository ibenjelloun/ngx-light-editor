import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EditorOptions } from '../model/editor-options';

@Component({
  selector: 'led-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  @Output() menuAction = new EventEmitter<any>();
  @Input() label = '...';
  @Input() items = [];
  @Input() options: EditorOptions;

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  openClose(event) {
    this.isOpen = !this.isOpen;
    event.stopPropagation();
  }

  selectItem(item) {
    this.menuAction.emit(item);
    this.label = item.label;
    this.isOpen = false;
  }

  @HostListener('window:click', ['$event.target'])
  clickSomewhere(targetElement) {
    if (
      this.isOpen &&
      targetElement &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.isOpen = false;
    }
  }
}
