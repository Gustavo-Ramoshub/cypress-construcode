/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import myVentures from '../pages/myVentures'
import editMyVentures from '../pages/editMyVentures'
import { faker } from '@faker-js/faker'

describe('Meus Empreendimentos', () => {

  beforeEach(() => {
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.ventures)
  })

  context('Filtros', () => {
    it('Filtra por nome com acento', () => {
      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
          if ($btn.length) {
            cy.wrap($btn).click()
            }
          })

      myVentures.typeEnterpriseName('Obra Automações Testes')
    })

    it('Filtra por nome sem acento', () => {
      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
          if ($btn.length) {
            cy.wrap($btn).click()
            }
          })

      myVentures.typeEnterpriseName('Obra Automacoes Testes')
    })

    it('Filtra por empresa', () => {
      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
          if ($btn.length) {
            cy.wrap($btn).click()
            }
          })

      myVentures.openFilters()
      myVentures.filterByCompany('Gustavo Ramos - CC')
      myVentures.closeFilters()
    })

    it('Limpa filtros aplicados', () => {
      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
          if ($btn.length) {
            cy.wrap($btn).click()
            }
          })

      myVentures.openFilters()
      myVentures.filterByCompany('Gustavo Ramos - CC')
      myVentures.closeFilters()
      myVentures.clearFilters()
    })

    it('Ordena por nome decrescente', () => {
      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
          if ($btn.length) {
            cy.wrap($btn).click()
            }
          })

      myVentures.openFilters()
      myVentures.validateOrdering('Nome decrescente', 'desc')
    })
  })

  context('Criação de empreendimento', () => {
    it('Abre e fecha modal de criação clicando fora', () => {
      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
          if ($btn.length) {
            cy.wrap($btn).click()
          }
        })

      myVentures.openNewEnterpriseModal()
      myVentures.clickOutsideModal()
    })

    it('Cria, edita e exclui um empreendimento', () => {
      const name = faker.company.name()

      cy.contains('button', 'Não quero ver as novidades')
        .then($btn => {
        if ($btn.length) {
          cy.wrap($btn).click()
          }
        })

      myVentures.openNewEnterpriseModal()
      myVentures.fillNewEnterpriseName(name)
      myVentures.setStartDate('05', '01', '2024')
      myVentures.setFinishDate('18', '02', '2028')
      myVentures.confirmCreateEnterprise()

      cy.wait(10000)

      myVentures.clickOnEnterprise(name)

      cy.wait(15000)

      editMyVentures.clickEditEnterprise()
      editMyVentures.deleteEnterpriseAndConfirm(name)
    })
  })
})