import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterData } from './footer.model';
import { FooterFashion4ColComponent } from './variants/fashion-4col/footer-fashion-4col.component';
import { FooterMinimalComponent } from './variants/minimal/footer-minimal.component';

@Component({
  selector: 'lib-preview-footer',
  standalone: true,
  imports: [CommonModule, FooterFashion4ColComponent, FooterMinimalComponent],
  templateUrl: './footer.component.html'
})
export class PreviewFooterComponent {
  @Input() data?: FooterData;
  @Output() actionPerformed = new EventEmitter<string>();

  handleAction(event: string): void {
    this.actionPerformed.emit(event);
  }
}
