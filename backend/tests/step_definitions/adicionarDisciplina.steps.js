const supertest = require('supertest');
const index = require('/home/mariana/Documents/Projeto-ESS/backend/conf/index.js');
const { defineFeature, loadFeature } = require('jest-cucumber');
const database = require('./databaseScramble');
//const { response } = require('express');
const request = supertest(index);

const feature = loadFeature('/home/mariana/Documents/Projeto-ESS/backend/tests/features/eventos/adicionarDisciplina.feature');

const disciplineExists = (disciplineList, name, disciplineID) => {
    let found = false;
    disciplineList.forEach(discipline => {
        if(discipline.nome === name && discipline.id === disciplineID) {
            found = true;
        }
    });
    return found;
}
defineFeature(feature, test => {
    const consoleOutput = [];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation((output) => {
        consoleOutput.push(output); // Armazena a saída em consoleOutput
        });

    test('Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição, curso e periódo vazios',({ given, when, then,and }) => {
        let disciplines = database.readOldDisciplines();
        let newDisciplines = database.readNewDisciplines();
        let newDiscipline = database.getDisciplinebyID(0);

        given(/^O usuário "(.*)" está logado como "(.*)"$/, async(userName, userType) => {
            expect(userName).toBe('bafm');
            expect(userType).toBe('professor');
        });
        and(/^A disciplina "(.*)" de id "(.*)" não está no sistema$/, async(name,disciplineID)=> {
            expect(disciplineExists(disciplines, name, disciplineID)).toBe(false);
        });
        when(/^O usuário "(.*)" manda uma requisição POST para "(.*)"$/, async(userName, url) => {
            expect(userName).toBe('bafm');
            response = await request.post(url).send({nome:newDiscipline.nome, id:newDiscipline.id,responsibleTeacher:newDiscipline.responsibleTeacher,horario: newDiscipline.horario, description:"", disciplineCurso:"", disciplinePeriodo:""});
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('nome');
            expect(response.body.nome).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('description');
            expect(value).toBe("");
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('responsibleTeacher');
            expect(response.body.responsibleTeacher).toBe(value);
        });
        and(/^preenche no corpo "(.*)" : "(.*)"$/, async(field,value)=> {
            expect(field).toBe('horario');
            expect(response.body.horario).toBe(value);
        });
        then(/^O sistema retorna "(.*)"$/, async(statusCode) => {
           expect(response.status).toBe(parseInt(statusCode,10));
        });
        and(/^A mensagem "(.*)" é exibida$/, async(message) => {
            const messageFound = consoleOutput.some(output => output.includes(message));
            expect(messageFound).toBe(true);
        });
        and(/^A disciplina "(.*)" de id "(.*)" está no banco de dados$/,  async(nome,id) => {
            expect(eventExists(newDisciplines, nome, id)).toBe(true);
        });
     });
    

});