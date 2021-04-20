describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Xavier Barral',
      username: 'gzavvo',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input.username').type('gzavvo')
      cy.get('input.password').type('secret')
      cy.contains('log in').click()

      cy.contains('Xavier Barral is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input.username').type('gzavvo')
      cy.get('input.password').type('wrong')
      cy.contains('log in').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'gzavvo', password: 'secret' })
    })

    it('a new blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('new title cypress')
      cy.get('#author').type('author cypress')
      cy.get('#url').type('http://blog.cypress')
      cy.contains('create blog').click()

      cy.get('.success')
        .contains('A new blog new title cypress by author cypress added')

      cy.get('#blog-list')
        .contains('new title cypres')
    })

    describe.only('and various blog have been created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog 1',
          author: 'author 1',
          url: 'url 1'
        })
        cy.createBlog({
          title: 'blog 2',
          author: 'author 2',
          url: 'url 2'
        })
        cy.createBlog({
          title: 'blog 3',
          author: 'author 3',
          url: 'url 3'
        })
        cy.visit('http://localhost:3000')
      })

      it('user can like a blog', function() {
        cy.get('#blog-list').contains('blog 3').contains('view').click()
        cy.get('#blog-list').contains('blog 3').contains('like').click()

      })
    })
  })
})
