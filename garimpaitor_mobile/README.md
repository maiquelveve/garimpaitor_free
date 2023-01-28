# react_native_tamplete_default
Estrutura básico para um APP em reac-native com EXPO e react-native-paper


# INSTALAÇÂO

1 - Clone o repositorio

2 - Rode "yarn" ou "npm install"

3 - Rode expo start


# DEPENDECIAS INSTALADAS E COMANDOS

    -> DEPENDENCIAS BASICAS DE JS e REACT-NATIVE 
        
        yarn add react-native-paper
        yarn add react-native-safe-area-context
        yarn add axios
        yarn add moment 


    -> DEPENDENCIAS AUXILIARES
    
        expo install @react-native-async-storage/async-storage
        expo install react-native-picker-select
        expo install @react-native-picker/picker
        expo install @react-native-community/datetimepicker


    -> DEPENDENCIAS PARA NAVEGAÇÃO

        expo install @react-navigation/native
        expo install react-native-screens react-native-safe-area-context
        expo install @react-navigation/stack
        expo install @react-navigation/drawer   
        expo install @react-navigation/bottom-tabs
        expo install react-native-reanimated
        expo install react-native-gesture-handler       


# CONFIGURAÇÕES

    -> CONFIGURAÇÃO DO ARQUIVO babel.config.js

        module.exports = function (api) {
            api.cache(true);
            return {
                presets: ['babel-preset-expo'],
                plugins: [
                'react-native-reanimated/plugin',
                ],
                env: {
                production: {
                    plugins: ['react-native-paper/babel'],
                },
                },
            };
        };


# COMANDOS ADICIONAIS
    
    -> RODAR E APAGAR O CACHE DO JS
        
        - expo r -c


# OBSERVAÇÕES

    -> ACESSAR PAGINAS PRIVADAS OU PUBLICAS

        - Simula com o usuario logado setando a variavel "isLogged" como TRUE, então será acessado as páginas "PRIVADAS".
        - Simula com o usuario deslogado setando a variavel "isLogged" como FALSE, então será acessado as páginas "PUBLICAS".

        Essa variavel, "isLogged" encontra-se em dois arquivo:
            
            - src/components/Layout/index.js
            - src/routes/index.js

        O uso dessa funcionalidade de maneira dinamica, por exemplo, poderia ocorrer essa verificação pelo "context" da aplicação, realizado uma consulta a uma API, no LocalStorge, dentre outra possibilidades.
        
