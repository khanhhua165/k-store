import { IsString, IsNumberString, Length } from "class-validator";

export default class UpdateUserDto {
  @IsString()
  public name!: string;

  @IsString()
  public city!: string;

  @IsString()
  public state!: string;

  @IsString()
  public address!: string;

  @IsNumberString()
  @Length(10, 10)
  public phone!: string;
}
