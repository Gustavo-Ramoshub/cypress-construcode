/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'

export const uiMap = {
  footer: {
    numberOfPeople: '#newDatatable_info',
    counterGreen: '.counter--green',
    counterRed: '.counter--red',
  },

  planInfoTooltip: {
    container: 'li.breadcrumb-item',
    button: '#documentsInfoPlanoV3',
    modal: '#documentsInfoModal',
    numberOfPeople:
      '#documentsInfoModal > div.usage-info-box > div > div:nth-child(2) > div.document-usage-text > p.usage',
  },

  fields: {
    searchEnterpriseInput: '#search-enterprise',
  },

  enterprise: {
    numberOfPeople: '.text-base.leading-4.text-base.text-font-normal',
    nameEnterprise: '.undefined.font-bold.text-font-high.text-lg.truncate',
  },

  buttons: {
    enterpise: 'body > nav > ul > li:nth-child(1)',
  },
}

// Valida consistência da contagem de pessoas entre várias seções da aplicação
export function validatePeopleCountConsistencyAcrossSections(idEnterprise, enterprise) {
  cy.visit(ROUTES.person(idEnterprise))

  cy.wait(120000)
  cy.reload()

  cy.get(uiMap.footer.numberOfPeople)
    .invoke('text')
    .then((text) => {
      const match = text.match(/de\s+(\d+)\s+registros/i)
      const registryValue = match ? parseInt(match[1], 10) : null
      expect(registryValue).to.not.be.null

      cy.get(uiMap.footer.counterGreen)
        .invoke('text')
        .then((greenText) => {
          cy.get(uiMap.footer.counterRed)
            .invoke('text')
            .then((redText) => {
              const barValue = parseInt(greenText, 10) + parseInt(redText, 10)

              cy.get(uiMap.planInfoTooltip.container)
                .find(uiMap.planInfoTooltip.button)
                .should('be.visible')
                .click({ force: true })

              cy.get(uiMap.planInfoTooltip.modal).should('be.visible')

              cy.get(uiMap.planInfoTooltip.numberOfPeople)
                .invoke('text')
                .then((usageText) => {
                  const matchUsage = usageText.match(/^(\d+)\s*\/\s*\d+/)
                  const totalUsage = matchUsage ? parseInt(matchUsage[1], 10) : null

                  expect(totalUsage).to.not.be.null

                  cy.visit('https://web.construcode.com.br/Enterprises')

                  cy.wait(25000)
                  cy.reload()

                  cy.get(uiMap.fields.searchEnterpriseInput)
                    .focus()
                    .should('have.focus')
                    .type(enterprise, { force: true })

                  cy.wait(25000)
                  cy.reload()

                  cy.get('.w-full.cursor-pointer.flex-col.gap-4')
                    .contains(enterprise)
                    .parents('.w-full.cursor-pointer.flex-col.gap-4')
                    .find('> .flex.gap-1 > div.grow')
                    .eq(3)
                    .then(($p) => {
                      const totalPeople = parseInt($p.text().trim(), 10)

                      cy.log('Número capturado:', totalPeople)

                      expect(totalPeople).to.be.a('number')

                      expect(registryValue).to.equal(barValue)
                      expect(barValue).to.equal(totalUsage)
                      expect(totalUsage).to.equal(totalPeople)

                      cy.log(`✅ Todos os valores batem: ${totalPeople}`)
                    })
                })
            })
        })
    })
}