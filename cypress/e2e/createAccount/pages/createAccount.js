/// <reference types="cypress" />

const uiMap = {
  buttons: {
    newAccount: '.dis-block.txt3',
    changePage: '#changePageButton',
    backToLogin: '[style="text-decoration: underline"]',
    backToForm: '.dis-block.txt3.hov1.pt-4',
    viewPassword: '.fa.fa-eye',
    confirmAccountCreation: '#_form_30_submit',
    confirmVerificationCode: '#login-form > div.container-login100-form-btn > div > button',
  },

  fields: {
    name: '#nome',
    email: '#email',
    password: '#password',
    telephone: '#telefone',
    enterprise: '#empresa',
    code: '#Codigo',
  },

  selectors: {
    position: '#field\\[6\\]',
    department: '#field\\[17\\]',
    mainSegment: '#field\\[11\\]',
    companyActivity: '#field\\[18\\]',
  },

  links: {
    privacyPolicy: 'a[href*="politica-de-privacidade"]',
    termsOfUse: 'a[href*="termo-de-uso"]',
  },

  checkboxes: {
    privacyPolicy: '#ckb1',
  },

  messages: {
    emptyName: '#divNome',
    emptyEmail: '#divEmail',
    emptyTelephone: '#divTelefone',
    emptyPassword: '#divPassword',
    emptyEnterprise: '[data-validate="Digite uma empresa"]',
    emptyPosition: '[data-validate="Selecione um cargo"]',
    emptyDepartment: '[data-validate="Selecione um departamento"]',
    emptyMainSegment: '[data-validate="Selecione um segmento"]',
    emptyCompanyActivity: '[data-validate="Selecione um ramo"]',
    emptyPrivacyPolicy: '[data-validate="Campo obrigatório"]',
    emptyVerificationCode: '[data-validate="Digite o código"]',
    verificationCodeTitle: '.login100-form-title',
    verificationCodeError: '.login100-form-title',
  },
}

// Função auxiliar para preencher campos de texto
function fillField(selector, value) {
  cy.get(selector).should('be.visible').clear().type(value)
}

// Função auxiliar para validar se campo obrigatório está marcado como inválido
function validateEmptyField(selector) {
  cy.get(selector).should('have.class', 'alert-validate')
}

// Função auxiliar para validar o valor de um campo
function validateFieldValue(selector, expectedValue) {
  cy.get(selector).should('have.value', expectedValue)
}

