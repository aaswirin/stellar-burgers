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
  // Ввод электронной почты
  const INPUT_EMAIL = 'input[name=email]';
  // Ввод пароля
  const INPUT_PASSWORD = 'input[name=password]';
  // Модальное окно
  const MODAL = '[data-cy="cy_modal"]';
  // Кнопка закрытия модального окна
  const MODAL_CLOSE = '[data-cy="cy_modal-button-close"]';
  // Ссылка для открытия модального окна ингредиента
  const MODAL_LINK = '[data-cy="cy_modal-link"]';
  // Оверлей модального окна
  const MODAL_OVERLAY = '[data-cy="cy_modal-overlay"]';

  /* Надписи на кнопках */
  const CAPTION_ADD = 'Добавить';
  const CAPTION_LOGIN = 'Войти';

  /* Номер заказа для теста */
  const TEST_NUMBER_ORDER = '13 579';

  /* Токены */
  const accessToken = 'fake_access-token';
  const refreshToken = 'fake_refresh-token';

  /* До */
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('');
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
    cy.contains(BUTTON, CAPTION_ADD).first().click();
    cy.get(BURGER_ELEMENT)
      .contains('Краторная булка N-200i (верх)')
      .should('be.visible');
  });

  it('создать заказ, войти в систему', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('newOrder');
    cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as(
      'login'
    );
    cy.get(BURGER_ELEMENT).should('not.exist');
    cy.contains(BUTTON, CAPTION_ADD).click();
    cy.get(ORDER_BUTTON).click();
    cy.get(INPUT_EMAIL).type(user.email);
    cy.get(INPUT_PASSWORD).type(user.password);
    cy.contains(BUTTON, CAPTION_LOGIN).click();
    cy.wait('@login');
    cy.get(ORDER_BUTTON).click();
    cy.wait('@newOrder');
    cy.get(MODAL).should('be.visible');
    cy.get(ORDER_NUMBER).should('contain', TEST_NUMBER_ORDER);
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
    cy.visit('');
    cy.wait('@getUser');
    cy.get(BURGER_ELEMENT).should('not.exist');
    cy.contains(BUTTON, CAPTION_ADD).first().click();
    cy.get(BURGER_ELEMENT).should('exist');
    cy.get(ORDER_BUTTON).click();
    cy.wait('@createOrder');
    cy.get(MODAL).should('be.visible');
    cy.get(ORDER_NUMBER).should('contain', TEST_NUMBER_ORDER);
    cy.get(MODAL_CLOSE).click();
    cy.get(BURGER_ELEMENT).should('not.exist');
  });
});
