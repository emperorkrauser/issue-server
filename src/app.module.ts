import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
    }),
    IssueModule,
  ],
})
export class AppModule {}
