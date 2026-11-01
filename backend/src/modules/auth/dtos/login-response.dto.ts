import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'User information' })
  user: {
    id: string;
    phone: string;
    firstName?: string;
    lastName?: string;
  };

  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'Token expiration time' })
  expiresIn: string;
}
