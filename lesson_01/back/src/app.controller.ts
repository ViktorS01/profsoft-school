import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';

type User =  {
  name: string;
  email: string;
  role: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  async createUser(@Body() user: User ){
    return await this.appService.createUser(user)
  }
  @Get('')
  async getUsers(){
    return await this.appService.getUsers()
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id){
    return await this.appService.deleteUser(id)
  }
  @Get('/:id')
  async getUserById(@Param('id') id){
    return await this.appService.getUserById(id)
  }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
