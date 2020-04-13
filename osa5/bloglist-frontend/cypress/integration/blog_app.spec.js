describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    cy.createUser("timo", "timo testaaja", "salaisuus")
    cy.visit("http://localhost:3000")
  })

  it("Login from is shown", function() {
    cy.contains("Login to Blog app")
    cy.contains("username")
    cy.contains("password")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#usernameInput").type("timo")
      cy.get("#passwordInput").type("salaisuus")
      cy.get("#loginButton").click()

      cy.contains("timo testaaja logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("#usernameInput").type("simo")
      cy.get("#passwordInput").type("sala")
      cy.get("#loginButton").click()

      cy.get(".error")
        .contains("invalid username or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("Create new blog", function() {
    beforeEach(function() {
      cy.login("timo", "salaisuus")
    })
    it("Logged user can create", function() {
      cy.contains("New blog").click()
      cy.get("#title").type("testi titteli")
      cy.get("#author").type("testi kirjoittaja")
      cy.get("#url").type("www.test.com")
      cy.get("#createBlogButton").click()

      cy.contains("testi titteli")
      cy.contains("testi kirjoittaja")
      cy.contains("view")
      cy.get(".info")
        .contains("A new blog testi titteli by testi kirjoittaja added")
        .should("have.css", "color", "rgb(0, 128, 0)")
      cy.get("html")
        .should("not.contain", "www.test.com")
        .should("not.contain", "Delete")
        .should("not.contain", "create")
    })

    it("Add like", function() {
      cy.createBlog("testi titteli", "testi kirjoittaja", "www.test.com", 0)
      cy.contains("view").click()
      cy.contains("0")
      cy.contains("Like").click()
      cy.contains("1")
    })

    it("Delete blog", function() {
      cy.createBlog("testi titteli", "testi kirjoittaja", "www.test.com", 0)
      cy.contains("view").click()
      cy.contains("timo testaaja")
      cy.contains("Delete").click()
      cy.on("window:confirm", () => true)
      cy.get("html")
        .should("not.contain", "testi titteli")
        .should("not.contain", "www.test.com")
      cy.contains("New blog")
    })
    it("Others can't delete blog", function() {
      cy.createBlog("testi titteli", "testi kirjoittaja", "www.test.com", 0)
      cy.contains("view").click()
      cy.contains("timo testaaja")
      cy.contains("Delete")
      cy.contains("logout").click()
      cy.createUser("fake", "fake user", "salaisuus")
      cy.visit("http://localhost:3000")
      cy.login("fake", "salaisuus")
      cy.contains("view").click()
      cy.get("html")
        .should("contain", "testi titteli")
        .should("contain", "www.test.com")
        .should("contain", "timo testaaja")
        .should("not.contain", "Delete")
    })
    it("Blogs are in correct order", function() {
      cy.createBlog("blogyks", "testi kirjoittaja", "www.test.com", 1)
      cy.createBlog("blogkaks", "testi kirjoittaja", "www.test.com", 2)
      cy.createBlog("blogkolme", "testi kirjoittaja", "www.test.com", 3)

      // Check that there is enough blogs and they are in correct order
      cy.get(".blog")
        .should("have.length", 3)
        .then(blogs => {
          cy.wrap(blogs[0]).contains("blogkolme")
          cy.wrap(blogs[1]).contains("blogkaks")
          cy.wrap(blogs[2]).contains("blogyks")
        })
    })
  })
})