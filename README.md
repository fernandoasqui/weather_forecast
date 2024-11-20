# Sobre o Projeto

Projeto simples com intuito de consumir as APIs open source do site `meteoblue` trazendo uma interface simples e
intuitiva para a visuazação da previsão do tempo.

Sendo possível efetuar buscas através do nome da cidade e/ou através de latitude x  longitude.

Apresenta uma visualização resumida da data selecionada e também uma visão mais completa com a previsão para os
proxímos 7 dias.

# Instalação

O projeto encontra-se dividido em duas partes, sendo uma para o back-end e outra para o front-end.

## Back-end

No arquivo `.env_example` adicionamos as informações necessárias como solicitado no arquivo e após renomeie o
arquivo para
`.env`.

Precisamos ter o `docker-compose` instalado no servidor/computador.

Após conseguiremos rodar o comando: `docker pull postgres` para baixar a imagem do banco de dados, onde será
armazenado as previsões do tempo.

Execute o comando `docker-compose up -d` para subir o container com o banco de dados, nesse caso utizamos `Postgres`.

Acesse a pasta `back-end-trf` abra o terminal e rode o comando `npm run startApp`.
Após rodar esse comando o back-end da aplicação estará online e no terminar exibira a seguinte
mensagem: `Server is running!`

## Front-end

Acesse a pasta `front-end-trf` e execute o comando `npm run build`
e após rode o comando `npm run start`

