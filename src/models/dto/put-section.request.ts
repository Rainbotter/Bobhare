import { SectionsParams } from './params.request';
import { Section } from './bookmark.model';

export class PutSectionParams extends SectionsParams {
}

export class PutSectionBody {
  title: string;
}

export class PutSectionQuery {
}

export class PutSectionResponse extends Section {
}
