import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignUpDto } from 'src/DTO/SignUp.dto';
import { SignInDto } from 'src/DTO/SignIn.dto';
import { User } from 'src/models/user.model';
import * as shortid from 'shortid';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt'
import * as EmailValidator from 'email-validator';

import * as jwt from 'jsonwebtoken';
import config from 'src/config'
 


@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User){}

   

    async signupS(signUpDto: SignUpDto){
        
        
        let {login, password, email} = signUpDto
        if(typeof login === 'undefined' || typeof password === 'undefined' || typeof email === 'undefined' ) throw new BadRequestException('Invalid data')
        validate(signUpDto);

        //already registrated checking
        const user = await this.userModel.findOne({
            where:{
                [Op.or]:[
                    {login}, {email}
                ]
            }
        })
        if(user) throw new BadRequestException('User with this login or email already exist')
    

        //crypting password
        password = await bcrypt.hash(password, 11);
        
        //create new
        try {

            await User.create( {login, password, email, id:shortid.generate()} )

        } catch (error) {
            console.log("SIGNUP[ERROR]: \n", error)
            throw new InternalServerErrorException('Registartion error')
        }
      
    }
    
    async signinS(signInDto: SignInDto){
        
        let {login, password} = signInDto
        if(typeof login === 'undefined' || typeof password === 'undefined' ) throw new BadRequestException('Invalid data')
        validate(signInDto)


        //find user
        const candidate = await this.userModel.findOne({
            where:{
                login
            }
        })
        if(!candidate) throw new BadRequestException('Invalid login or password.')

        //password checking
        const passcheck = await bcrypt.compare(password, candidate.password)
        if(!passcheck) throw new BadRequestException('Invalid login or password.')

        const payload = { id: candidate.id, username: login, regIn:candidate.createdAt };
        return jwt.sign(payload, config.jwt_s)
    }


}

function validate(dto) {
    if(dto.email) if(!EmailValidator.validate(dto.email)) throw new BadRequestException('Invalid email')

    if(dto.password.length == 0 || dto.password.length < 6) throw new BadRequestException('Min password length is 6 symbols')
    
    
}
