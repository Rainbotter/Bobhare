import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { getBackendPrefix } from '../../helpers/url.helper';
import {
  GetSectionsBody,
  GetSectionsParams,
  GetSectionsQuery,
  GetSectionsResponse,
} from '../../models/dto/get-sections.request';
import {
  PostSectionBody,
  PostSectionParams,
  PostSectionQuery,
  PostSectionResponse,
} from '../../models/dto/post-section.request';
import {
  PutSectionBody,
  PutSectionParams,
  PutSectionQuery,
  PutSectionResponse,
} from '../../models/dto/put-section.request';
import {
  DeleteSectionBody,
  DeleteSectionParams,
  DeleteSectionQuery,
  DeleteSectionResponse,
} from '../../models/dto/delete-section.request';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { toSectionResponse } from '../../helpers/section.mapper';

@Controller(`${getBackendPrefix()}/sections`)
export class SectionsController {
  private logger: Logger = new Logger(SectionsController.name);

  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  public async getSections(
    @Param() params: GetSectionsParams,
    @Query() query: GetSectionsQuery,
    @Body() body: GetSectionsBody,
  ): Promise<GetSectionsResponse[]> {
    return (await this.bookmarkService.getSections()).map((section) =>
      toSectionResponse(section),
    );
  }

  @Post()
  public async postSection(
    @Param() params: PostSectionParams,
    @Query() query: PostSectionQuery,
    @Body() body: PostSectionBody,
  ): Promise<PostSectionResponse> {
    return toSectionResponse(
      await this.bookmarkService.createSection(body.title),
    );
  }

  @Put(`:sectionUuid`)
  public async putSection(
    @Param() params: PutSectionParams,
    @Query() query: PutSectionQuery,
    @Body() body: PutSectionBody,
  ): Promise<PutSectionResponse> {
    return toSectionResponse(
      await this.bookmarkService.updateSection(params.sectionUuid, body.title),
    );
  }

  @Delete(`:sectionUuid`)
  public async deleteSection(
    @Param() params: DeleteSectionParams,
    @Query() query: DeleteSectionQuery,
    @Body() body: DeleteSectionBody,
  ): Promise<DeleteSectionResponse> {
    await this.bookmarkService.deleteSection(params.sectionUuid);
    return {};
  }
}
