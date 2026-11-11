import { IsString, IsNotEmpty, IsInt, Min, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAlunoDto {
    @ApiProperty({
        description: 'Nome do aluno',
        example: 'Matheus Sousa',
    })
    @IsString()
    @IsNotEmpty({
        message: 'O nome é obrigatório e não pode estar vazio.',
    })
    nome: string;

    @ApiProperty({
        example: 20,
        description: 'Idade do aluno',
    })
    @IsInt({
        message: 'A idade deve ser um número inteiro.',
    })
    @Min(0, {
        message: 'A idade não pode ser um número negativo.',
    })

    idade: number;


    @ApiProperty({
        description: 'Matrícula do aluno',
        example: '2023-0001',
    })
    @IsString()
    @IsNotEmpty({
        message: 'A matrícula é obrigatória.',
    })
    matricula: string;

    @ApiProperty({
        description: 'Cursos em que o aluno está matriculado',
        example: ['Ciência da Computação', 'Letras de Português'],
    })
    @IsString({each: true, message: 'Cada curso deve ser um texto.'})
    @IsArray()
    @ArrayMinSize(1, {
        message: 'O aluno deve estar matriculado em pelo menos um curso.',
    })
    curso: string[];
}