// Funções relacionadas a tela de edição de permissões de pessoas

/// <reference types="cypress" />

// Elementos
const elements = {
    buttons: {
        editPerson: '.btn-edit-user',
        editAdminGlobal: '.xpto-item-disabled > .cci-pen-02',
        updatePerson: '#btnSalvarVinculoUsuario',
        selectAllDisciplinesAsActive: '#DisciplinasEspecialistaWrapper > div > span > a.addAll',
        removesAllDisciplinesAsActive: '#DisciplinasEspecialistaWrapper > div > span > a.removeAll',
    },

    selectors: {
        permission: '#Fiscal',
        actingDiscipline: '#DisciplinasEspecialistaWrapper > div',
    },

    messages: {
        msgDefaultMessage: '#toastMessage',
        msgPermission: '.accordion-button',
        msgError: '#toastMessage',
        tooltipEdit: '[data-bs-original-title="Não é possível editar esta pessoa"]'
    }
}

// Ações/funções/metodos
export default {
    // Botão de editar pessoa na tela de pessoas
    editPerson () {
        cy.get(elements.buttons.editPerson)
            .should('be.visible')
            .click()
    },

    //Valida se o botão de editar o admin Global está visivel
    editGlobalAdmin () {
        // Tenta clicar no botão de editar
        cy.get(elements.buttons.editAdminGlobal)
            .should('be.visible')
        
        // Valida mensagem de não poder editar admin Global
        cy.get(elements.messages.tooltipEdit)
            .should('be.visible')
    },
    
    // Botão de atualizar alterações da pessoa na tela de edição de pessoa
    updatePerson () {
        cy.get(elements.buttons.updatePerson)
            .should('be.visible')
            .click()
    },

    // Edita o própio usuário
    editTheWizardItself() {
        cy.get(elements.selectors.permission)
        .find('option')
        .contains('Administração')
        .should('be.disabled')
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
            'Projetista','Projetista Líder','Qualidade','Terceirizado(a)','Time de Campo']

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

    // Botão de selecionar todas as disciplinas como Atuante
    selectAllDisciplinesAsActive () {
        cy.get(elements.buttons.selectAllDisciplinesAsActive)
            .should('contain.text', 'Adicionar todas')
            .should('be.visible')
            .click({ force: true })
    },

    // Botão de remover todas as disciplinas como Atuante
    removesAllDisciplinesAsActive () {
        cy.get(elements.buttons.removesAllDisciplinesAsActive)
            .should('contain.text', 'Remover todas')
            .click({ force: true })
    },

    // Valida mensagem de sucesso ao editar pessoa
    msgDefaultMessage (message) {
        cy.get(elements.messages.msgDefaultMessage)
            .should('contain.text', message)
    },

    // Valida mensagem de erro ao tentar adicionar pessoa
    msgError (message) {
        cy.get(elements.messages.msgError)
            .should('contain.text', message)
    },
}