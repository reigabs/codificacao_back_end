import { Controller, Post, Body} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse} from "@nestjs/swagger";
import { CriarProdutoDto } from "./dto/criar-produtos.dto.js";

@ApiTags('produtos')
@Controller('Produtos')
export class ProdutosController{
@Post()
@ApiOperation({
summary:'Cadastrar um novo produto no estoque.',


})
@ApiResponse({
    status: 201,
    description:'Produto cadastrado com sucesso.'

})
@ApiResponse({
status:400,
description:'Playload enviado contém dados maus formatados e/ou inválidos.',
})
async criar(@Body() criarProdutoDto: CriarProdutoDto){
return {
    id:67,
    ...criarProdutoDto,
    criadoEm: new Date().toLocaleDateString(),
}
}

}