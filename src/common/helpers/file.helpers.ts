import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';

@Injectable()
export class FileService {
  async writeToACSVfile(fileName: string, data: any) {
    const ws = fs.createWriteStream(`${process.cwd()}/./${fileName}.csv`);
    fastcsv.write(data, { headers: true }).pipe(ws);
  }

  async deleteAllCSVFiles() {
    fs.readdir(`${process.cwd()}`, async (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (file.split('.')[1] === 'csv') {
          await fs.unlinkSync(file);
        }
      }
    });
  }
}
