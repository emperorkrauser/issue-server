import { Injectable } from '@nestjs/common';
import { IssueRepository } from '../repository';

@Injectable()
export class IssueService {
  constructor(private issueRepository: IssueRepository) {}

  public async findIssue(uuid: string) {
    return this.issueRepository.findIssue(uuid);
  }

  public async addIssue(payload) {
    return this.issueRepository.addIssue(payload);
  }

  public async editIssue(uuid: string, payload) {
    return this.issueRepository.editIssue(uuid, payload);
  }

  public async deleteIssue(uuid: string) {
    return this.issueRepository.deleteIssue(uuid);
  }
}
