import {Injectable} from '@nestjs/common';

@Injectable()
export class ProdutosService {
    produtos = [
        {id: 1, nome: 'Arroz Namorados', preco: 9.99},
        {id: 2, nome: 'Feijão Timbiras', preco: 7.99},
        {id: 3, nome: 'Macarrão Galo', preco: 5.99},
        {id: 4, nome: 'Açúcar União', preco: 4.99},
        {id: 5, nome: 'Sal da Lebre', preco: 2.99},
        {id: 6, nome: 'Óleo Soya', preco: 6.99},
        {id: 7, nome: 'Café Pilão', preco: 12.99},
        {id: 8, nome: 'Leite Itambé', preco: 3.99},
        {id: 9, nome: 'Margarina Qualy', preco: 4.49},
        {id: 10, nome: 'Farinha de Trigo Dona Benta', preco: 5.49},
        {id: 11, nome: 'Pão de Forma Pullman', preco: 6.49},
        {id: 12, nome: 'Queijo Mussarela Tirolez', preco: 19.99},
        {id: 13, nome: 'Presunto Sadia', preco: 14.99},
        {id: 14, nome: 'Refrigerante Coca-Cola', preco: 7.49},
        {id: 15, nome: 'Suco de Laranja Del Valle', preco: 5.99},
        {id: 16, nome: 'Cereal Matinal Kellogg\'s', preco: 12.49},
        {id: 17, nome: 'Biscoito Recheado Oreo', preco: 4.99},
        {id: 18, nome: 'Chocolate Nestlé', preco: 6.99},
        {id: 19, nome: 'Sorvete Kibon', preco: 9.49},
        {id: 20, nome: 'Água Mineral Crystal', preco: 2.49},
        {id: 21, nome: 'Molho de Tomate Elefante', preco: 3.99},
        {id: 22, nome: 'Maionese Hellmann\'s', preco: 5.49},
        {id: 23, nome: 'Mostarda Heinz', preco: 4.99},
        {id: 24, nome: 'Ketchup Heinz', preco: 5.99},
        {id: 25, nome: 'Azeite de Oliva Gallo', preco: 19.99},
       
       
    ];

    listarProdutos() {
        return this.produtos;
    }
}