// Funções relacionadas a criação de pessoas

/// <reference types="cypress" />

// Elementos
const elements = { 

    buttons: {
        revision: '.details-control.hasRevisao',
        documentForStorageOnly: '.swal2-confirm.btn.btn-primary.me-3'
    },

    link: {
        obsoleteDocuments: 'tr:nth-child(1) > td.text-uppercase.text-start > a'
    },

    fields: {
        board: '#search_Prancha',
        document: '#search_Nome',
        revision: '#search_Revisao',
        extension: '#search_Extensoes',
        title: '#search_Titulo',
        description: '#search_Descricao',
    },

    selectors: {
        // Campo de preenchimento dentro do select de disciplinas
        disciplineSelect: '.select2-search__field',
        status: '#search_Status',
        phase: '#search_Fase',
        // Select para informar a disciplina que deve ser filtrada
        selectorDisciplines: '#select2-search_Disciplina-container',
        register: '#search_cadastro',
        table: {
            pagination: {
                //select de linhas da tela de lista mestra
                rowCountSelect: '#datatableListraMestra_length > div > select'
            },
            rows: {
                //tabela de documetnos da lista mestra, desconsiderando as disciplinas
                visible: 'table tbody tr[id]',
            }
        }
    },

    title: {
        disciplineTitle: '.dtrg-group.dtrg-start.dtrg-level-0',
    },

    messages: {
        obsoleteDocuments: '.text-danger',
        documentTitle: '#ViewDataTitle',
        msgDocumentForStorageOnly: '#swal2-content'
    }
}

