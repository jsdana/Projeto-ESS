import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Limpeza após cada teste
afterEach(() => {
  cy.get('.user-icon')
  .should('be.visible') 
  .click({ force: true }); 

cy.contains('button', 'Sair')
  .should('be.visible') 
  .click(); 

cy.clearCookies();
cy.clearLocalStorage();
});

Given('Eu estou logado como administrador', () => {
  cy.login('9472', '12345678'); 
});

When('eu navego para a página {string}', (pagina) => {
  cy.visit(pagina);
});

Then('Eu devo ver a tabela de comentários', () => {
  cy.get('table.comments-table').should('exist');
});

When('eu clico no botão {string} no primeiro comentário', (botao) => {
  cy.get('table.comments-table tbody tr').first().within(() => {
    cy.contains(botao).click();
  });
});

And('eu clico no botão {string} no primeiro comentário validado', (botao) => {
  cy.get('table.comments-table tbody tr').first().within(() => {
    cy.contains(botao).click();
  });
});

Then('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.wait(4000); // Espera 4 segundos para a resposta ser validada
  cy.contains(mensagem).should('be.visible');
});

When('eu escrevo {string} na área de texto da resposta', (resposta) => {
  cy.get('.response-popup textarea').type(resposta);
});

When('eu clico no botão {string} no pop-up de resposta', (botao) => {
  cy.get('.response-popup button').contains(botao).click();
});
