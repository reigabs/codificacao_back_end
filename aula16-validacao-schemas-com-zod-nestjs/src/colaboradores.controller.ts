import { Controller, Post, Body, UsePipes, } from "@nestjs/common";
import { colaboradorSchema } from './colaborador.schemas.js'
import { ZodValidationPipe } from "./zod-validation.pipe.js";
import type { Colaborador } from "./colaborador.schemas.js"

@Controller('colaboradores')
export class colaboradoresController {
    @Post()
    @UsePipes(new ZodValidationPipe(colaboradorSchema))
    async create (@Body() body: Colaborador){
        return{
            Mensagem: 'Colaborador cadrastado com sucesso',
            dados: body,
        };
    };
};