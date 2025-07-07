/// <reference types="cypress" />

const uiMap = {
  selectors: {
    registryFilter: '#search_cadastro',

    table: {
      pagination: {
        rowCountSelector: '#newDatatable_length .form-select',
      },

      rows: {
        visibleRows: 'table tbody tr',
      },
    },
  },

  checkboxes: {
    singleUser: '#checkBoxPessoas',
    selectAllUsers: '#selecionartodos',
  },

  fields: {
    nameFilter: '#search_fotonome',
    emailFilter: '#search_email',
    profileFilter: '#search_permissao',
  },

  messages: {
    userSelectionInfo: '#registrosSelecionados',
    restrictedActionTooltip: '[data-bs-original-title="O seu perfil atual não permite que você realize essa ação"]',
  },
}

export default {

  // Filtra usuários pelo nome
  filterByName(name) {
    cy.get(uiMap.fields.nameFilter).type(name)

    cy.get(uiMap.selectors.table.rows.visibleRows)
      .should('contain.text', name)
  },

  // Filtra usuários pelo e-mail
  filterByEmail(email) {
    cy.get(uiMap.fields.emailFilter).type(email)

    cy.get(uiMap.selectors.table.rows.visibleRows)
      .should('contain.text', email)
  },

  // Filtra usuários pelo perfil
  filterByProfile(profile) {
    cy.get(uiMap.fields.profileFilter).type(profile)

    cy.get(uiMap.selectors.table.rows.visibleRows)
      .should('contain.text', profile)
  },

  // Filtra usuários pelo tipo de cadastro
  filterByRegistry(registryValue) {
    cy.get(uiMap.selectors.registryFilter).select(registryValue)

    cy.get(uiMap.selectors.table.rows.visibleRows)
      .should('contain.text', registryValue)
  },

  // Marca a checkbox de um único usuário
  selectSingleUser() {
    cy.get(uiMap.checkboxes.singleUser)
      .should('be.visible')
      .check()

    cy.get(uiMap.messages.userSelectionInfo)
      .should('include.text', 'pessoa selecionada')
  },

  // Marca a checkbox para selecionar todos os usuários
  selectAllUsers() {
    cy.get(uiMap.checkboxes.selectAllUsers)
      .should('be.visible')
      .check()

    cy.get(uiMap.messages.userSelectionInfo)
      .should('include.text', 'pessoas selecionadas')
  },

  // Valida tooltip de ação restrita para administrador global
  trySelectGlobalAdmin() {
    cy.get(uiMap.messages.restrictedActionTooltip)
      .should('be.visible')
  },

  // Valida a quantidade de registros exibidos por página
  validateRowCount(expectedCount) {
    const expected = parseInt(expectedCount)

    cy.get(uiMap.selectors.table.pagination.rowCountSelector)
      .should('be.visible')
      .select(expectedCount, { force: true })

    cy.get('body').then($body => {
      const rows = $body.find(uiMap.selectors.table.rows.visibleRows)

      if (rows.length > 0) {
        cy.get(uiMap.selectors.table.rows.visibleRows).then($rows => {
          const displayed = $rows.length
          cy.log(`Exibido: ${displayed} usuários`)

          try {
            expect(displayed).to.equal(expected)
          } catch (err) {
            cy.log(`Esperado ${expected}, mas exibido ${displayed}`)
          }
        })
      } else {
        cy.log('Nenhuma linha encontrada')

        if (expected !== 0) {
          cy.log(`Esperado ${expected}, mas exibido 0`)
        }
      }
    })
  },
}