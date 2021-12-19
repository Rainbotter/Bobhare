import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'bh-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() public form: FormGroup = new FormGroup({});
  @Input() public title: string = "";
  @Input() public isLoading: boolean = false;

  @Output() public closed = new EventEmitter<void>();
  @Output() public formSubmit = new EventEmitter<void>();

  public r = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  @ViewChild('openBtn', {static: true}) openAddSectionModalBtn?: ElementRef;

  @ViewChild('forceCloseBtn', {static: true}) closeModal?: ElementRef;

  public modalId(): string {
    return 'addSectionModal' + this.r;
  }

  public dismiss(): void {
    this.closeModal?.nativeElement.click();
  }

  public open(): void {
    this.openAddSectionModalBtn?.nativeElement.click();
  }

  public onSubmit(): void {
    if (this.form && this.form?.valid && !this.isLoading) {
      this.formSubmit.emit();
    }
  }

  public onHidden(): void {
    this.closed.emit();
  }

}
