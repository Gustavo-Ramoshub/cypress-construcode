/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import validatePlanModalAllPages from '../pages/validatePlanModalAllPages'

describe('Validação do Modal de Plano em diversas telas', () => {
  const idEnterprise = 6393

  const validatePlanModal = (route, useV3 = false) => {
    cy.visit(route)

    cy.wait(3000)

    if (useV3) {
      validatePlanModalAllPages.planInfoTooltipV3()
    } else {
      validatePlanModalAllPages.planInfoTooltip()
    }
  }

  beforeEach('Login com sessão administrativa', () => {
    cy.profileAdministrationLoginSession()
  })

  const routesWithTooltip = [
    { name: 'Envio de Documentos', route: ROUTES.sendingDocuments(idEnterprise) },
    { name: 'Tela de Documentos', route: ROUTES.documentsScreen(idEnterprise) },
    { name: 'Tarefas', route: ROUTES.tasks(idEnterprise) },
    { name: 'Controle de Aprovação', route: ROUTES.approvalControl(idEnterprise) },
    { name: 'Impressos', route: ROUTES.prints(idEnterprise) },
    { name: 'Plotagem', route: ROUTES.plots(idEnterprise) },
    { name: 'RDO', route: ROUTES.rdo(idEnterprise) },
  ]

  const routesWithTooltipV3 = [
    { name: 'Lista Mestra', route: ROUTES.masterList(idEnterprise) },
    { name: 'Pessoas', route: ROUTES.person(idEnterprise) },
    { name: 'Edição de Empreendimento', route: ROUTES.workEdit(idEnterprise) },
  ]

  routesWithTooltip.forEach(({ name, route }) => {
    it(`Valida modal de plano na tela de ${name}`, () => {
      validatePlanModal(route)
    })
  })

  routesWithTooltipV3.forEach(({ name, route }) => {
    it(`Valida modal de plano na tela de ${name}`, () => {
      validatePlanModal(route, true)
    })
  })
})