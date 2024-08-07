import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

afterEach(() => {
  // Fazer logout
   cy.get('.user-icon')
    .should('be.visible') 
    .click({ force: true }); 

  cy.contains('button', 'Sair')
    .should('be.visible') 
    .click(); 
  
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('Eu estou logado como {string}', (usuario) => {
  cy.setCookie('userType', usuario);
});

When('Eu visito a página {string}', (pagina) => {
  cy.visit(pagina);
});

And('Eu escolho a opcao {string}', (opcao) => {
  cy.contains(opcao).click();
});

Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

When('Eu preencho o campo {string} com {string}', (campo, valor) => {
  let selector = '';
  switch (campo) {
    case 'Nome da Disciplina':
      selector = '#nome';
      break;
    case 'ID da Disciplina':
      selector = '#disciplineID';
      break;
    case 'Professor Responsável':
      selector = '#responsibleTeacher';
      break;
    default:
      selector = `input[name="${campo}"]`;
  }
  cy.get(selector).type(valor);
});

When('Eu não preencho o campo {string}', (campo) => {
  let selector = '';
  switch (campo) {
    case 'Nome da Disciplina':
      selector = '#nome';
      break;
    case 'ID da Disciplina':
      selector = '#disciplineID';
      break;
    case 'Professor Responsável':
      selector = '#responsibleTeacher';
      break;
    case 'Data de Início':
      selector = '#startDate';
      break;
    case 'Data de Término':
      selector = '#endDate';
      break;
    case 'Hora':
      selector = '#time';
      break;
    default:
      selector = `input[name="${campo}"]`;
  }
  cy.get(selector).clear(); // Clear the input field to simulate not filling it
});


When('Eu preencho a data de início com {string}', (dataInicio) => {
  cy.get('input[id="startDate"]').clear().type(dataInicio, { force: true }).type('{esc}');
});

When('Eu preencho a data de término com {string}', (dataTermino) => {
  cy.get('input[id="endDate"]').clear().type(dataTermino, { force: true }).type('{esc}');
});

When('Eu preencho a hora com {string}', (hora) => {
  cy.get('input[id="time"]').clear().type(hora, { force: true }).type('{esc}');
});

When('Eu seleciono os dias da semana {string} e {string}', (dia1, dia2) => {
  cy.get(`input[id="${dia1}"]`).check({ force: true });
  cy.get(`input[id="${dia2}"]`).check({ force: true });
});
When('Eu seleciono os dias da semana {string} e {string} e {string}', (dia1, dia2,dia3) => {
    cy.get(`input[id="${dia1}"]`).check({ force: true });
    cy.get(`input[id="${dia2}"]`).check({ force: true });
    cy.get(`input[id="${dia3}"]`).check({ force: true });
  });

And('Eu escolho a opcao {string}', (opcao) => {
  cy.contains('button', opcao).click();
});

Then('A mensagem {string} deve ser exibida', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});

When('Eu preencho o campo {string} com {string}', (campo, valor) => {
  let selector = '';
  switch (campo) {
    case 'Nome da Disciplina':
      selector = '#nome';
      break;
    case 'ID da Disciplina':
      selector = '#disciplineID';
      break;
    case 'Professor Responsável':
      selector = '#responsibleTeacher';
      break;
    case 'Data de Início':
      selector = '#startDate';
      break;
    case 'Data de Término':
      selector = '#endDate';
      break;
    case 'Hora':
      selector = '#time';
      break;
    default:
      selector = `input[name="${campo}"]`;
  }
  cy.get(selector).clear().type(valor, { force: true }).type('{esc}');
});