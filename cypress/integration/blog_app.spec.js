describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Xavier Barral',
      username: 'gzavvo',
      password: 'secret'
    }
    const user2 = {
      name: 'Pirate',
      username: 'pirate',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  describe('Login', function() {
    it('Login form is shown', function() {
      cy.get('form')
        .should('contain', 'username')
        .and('contain', 'password')
        .and('contain', 'log in')
    })

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

  describe('User', function() {
    beforeEach(function() {
      cy.login({ username: 'gzavvo', password: 'secret' })
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

    it('can create a new blog', function() {
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

    it('can like a blog', function() {
      cy.get('#blog-list').contains('blog 3').contains('view').click()
      cy.get('#blog-list').contains('blog 3').contains('like').click()
    })

    it('can remove a blog', function() {
      cy.get('#blog-list').contains('blog 3').contains('view').click()
      cy.get('#blog-list').contains('blog 3').contains('remove').click()
    })

    it('other user cannot delete the blog', function() {
      cy.clearLocalStorage()
      cy.login({ username: 'pirate', password: 'secret' })
      cy.get('#blog-list').contains('blog 3').contains('view').click()
      cy.get('#blog-list').contains('blog 3').contains('remove').click()

      cy.get('#blog-list').contains('blog 3')
    })
  })

  describe.only('Bloglist', function() {
    beforeEach(function() {
      cy.login({ username: 'gzavvo', password: 'secret' })
      cy.createBlog({
        title: 'most liked',
        author: 'Mr First',
        url: 'http: truc',
        likes: 4
      })
      cy.createBlog({
        title: 'last liked',
        author: 'Mr Third',
        url: 'http: truc',
        likes: 0
      })
      cy.createBlog({
        title: 'second liked',
        author: 'Mr Second',
        url: 'http: truc',
        likes: 2
      })
      cy.visit('http://localhost:3000')
    })

    it('has a descending likes order', function() {
      cy.get('#blog-list button')
        .each(el => cy.wrap(el).click())
      cy.get('#blog-list .likes')
        .then((blogList) => {
          const likesArr = blogList.map((i, el) => el.textContent)
          cy.wrap(likesArr)
            .should('be.equal', likesArr.sort((a, b) => { b -a}))
        })
    })
  })
})
