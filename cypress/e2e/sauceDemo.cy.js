beforeEach(() => {
  // Visit the initial domain or web application
  cy.visit('https://www.saucedemo.com/');
});

describe("Test Sauce Demo", () => {
  it("should login with valid credentials", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    let itemprice1 = 0;
    cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').then(($itemprice1) => {itemprice1 = parseFloat($itemprice1.text().replace("$", ""));});
    let itemprice2 = 0;
    cy.get(':nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price').then(($itemprice2) => {itemprice2 = parseFloat($itemprice2.text().replace("$", ""));});
    cy.get('.shopping_cart_badge').invoke('text').as('count').then((count) => {
    expect(parseInt(count)).to.equal(2); });
    cy.get('.shopping_cart_badge').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one");
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('.summary_subtotal_label').invoke('text').as('subtotal').then((subtotal) => {
    const expectedTotal=  itemprice1 + itemprice2;
    expect(parseFloat(subtotal.trim().toString().replace("Item total: $", ""))).to.equal(expectedTotal);
    });
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete");
    cy.get('.complete-header').should("have.text", "Thank you for your order!");

  } ); } );