/// <reference types="cypress" />

const uiMap = {
  treeview: {
    locations: '#draggable-wrapper > div:nth-child(3) > div.hashtag.tipo',
  },

  buttons: {
    locations: '#LinkTabAreas',
  },

  fields: {
    locations: '#nomeArea',
  },

  divs: {
    disciplinesDisplayed: '.draggable-item.draggable-item-disciplina',
  },
}

export default {

  // Valida se uma disciplina específica está visível na tela
  verifyDisciplineDisplayed(discipline) {
    cy.get(`.draggable-item.draggable-item-disciplina > [title="${discipline}"]`)
      .should('be.visible')
  },

  // Conta quantas disciplinas estão sendo exibidas e valida a quantidade
  verifyDisciplinesCount(expectedCount) {
    cy.get(uiMap.divs.disciplinesDisplayed)
      .should('have.length', expectedCount)
  },

  // Clica no botão "Locais" na tela de documentos
  clickLocationsButton() {
    cy.get(uiMap.buttons.locations)
      .should('be.visible')
      .click({ force: true })
  },

  // Preenche o campo de nome do local e seleciona na árvore
  fillAndSelectLocation(locationName) {
    cy.get(uiMap.fields.locations)
      .should('be.visible')
      .type(locationName)

    cy.get(uiMap.treeview.locations)
      .should('be.visible')
      .should('contain', locationName)
      .click({ force: true })
  },
}