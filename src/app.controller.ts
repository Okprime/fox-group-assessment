import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('generate-csv')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async generateCSV(@Res() res) {
    await this.appService.generateCSV();
    return res
      .status(200)
      .json({ message: 'Files have been successfully created', error: false });
  }
}
