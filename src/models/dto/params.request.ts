export class SectionsParams {
  sectionUuid: string;
}

export class GroupsParams extends SectionsParams {
  groupUuid: string;
}

export class LinksParams extends GroupsParams {
  linkUuid: string;
}
