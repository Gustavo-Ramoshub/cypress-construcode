/// <reference types="cypress" />

const uiMap = {
  buttons: {
    edit: 'li[data-content="Editar"] a',
    edit2: 'body > nav > ul > li:nth-child(12) > a',
    delete: '#confirmarExclusao',
    confirmDeleteStep1: '.dropdown-confirmation__buttons a[role="button"]',
    confirmDeleteStep2: '.btn.btn-danger',
  },

  titles: {
    configs: '.breadcrumb-item.active.align-items-end',
  },
}

export default {

  // Clica no botão de editar empresa na página principal e verifica se entrou nas configurações básicas
  clickEditEnterprise() {
    cy.get(uiMap.buttons.edit)
      .should('exist')
      .click({ force: true })

    cy.get(uiMap.titles.configs)
      .contains('Configurações básicas')
  },

  // Clica no botão de editar empresa vindo da lista mestre e verifica se entrou nas configurações básicas
  clickEditCompanyFromMasterList() {
    cy.get(uiMap.buttons.edit2)
      .click({ force: true })

    cy.get(uiMap.titles.configs)
      .contains('Configurações básicas')
  },

  // Exclui a empresa e confirma os dois passos da confirmação de exclusão
  deleteEnterpriseAndConfirm(enterprise) {
    cy.get(uiMap.buttons.delete)
      .should('exist')
      .click({ force: true })

    cy.get(uiMap.buttons.confirmDeleteStep1)
      .contains('Sim')
      .click({ force: true })

    cy.get('.c-grey-900')
      .contains('Remover empreendimento')

    cy.get('dd:nth-child(2)')
      .contains(enterprise)

    cy.get(uiMap.buttons.confirmDeleteStep2)
      .click({ force: true })
  },
}