/// <reference types="cypress" />

const uiMap = {
  helpCenterIcons: {
    v1: '#helpIcon',
    v2: '#headerHelpDeskOptions',
    v3: 'button[data-state="closed"]',
  },

  modals: {
    helpCenterV1: '#header > div > ul.nav-right.pR-20 > li.link_central_ajuda.show > div',
    helpCenterV2: 'body > header > div > ul > li.nav-item.dropdown.helpdesk > ul',
    textsV2: 'ul.dropdown-menu.dropdown-menu-end.show',
    helpCenterV3: 'body > div[data-radix-popper-content-wrapper]',
    textsV3: '[role="dialog"]',
  },
}

const commonItems = [
  { text: 'Vídeos tutoriais', hrefContains: 'trilha-de-videos' },
  { text: 'Central de Ajuda', hrefContains: '/pt-BR/' },
  { text: 'FAQ', hrefContains: 'collections/7983588-faq' },
  { text: 'Suporte via chat', hrefContains: 'whatsapp' },
  { text: 'Termo de uso', hrefContains: 'termo-de-uso' },
  { text: 'Política de privacidade', hrefContains: 'politica-de-privacidade' },
]

export default {

  // Valida os ícones e links do Help Center versão 1
  validateHelpCenterIconsV1() {
    cy.wait(2000)

    cy.get(uiMap.helpCenterIcons.v1)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.modals.helpCenterV1)
      .should('be.visible')
      .within(() => {
        commonItems.forEach(({ text, hrefContains }) => {
          cy.contains('a.dropdown-item', text)
            .should('be.visible')
            .and('have.attr', 'href')
            .and('include', hrefContains)
        })
      })
  },

  // Valida os ícones e links do Help Center versão 2
  validateHelpCenterIconsV2() {
    cy.wait(2000)

    cy.get(uiMap.helpCenterIcons.v2)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.modals.helpCenterV2)
      .should('be.visible')

    cy.get(uiMap.modals.textsV2)
      .should('be.visible')
      .within(() => {
        commonItems.forEach(({ text, hrefContains }) => {
          cy.contains('a.dropdown-item', text)
            .should('be.visible')
            .and('have.attr', 'href')
            .and('include', hrefContains)
        })
      })
  },

  // Valida os ícones e links do Help Center versão 3
  validateHelpCenterIconsV3() {
    const expectedTexts = commonItems.map(item => item.text)

    cy.wait(2000)

    cy.get(uiMap.helpCenterIcons.v3)
      .should('be.visible')
      .first()
      .click({ force: true })

    cy.get(uiMap.modals.helpCenterV3)
      .should('be.visible')

    expectedTexts.forEach(text => {
      cy.get(uiMap.modals.textsV3)
        .contains(text)
        .should('be.visible')
    })
  },
}