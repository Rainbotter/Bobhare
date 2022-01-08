import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {Section} from "../../../../../models/dto/bookmark.model";
import {SectionService} from "../../services/section.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'bh-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent {

  @ViewChild('modal') modal?: ModalComponent;
  @Output() public closed = new EventEmitter<Section>();
  @Input() public sectionUuid?: string;

  public isLoading: boolean = false;
  public unknownErrorOccurred: boolean = false;

  public form: FormGroup;

  constructor(private sectionService: SectionService,
              private fb: FormBuilder,
              private router: Router) {
    this.form = this.fb.group({});
  }

  public onClosed(): void {
    this.closed.emit();
  }

  public onSubmit(): void {
    if (this.sectionUuid) {
      this.isLoading = true;
      this.sectionService.deleteSection(this.sectionUuid).subscribe(
        () => {
          this.isLoading = false;
          this.dismiss();
          this.unknownErrorOccurred = false;
          this.router.navigate([`/`]);
        },
        error => {
          this.isLoading = false;
          if (error) {
            this.unknownErrorOccurred = true;
          }
        });
    }
  }

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public open(): void {
    this.modal?.open();
  }

}
