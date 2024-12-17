describe('app flow', () => {

  const henry = {
    email: 'henrycypressuser@test.com',
    password: '!Test123'
  }

  it('Visits the top level page', () => {
    cy.visit('/')
  });

  it('Will give error on wrong password', () => {
    //make cypress wait for the splash screen to finish
    cy.visit('/')
    cy.url().should('include', '/login');
    cy.get('input#email').type(henry.email);
    cy.get('input#password').type(henry.password+'bla'+'{enter}');
    cy.get('#errorMsg').should('have.text', 'The given email and password do not match');
    cy.url().should('include', '/login');
  });

  it('Will give client side validation', () => {
    //make cypress wait for the splash screen to finish
    cy.visit('/')
    cy.url().should('include', '/login');
    cy.get('input#email').type('henry');
    cy.get('input#password').type(''+'{enter}');
    cy.get('#emailValidation').should('contain.text', 'You must enter a valid email address');
    cy.get('#passwordValidation').should('contain.text', 'Password is required');
    cy.url().should('include', '/login');
  });

  it('Can login', () => {
    //make cypress wait for the splash screen to finish
    cy.visit('/')
    cy.url().should('include', '/login');
    cy.get('input#email').type(henry.email);
    cy.get('input#password').type(henry.password+'{enter}');
    cy.url().should('include', '/home');
  });

  
  it('Can view a team and can chat', () => {
    //make cypress wait for the splash screen to finish
    cy.visit('/')
    cy.url().should('include', '/login');
    cy.get('input#email').type(henry.email);
    cy.get('input#password').type(henry.password+'{enter}');
    cy.visit('/team-list');
    cy.get('img#23').click();
    cy.url().should('include', '/team-info?id=23');
    cy.get('input#message').type('Hello, I am Henry{enter}');
    cy.get('#chatBox').should('contain.text', 'henrythecypressuser: Hello, I am Henry');
  });

  
})