import { Injectable } from '@nestjs/common';
import { FileService } from './common/helpers/file.helpers';
import { APIService } from './common/services/api-service';
import { URLInfo, UserInfo } from './types/app.types';

@Injectable()
export class AppService {
  constructor(
    private apiService: APIService,
    private fileService: FileService,
  ) {}

  async generateCSV() {
    // delete any existing csv file before creating a new one
    await this.fileService.deleteAllCSVFiles();

    const apiResult = await this.apiService.getCommitsFromAGitHubRepo();

    await Promise.all([
      await this.generateFirstCSVFile(apiResult),
      await this.generateSecondCSVFile(apiResult),
      await this.generateThirdCSVFile(apiResult),
    ]);

    return 'success';
  }

  async generateFirstCSVFile(payload: any) {
    const firstCSVFileObject = [];

    for (const data of payload) {
      const formattedResponse: UserInfo = {
        avatarURL: data.author.avatar_url,
        userName: data.author.login,
        accountHomepageURL: data.author.html_url,
      };

      firstCSVFileObject.push(formattedResponse);
    }

    return this.fileService.writeToACSVfile(
      'firstCSVFileObject',
      firstCSVFileObject,
    );
  }

  async generateSecondCSVFile(payload: any) {
    const secondCSVFileObject = [];

    const individualRecordArr = [];

    for (const data of payload) {
      const apiResult = await this.apiService.getAuthorsFollowers(
        data.author.followers_url,
      );

      individualRecordArr.push(apiResult);
    }

    // merge/flatten an array of arrays
    const newArray = Array.prototype.concat.apply([], individualRecordArr);

    for (const data of newArray) {
      const followersInfo: UserInfo = {
        avatarURL: data.avatar_url,
        userName: data.login,
        accountHomepageURL: data.html_url,
      };
      secondCSVFileObject.push(followersInfo);
    }

    return this.fileService.writeToACSVfile(
      'secondCSVFileObject',
      secondCSVFileObject,
    );
  }

  async generateThirdCSVFile(payload: any) {
    const thirdCSVFileObject = [];

    for (const data of payload) {
      const lastAndSecondToLastURL = await this.apiService.getCommitsUrl(
        data.comments_url,
      );

      // check if the response gives an empty array
      if (lastAndSecondToLastURL.length === 0) {
        const formattedObj: URLInfo = {
          repoURL: data.url,
          lastURL: null,
          secondToLastURL: null,
        };
        thirdCSVFileObject.push(formattedObj);
      }
    }

    return this.fileService.writeToACSVfile(
      'thirdCSVFileObject',
      thirdCSVFileObject,
    );
  }
}
