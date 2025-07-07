/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import helpCenterValidation from '../pages/helpCenterValidation'

describe('Validação da Central de ajuda em diversas telas', () => {
  const idEnterprise = 6393

  // Visita a rota informada e valida os ícones da central de ajuda conforme a versão
  const validateHelpCenterIconsVisibility = (route, iconVersion = 'v1') => {
    cy.visit(route)

    switch (iconVersion) {
      case 'v1':
        helpCenterValidation.validateHelpCenterIconsV1()
        break
      case 'v2':
        helpCenterValidation.validateHelpCenterIconsV2()
        break
      case 'v3':
        helpCenterValidation.validateHelpCenterIconsV3()
        break
      default:
        throw new Error(`Versão de ícones inválida: ${iconVersion}`)
    }
  }

  beforeEach('Login com sessão administrativa', () => {
    cy.profileAdministrationLoginSession()
  })

  const helpCenterIconsV1 = [
    { name: 'Envio de Documentos', route: ROUTES.sendingDocuments(idEnterprise) },
    { name: 'Tela de Documentos', route: ROUTES.documentsScreen(idEnterprise) },
    { name: 'Tarefas', route: ROUTES.tasks(idEnterprise) },
    { name: 'Controle de Aprovação', route: ROUTES.approvalControl(idEnterprise) },
    { name: 'Impressos', route: ROUTES.prints(idEnterprise) },
    { name: 'Plotagem', route: ROUTES.plots(idEnterprise) },
    { name: 'RDO', route: ROUTES.rdo(idEnterprise) },
  ]

  const helpCenterIconsV2 = [
    { name: 'Lista Mestra', route: ROUTES.masterList(idEnterprise) },
    { name: 'Pessoas', route: ROUTES.person(idEnterprise) },
    { name: 'Edição de Empreendimento', route: ROUTES.workEdit(idEnterprise) },
  ]

  const helpCenterIconsV3 = [
    { name: 'Insights', route: ROUTES.insights(idEnterprise) },
  ]

  helpCenterIconsV1.forEach(({ name, route }) => {
    it(`Valida central de ajuda na tela de ${name}`, () => {
      validateHelpCenterIconsVisibility(route, 'v1')
    })
  })

  helpCenterIconsV2.forEach(({ name, route }) => {
    it(`Valida central de ajuda na tela de ${name}`, () => {
      validateHelpCenterIconsVisibility(route, 'v2')
    })
  })

  helpCenterIconsV3.forEach(({ name, route }) => {
    it(`Valida central de ajuda na tela de ${name}`, () => {
      validateHelpCenterIconsVisibility(route, 'v3')
    })
  })
})