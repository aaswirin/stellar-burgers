/**
 * Это интеграционные тесты
 */

describe('Космическая бургерная', () => {
  /* Тестовый пользователь */
  const user = {
    email: 'village@grandfather.рф',
    name: 'Ванька Жуков',
    password: 'А.П.Чехов'
  };

  /* Селекторы */
  // Ингредиент бургера
  const BURGER_ELEMENT = '[data-cy="cy_burger-element"]';
  // Просто кнопка
  const BUTTON = 'button';
  // Кнопка заказа
  const ORDER_BUTTON = '[data-cy="cy_button-order"]';
  // Номер заказа
  const ORDER_NUMBER = '[data-cy="cy_order-number"]';
  // Модальное окно
  const MODAL = '[data-cy="cy_modal"]';
  // Кнопка закрытия модального окна
  const MODAL_CLOSE = '[data-cy="cy_modal-button-close"]';
  // Ссылка для открытия модального окна ингредиента
  const MODAL_LINK = '[data-cy="cy_modal-link"]';
  // Оверлей модального окна
  const MODAL_OVERLAY = '[data-cy="cy_modal-overlay"]';

  /* Токены */
  const accessToken = 'fake_access-token';
  const refreshToken = 'fake_refresh-token';

  /* До */
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  /* После */
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  /* Собственно тесты */
  it('добавить ингредиент в бургер', () => {
    cy.get(BURGER_ELEMENT).should('not.exist');
    cy.contains(BUTTON, 'Добавить').first().click();
    cy.contains(BURGER_ELEMENT, 'Краторная булка N-200i (верх)').should(
      'be.visible'
    );
  });

  it('создать заказ, войти в систему', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('newOrder');
    cy.intercept('POST', '**/auth/login', { fixture: 'user.json' }).as('login');
    cy.get(BURGER_ELEMENT).should('not.exist');
    cy.contains(BUTTON, 'Добавить').click();
    cy.get(ORDER_BUTTON).click();
    cy.get('input[name=email]').type(user.email);
    cy.get('input[name=password]').type(user.password);
    cy.contains(BUTTON, 'Войти').click();
    cy.wait('@login');
    cy.get(ORDER_BUTTON).click();
    cy.wait('@newOrder');
    cy.get(MODAL).should('be.visible');
    cy.get(ORDER_NUMBER).should('contain', '13 579');
    cy.get(MODAL_CLOSE).click();
    cy.get(BURGER_ELEMENT).should('not.exist');
  });

  it('открыть и закрыть модальное окно ингредиента', () => {
    cy.get(MODAL).should('not.exist');
    cy.get(MODAL_LINK).first().click();
    cy.get(MODAL).should('be.visible');
    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');
  });

  it('закрыть модальное окно по клику вне окна', () => {
    cy.get(MODAL).should('not.exist');
    cy.get(MODAL_LINK).first().click();
    cy.get(MODAL).should('be.visible');
    cy.get(MODAL_OVERLAY).click({ force: true });
    cy.get(MODAL).should('not.exist');
  });

  it('создать заказ, очистить конструктор бургера при авторизованном пользователе', () => {
    cy.setCookie('accessToken', accessToken);
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', refreshToken);
    });
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getUser');
    cy.get(BURGER_ELEMENT).should('not.exist');
    cy.contains(BUTTON, 'Добавить').first().click();
    cy.get(BURGER_ELEMENT).should('exist');
    cy.get(ORDER_BUTTON).click();
    cy.wait('@createOrder');
    cy.get(MODAL).should('be.visible');
    cy.get(ORDER_NUMBER).should('contain', '13 579');
    cy.get(MODAL_CLOSE).click();
    cy.get(BURGER_ELEMENT).should('not.exist');
  });
});