export default {

  // Clique: Inicia criação de nova conta
  clickNewAccount() {
    cy.get(uiMap.buttons.newAccount)
      .should('be.visible')
      .click()
  },

  // Clique: Muda de página (forçando se necessário)
  clickChangePage() {
    cy.get(uiMap.buttons.changePage)
      .should('be.visible')
      .invoke('removeAttr', 'disabled')
      .click()
  },

  // Clique: Volta para a tela de login
  clickBackToLogin() {
    cy.get(uiMap.buttons.backToLogin)
      .should('be.visible')
      .click()
  },

  // Clique: Volta ao formulário de cadastro
  clickBackToForm() {
    cy.get(uiMap.buttons.backToForm)
      .should('be.visible')
      .click()

    cy.get(uiMap.fields.name)
      .should('be.visible')
  },

  // Clique: Visualiza a senha
  clickViewPassword() {
    cy.get(uiMap.buttons.viewPassword)
      .should('be.visible')
      .click()

    cy.get(uiMap.fields.password)
      .should('have.attr', 'type', 'text')
  },

  // Clique: Confirma criação de conta
  clickConfirmAccountCreation() {
    cy.get(uiMap.buttons.confirmAccountCreation)
      .should('be.visible')
      .invoke('removeAttr', 'disabled')
      .click()
  },

  // Clique: Confirma envio do código de verificação
  clickConfirmVerificationCode() {
    cy.get(uiMap.buttons.confirmVerificationCode)
      .should('be.visible')
      .click()
  },

  // Preenche: Nome
  fillName(name) {
    fillField(uiMap.fields.name, name)
  },

  // Preenche: E-mail
  fillEmail(email) {
    fillField(uiMap.fields.email, email)
  },

  // Preenche: Senha
  fillPassword(password) {
    fillField(uiMap.fields.password, password)
  },

  // Preenche: Telefone
  fillTelephone(telephone) {
    fillField(uiMap.fields.telephone, telephone)
  },

  // Preenche: Empresa
  fillEnterprise(enterprise) {
    fillField(uiMap.fields.enterprise, enterprise)
  },

  // Preenche: Código de verificação
  fillVerificationCode(code) {
    cy.get(uiMap.fields.code)
      .should('be.visible')
      .clear()
      .type(code)
      .blur()
  },

  // Seleciona: Cargo
  fillPosition(position) {
    cy.get(uiMap.selectors.position)
      .should('be.visible')
      .select(position)
  },

  // Seleciona: Departamento
  fillDepartment(department) {
    cy.get(uiMap.selectors.department)
      .should('be.visible')
      .select(department)
  },

  // Seleciona: Segmento principal
  fillMainSegment(segment) {
    cy.get(uiMap.selectors.mainSegment)
      .should('be.visible')
      .select(segment)
  },

  // Seleciona: Ramo de atividade
  fillCompanyActivity(activity) {
    cy.get(uiMap.selectors.companyActivity)
      .should('be.visible')
      .select(activity)
  },

  // Valida: Nome obrigatório
  validateEmptyName() {
    validateEmptyField(uiMap.messages.emptyName)
  },

  // Valida: Email obrigatório
  validateEmptyEmail() {
    validateEmptyField(uiMap.messages.emptyEmail)
  },

  // Valida: Senha obrigatória
  validateEmptyPassword() {
    validateEmptyField(uiMap.messages.emptyPassword)
  },

  // Valida: Telefone obrigatório
  validateEmptyTelephone() {
    validateEmptyField(uiMap.messages.emptyTelephone)
  },

  // Valida: Empresa obrigatória
  validateEmptyEnterprise() {
    validateEmptyField(uiMap.messages.emptyEnterprise)
  },

  // Valida: Código obrigatório
  validateEmptyVerificationCode() {
    validateEmptyField(uiMap.messages.emptyVerificationCode)
  },

  // Valida: Cargo obrigatório
  validateEmptyPosition() {
    validateEmptyField(uiMap.messages.emptyPosition)
  },

  // Valida: Departamento obrigatório
  validateEmptyDepartment() {
    validateEmptyField(uiMap.messages.emptyDepartment)
  },

  // Valida: Segmento obrigatório
  validateEmptyMainSegment() {
    validateEmptyField(uiMap.messages.emptyMainSegment)
  },

  // Valida: Ramo obrigatório
  validateEmptyCompanyActivity() {
    validateEmptyField(uiMap.messages.emptyCompanyActivity)
  },

  // Valida: Política de privacidade obrigatória
  validatePrivacyPolicyChecked() {
    validateEmptyField(uiMap.messages.emptyPrivacyPolicy)
  },

  // Valida: Valor preenchido no campo nome
  validateNameValue(name) {
    validateFieldValue(uiMap.fields.name, name)
  },

  // Valida: Valor preenchido no campo email
  validateEmailValue(email) {
    validateFieldValue(uiMap.fields.email, email)
  },

  // Valida: Valor preenchido no campo senha
  validatePasswordValue(password) {
    validateFieldValue(uiMap.fields.password, password)
  },

  // Valida: Dígitos do telefone
  validateTelephoneValue(telephone) {
    cy.get(uiMap.fields.telephone)
      .invoke('val')
      .then(val => {
        const onlyDigits = val.replace(/\D/g, '')
        const inputDigits = telephone.replace(/\D/g, '')

        expect(onlyDigits).to.eq(inputDigits)
        expect(onlyDigits.length).to.eq(inputDigits.length)
      })
  },

  // Marca: Checkbox da política de privacidade
  checkPrivacyPolicy() {
    cy.get(uiMap.checkboxes.privacyPolicy)
      .check({ force: true })
  },

  // Valida: Link da política de privacidade
  validatePrivacyPolicyLink() {
    cy.get(uiMap.links.privacyPolicy)
      .should('be.visible')
      .and('have.attr', 'href')
      .then(href => {
        cy.get(`a[href="${href}"]`)
          .invoke('removeAttr', 'target')
          .click()

        cy.origin('https://intercom.help/construcode/pt-BR/articles/8160658-politica-de-privacidade', () => {
          cy.url().should('include', 'politica-de-privacidade')
        })
      })
  },

  // Valida: Link dos termos de uso
  validateTermsOfUseLink() {
    cy.get(uiMap.links.termsOfUse)
      .should('be.visible')
      .and('have.attr', 'href')
      .then(href => {
        cy.get(`a[href="${href}"]`)
          .invoke('removeAttr', 'target')
          .click()

        cy.origin('https://intercom.help/construcode/pt-BR/articles/8160656-termo-de-uso', () => {
          cy.url().should('include', 'termo-de-uso')
        })
      })
  },

  // Valida: Erro de código de verificação inválido
  verifyVerificationCodeError() {
    cy.get(uiMap.messages.verificationCodeError)
      .should('be.visible')
      .and('contain.text', 'Código inválido.')
  },

  // Valida: Exibição da tela de verificação de código
  verifyVerificationCodeScreen() {
    cy.get(uiMap.messages.verificationCodeTitle)
      .should('be.visible')
      .and('contain.text', 'Código de verificação')
  },
}