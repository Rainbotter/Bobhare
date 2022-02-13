import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {Group, Link, Section} from "../../../../../models/dto/bookmark.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LinkService} from "../../services/link.service";

@Component({
  selector: 'bh-link-delete',
  templateUrl: './link-delete.component.html',
  styleUrls: ['./link-delete.component.scss']
})
export class LinkDeleteComponent {

  @ViewChild('modal') modal?: ModalComponent;
  @Output() public closed = new EventEmitter<Section>();
  @Input() public section?: Section;
  @Input() public group?: Group;
  @Input() public link?: Link;

  public isLoading: boolean = false;
  public unknownErrorOccurred: boolean = false;

  public form: FormGroup;

  constructor(private linkService: LinkService,
              private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  public onClosed(): void {
    this.closed.emit();
  }

  public onSubmit(): void {
    if (this.section && this.group && this.link && this.link.uuid) {
      this.isLoading = true;
      this.linkService.deleteLink(this.section, this.group, this.link.uuid).subscribe(
        () => {
          this.isLoading = false;
          this.dismiss();
          this.unknownErrorOccurred = false;
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
