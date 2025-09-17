/**
 * Это интеграционные тесты
 */

describe('Космическая бургерная', () => {
  const user = {
    email: 'village@grandfather.рф',
    name: 'Ванька Жуков',
    password: 'А.П.Чехов'
  };

  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getApiIngredients'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getApiIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('добавить ингредиент в бургер', () => {
    cy.get('[data-cy="cy_burger-element"]').should('not.exist');
    cy.contains('button', 'Добавить').first().click();
    cy.contains(
      '[data-cy="cy_burger-element"]',
      'Краторная булка N-200i (верх)'
    ).should('be.visible');
  });

  it('создать заказ, войти в систему', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as(
      'login'
    );
    cy.get('[data-cy="cy_burger-element"]').should('not.exist');
    cy.contains('button', 'Добавить').click();
    cy.get('[data-cy="cy_order-button"]').click();
    cy.get('input[name=email]').type(user.email);
    cy.get('input[name=password]').type(user.password);
    cy.contains('button', 'Войти').click();
    cy.wait('@login');
    cy.get('[data-cy="cy_order-button"]').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="cy_modal"]').should('be.visible');
    cy.get('[data-cy="cy_order-number"]').should('contain', '12345');
    cy.get('[data-cy="cy_modal-close"]').click();
    cy.get('[data-cy="cy_burger-element"]').should('not.exist');
  });
});
