import { Module } from '@nestjs/common';
import { IssueController } from './controller';
import { IssueService } from './service';

@Module({
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
