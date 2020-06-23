/// <reference types="cypress" />

describe('tic tac toe', function() {
    it('handles normal gameplay', function() {
        cy.visit('/')

        // status shows correct next player at game start
        cy.get('[data-cy=status]').should('contain', 'X')
        
        // clicking in a box gives it an X
        cy.get('[data-cy=\"square 0\"]')
            .should('be.empty')
            .click()
            .should('contain', 'X')
        
        // status shows correct next player after first move
        cy.get('[data-cy=status]').should('contain', 'O')

        // clicking in a box gives it an O
        cy.get('[data-cy=\"square 1\"]')
            .click()
            .should('contain', 'O')
        // clicking in a filled box has no effect
            .click()
            .should('contain', 'O')
        
        // set up a victory
        cy.get('[data-cy=\"square 3\"]').click()
        cy.get('[data-cy=\"square 4\"]').click()
        cy.get('[data-cy=\"square 6\"]').click()

        // status shows victor (end of game)
        cy.get('[data-cy=status]').should('contain', 'Winner: X')

        // the right squares highlighted on victory
        cy.get('[data-cy=\"square 0\"]').should('have.class', 'win-square')
        cy.get('[data-cy=\"square 3\"]').should('have.class', 'win-square')
        cy.get('[data-cy=\"square 6\"]').should('have.class', 'win-square')

        // these squares aren't
        cy.get('[data-cy=\"square 1\"]').should('not.have.class', 'win-square')
        cy.get('[data-cy=\"square 2\"]').should('not.have.class', 'win-square')
        cy.get('[data-cy=\"square 4\"]').should('not.have.class', 'win-square')
        cy.get('[data-cy=\"square 5\"]').should('not.have.class', 'win-square')
        cy.get('[data-cy=\"square 7\"]').should('not.have.class', 'win-square')
        cy.get('[data-cy=\"square 8\"]').should('not.have.class', 'win-square')
        
        // clicking in a box after game end has no effect
        cy.get('[data-cy=\"square 2\"]').click().should('be.empty')

        // toggle sort button reverses the move list
        cy.get('[data-cy=\"moveList\"]').children().first().should('have.attr', 'data-cy', 'move 0')
        cy.get('[data-cy=\"toggleSort\"]').click()
        cy.get('[data-cy=\"moveList\"]').children().first().should('have.attr', 'data-cy', 'move 5')

        // clicking on a move resets game state to that point
        cy.get('[data-cy=\"move 1\"]').children() // get the actual button
            .click()
            // current move is highlighted in bold
            .should('have.class', 'current-move')

        // every square except square 0 should be empty and O should be next to go
        cy.get('[data-cy=\"square 0\"]').should('contain', 'X')
        cy.get('[data-cy=\"square 1\"]').should('be.empty')
        cy.get('[data-cy=\"square 2\"]').should('be.empty')
        cy.get('[data-cy=\"square 3\"]').should('be.empty')
        cy.get('[data-cy=\"square 4\"]').should('be.empty')
        cy.get('[data-cy=\"square 5\"]').should('be.empty')
        cy.get('[data-cy=\"square 6\"]').should('be.empty')
        cy.get('[data-cy=\"square 7\"]').should('be.empty')
        cy.get('[data-cy=\"square 8\"]').should('be.empty')
        
        // move list is still intact
        cy.get('[data-cy=\"move 5\"]').should('exist')
        
        // clicking on a new box after resetting game state clears old history
        cy.get('[data-cy=\"square 1\"]').click()
        cy.get('[data-cy=\"move 5\"]').should('not.exist')

        // set up a draw
        cy.get('[data-cy=\"square 3\"]').click()
        cy.get('[data-cy=\"square 6\"]').click()
        cy.get('[data-cy=\"square 4\"]').click()
        cy.get('[data-cy=\"square 8\"]').click()
        cy.get('[data-cy=\"square 7\"]').click()
        cy.get('[data-cy=\"square 5\"]').click()
        cy.get('[data-cy=\"square 2\"]').click()

        // status shows draw
        cy.get('[data-cy=status]').should('contain', 'DRAW!')
    })
})