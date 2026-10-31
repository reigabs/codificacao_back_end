import { Module } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { AlunosController } from "./alunos.controller.js";
import { AlunosService } from "./alunos.service.js";
import { Aluno, AlunoSchema } from "./schemas/aluno.schema.js";
import { MongooseModule } from "@nestjs/mongoose";



@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Aluno.name, schema: AlunoSchema
    }])
  ],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}