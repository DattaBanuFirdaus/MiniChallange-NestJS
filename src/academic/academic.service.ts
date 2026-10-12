import { Injectable } from '@nestjs/common';
import { GradeDto } from './dto/grade.dto.js';

@Injectable()
export class AcademicService {
    countGrade(dto: GradeDto) {
        const nilai = dto.nilai
        let grade = 'E';
        if (nilai >= 90) {
            grade = 'A';
        }
        else if (nilai >= 80) {
            grade = 'B';
        }
        else if (nilai >= 70) {
            grade = 'C';
        }
        else if (nilai >= 50) {
            grade = 'D';
        }
        return {
            message: "nilai telah dihitung",
            grade: grade
        }
    }
}
