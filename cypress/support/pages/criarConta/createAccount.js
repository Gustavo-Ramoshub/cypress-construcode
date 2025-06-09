// Funções relacionadas a criação de pessoas

/// <reference types="cypress" />

// Elementos
const elements = {
    buttons: {
        newAccount: '.dis-block.txt3',
        changePageButton: '#changePageButton',
        backLogin: '[style="text-decoration: underline"]',
        viewPassword: '.fa.fa-eye',
        toGoBack: '.dis-block.txt3.hov1.pt-4',
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
        mainSegmentOfTheCompany: '#field\\[11\\]',
        companyFieldOfActivity: '#field\\[18\\]'
    },

    links: {
        privacyPolicy: '.txt2.hov1',
        linkRedirectionPrivacyPolicy: 'a[href*="politica-de-privacidade"]',
        linkRedirectionTermsOfUse: 'a[href*="termo-de-uso"]', 
    },

    checkBox: {
        privacyPolicy: '#ckb1'
    },

    messages: {
        msgEmptyNameField: '#divNome',
        msgEmptyEmailField: '#divEmail',
        msgEmptyTelephoneField: '#divTelefone',
        msgEmptyPasswordField: '#divPassword',
        msgVerificationCode: '.login100-form-title',
        msgVerificationCodeWithError: '.login100-form-title',
        msgEmptyEnterpriseField: '[data-validate="Digite uma empresa"]',
        msgEmptyPositionField: '[data-validate="Selecione um cargo"]',
        msgEmptyDepartmentField: '[data-validate="Selecione um departamento"]',
        msgEmptyMainSegmentOfTheCompanyField: '[data-validate="Selecione um segmento"]',
        msgEmptyCompanyFieldOfActivityField: '[data-validate="Selecione um ramo"]',
        msgEmptyPrivacyPolicyField: '[data-validate="Campo obrigatório"]',
        msgEmptyVerificationCode: '[data-validate="Digite o código"]',
    }
}

