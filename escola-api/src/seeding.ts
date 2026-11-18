import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module.js';
import { AlunosService } from './alunos/alunos.service.js';
import { faker } from '@faker-js/faker/locale/pt_BR';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const alunosService = app.get(AlunosService);

    console.log('🎄 iniciando a geração de Faker Alunos...')

    const cursosDisponiveis = [
        'Programador Full-Stack',
        'Panificação',
        'Eletricista Predial',
        'Excel Basico',
        'Power BI basico',
        'Apresentações Criativas no Canva',
        'Corte e Costura',
        'Tecnico em Biotecnologia',
        'Tecnico em Informatica',
        'Tecnico em Desenvolvimento em Jogos Digitais',
        'Tecnico em Manutenção e Suporte em Informatica',
    ];

    for (let i = 0; i < 100; i++) {
        const cursosAleatorios = faker.helpers.arrayElements(
            cursosDisponiveis,{min: 1, max: 3});
            const alunoFaker = {
                nome: faker.person.fullName(),
                idade: faker.number.int({
                min:16,
                max:65,
                }),
                matricula: faker.string.numeric(5),
                curso: cursosAleatorios,
                ativo:true,
        
            };
            try{
                await alunosService.create(alunoFaker);
            }catch (error) {
                console.log(`Pular: Erro ao criar Matricula para ${alunoFaker.nome}! - Matricula Duplicada`);
            }
    }
    console.log(' Banco de dados populado com sucesso!');
    console.log('Feliz Natal 🎄');

    await app.close();
}
bootstrap();

