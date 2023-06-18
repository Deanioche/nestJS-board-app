import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class authValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { username, password } = value;
    this.isValueValid(username);
    this.isValueValid(password);
    return value;
  }

  private isValueValid(data: any) {
    if (!data) throw new BadRequestException('Data is empty');
    if (typeof data !== 'string')
      throw new BadRequestException('Data is not a string');
    if (data.length < 4) throw new BadRequestException('Data is too short');
  }
}
