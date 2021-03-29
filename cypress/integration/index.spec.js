context('Index', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  describe('The solar system page', () => {
    it('should be able to find saturn and add it to favorites', () => {
      const planet = 'Saturne'
      cy.get('div.v-toolbar__title').should('be.visible')
      // Assert there is the 10 first objects
      cy.get('table tbody tr td:first-child:not(:empty)').should('have.length', 10)
      const searchInput = cy.get('input[type="text"]').first().clear();
      searchInput.type(planet);
      const rows = cy.get('table tbody tr td:first-child:not(:empty)')
      // Assert there is only one row
      rows.should('have.length', 1)
      // Assert row is the one searched
      rows.first().get('td').first().should('have.text', planet)
      cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
      // Assert the heart icon is the empty one
      cy.get('.v-image .v-icon').should('have.class', 'mdi-heart-outline')
      // Assert card title to be the searched and clicked one
      cy.get('.v-card__title').first().should('contain.text', planet)
      cy.get('.float-right > .v-btn__content > .v-icon').click();
      cy.get('[href="/favorites"]').click();
      const favRows = cy.get('table tbody tr td:first-child:not(:empty)')
      // Assert there is only one favorites row
      favRows.should('have.length', 1)
      // Assert the row is the one favorited
      favRows.first().get('td').first().should('have.text', planet)
      cy.get('tbody > :nth-child(1) > :nth-child(1)').click();
      // Assert the heart icon is the full one
      cy.get('.v-image .v-icon').should('have.class', 'mdi-heart')
    })

    it('should have working filters', () => {
      cy.get('.v-data-footer__select > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon').click();
      cy.get('#list-item-87-2 > .v-list-item__content > .v-list-item__title').click();
      cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click();
      cy.get('#list-item-100-1 > .v-list-item__content > .v-list-item__title').click();
      // Only planets, should return 13 results
      cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click();
      cy.get('table tbody tr td:first-child:not(:empty)').should('have.length', 13)
      cy.get('#list-item-100-0 > .v-list-item__content > .v-list-item__title').click();
      cy.get('input[type="number"]').first().clear();
      // All object with more than 40 moons, should return 2 results
      cy.get('input[type="number"]').first().type('40');
      cy.get('table tbody tr td:first-child:not(:empty)').should('have.length', 2)
      cy.get('input[type="number"]').eq(1).clear();
      // All object with more than 40 moons and gravity > 11, should return 1 result
      cy.get('input[type="number"]').eq(1).type('11');
      cy.get('table tbody tr td:first-child:not(:empty)').should('have.length', 1)
      cy.get('input[type="number"]').eq(2).clear();
      // All object with more than 40 moons, gravity > 11 and density > 2, should return no result
      cy.get('input[type="number"]').eq(2).type('2');
      cy.get('table tbody tr td:first-child:not(:empty)').should('have.text', 'No matching records found')
      cy.get('input[type="number"]').eq(1).clear();
      cy.get('input[type="number"]').first().clear();
      // All object gravity > 11, should return 12 result
      cy.get('table tbody tr td:first-child:not(:empty)').should('have.length', 12)
    })
  })
})
