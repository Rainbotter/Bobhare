import { Body, Controller, Delete, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { getBackendPrefix } from '../../helpers/url.helper';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import {
  PostGroupBody,
  PostGroupParams,
  PostGroupQuery,
  PostGroupResponse,
} from '../../models/dto/post-group.request';
import { toGroupResponse } from '../../helpers/group.mapper';
import { PutGroupBody, PutGroupParams, PutGroupQuery, PutGroupResponse } from '../../models/dto/put-group.request';
import {
  DeleteGroupBody,
  DeleteGroupParams,
  DeleteGroupQuery,
  DeleteGroupResponse,
} from '../../models/dto/delete-group.request';

@Controller(`${getBackendPrefix()}/sections/:sectionUuid/groups`)
export class GroupsController {
  private logger: Logger = new Logger(GroupsController.name);

  constructor(private bookmarkService: BookmarkService) {
  }

  @Post(``)
  public async postGroup(
    @Param() params: PostGroupParams,
    @Query() query: PostGroupQuery,
    @Body() body: PostGroupBody,
  ): Promise<PostGroupResponse> {
    return toGroupResponse(
      await this.bookmarkService.createGroup(
        params.sectionUuid,
        body.title,
        body.color,
      ),
    );
  }

  @Put(`:groupUuid`)
  public async putGroup(
    @Param() params: PutGroupParams,
    @Query() query: PutGroupQuery,
    @Body() body: PutGroupBody,
  ): Promise<PutGroupResponse> {
    return toGroupResponse(
      await this.bookmarkService.updateGroup(
        params.groupUuid,
        body.title,
        body.color,
      ),
    );
  }

  @Delete(`:groupUuid`)
  public async deleteGroup(
    @Param() params: DeleteGroupParams,
    @Query() query: DeleteGroupQuery,
    @Body() body: DeleteGroupBody,
  ): Promise<DeleteGroupResponse> {
    await this.bookmarkService.deleteGroup(params.groupUuid);
    return {};
  }
}
