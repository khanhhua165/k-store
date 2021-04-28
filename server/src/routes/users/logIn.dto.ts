import { IsEmail, IsString, MinLength } from "class-validator";

export default class LogInDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6)
  public password!: string;
}