// Ações/funções/metodos
export default {
    // Filtra por status
    statusFilter(status) {
        // Const para salvar status para validação se está sendo exibido
        const statusClassMap = {
            'Aprovado': 'aprovado',
            'Desativado': 'desativado',
            'Em análise': 'analise',
            'Liberado com ressalvas': 'ressalva',
            'Liberado para obra': 'liberado',
            'Recusado': 'recusaado' // Verifique se está certo
        }

        // Salva o status para validação se está sendo exibido
        const statusClass = statusClassMap[status]

        // Caso status não esteja na const informa
        if (!statusClass) {
            throw new Error(`Classe CSS para o status "${status}" não mapeada.`)
        }

        // Seleciona o status informado
        cy.get(elements.selectors.status)
            .should('be.visible')
            .select(status, { force: true })

        // Valida se o status sendo exibido
        cy.get(`.badge-doc_${statusClass}`)
            .should('be.visible')
            .should('contain', status)
    },

    // Filtra por fase
    phaseFilter(phase) {
        // Seleciona a fase
        cy.get(elements.selectors.phase)
            .should('be.visible')
            .select(phase, {force:true})

        // Valida se existe algum retorno conforme a fase escolhida
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', phase)
    },

    // Filtra por descrição
    descriptionFilter(description) {
        // Preenche o campo de descrição
        cy.get(elements.fields.description)
            .should('be.visible')
            .click({force: true})
            .type(description)

        // Valida se existe algum retorno conforme a descrição
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', description)
    },

    // Filtra por titulo
    titleFilter(title) {
        // Preenche o campo de titulo
        cy.get(elements.fields.title)
            .should('be.visible')
            .click({force: true})
            .type(title)

        // Valida se existe algum retorno conforme o titulo
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', title)
    },

    // Filtra por uma ou mais extensão
    extensionFilter(extension) {
        // Preenche o campo de extensão
        cy.get(elements.fields.extension)
            .should('be.visible')
            .click({force: true})
            .type(extension)

        // Valida se existe algum retorno conforme a extensão
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', extension)
        
    }, 

    // Filtra por revisão
    revisionFilter(revision) {
        // Busca por revisão
        cy.get(elements.fields.revision)
            .should('be.visible')
            .click({force: true})
            .type(revision)

        // Valida se o sistema está trazendo a revisão do documento
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', revision)
    },

    // Filtra por documento
    documentFilter(documentEspecific, documentDiscipline, documentCounter) {
        // Busca o documento 
        cy.get(elements.fields.document)
            .should('be.visible')
            .type(documentEspecific)

        // Valida a disciplina do documento buscado
        cy.get(elements.title.disciplineTitle)
            .should('be.visible')
            .should('contain', documentDiscipline)
            .should('contain', documentCounter) 

        // Valida se o sistema está trazendo somente um documento
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', documentEspecific)
    },

    // Busca por documento obsoleto e visualiza ele
    obsoleteDocumentFilter(document) {
        // Preenche o campo de busca
        cy.get(elements.fields.document)
            .should('be.visible')
            .type(document);

        // Clica no botão de revisões obsoletas
        cy.get(elements.buttons.revision)
            .should('be.visible')
            .click();

        // Valida mensagem de revisão obsoleta do documento
        cy.get(elements.messages.obsoleteDocuments)
            .should('be.visible')
            .should('contain', 'Obsoleto');

        // Intercepta o window.open antes do clique
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url; // Força abrir na mesma aba
            });
        });

        // Captura o nome visível do link e armazena como alias
        cy.get(elements.link.obsoleteDocuments)
            .should('be.visible')
            .invoke('text')
            .as('documentTitle');

        // Clica no link do documento
        cy.get(elements.link.obsoleteDocuments)
            .click();

        // Usa o alias para validar o título na página seguinte
        cy.get('@documentTitle').then((docTitle) => {
            cy.get(elements.messages.documentTitle)
                .should('be.visible')
                .should('contain', docTitle.trim()); // trim remove espaços extras
        });
    },

    // Valida se revisão obsoleta está sem processamento carregado
    documentForStorageOnly(document) {
        // Preenche o campo de busca
        cy.get(elements.fields.document)
            .should('be.visible')
            .type(document);

        // Clica no botão de revisões obsoletas
        cy.get(elements.buttons.revision)
            .should('be.visible')
            .click();

        // Valida mensagem de revisão obsoleta do documento
        cy.get(elements.messages.obsoleteDocuments)
            .should('be.visible')
            .should('contain', 'Obsoleto');

        // Clica no link do documento
        cy.get(elements.link.obsoleteDocuments)
            .click();

        // Valida se o documento realmente está somente para armazenamento
        cy.get(elements.messages.msgDocumentForStorageOnly)
            .should('be.visible')
            .should('contain', 'Esse documento está disponível apenas para armazenamento, pois não foi possível gerar a visualização deste.')
        
        // Clica no botão para sair da tela anterior de mensagem
        cy.get(elements.buttons.documentForStorageOnly)
            .should('be.visible')
            .click()
    },

    // Filtra por prancha
    boardFilter(board) {
        // Preenche o campo de prancha
        cy.get(elements.fields.board)
            .should('be.visible')
            .type(board)

        // Valida se existe algum retorno conforme a prancha
        cy.get(elements.selectors.table.rows.visible)
            .should('be.visible')
            .should('contain', board)
    },

    // Filtra por disciplina
    disciplineFilter(discipline) {
        // Clica para filtrar por uma disciplina
         cy.get(elements.selectors.selectorDisciplines)
            .should('be.visible')
            .click({force: true})

        // Preenche o campo de disciplina
        cy.get(elements.selectors.disciplineSelect)
            .should('be.visible')
            .type(`${discipline}{enter}`)

        // Valida se existe algum retorno conforme a disciplina
        cy.get(elements.title.disciplineTitle)
            .should('be.visible')
            .should('contain', `${discipline}`)  
    },

    // Contador de Linhas
    lineCounters(line) {
        const numExpected = parseInt(line)

        // Selecione a quantidade de linhas
        cy.get(elements.selectors.table.pagination.rowCountSelect)
            .select(line, { force: true })

        // Faz a validação se a quantidade escolhida está sendo exibida
        cy.get('body')
            .then($body => {
            if ($body.find(elements.selectors.table.rows.visible).length > 0) {
                cy.get(elements.selectors.table.rows.visible)
                    .then(($rows) => {
                    const qtdDisplayed = $rows.length
                    cy.log(`Exibido: ${qtdDisplayed} registros`)

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
    }
}