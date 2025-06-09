// Funções referente a exclusão de pessoas do empreendimento

/// <reference types="cypress" />

// Elementos
const elements = {
    buttons: {
        deletePerson: '.cci-delete',
        deletePersonDisable: '#newDatatable > tbody > tr > td:nth-child(7) > a:nth-child(2) > i',
        confirmDeletePerson: '#removerUsuario',
        removeSelectedPersonProfile: '#section > button.btn.btn-danger.text-white.btn-sm',
        confirmRemovalOfSelectedUserProfile: '#removerUsuariosBatch',
    },

    messages: {
        msgDefaultMessage: '#toastMessage',
        tooltipDelete: '[data-bs-original-title="Não é possível excluir esta pessoa"]'
    },
}

// Ações/funções/metodos
export default {
    // Botão de remoção quando seleciona uma pessoa
    removeSelectedPersonProfile () {
        cy.get(elements.buttons.removeSelectedPersonProfile)
            .should('be.visible')
            .click()

        // Botão de confirmar a exclusão
        cy.get(elements.buttons.confirmRemovalOfSelectedUserProfile)
            .should('be.visible')
            .click()
    },

    // Botão de remoção
    deletePerson () {
        cy.get(elements.buttons.deletePerson)
            .should('be.visible')
            .click()
            
        // Botão de confirmar a exclusão
        cy.get(elements.buttons.confirmDeletePerson)
            .should('be.visible')
            .click()
    },

    //Valida se o botão de remoção do admin Global está visivel
    deleteGlobalAdmin () {
        cy.get(elements.buttons.deletePersonDisable)
        .should('be.visible')
        
        // Valida o tooltipe
        cy.get(elements.messages.tooltipDelete)
        .should('be.visible')
    },

    // Valida mensagem de sucesso ao remover pessoa
    msgDefaultMessage (message) {
        cy.get(elements.messages.msgDefaultMessage)
            .should('contain.text', message)
    },
}