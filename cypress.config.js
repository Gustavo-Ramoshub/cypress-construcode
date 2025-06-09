const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://construcode.com.br',
    defaultCommandTimeout: 10000,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
    },
  },
})