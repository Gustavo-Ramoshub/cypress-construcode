// Testes relacionados a criação de usuários

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import createUser from '../../support/pages/criarConta/createAccount'
import { faker } from '@faker-js/faker'

const user_data_enterprise = require('../../fixtures/enterprise.json')

describe('Criar usuário', () => {

    beforeEach('Acessa tela de cadastrar pessoa', () => {
        cy.visit(ROUTES.registerAccount)
    })

    it('Valida todos os campos vazios do usuário', () =>{
        createUser.changePageButton()
        createUser.fillNameEmpty()
        createUser.fillEmailEmpty()
        createUser.fillPasswordEmpty()
        createUser.fillTelephoneEmpty()
    })

    it('Valida somente nome do usuário preenchido', () =>{
        const name = faker.person.fullName()
        
        createUser.fillName(name)
        createUser.changePageButton()
        createUser.fillEmailEmpty()
        createUser.fillPasswordEmpty()
        createUser.fillTelephoneEmpty()
    })

    it('Valida somente o nome e e-mail do usuário preenchido', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()

        createUser.fillName(name) 
        createUser.fillEmail(email)
        createUser.changePageButton()
        createUser.fillPasswordEmpty()
        createUser.fillTelephoneEmpty()
    })

    it('Valida somente o nome, e-mail e senha do usuário preenchido', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.changePageButton()
        createUser.fillTelephoneEmpty()
    })

    it('Preenche todos os campos do usuário e vai para próxima página', () => {
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()
    })

    it('Preenche todos os campos do usuário, vai para próxima página e volta para validar se irão continuar preenchidos', () => {
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const ddd = faker.number.int({ min: 11, max: 99 }).toString()
        const celular = `9${faker.string.numeric(8)}`
        const telephone = `${ddd}${celular}`

        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        createUser.toGoBack()
        
        createUser.nameAlreadyFilledIn(name)
        createUser.emailAlreadyFilledIn(email)
        createUser.passwordAlreadyFilledIn(password)
        createUser.telephoneAlreadyFilledIn(telephone)
    })

    // BUG encontrado
    // BUG na mensagem de Ramo de atuação da empresa não está como Obrigatório
    // createUser.fillCompanyFieldOfActivityEmpty()
    it('Valida todos os campos vazios da empresa', () => {
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.confirmAccountCreation()
        createUser.fillNameEnterpriseEmpty()
        createUser.fillPositionEmpty()
        createUser.fillDepartmentEmpty()
        createUser.fillMainSegmentOfTheCompanyEmpty()
        //createUser.fillCompanyFieldOfActivityEmpty()
        createUser.toMarkPrivacyPolicyEmpty()
    })

    it('Valida somente nome da empresa preenchido', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()
        
        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.confirmAccountCreation()
        createUser.fillPositionEmpty()
        createUser.fillDepartmentEmpty()
        createUser.fillMainSegmentOfTheCompanyEmpty()
        //createUser.fillCompanyFieldOfActivityEmpty()
        createUser.toMarkPrivacyPolicyEmpty()
    })

    it('Valida somente nome e cargo da empresa preenchido', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()
        
        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.confirmAccountCreation()
        createUser.fillDepartmentEmpty()
        createUser.fillMainSegmentOfTheCompanyEmpty()
        //createUser.fillCompanyFieldOfActivityEmpty()
        createUser.toMarkPrivacyPolicyEmpty()
    })

    it('Valida somente nome, cargo e departamento da empresa preenchido', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()
        
        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.confirmAccountCreation()
        createUser.fillMainSegmentOfTheCompanyEmpty()
        //createUser.fillCompanyFieldOfActivityEmpty()
        createUser.toMarkPrivacyPolicyEmpty()
    })

    it('Valida somente nome, cargo, departamento e segmento da empresa preenchido', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()
        
        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.fillMainSegmentOfTheCompany(user_data_enterprise.testEnterprise.mainSegmentOfTheCompany)
        createUser.confirmAccountCreation()
        //createUser.fillCompanyFieldOfActivityEmpty()
        createUser.toMarkPrivacyPolicyEmpty()
    })

    it('Preenche todos os campos e não marca o checkBox', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.fillMainSegmentOfTheCompany(user_data_enterprise.testEnterprise.mainSegmentOfTheCompany)
        createUser.fillCompanyFieldOfActivity(user_data_enterprise.testEnterprise.companyFieldOfActivity)
        createUser.confirmAccountCreation()
        createUser.toMarkPrivacyPolicyEmpty()
    })

    it('Valida link de política de privacidade', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()
        
        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Valida link de política de privacidade
        createUser.linkPrivacyPolicy()
    })

    it('Valida link de termos e uso', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Valida link de termos e uso
        createUser.linkTermsOfUse()
    })

    it('Preenche todos os campos da empresa e salva', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.fillMainSegmentOfTheCompany(user_data_enterprise.testEnterprise.mainSegmentOfTheCompany)
        createUser.fillCompanyFieldOfActivity(user_data_enterprise.testEnterprise.companyFieldOfActivity)
        createUser.toMarkPrivacyPolicy()
        createUser.confirmAccountCreation()
    })

    it('Preenche todos os campos da empresa, salva e valida codigo com espaço', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.fillMainSegmentOfTheCompany(user_data_enterprise.testEnterprise.mainSegmentOfTheCompany)
        createUser.fillCompanyFieldOfActivity(user_data_enterprise.testEnterprise.companyFieldOfActivity)
        createUser.toMarkPrivacyPolicy()
        createUser.confirmAccountCreation()

        // Código de verificação
        createUser.fillVerificationCode(' ')
        createUser.fillVerificationCodeEmpty()
        createUser.confirmVerificationCode()
    })

    it('Preenche todos os campos da empresa, salva e valida codigo em branco', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.fillMainSegmentOfTheCompany(user_data_enterprise.testEnterprise.mainSegmentOfTheCompany)
        createUser.fillCompanyFieldOfActivity(user_data_enterprise.testEnterprise.companyFieldOfActivity)
        createUser.toMarkPrivacyPolicy()
        createUser.confirmAccountCreation()

        // Código de verificação
        createUser.confirmVerificationCode()
        createUser.codeScreenValidation()
    })

    it('Preenche todos os campos da empresa, salva e valida codigo errado', () =>{
        const name = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const telephone = faker.phone.number()

        // Dados do usuário
        createUser.fillName(name)
        createUser.fillEmail(email)
        createUser.fillPassword(password)
        createUser.fillTelephone(telephone)
        createUser.changePageButton()

        // Dados da empresa
        createUser.fillNameEnterprise(user_data_enterprise.testEnterprise.name)
        createUser.fillPosition(user_data_enterprise.testEnterprise.position)
        createUser.fillDepartment(user_data_enterprise.testEnterprise.department)
        createUser.fillMainSegmentOfTheCompany(user_data_enterprise.testEnterprise.mainSegmentOfTheCompany)
        createUser.fillCompanyFieldOfActivity(user_data_enterprise.testEnterprise.companyFieldOfActivity)
        createUser.toMarkPrivacyPolicy()
        createUser.confirmAccountCreation()

        // Código de verificação
        createUser.fillVerificationCode('asd')
        createUser.confirmVerificationCode()
        createUser.msgVerificationCodeWithError()
    })
})