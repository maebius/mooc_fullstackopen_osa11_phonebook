describe('Phonebook', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3001');
    cy.contains('add a new');
  });
});
