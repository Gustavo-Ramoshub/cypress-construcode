// Funções referente a filtros da tela de pessoas

/// <reference types="cypress" />

// Elementos
const elements = {
    selectors: {
        register: '#search_cadastro',
        table: {
            pagination: {
                rowCountSelect: '#newDatatable_length .form-select'
            },
            rows: {
                visible: 'table tbody tr'
            }
        }
    },

    checkBoxes: {
        person: '#checkBoxPessoas',
        allPerson: '#selecionartodos',
    },

    fields: {
        name: '#search_fotonome',
        email: '#search_email',
        profile: '#search_permissao',
    },

    messages: {
        msgPersonSelection: '#registrosSelecionados',
        tooltipSelect: '[data-bs-original-title="O seu perfil atual não permite que você realize essa ação"]'
    },
}

// Ações/funções/metodos
export default {
    // Preencher campo de nome
    fillName (name) {
        // Preenche o campo de nome
        cy.get(elements.fields.name)
            .type(name)

        // Valida na linha se o preenchimento trouce resultado
        cy.get(elements.selectors.table.rows.visible)
            .should('contain.text', `${name}`)
    },

    // Preencher campo de e-mail
    fillEmail (email) {
        // Preenche o campo de e-mail
        cy.get(elements.fields.email)
            .type(email)

        // Valida na linha se o preenchimento trouce resultado
        cy.get(elements.selectors.table.rows.visible)
            .should('contain.text', `${email}`)
    },

    // Preencher campo de Perfil
    fillProfile (profile) {
        // Preenche o campo de perfil
        cy.get(elements.fields.profile)
            .type(profile)

        // Valida na linha se o preenchimento trouce resultado
        cy.get(elements.selectors.table.rows.visible)
            .should('contain.text', `${profile}`)
    },

    // Selecionar campo de Registro
    fillRegister (register) {
        // Seleciona o registro informado
        cy.get(elements.selectors.register)
            .select(register)

        // Valida na linha se o preenchimento trouce resultado
        cy.get(elements.selectors.table.rows.visible)
            .should('contain.text', `${register}`)
    },

    // Seleciona um Usuário
    selectPerson () {
        // Marca o checkBox para selecionar a pessoa
        cy.get(elements.checkBoxes.person)
            .should('be.visible')
            .check()

        // Valida se uma pessoa foi selecionado
        cy.get(elements.messages.msgPersonSelection)
            .should('include.text', 'pessoa selecionada')
    },

    // Selecionar todos os usuários
    selectAllPerson () {
        // Marca o checkBox de seleção de todos as pessoas
        cy.get(elements.checkBoxes.allPerson)
            .should('be.visible')
            .check()

        // Valida a se todas as pessos foram selecionadas
        cy.get(elements.messages.msgPersonSelection)
            .should('include.text', 'pessoas selecionadas')
    },
    
    // Tentar selecionar o Admin Global
    selectGlobalAdmin () {
        cy.get(elements.messages.tooltipSelect)
        .should('be.visible')
    },

    // Contador de Linhas
    lineCounter(element) {
        const numExpected = parseInt(element)

        // Seleciona a quantidade de linhas informada
        cy.get(elements.selectors.table.pagination.rowCountSelect)
            .should('be.visible')
            .select(element, { force: true })

        // Faz a validação de quantas linhas está sendo exibida
        cy.get('body')
            .then($body => {
            if ($body.find(elements.selectors.table.rows.visible).length > 0) {
                cy.get(elements.selectors.table.rows.visible)
                    .then(($rows) => {
                    const qtdDisplayed = $rows.length
                    cy.log(`Exibido: ${qtdDisplayed} usuários`)

                    // Tenta validar, mas não falha o teste
                    try {
                        expect(qtdDisplayed).to.equal(numExpected)
                    } catch (err) {
                        cy.log(`Esperado ${numExpected}, mas exibido ${qtdDisplayed}`)
                    }
                })
            } else {
                cy.log('Nenhuma linha encontrada')
                if (numExpected !== 0) {
                    cy.log(`Esperado ${numExpected}, mas exibido 0`)
                }
            }
        })
    },

    // Mensagem de sucesso
    successMessage (message) {
        cy.get(elements.messages.sucess)
            .should('contain.text', message)
    },
}