import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { appConstant } from '../constants/app.constant';

@Injectable()
export class APIService {
  async getCommitsFromAGitHubRepo() {
    try {
      const { data } = await axios.get(`${appConstant.GIT_HUB_REPO}`);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode == 404) {
        throw new NotFoundException('Data not found');
      }
      throw new BadRequestException();
    }
  }

  async getAuthorsFollowers(url: string) {
    try {
      const { data } = await axios.get(`${url}`);
      return data.slice(0, 5);
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode == 404) {
        throw new NotFoundException('Data not found');
      }
      throw new BadRequestException();
    }
  }

  async getCommitsUrl(url: string) {
    try {
      const { data } = await axios.get(`${url}`);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode == 404) {
        throw new NotFoundException('Data not found');
      }
      throw new BadRequestException();
    }
  }
}
