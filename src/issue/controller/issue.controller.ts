import {
  Body,
  Controller,
  Get,
  Post,
  Logger,
  Delete,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { IssueService } from '../service';

@Controller({
  path: 'issue',
  version: '1',
})
export class IssueController {
  private readonly logger = new Logger('IssueController');
  constructor(private readonly issueService: IssueService) {}

  @Get(':uuid')
  public async getissue(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.issueService.findIssue(uuid);
  }

  @Post()
  public async addIssue(@Body() payload) {
    try {
      const response = await this.issueService.addIssue(payload);
      return {
        message: 'Successfully added an issue',
        response,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Put(':uuid')
  public async editIssue(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() payload,
  ) {
    try {
      const response = await this.issueService.editIssue(uuid, payload);
      this.logger.debug('Edited issue:', response);
      return {
        message: 'Successfully edited an issue.',
        response,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Delete(':uuid')
  public async deleteIssue(@Param('uuid', ParseUUIDPipe) uuid: string) {
    try {
      this.logger.log('deleteIssue');
      const response = await this.issueService.deleteIssue(uuid);
      this.logger.debug('Deleted issue', response);
      return {
        message: 'Successfully deleted issue.',
        response,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
