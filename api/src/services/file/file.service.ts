import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  download(path: string) {
    const file = createReadStream(join(process.cwd() + path));
    return new StreamableFile(file);
  }
}
