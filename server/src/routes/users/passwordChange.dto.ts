import { IsEmail, IsString, MinLength } from "class-validator";

export default class PasswordChangeDto {
  @IsString()
  @MinLength(6)
  public password!: string;

  @IsString()
  @MinLength(6)
  public newPassword!: string;
}
