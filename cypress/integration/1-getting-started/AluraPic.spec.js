describe('Login e registra usuario', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com')
    })

    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuarios => {

        it.only('Registra novo usuario' + usuarios.userName, () => {

            cy.contains('a', 'Register now').click();
            cy.contains('button', 'Register').click();
            cy.get('input[formcontrolname="email"]').type(usuarios.email);
            cy.get('input[formcontrolname="fullName"]').type(usuarios.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuarios.userName);
            cy.get('input[formcontrolname="password"]').type(usuarios.password);
            cy.contains('button', 'Register').click();

        })
    })

    it('verificar mensagen validacao', () => {

        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[fromcontrolname="email"]').type('pedro');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');

    })
    it('verificar mensagens de senha com menos de 8 caracteres', () => {

        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[fromcontrolname="password"]').type('123');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');

    })
    it('fazer login de usuario valido', () => {

        cy.login('flavio', '123')
        cy.contains('a', '(Logout)').should('be.visible');

    })
    it('fazer login de ususario invalido', () => {
        cy.login('jacqueline', '1234')
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })

    })
})