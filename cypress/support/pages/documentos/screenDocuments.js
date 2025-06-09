// Funções relacionadas a tela de meus documentos

/// <reference types="cypress" />

// Elementos
const elements = {
    div: {
        disciplinesDisplayed: '.draggable-item.draggable-item-disciplina'
    },

    messages: {
        msgDefaultMessage: '#toastMessage',
        msgPermission: '.accordion-button',
        msgError: '#toastMessage',
    }
}

// Ações/funções/metodos
export default {
    // Valida se a disciplina está sendo exibida na tela de documentos
    disciplinesDisplayed (discipline) {
        cy.get(elements.div.disciplinesDisplayed)
        cy.get(`.draggable-item.draggable-item-disciplina > [title="${discipline}"]`)
    },

    // Contador de Linhas
    disciplineslineCounter(qtdDisciplines) {
        cy.get(elements.div.disciplinesDisplayed)
            .should('have.length', qtdDisciplines)
    }
}