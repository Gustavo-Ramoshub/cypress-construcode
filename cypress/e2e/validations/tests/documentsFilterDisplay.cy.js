/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import masterList from '../../masterList/pages/masterList'
import myVentures from '../../myVentures/pages/myVentures'
import editMyVentures from '../../myVentures/pages/editMyVentures'
import { faker } from '@faker-js/faker'

describe('Listagem e filtro de documentos no empreendimento', () => {
  const idEnterprise = 6393

  beforeEach('Login com sessão administrativa', () => {
    cy.clearAllCookies()
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.ventures)
  })

  it('Não exibe documentos sem filtro ou ação do usuário', () => {
    myVentures.clickOnEnterprise('Obra Automações Testes')
    myVentures.noDocumentInListing()
  })

  it('Cria, verifica a listagem da Lista Mestra em novo empreendimento e exclui o empreendimento', () => {
    const name = faker.company.name()
    
    cy.contains('button', 'Não quero ver as novidades').then($btn => {
    if ($btn.length) {
      cy.wrap($btn).click()
      }
    })

    myVentures.openNewEnterpriseModal()
    myVentures.fillNewEnterpriseName(name)
    myVentures.setStartDate('05', '01', '2024')
    myVentures.setFinishDate('18', '02', '2028')
    myVentures.confirmCreateEnterprise()

    cy.wait(5000)

    myVentures.clickOnEnterprise(name)
    masterList.clickMasterList()
    masterList.noDocumentInListing()

    cy.wait(2000)

    editMyVentures.clickEditCompanyFromMasterList()
    editMyVentures.deleteEnterpriseAndConfirm(name)
  })
})