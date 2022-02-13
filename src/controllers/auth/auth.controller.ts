import { BadRequestException, Body, Controller, Logger, Param, Post, Query } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { getBackendPrefix } from '../../helpers/url.helper';
import { PostAuthBody, PostAuthParams, PostAuthQuery, PostAuthResponse } from '../../models/dto/post-auth.request';

@Controller(`${getBackendPrefix()}/auth`)
export class AuthController {
  private logger: Logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  public async postAuthentication(
    @Param() params: PostAuthParams,
    @Query() query: PostAuthQuery,
    @Body() body: PostAuthBody,
  ): Promise<PostAuthResponse> {
    if (this.authService.auth(body.password)) {
      return {};
    } else {
      throw new BadRequestException();
    }
  }
}
