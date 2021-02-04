import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Get()
    getAll(){}

    @Get()
    async findOneByParams( @Query('login') login:string, @Query('id') id:string ){
        if(!(typeof login === 'undefined')){
            return await this.userService.findOneByLogin(login)
        }
        if(!(typeof id === 'undefined')){
            return await this.userService.findOneById(id)
        }
    }

   

}
