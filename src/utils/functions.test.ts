import { expect, test } from '@jest/globals';
import { formatPrice } from './functions';

describe('Тест функции разбиения числа на разряды', () => {
  test('Разбиение числа на разряды', () => {
    let strNumber = formatPrice(1);
    expect(strNumber).toBe('1');

    strNumber = formatPrice(12);
    expect(strNumber).toBe('12');

    strNumber = formatPrice(123);
    expect(strNumber).toBe('123');

    strNumber = formatPrice(1234);
    expect(strNumber).toBe('1 234');

    strNumber = formatPrice(12345);
    expect(strNumber).toBe('12 345');

    strNumber = formatPrice(123456);
    expect(strNumber).toBe('123 456');
  });
});