// Ações/funções/metodos
export default {
    // Dados do usuário

    // Botão de Criar uma nova conta
    newAccount () {
        cy.get(elements.buttons.newAccount)
            .should('be.visible')
            .click()
    },

    // Botão de ir para próxima página após preencher os campos de cadastro
    changePageButton () {
        cy.get(elements.buttons.changePageButton)
            .should('be.visible')
            .invoke('removeAttr', 'disabled') // Remove o atributo
            .click()
    },

    // Botão de voltar para efeturar o login
    backLogin () {
        cy.get(elements.buttons.backLogin)
            .should('be.visible')
            .click()
    },

    // Botão de voltar para preencher os campos de cadastro, nome, e-mail...
    toGoBack () {
        // Clica no botão de voltar para a tela de dados de pessoa
        cy.get(elements.buttons.toGoBack)
            .should('be.visible')
            .click()

        // Valida ao após voltar se o campo de nome está presente
        cy.get(elements.fields.name)
            .should('be.visible')
    },

    // Botão de visualizar a senha
    viewPassword () {
        // Clica no icone de visualizar senha
        cy.get(elements.buttons.viewPassword)
            .should('be.visible')
            .click()

        // Valida se a senha foi exibida
        cy.get(elements.fields.password)
        .should('have.attr', 'type', 'text') // verifica se é input de texto
    },

    // Botão de confirmar criação de conta
    confirmAccountCreation () {
        cy.get(elements.buttons.confirmAccountCreation)
            .should('be.visible')
            .invoke('removeAttr', 'disabled') // Remove o atributo
            .click()
    },

    // Botão de confirmar verificação de código
    confirmVerificationCode () {
        cy.get(elements.buttons.confirmVerificationCode)
            .should('be.visible')
            .click()
    },

    // Preenchimento de nome
    fillName (name) {
        cy.get(elements.fields.name)
            .type(name)
    },

    // Valida se o campo de nome está vazio ou inserido de forma incorreta
    fillNameEmpty () {
        cy.get(elements.messages.msgEmptyNameField)
            .should('have.class', 'alert-validate')
    },

    // Valida se o campo de nome continua preenchido depois de voltar
    nameAlreadyFilledIn (name) {
        cy.get(elements.fields.name)
            .should('have.value', name)
    },

    // Preenchimento de e-mail
    fillEmail (email) {
        cy.get(elements.fields.email)
            .type(email)
    },

    // Valida se o campo de e-mail está vazio ou inserido de forma incorreta
    fillEmailEmpty () {
        cy.get(elements.messages.msgEmptyEmailField)
            .should('have.class', 'alert-validate')
    },

    // Valida se o campo de e-mail continua preenchido depois de voltar
    emailAlreadyFilledIn (email) {
        cy.get(elements.fields.email)
            .should('have.value', email)
    },

    // Preenchimento de senha
    fillPassword (password) {
        cy.get(elements.fields.password)
            .type(password)
    },

    // Valida se o campo de senha está vazio
    fillPasswordEmpty () {
        cy.get(elements.messages.msgEmptyPasswordField)
            .should('have.class', 'alert-validate')
    },

    // Valida se o campo de senha continua preenchido depois de voltar
    passwordAlreadyFilledIn (password) {
        cy.get(elements.fields.password)
            .should('have.value', password)
    },

    // Preenchimento de telefone
    fillTelephone (telephone) {
        cy.get(elements.fields.telephone)
            .type(telephone)
    },

    // Valida se o campo de telefone está vazio
    fillTelephoneEmpty () {
        cy.get(elements.messages.msgEmptyTelephoneField)
            .should('have.class', 'alert-validate')
    },

    // Valida se o campo de telefone continua preenchido depois de voltar
    telephoneAlreadyFilledIn (telephone) {
        cy.get(elements.fields.telephone)
        .invoke('val')
        .then((formattedValue) => {
            const digitsOnly = formattedValue.replace(/\D/g, '');
            const inputDigitsOnly = telephone.replace(/\D/g, '');

            expect(inputDigitsOnly.length).to.eq(digitsOnly.length);
            expect(digitsOnly).to.eq(inputDigitsOnly);
        });
    },

    // Preenchimento de código de verificação
    fillVerificationCode (code) {
        cy.get(elements.fields.code)
            .type(code)
            .blur()
    },

    // Valida se o campo de código de verificação está vazio ou com espaço
    fillVerificationCodeEmpty () {
        cy.get(elements.messages.msgEmptyVerificationCode)
            .should('have.class', 'alert-validate')
    },

    // Preenchimento de nome da empresa
    fillNameEnterprise (enterprise) {
        cy.get(elements.fields.enterprise)
            .type(enterprise)
    },

    // Valida se o campo de nome está vazio
    fillNameEnterpriseEmpty () {
        cy.get(elements.messages.msgEmptyEnterpriseField)
            .should('have.class', 'alert-validate')
    },

    // Seleciona o cargo
    fillPosition (position) {
        cy.get(elements.selectors.position)
            .should('be.visible')
            .select(position)
    },

    // Valida se o campo de cargo está vazio
    fillPositionEmpty () {
        cy.get(elements.messages.msgEmptyPositionField)
            .should('have.class', 'alert-validate')
    },

    // Seletor de departamento
    fillDepartment (department) {
        cy.get(elements.selectors.department)
            .should('be.visible')
            .select(department)
    },

    // Valida se o campo de departamento está vazio
    fillDepartmentEmpty () {
        cy.get(elements.messages.msgEmptyDepartmentField)
            .should('have.class', 'alert-validate')
    },

    // Seletor de segmento
    fillMainSegmentOfTheCompany (segments) {
        cy.get(elements.selectors.mainSegmentOfTheCompany)
            .should('be.visible')
            .select(segments)
    },

    // Valida se o campo de segmento está vazio
    fillMainSegmentOfTheCompanyEmpty () {
        cy.get(elements.messages.msgEmptyMainSegmentOfTheCompanyField)
            .should('have.class', 'alert-validate')
    },

    // Seletor de ramo de atuação
    fillCompanyFieldOfActivity (segments) {
        cy.get(elements.selectors.companyFieldOfActivity)
            .should('be.visible')
            .select(segments)
    },

    // Valida se o campo de ramo de atuação está vazio
    fillCompanyFieldOfActivityEmpty () {
        cy.get(elements.messages.msgEmptyCompanyFieldOfActivityField)
            .should('have.class', 'alert-validate')
    },

    // Marca o o checkBox "Eu aceito a Política de Privacidade e o Termos de uso.*".
    toMarkPrivacyPolicy () {
        cy.get(elements.checkBox.privacyPolicy)
            .check({ force: true })
    },

    // Valida se o checkBox "Eu aceito a Política de Privacidade e o Termos de uso.*" está marcado
    toMarkPrivacyPolicyEmpty () {
        cy.get(elements.messages.msgEmptyPrivacyPolicyField)
            .should('have.class', 'alert-validate')
    },

    // Valida link de Privacy policy
    linkPrivacyPolicy () {
        // Clica na informação de politica de privacidade
        cy.get(elements.links.linkRedirectionPrivacyPolicy)
            .should('be.visible')
            .and('have.attr', 'href')
            .then((href) => {
                cy.get(`a[href="${href}"]`)
                .invoke('removeAttr', 'target')
                .click()

                // Faz a validação de direcionamento
                cy.origin('https://intercom.help/construcode/pt-BR/articles/8160658-politica-de-privacidade', () => {
                cy.url().should('include', 'https://intercom.help/construcode/pt-BR/articles/8160658-politica-de-privacidade')
            })
        })
    },

    // Valida link de termos de uso
    linkTermsOfUse () {
        // Clica na informação de termos de uso
        cy.get(elements.links.linkRedirectionTermsOfUse)
            .should('be.visible')
            .and('have.attr', 'href')
            .then((href) => {
                cy.get(`a[href="${href}"]`)
                .invoke('removeAttr', 'target')
                .click()

                // Faz a validação de direcionamento
                cy.origin('https://intercom.help/construcode/pt-BR/articles/8160656-termo-de-uso', () => {
                cy.url().should('include', 'https://intercom.help/construcode/pt-BR/articles/8160656-termo-de-uso')
            })
        })
    },

    // Valida mensagem de erro ao inserir codigo errado.
    msgVerificationCodeWithError () {
        cy.get(elements.messages.msgVerificationCodeWithError)
            .should('be.visible')
            .should('contain', 'Código inválido.')
    },

    // Valida se está na tela de Código de verificação.
    codeScreenValidation () {
        cy.get(elements.messages.msgVerificationCode)
            .should('be.visible')
            .should('contain', 'Código de verificação')
    }
}