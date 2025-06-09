// Funções referente a tela de meus empreendimentos

/// <reference types="cypress" />

// Elementos
const elements = {
    fields: {
        fillVentures: '#search-enterprise',
    },

    count: {
        countUserVentures: '.text-base.leading-4.text-base.text-font-normal',
    },
}

export default {

    // Preencher campo de nome do empreendimento
    fillVentures (ventures) {
        cy.get(elements.fields.fillVentures)
            .should('be.visible')
            .click({force: true})
            .type(ventures)
    },
    
    // Contador de usuários no empreendimento
    // Validar Ponto
    countUser () {
        cy.get(elements.count.countUserVentures)
        .filter((index, el) => /^\d+$/.test(el.innerText.trim()))
        .first()
        .invoke('text')
        .then(text => {
        const numero = parseInt(text.trim(), 10)

      cy.log(`Número capturado: ${numero}`)
        return numero // retorna o número para poder usar no then
    })
  }
}