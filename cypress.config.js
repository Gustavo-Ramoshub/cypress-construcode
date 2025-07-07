// Importa função para definir a configuração do Cypress
const { defineConfig } = require("cypress")
// Importa módulo para manipulação avançada de arquivos
const fs = require('fs-extra')
// Importa módulo para manipulação de caminhos de arquivo
const path = require('path')

module.exports = defineConfig({
  // ID do projeto Cypress para integração com Dashboard
  projectId: 'r5mzck',
  // Define o reporter para gerar relatórios detalhados
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // URL base para os testes E2E
    baseUrl: 'https://construcode.com.br',
    // Timeout padrão de comandos: 25 segundos
    defaultCommandTimeout: 20000,
    // Habilita recursos experimentais para sessão e origem cruzada
    experimentalSessionAndOrigin: true,
    // Desativa segurança padrão do Chrome para testes multi-domínio
    chromeWebSecurity: false,
    // Pasta onde arquivos baixados serão salvos
    downloadsFolder: 'cypress/downloads',
    // Configura eventos no processo Node do Cypress
    setupNodeEvents(on, config) {
      // Inicializa plugin Mochawesome
      require('cypress-mochawesome-reporter/plugin')(on)
      on('task', {
        // Define uma tarefa customizada para verificar arquivo
        isFileExist(filePath) {
          // Retorna true se o arquivo existir, false caso contrário
          return fs.existsSync(filePath)
        },
      })
    },
  },
})