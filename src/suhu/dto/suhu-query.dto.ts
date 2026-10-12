import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNumber,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const SATUAN = ['celsius', 'fahrenheit', 'kelvin'];

@ValidatorConstraint({
  name: 'differentSatuan',
  async: false,
})
class DifferentSatuanConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown, args: ValidationArguments) {
    const object = args.object as { dari?: string };

    if (
      typeof object.dari !== 'string' ||
      typeof value !== 'string'
    ) {
      return true;
    }

    return object.dari !== value;
  }

  defaultMessage() {
    return 'Satuan dari dan ke tidak boleh sama';
  }
}

@ValidatorConstraint({
  name: 'kelvinMinimum',
  async: false,
})
class KelvinMinimumConstraint
  implements ValidatorConstraintInterface
{
  validate(value: unknown, args: ValidationArguments) {
    const object = args.object as { dari?: string };

    if (object.dari !== 'kelvin') {
      return true;
    }

    return (
      typeof value === 'number' &&
      Number.isFinite(value) &&
      value >= 0
    );
  }

  defaultMessage() {
    return 'Jika satuan asal kelvin, nilai tidak boleh kurang dari 0';
  }
}

export class SuhuQueryDto {
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return value;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return Number.NaN;
    }

    return Number(value);
  })
  @IsDefined({ message: 'Query nilai wajib diisi' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Nilai harus berupa angka' },
  )
  @Validate(KelvinMinimumConstraint)
  nilai!: number;

  @IsDefined({ message: 'Query dari wajib diisi' })
  @IsIn(SATUAN, {
    message: 'Satuan asal harus celsius, fahrenheit, atau kelvin',
  })
  dari!: string;

  @IsDefined({ message: 'Query ke wajib diisi' })
  @IsIn(SATUAN, {
    message: 'Satuan tujuan harus celsius, fahrenheit, atau kelvin',
  })
  @Validate(DifferentSatuanConstraint)
  ke!: string;
}