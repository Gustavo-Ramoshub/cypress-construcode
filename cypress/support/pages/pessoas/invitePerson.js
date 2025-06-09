// Funções relacionadas a tela de adição de pessoas no empreendimento

/// <reference types="cypress" />

// Elementos
const elements = {
    buttons: {
        addPerson: '#addUsuarioBtn',
        confirmAddPerson: '#btnAdicionarUsuario',
        viewSpecificDisciplines: '#LimitarAcessoDisciplinas',
        viewSpecificLocations: '#LimitarAcessoAreas',
        viewSpecificPhases: '#LimitarAcessoFases',
        selectAllDisciplinesAsActive: '#DisciplinasEspecialistaWrapper > div > span > a.addAll',
    },

    fields: {
        newEmail: '.select2-container--open .select2-search__field',
        validationEmail: '.select2-selection__choice',
    },

    selectors: {
        emailPicker: '[aria-describedby=select2-emailConvidado-container]',
        permission: '#Fiscal',
        actingDiscipline: '#DisciplinasEspecialistaWrapper > div',
        disciplinesEspefics: '#DisciplinasWrapper > span.select2.select2-container.select2-container--default > span.selection > span > span',
    },

    messages: {
        msgDefaultMessage: '#toastMessage',
        msgPermission: '.accordion-button',
        msgError: '#toastMessage',
        msgAccessDenied: '#swal2-content'
    }
}

// Ações/funções/metodos
export default {
    // Botão de adicionar pessoa na tela de pessoas
    addPerson () {
        cy.get(elements.buttons.addPerson)
            .should('be.visible')
            .click({ force: true })
    },

    // Botão de adicionar pessoa dentro da tela de adição de pessoa
    confirmAddPerson () {
        cy.get(elements.buttons.confirmAddPerson)
            .should('be.visible')
            .click({ force: true })
    },

    // Adiciona um novo e-mail
    fillNewEmail(newEmail) {
        // Clica e preenche o campo de  convite de e-mail com o e-mail informado
        cy.get(elements.selectors.emailPicker)
            .click()
        cy.get(elements.fields.newEmail)
            .clear()
            .type(newEmail)
            .blur()

        cy.wait(300)

        // Valida se o e-mail que foi digitado realmente foi adicionado no campo
        cy.get(elements.fields.validationEmail)
            .should('contain', newEmail)
    },

    fill3NewsEmails(newEmail, newEmail2, newEmail3) {
        // Clica e preenche o campo de  convite de e-mail com o e-mail 1 informado 
        cy.get(elements.selectors.emailPicker)
            .click()
        cy.get(elements.fields.newEmail)
            .clear()
            .type(newEmail)
            .blur()

        cy.wait(300)

        // Valida se o e-mail que foi digitado realmente foi adicionado no campo
        cy.get(elements.fields.validationEmail)
            .should('contain', newEmail)

        // Clica e preenche o campo de  convite de e-mail com o e-mail 2 informado
        cy.get(elements.selectors.emailPicker)
            .click()
        cy.get(elements.fields.newEmail)
            .clear()
            .type(newEmail2)
            .blur()

        // Valida se o e-mail que foi digitado realmente foi adicionado no campo
        // Pois se trata de um campo de select 2
        cy.get(elements.fields.validationEmail)
            .should('contain', newEmail)

        // Clica e preenche o campo de convite de e-mail com o e-mail 3 informado
        cy.get(elements.selectors.emailPicker)
            .click()
        cy.get(elements.fields.newEmail)
            .clear()
            .type(newEmail3)
            .blur()

        // Valida se o e-mail que foi digitado realmente foi adicionado no campo
        // Pois se trata de um campo de select 2
        cy.get(elements.fields.validationEmail)
            .should('contain', newEmail)
    },
    
    // Seleciona uma permissão especifica
    permission (permission) {
        // Seleciona uma permissão
        cy.get(elements.selectors.permission)
            .select(permission)

        // Valida se a permissão foi realmente selecionada
        cy.get(elements.messages.msgPermission)
            .should('contain.text', `Permissões de ${permission}`)
    },

     // Roda um array com as permissões e seleciona uma permissão aleatória e valida se a permissão foi realmente selecionada
    randomPermission () {
        const permissoes = ['Administração','Cliente','Convidado(a)','Coordenação de campo',
            'Coordenação de projeto','Engenharia de campo','Gerência de campo','Gerência de projetos',
            'Projetista','Qualidade','Terceirizado(a)','Time de Campo','Projetista Líder']

        // Pega uma permissão aleatória
        const randomIndex = Math.floor(Math.random() * permissoes.length)
        const randomPermissao = permissoes[randomIndex]

        // Seleciona uma permissão aleatória
        cy.get(elements.selectors.permission)
            .select(randomPermissao)

        // Valida se a permissão escolhida realmente foi selecionada
        cy.get(elements.messages.msgPermission)
            .should('contain.text', `Permissões de ${randomPermissao}`)

        // Se for Projetista ou Projetista Líder irá selecionar uma disciplina como atuante
        if (randomPermissao === 'Projetista' || randomPermissao === 'Projetista Líder') {

            // Valida se a permissão escolhida realmente foi selecionada
            cy.get(elements.messages.msgPermission)
                .should('contain.text', `Permissões de ${randomPermissao}`)

            // Clica e preenche o campo de disciplina atuante
            cy.get(elements.selectors.actingDiscipline)
                .click()
                .type('(ACB) Acabamento{enter}')
        }
    },

    // Seleciona o marcador de visualizar somente disciplinas especificas
    viewSpecificDisciplines () {
        cy.get(elements.buttons.viewSpecificDisciplines)
            .click()
            .should('be.checked')
    },

    // Seleciona o marcador de visualizar somente locais especificos
    viewSpecificLocations () {
        cy.get(elements.buttons.viewSpecificLocations)
            .click()
            .should('be.checked')
    },
    
    // Seleciona o marcador de visualizar somente fases especificas
    viewSpecificPhases () {
        cy.get(elements.buttons.viewSpecificPhases)
            .click()
            .should('be.checked')
    },

    // Botão de selecionar todas as disciplinas como Atuante
    selectAllDisciplinesAsActive () {
        cy.get(elements.buttons.selectAllDisciplinesAsActive)
            .should('contain.text', 'Adicionar todas')
            .should('be.visible')
            .click({ force: true })
    },

    // Preenche o campo de disciplinas especificas
    selectDisciplinesEspefics (disciplines) {
        cy.get(elements.selectors.disciplinesEspefics)
            .click()
            .type(`${disciplines}{enter}`)
    },

    // Valida mensagem de sucesso ao adicionar pessoa
    msgDefaultMessage (message) {
        cy.get(elements.messages.msgDefaultMessage)
            .should('contain.text', message)
    },

    // Valida mensagem de erro ao tentar adicionar pessoa
    msgError (message) {
        cy.get(elements.messages.msgError)
            .should('contain.text', message)
    },

    // Valida mensagem de acesso negado ao tentar acessar tela de pessoas
    msgAccessDenied (message) {
        cy.get(elements.messages.msgAccessDenied)
            .should('contain.text', message)
    },
}