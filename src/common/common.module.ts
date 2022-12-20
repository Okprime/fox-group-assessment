import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APIService } from './services/api-service';
import { FileService } from './helpers/file.helpers';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [APIService, FileService],
  exports: [APIService, FileService],
})
export class CommonModule {}
