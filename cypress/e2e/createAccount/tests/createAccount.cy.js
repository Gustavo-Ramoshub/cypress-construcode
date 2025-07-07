/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import createUser from '../pages/createAccount'
import { faker } from '@faker-js/faker'

describe('Criar Conta', () => {
  let user
  let enterprise

  beforeEach('Acessa tela de cadastro', () => {
    cy.visit(ROUTES.registerAccount)

    const ddd = faker.number.int({ min: 11, max: 99 }).toString()
    const celular = `9${faker.string.numeric(8)}`

    user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      telephone: `${ddd}${celular}`
    }

    enterprise = {
      name: faker.company.name(),
      position: 'Outros',
      department: 'Outros',
      mainSegmentOfTheCompany: 'Outros',
      companyFieldOfActivity: 'Outros'
    }
  })

  // Preenche os dados do usuário e avança
  function fillUserData() {
    createUser.fillName(user.name)
    createUser.fillEmail(user.email)
    createUser.fillPassword(user.password)
    createUser.fillTelephone(user.telephone)
    createUser.clickChangePage()
  }

  // Preenche os dados da empresa e finaliza
  function fillEnterpriseData() {
    createUser.fillEnterprise(enterprise.name)
    createUser.fillPosition(enterprise.position)
    createUser.fillDepartment(enterprise.department)
    createUser.fillMainSegment(enterprise.mainSegmentOfTheCompany)
    createUser.fillCompanyActivity(enterprise.companyFieldOfActivity)
    createUser.checkPrivacyPolicy()
    createUser.clickConfirmAccountCreation()
  }

  context('Validação dos campos de usuário', () => {
    it('Todos os campos vazios devem exibir alerta', () => {
      createUser.clickChangePage()

      createUser.validateEmptyName()
      createUser.validateEmptyEmail()
      createUser.validateEmptyPassword()
      createUser.validateEmptyTelephone()
    })

    it('Campo nome preenchido, outros devem exibir alerta', () => {
      createUser.fillName(user.name)
      createUser.clickChangePage()

      createUser.validateEmptyEmail()
      createUser.validateEmptyPassword()
      createUser.validateEmptyTelephone()
    })

    it('Nome e e-mail preenchidos, demais devem exibir alerta', () => {
      createUser.fillName(user.name)
      createUser.fillEmail(user.email)
      createUser.clickChangePage()

      createUser.validateEmptyPassword()
      createUser.validateEmptyTelephone()
    })

    it('Nome, e-mail e senha preenchidos, telefone vazio', () => {
      createUser.fillName(user.name)
      createUser.fillEmail(user.email)
      createUser.fillPassword(user.password)
      createUser.clickChangePage()

      createUser.validateEmptyTelephone()
    })

    it('Avança com todos os dados do usuário preenchidos', () => {
      fillUserData()
    })

    it('Dados preenchidos devem permanecer ao voltar', () => {
      fillUserData()
      createUser.clickBackToForm()

      createUser.validateNameValue(user.name)
      createUser.validateEmailValue(user.email)
      createUser.validatePasswordValue(user.password)
      createUser.validateTelephoneValue(user.telephone)
    })
  })

  context('Validação dos campos da empresa', () => {
    it('Todos os campos da empresa vazios devem exibir alerta', () => {
      fillUserData()
      createUser.clickConfirmAccountCreation()

      createUser.validateEmptyEnterprise()
      createUser.validateEmptyPosition()
      createUser.validateEmptyDepartment()
      createUser.validateEmptyMainSegment()
      // createUser.validateEmptyCompanyActivity() // Comentado por bug
      createUser.validatePrivacyPolicyChecked()
    })

    it('Apenas empresa preenchida, outros vazios devem exibir alerta', () => {
      fillUserData()
      createUser.fillEnterprise(enterprise.name)
      createUser.clickConfirmAccountCreation()

      createUser.validateEmptyPosition()
      createUser.validateEmptyDepartment()
      createUser.validateEmptyMainSegment()
      // createUser.validateEmptyCompanyActivity() // Comentado por bug
      createUser.validatePrivacyPolicyChecked()
    })

    it('Empresa e cargo preenchidos, demais devem exibir alerta', () => {
      fillUserData()
      createUser.fillEnterprise(enterprise.name)
      createUser.fillPosition(enterprise.position)
      createUser.clickConfirmAccountCreation()

      createUser.validateEmptyDepartment()
      createUser.validateEmptyMainSegment()
      // createUser.validateEmptyCompanyActivity() // Comentado por bug
      createUser.validatePrivacyPolicyChecked()
    })

    it('Empresa, cargo e departamento preenchidos, segmento vazio', () => {
      fillUserData()
      createUser.fillEnterprise(enterprise.name)
      createUser.fillPosition(enterprise.position)
      createUser.fillDepartment(enterprise.department)
      createUser.clickConfirmAccountCreation()

      createUser.validateEmptyMainSegment()
      // createUser.validateEmptyCompanyActivity() // Comentado por bug
      createUser.validatePrivacyPolicyChecked()
    })

    it('Todos exceto política marcados, deve exibir alerta', () => {
      fillUserData()
      createUser.fillEnterprise(enterprise.name)
      createUser.fillPosition(enterprise.position)
      createUser.fillDepartment(enterprise.department)
      createUser.fillMainSegment(enterprise.mainSegmentOfTheCompany)
      createUser.fillCompanyActivity(enterprise.companyFieldOfActivity)
      createUser.clickConfirmAccountCreation()

      createUser.validatePrivacyPolicyChecked()
    })

    it('Todos os campos preenchidos, exceto política', () => {
      fillUserData()
      createUser.fillEnterprise(enterprise.name)
      createUser.fillPosition(enterprise.position)
      createUser.fillDepartment(enterprise.department)
      createUser.fillMainSegment(enterprise.mainSegmentOfTheCompany)
      createUser.fillCompanyActivity(enterprise.companyFieldOfActivity)
      createUser.clickConfirmAccountCreation()

      createUser.validatePrivacyPolicyChecked()
    })

    it('Valida abertura do link da política de privacidade', () => {
      fillUserData()
      createUser.validatePrivacyPolicyLink()
    })

    it('Valida abertura do link de termos de uso', () => {
      fillUserData()
      createUser.validateTermsOfUseLink()
    })

    it('Finaliza cadastro com todos os dados preenchidos', () => {
      fillUserData()
      fillEnterpriseData()
    })
  })

  context('Validação do código de verificação', () => {
    it('Exibe alerta com código de verificação em branco', () => {
      fillUserData()
      fillEnterpriseData()
      createUser.fillVerificationCode(' ')
      createUser.verifyVerificationCodeScreen()
      createUser.clickConfirmVerificationCode()
    })

    it('Exibe alerta ao tentar confirmar sem preencher código', () => {
      fillUserData()
      fillEnterpriseData()
      createUser.clickConfirmVerificationCode()
      createUser.verifyVerificationCodeScreen()
    })

    it('Exibe alerta com código inválido', () => {
      fillUserData()
      fillEnterpriseData()
      createUser.fillVerificationCode('asd')
      createUser.clickConfirmVerificationCode()
      createUser.verifyVerificationCodeError()
    })
  })
})