import {Body, Controller, Delete, Logger, Param, Post, Put, Query} from '@nestjs/common';
import {getBackendPrefix} from "../../helpers/url.helper";
import {BookmarkService} from "../../services/bookmark/bookmark.service";
import {PostLinkBody, PostLinkParams, PostLinkQuery, PostLinkResponse} from "../../models/dto/post-link.request";
import {PutLinkBody, PutLinkParams, PutLinkQuery, PutLinkResponse} from "../../models/dto/put-link.request";
import {
  DeleteLinkBody,
  DeleteLinkParams,
  DeleteLinkQuery,
  DeleteLinkResponse
} from "../../models/dto/delete-link.request";
import {toLinkResponse} from "../../helpers/link.mapper";

@Controller(`${getBackendPrefix()}/sections/:sectionUuid/groups/:groupUuid/links`)
export class LinksController {
  private logger: Logger = new Logger(LinksController.name);

  constructor(private bookmarkService: BookmarkService) {
  }

  @Post(``)
  public async postLink(
    @Param() params: PostLinkParams,
    @Query() query: PostLinkQuery,
    @Body() body: PostLinkBody,
  ): Promise<PostLinkResponse> {
    return toLinkResponse(
      await this.bookmarkService.createLink(params.groupUuid, body.title, body.url, body.faviconUrl),
    );
  }

  @Put(`:linkUuid`)
  public async putGroup(
    @Param() params: PutLinkParams,
    @Query() query: PutLinkQuery,
    @Body() body: PutLinkBody,
  ): Promise<PutLinkResponse> {
    return toLinkResponse(
      await this.bookmarkService.updateLink(
        params.linkUuid,
        body.title,
        body.url,
        body.faviconUrl,
      ),
    );
  }

  @Delete(`:linkUuid`)
  public async deleteGroup(
    @Param() params: DeleteLinkParams,
    @Query() query: DeleteLinkQuery,
    @Body() body: DeleteLinkBody,
  ): Promise<DeleteLinkResponse> {
    await this.bookmarkService.deleteLink(params.linkUuid);
    return {};
  }

}
