import { IsNull } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IssueRepository {
  constructor(private issueRepository) {}
  async browseIssues() {
    const where = {
      deletedAt: IsNull(),
    };
    return this.issueRepository.find({
      where,
    });
  }

  async findIssue(uuid: string) {
    const where = {
      deletedAt: IsNull(),
      uuid,
    };
    return this.issueRepository.findOne({ where });
  }

  async addIssue(payload) {
    const dateNow = new Date().toJSON();
    const createdIssue = await this.issueRepository.create({
      ...payload,
      createdAt: dateNow,
      updatedAt: dateNow,
      deletedAt: null,
    });
    return this.issueRepository.save(createdIssue);
  }

  async editIssue(uuid: string, payload) {
    const { title, description } = payload;
    const foundIssue = await this.findIssue(uuid);
    if (!foundIssue) {
      throw new NotFoundException('Issue not found!');
    }

    return this.issueRepository.save({
      ...foundIssue,
      title,
      description,
    });
  }

  async deleteIssue(uuid: string) {
    const foundIssue = await this.findIssue(uuid);
    if (!foundIssue) {
      throw new NotFoundException('Issue not found!');
    }
    return this.issueRepository.save({
      ...foundIssue,
      deletedAt: new Date().toISOString(),
    });
  }
}
