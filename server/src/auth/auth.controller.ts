import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from 'src/DTO/SignIn.dto';
import { SignUpDto } from 'src/DTO/SignUp.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    signupC(@Body() signUpDto: SignUpDto){
       return this.authService.signupS(signUpDto)
    }

    @Post('signin')
    async signinC(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: Response){
        const token = await this.authService.signinS(signInDto)
        res.cookie('access_token', token, {signed:true, httpOnly: true, sameSite:true})
        return 'OK'
    }

}
