import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto{

    @MinLength(2)
    @IsString()
    login:string;
    
    @MinLength(6)
    @IsString()
    password:string;

    @IsEmail()
    @IsString()
    email:string;
}