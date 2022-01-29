import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Section} from "../../../../../models/dto/bookmark.model";
import {ModalComponent} from "../../shared/modal/modal.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs/operators";
import {ApplicationService} from "../../services/application.service";

@Component({
  selector: 'bh-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input() public section?: Section;
  @Output() public closed = new EventEmitter<Section>();
  @ViewChild('modal') modal?: ModalComponent;

  public isLoading: boolean = false;
  public unknownErrorOccurred: boolean = false;

  public form: FormGroup;
  public passwordControl: FormControl;

  constructor(private app: ApplicationService,
              private authService: AuthService,
              private fb: FormBuilder) {

    this.passwordControl = this.fb.control({
      value: '',
      disabled: this.isLoading
    }, [Validators.required]);

    this.form = this.fb.group({
      'passwordControl': this.passwordControl,
    });

  }

  public onSubmit(): void {
    this.unknownErrorOccurred = false;
    this.isLoading = true;

    this.authService.logIn(this.passwordControl.value).pipe(first()).subscribe(_ => {
      this.app.secretHeader = this.passwordControl.value;
      this.isLoading = false;
      this.dismiss();
    }, error => {
      this.isLoading = false;
      if (error) {
        this.unknownErrorOccurred = true;
      }
    });

  }

  public isAlreadyAuthenticated(): boolean {
    return !!this.app.secretHeader;
  }

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public open(): void {
    this.unknownErrorOccurred = false;
    this.passwordControl.setValue('');
    this.modal?.open();
  }

  public onClosed(): void {
    this.closed.emit();
  }

}
