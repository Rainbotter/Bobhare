import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'bh-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() public title: string = "";
  @Input() public isLoading: boolean = false

  @Output() public closed = new EventEmitter<void>()
  @Output() public submit = new EventEmitter<void>()

  public r = Math.floor(Math.random() * (999999 - 100000)) + 100000

  @ViewChild('openBtn', {static: true}) openAddSectionModalBtn?: ElementRef

  @ViewChild('closeBtn', {static: true}) closeModal?: ElementRef

  @ViewChild('form', {static: true}) form?: NgForm

  constructor() {
  }

  public ngOnInit(): void {
  }

  public modalId(): string {
    return 'addSectionModal' + this.r
  }

  public dismiss(): void {
    this.closeModal?.nativeElement.click()
  }

  public open(): void {
    this.openAddSectionModalBtn?.nativeElement.click()
  }

  public onSubmit(): void {
    console.log("1")
    if (this.form?.valid && !this.isLoading) {
      console.log("2")
      this.submit.emit();
    }
  }

  public onHidden(): void {
    this.closed.emit()
  }

}
