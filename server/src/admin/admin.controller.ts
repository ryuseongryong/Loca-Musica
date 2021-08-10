import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

type MusicalData = {
  hashtags: string[];
  numberUrls: string[];
  code: string;
  title: string;
  thumbnail: string;
  contents: string;
  state: string;
  actors: string[];
};

@Controller('admin')
export class AdminController {
  @Get()
  getAll() {
    return 'This is admin';
  }

  @Post()
  uploadMusical(@Body() musicalData: MusicalData) {
    return musicalData;
  }

  @Put()
  editMusical(@Body() musicalData: MusicalData) {
    return musicalData;
  }

  @Delete()
  deleteMusical(@Body() code: string) {
    return code;
  }
}
