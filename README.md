# Testando-API-com-Cypress
Material de apoio:

Link da API: https://swapi.dev/

Link de uma vídeo aula - completa - sobre o assunto: https://www.youtube.com/watch?v=rbObfNh2bno&t=4336s

PS: A Swagger Starwars não permite fazer o comando 'POST', porém a logica que utilizei para criar serve para qualquer outra API.
--------------------------------------------------------------------------------------------------------------------------------
--> Como testar uma API utilizando o Cypress
-> GET
1. link da API: https://swapi.dev/
2. Organizando seu projeto por pastas:
	2.1 - Uma pasta "mãe" para organizar os Requests e Tests, que nesse caso vamos chamar de SW (por ser Starwars);
	2.2 - Dentro dela vamos criar mais 3:
		2.2.1 - Payloads: Pasta aonde se encontram os json's
		2.2.2 - Requests: Aonde iremos alocar nossas estruturas de request.js
		2.2.3 - Tests: Como o proprio nome diz, será a pasta para alocar os testes relacionados spec.js
		Dica: Uma observação muito importante é sempre por o nome da Request e do Test igual, pois assim fica muito mais fácil de identificar
3. Feito a organização, tendo o link da API que podemos testar, agora vamos para o modelo de como iniciar.
	- Quando o assunto é padronização, os frameworks possuem algo chamado "roteiro", que ajuda bastante na assimilação e padronização dos testes.
	- Vejamos o caso de do request relacionado a GET. O nome do arquivo será GETStarwars.request.js:

function allBooks() {               -> nome da função dada (o usuário que a escolhe, porém é bom por um nome que condiz com o teste)
    // cy.request - cliente http   
    return cy.request({		    -> comando para iramos ao URL
        method: "GET", 		    -> metodo requisitado pelo usuário
        url: "v1/Books",	    -> o caminho daquela API que queremos testar	
        failOnStatusCode: false,    -> comando para que quando a API seja diferente de 200, ele nos informe
        //Quando uma requisião não da 200, ele a passa.
    })
}
export { allBooks };                -> comando que fara a importação para o proximo passo de testes

- Vejamos agora a parte de Teste. O nome do arquivo, como foi dito, deverá ser o mesmo. Logo: GETStarwars.spec.js

import * as GETBooks from '../requests/GETBooks.request'; -> importação do arquivo que criamos e seu caminho

describe('GET Books', () => {				  -> Função do que será feito dentro do teste	
    it('Listar todos os livros', () => {		  -> Descrição do que será feito \\ \\ \\ \\ 
        GETBooks.allBooks().should((response) => {        -> Comandos que devem retornar para que mostre que a API conseguiu ser mapeada
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
        })
    })
})

->POST
- Para fazer os testes de requisição com o POST, o processo requer um pouco mais de atenção e cuidados.
1. Nesse caso, vamos utilizar a mesma API para realizar a função POST:  https://swapi.dev/.
Caso não seja possivel, qualquer swagger/api livre também é valida.
2. Já com o projeto organizado, não preciamos nos preocupar em fazer esse passo novamente. Porém, volto a dizer: Request e Test com os nomes iguais.
3. Após os 2 primeiros passos, podemos começar a configuração do caso de teste.
Vamos chamar o request de POSTStarwars.request.js:

const payloadsAddName = require('../payloads/add-people.json')[1]

function addPeople () {
    return crypto.request({
        method: 'POST',
        url:"people/3/",
        failOnStatusCode: false,
        body: payloadsAddName -> Importação feita da pasta "payloads" com os dados de uma requisição GET que serão alteradas por novas. Veremos na pratica logo abaixo como foi feito.
    })
}
export { addPeople }       -> Comando que fara a importação para o proximo passo de testes

- Vejamos agora a parte de Teste. Nome arquivo repete a logica: POSTStarwars.spec.js:

import * as POSTStarwars from '../requests/POSTStarwars.request'  -> importação do arquivo request que criamos e seu caminho.

describe('POST People', () => {
    it('Adicionar um nome novo', () => {
        POSTStarwars.addPeople().should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('R3-D3')             -> Aqui é o passo aonde o Cypress ao enviar a requisição de POST irá conferir se o mesmo mudou o nome "name":"R2-D2" para 	
            expect(response.body).to.be.not.null			para "Name":"R3-D3". Veja que o comando ".body.name" deve ser igual ao "to.eq('R3-D3')."
        })
    })
}) 

* [1]CITAÇÃO
- Como eu escrevi na fonte, aqui iremos explicar o passo que foi feito.
1. Criamos um arquivo.json na pasta Payload com os dados dessa API, que foram:
{
	"name": "R2-D2",              
	"height": "202",
	"mass": "136",
	"hair_color": "none",     (API sem alteração)
	"skin_color": "white", 
	"eye_color": "yellow",
	"birth_year": "41.9BBY"
}

{
	"name": "R3-D3",
	"height": "202",
	"mass": "136",
	"hair_color": "none",     (API com alteração)
	"skin_color": "white",
	"eye_color": "yellow",
	"birth_year": "41.9BBY"
}

- Como podem ver, essa mudança é a caracteristica do comando POST que iremos fazer nessa requisição.
Logo, ao importar no arquivo "POSTStarwars.request.js", a importação vem a partir da variavel: const payloadAddPeople = require('../payloads/add-people.json').
Validamos a importação pelo comando:  body: payloadAddPeople.
E assim é feita essa importação para possamos usar ela nessa aplicação.
PS: Descobri depois que essa API n aceita outras funções, apenas GET
