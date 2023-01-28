# Garimpaitor Example Free

-> Projeto Completo com projetos WEB, Mobile e Backend(API com GRAPHQL) <-


# Resumo do PROJETO:

  - É um projeto completo que conta com a parte de FRONTEND web e mobile e a parte BACKEND conta com uma API com graphQl (API principal) e uma API RestFull como auxiliar do backend principal.
 
  - As funcionalidades do projeto em resumo contém o registro de usuario completo com perfil de "usuario garimpador" (usuário comum) e "root" (usuário administrador) - (criação, login, alteração de perfil, reset de senha, alteração de senha, desetivar conta) para os usuarios garimpadores, já para os usuário Roots as mesmas opções e controle, troca de perfil, visualização, etc dos demais usuários. 
  
  - Há um CRUD completo de "marcas", "redes" e "mercados". Para os usuario comuns a criação fica pendentes de verificação e liberação dos administradores de sistema. Quanto ao mercados ainda cada usuário pode adicionar para si mercados cadastrado por outros usuarios.

# INSTALAÇÂO:
  
  -> Clone o repositório. (gti clone .....);


  - FRONTEND WEB


    * yarn OU npm i => para realizar a instalação das dependencias
    * Crie na raiz do projeto o arquivo ".env.local" com as variaveis abaixo:
      
      + NEXT_PUBLIC_NAME_COOKIES_USER_TOKEN=token_garimpaitor
      + NEXT_PUBLIC_MESSAGE_ERROR_500=Ocorreu um erro inesperado. Tente novamente mais tarde.
      + NEXT_PUBLIC_MESSAGE_ERROR_ALERT_CATCH=OPSS! Ocorreu um erro inesperado. Tente novamente mais tarde.
      + NEXT_PUBLIC_API_HELPERS_URL=http://localhost:4001
      + NEXT_PUBLIC_TOKEN_API_HELPERS=123456

      -> O conteudo das váriaveis de hambiente é somente ilustrativo podendo ser alterado conforme a vontade de quem estará configurando, porém deve conter todas as variáveis preenchidas.
     
     
  - FRONTEND MOBILE
  
  
    * yarn OU npm i => para realizar a instalação das dependencias
    * No arquivo "app.config" na raíz do projeto adicione o enderço da API principal, conforme exemplo abaixo:
      
      + export const extra = {
        URL_API: 'http://192.168.15.11:4000',
       };

      -> Esse endereço deve ser via IP, mesmo que rode em LOCALHOST, pois o app foi desenvolvido com "EXPO".
      
      
  - BACKEND API GRAPHQL 
  
  
    * yarn OU npm i => para realizar a instalação das dependencias
    * Crie um banco de dados no MySql com o nome:
        
        + "garimpaitor_db"
        
    * Execute todas as migrates com o comando abaixo: 

        + npx sequelize-cli db:migrate
        
    * Na pasta "src/database/datas" copie o cídigo sql do arquivo "citys.sql" e rode-o no seu banco de dados para adicionar todas as cidade do brasil.
    * Crie na raiz do projeto o arquivo ".env" com as variaveis abaixo:
      
      + PORT=4000
      + SECRET_TOKEN=asdflqk+KasdLKJD{/+-QA6S98+1A1SD~QW3APS::W0asSDE++58a4sd5as4d5fSA12sd1fAS#%
      + EXPIRESIN=7d
      + API_PROTOCOL=http://
      + API_HOST=localhost:
      + API_PORT=4000
      + DB_DIALECT=mysql
      + DB_HOST=localhost
      + DB_USERNAME=root
      + DB_PASSWORD=root
      + DB_NAME_DATABASE=garimpaitor_db

    * Observações:
    
        + O conteudo das váriaveis de hambiente é somente ilustrativo podendo ser alterado conforme a vontade e a necessidade de quem estará configurando, porém deve conter todas as variáveis preenchidas. 
      
        + Quanto ao endereço "API_HOST", "API_PORT" e "PORT" devem ser de acordo com a necessidade do local onde será executada a API. 
      
        + Quanto da "DB_USERNAME" e "DB_PASSWORD" devem ser preenchidos, conforme as credenciais de acesso ao MySql que será utilizado.


  - BACKEND API AUXILIAR 
  
  
    * yarn ou npm i => para realizar a instalação das dependencias
    * Crie na raiz do projeto o arquivo ".env" com as variaveis abaixo:
      
        + SECRET_TOKEN_SYSTEM=asd$3/ALSDNÇçsldnfç9a8s8LAOa.sd,AasmdlfS#@$%$#%ADS.,FMD9d41a63sd51f~d~fa,sasd89asd
        + SECRET_TOKEN_USER=asdflqk+KasdLKJD{/+-QA6S98+1A1SD~QW3APS::W0asSDE++58a4sd5as4d5fSA12sd1fAS#%
        + EXPIRESIN=7d
        + API_PROTOCOL=http://
        + API_HOST=localhost:
        + API_PORT=4001
        + DB_DIALECT=mysql
        + DB_HOST=localhost
        + DB_USERNAME=root
        + DB_PASSWORD=root
        + DB_NAME_DATABASE=garimpaitor_db

    * Observações:
    
        + O conteudo das váriaveis de hambiente é somente ilustrativo podendo ser alterado conforme a vontade e a necessidade de quem estará configurando, porém deve conter todas as variáveis preenchidas. 
      
        + Quanto ao endereço "API_HOST", "API_PORT" e "PORT" devem ser de acordo com a necessidade do local onde será executada a API. 
      
        + Quanto da "DB_USERNAME" e "DB_PASSWORD" devem ser preenchidos, conforme as credenciais de acesso ao MySql que será utilizado.



# Tecnologias e Dependencias


  * FRONTEND WEB

    - NextJs
    - Material UI
    - Apollo Client
    - Formik
    - Yup
    - Sweetalert
    - Nookies
    - Axios
    - Entre outras dependecias
   
   
   * FRONTEND MOBILE
   
      - Expo
      - React Native
      - React Native Paper
      - Apollo Client 
      - Formik
      - Yup
      - React Navigation Drawer
      - React Navigation Stack
      - Axios
      - Entres outras dependencias 
    
    
  * BACKEND API GRAPHQL

    - NodeJs
    - Bcrypt
    - Apollo Server
    - GraphQl
    - JWT - jsonwebtoken
    - Sequelize
    - Mysql
    - Entre outras dependecias


  * BACKEND API AUXILIAR - RestFull

    - NodeJs
    - Cors
    - Multer
    - Mysql
    - Sequelize
    - JWT - jsonwebtoken
    - Express
    - Entre outras dependecias
    

      
# Conslusão

  * Execute e acesse as aplicações em desenvolvimento, com as configurções apresentadas:
    
    + FRONTEND WEB
      - No terminal navegue até a pasta "garimpador_front"
      - Execute o comando:
      
        * yarn dev OU npm run dev

      - Acesse no browser
        
        * http://localhost:3000


    + FRONTEND MOBILE
    
      - No terminal navegue até a pasta "garimpaitor_mobile"
      - Execute o comando:
          
          * yarn dev OU npm run dev OU expo start
          
      - Agora execute no celular ou no emulador conforme as opções disponibilizadas pelo EXPO
     
     
    + BACKEND API GRAPHQL
    
      - No terminal navegue até a pasta "garimpaitor_back"
      - Execute o comando:
          
          * yarn dev OU npm run dev
          
      - Acesse no browser 
        
        * http://localhost:4000


    + BACKEND API AUXILIAR
    
      - No terminal navegue até a pasta "apiHelpersGarimpaitor"
      - Execute o comando:
          
          * yarn dev OU npm run dev
          
      - Acesse no insomnia ou postman ou outro software de sua preferencia 
        
        * http://localhost:4001
     
