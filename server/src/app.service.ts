import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Loca-Musica! 210810 Overture is the Future';
  }
}
