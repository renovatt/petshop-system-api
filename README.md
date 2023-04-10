# Agendamentos para PetShops - API

## Visão geral <br>

Essa API foi criada para permitir que os donos de petshops agendem serviços para os pets de seus clientes. Com esta API, os usuários `Donos de PetShops` podem realizar as seguintes ações:
 `criar, ler, atualizar e excluir usuários, clientes, agendamentos e agendamentos cancelados.`

<br><br>

 ### Autenticação

#### Todas as rotas da API requerem autenticação por meio de um token JWT, que deve ser enviado no cabeçalho de autorização da requisição com o seguinte formato:
<br>

    Authorization: Bearer {token}

O token pode ser obtido fazendo uma requisição para a rota de login (POST /login).

## Rotas

### Login
<br>

    POST /login

Faz login de um usuário com base em suas credenciais e retorna um token JWT válido.

Parâmetros de entrada:

- email: E-mail do usuário. (string)
- password: Senha do usuário. (string)

Respostas
- 200 OK: Login efetuado com sucesso. Retorna o token JWT no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: E-mail ou senha inválidos.

<hr>

### Registro

    POST /register

Endpoint para criar um novo usuário. Recebe nome, email e senha do usuário e cria um novo registro no banco de dados.

Parâmetros de entrada:

- username: Nome do usuário. (string)
- email: E-mail do usuário. (string)
- password: Senha do usuário. (string)

Respostas
- 200 OK: Usuário registrado com sucesso.
- 400 Bad Request: Dados inválidos enviados na requisição.

<hr>

### Clientes
<br>

Listar clientes

    GET /clients

Retorna uma lista de todos os clientes cadastrados pelo usuário autenticado.

Respostas
- 200 OK: Lista de agendamentos retornada com sucesso. Retorna um array com os agendamentos no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Cadastrar clientes

    POST /client

Envia um objeto com o cliente cadastrado pelo usuário autenticado.

Respostas
- 200 OK: Cliente cadastrado com sucesso. Retorna um objeto com o cliente no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Atualizar cliente

    PUT /client/:id

Atualiza os dados do cliente cadastrado pelo usuário autenticado.

Respostas
- 200 OK: Cliente atualizado com sucesso. Retorna um objeto com o cliente no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Deletar cliente

    DELETE /client/:id

Deleta o cliente cadastrado pelo usuário autenticado.

Respostas
- 200 OK: Cliente deletado com sucesso. Retorna o objeto do cliente deletado no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<hr>

### Agendamentos
<br>

Listar agendamentos

    GET /schedules

Retorna uma lista de todos os agendamentos do usuário autenticado.

Respostas
- 200 OK: Lista de agendamentos retornada com sucesso. Retorna um array com os agendamentos no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Enviar agendamentos

    POST /schedule

Envia um objeto com o agendamento relizado pelo usuário autenticado.

Respostas
- 200 OK: Agendamento realizado com sucesso. Retorna um objeto com o agendamento no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Atualizar agendamentos

    PUT /schedules/:id

Atualiza o agendamento relizado pelo usuário autenticado.

Respostas
- 200 OK: Agendamento atualizado com sucesso. Retorna um objeto com o agendamento no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Deletar agendamentos

    DELETE /schedules/:id

Deleta o agendamento que foi relizado pelo usuário autenticado.

Respostas
- 200 OK: Agendamento deletado com sucesso. Retorna o objeto do agendamento deletado no corpo da resposta.
- 400 Bad Request: Dados inválidos enviados na requisição.
- 401 Unauthorized: Usuário não autenticado.

<br>

Deletar agendamentos cancelados

    DELETE /schedules/canceled

Deleta todos os agendamentos cancelados do usuário autenticado.

Respostas
- 200 OK: Agendamentos cancelados deletados com sucesso. Retorna um objeto com a contagem de agendamentos deletados no corpo da resposta.
- 400 Bad Request: Se caso não existir dados.
- 401 Unauthorized: Usuário não autenticado.

<hr>

## Erros
Os erros da API são retornados com o seguinte formato:

<pre>
    <code>
    {
        "error": "Mensagem de erro"
    }
    </code>
</pre>

Onde "Mensagem de erro" é a mensagem de erro correspondente ao erro ocorrido.

Os códigos de erro HTTP retornados pela API são:

- 400 Bad Request: Requisição mal formada ou com dados inválidos.
- 401 Unauthorized: Não autorizado ou token inválido.

<hr>

## Nota

<br>

Essa API trabalha em conjunto com [thedogapi - thecatapi](https://thedogapi.com/) - afim de capturar a referencia da imagem e raça do pet.

O projeto completo esta disponível em:

- [Github](https://github.com/renovatt/schedule-petshop-system.git)

- [CutePet - Sistema de Agendamentos](schedule-petshop-system.vercel.app)

<hr>

### Clone do Projeto

    $ git clone https://github.com/renovatt/petshop-system-api.git

Instalando as Dependências

    $ npm install

Iniciando o Projeto

    $ npm run dev

<br>

**Como contribuir?**
##### Você pode dar suporte me seguindo aqui no GitHub, dando uma estrela no projeto ou criar uma conexão comigo no linkedin, fazendo parte da minha Networking e curtir o meu projeto.

<br>

**Autor**
[*Wildemberg Renovato de Lima*](https://www.linkedin.com/in/renovatt/)