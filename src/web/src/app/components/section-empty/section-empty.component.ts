import { Component, ViewChild } from '@angular/core';
import { SectionFormComponent } from '../section-form/section-form.component';

@Component({
  selector: 'bh-section-empty',
  templateUrl: './section-empty.component.html',
  styleUrls: ['./section-empty.component.scss'],
})
export class SectionEmptyComponent {

  @ViewChild('sectionForm') sectionForm?: SectionFormComponent;


}
