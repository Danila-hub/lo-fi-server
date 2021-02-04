import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User){}

    

    async findOneAndGetInstance(param: object){

        try {
            return await this.userModel.findOne(param)
        } catch (e) {
            console.log('FINDONE[ERROR]: \n', e)
            throw new BadRequestException();
        }

    }

    async findOneByLogin(login: string){

        try {
            const candidate = await this.userModel.findOne({
                where:{
                    login
                },include:[{all:true}]
            })
            const user = {
                id: candidate.id,
                login: candidate.login,
                //images
                regDate:candidate.createdAt
            }
            return user
        } catch (e) {
            console.log('FINDONE[ERROR]: \n', e)
            throw new BadRequestException();
        }

    }



    async findOneById(id: string){

        try {
            const candidate = await this.userModel.findOne({
                where:{
                    id
                },include:[{all:true}]
            })
            const user = {
                id: candidate.id,
                login: candidate.login,
                //images
                regDate:candidate.createdAt
            }
            return user
        } catch (e) {
            console.log('FINDONE[ERROR]: \n', e)
            throw new BadRequestException();
        }

    }

}
