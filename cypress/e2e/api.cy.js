
const apiOrders = `${Cypress.env("apiUrl")}/orders`;

context("GET /orders without authentication", () => {
  it("should return 401 or 403 when accessing orders without authentication", () => {
    cy.request({
      method: "GET",
      url: apiOrders,
      failOnStatusCode: false // Prevents Cypress from failing the test on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });
});
const apiLogin = `${Cypress.env("apiUrl")}/login`;


describe("GET /orders with authentication", () => {
  it("should return the list of products in the cart", () => {
    // Step 1: Log in to obtain the token
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
      failOnStatusCode: false 
    }).then((loginResponse) => {
      const token = loginResponse.body.token;
      expect(token).to.exist; 

      // Step 2: Use the token to access the orders endpoint
      cy.request({
        method: "GET",
        url: "http://localhost:8081/orders",
        headers: {
          Authorization: `Bearer ${token}`
        },
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(200);
       expect(response.body).exist;
        
      });
    });
  });
});




