/// <reference types="cypress" />

const uiMap = {
  planInfoTooltipV3: {
    container: 'li.breadcrumb-item',
    button: '#documentsInfoPlanoV3',
    modal: '#documentsInfoModal',
  },

  planInfoTooltip: {
    button: '#documentsInfoPlano',
    modal: '#documentsInfoModal',
  },
}

export default {

  // Abre o modal com informações do plano do empreendimento (versão 3)
  planInfoTooltipV3() {
    cy.get(uiMap.planInfoTooltipV3.container)
      .find(uiMap.planInfoTooltipV3.button)
      .should('be.visible')
      .click()

    cy.get(uiMap.planInfoTooltipV3.modal)
      .should('be.visible')
  },

  // Abre o modal com informações do plano do empreendimento (versão padrão)
  planInfoTooltip() {
    cy.get(uiMap.planInfoTooltip.button)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.planInfoTooltip.modal)
      .should('be.visible')
  },
}