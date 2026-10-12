import { Injectable } from '@nestjs/common';
import { convertMeterdto } from './dto/convert-meters-dto.js';


@Injectable()
export class ConvertService {
convertMeters(param: convertMeterdto) {    
    const kilometers = param.meters / 1000;       
    const centimeters = param.meters * 100;
    return {
        success: true,
        message: "Conversion successful",
        data: {
            meters: param.meters,
            kilometers,
            centimeters
        }
     };
  }

}
