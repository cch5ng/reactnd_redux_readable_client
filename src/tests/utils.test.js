import { sortNumbersAr } from '../utils'

test('sort array of sortNumbersAr', () => {
  expect(sortNumbersAr([6, 1, 3, 5, 0])).toEqual([0, 1, 3, 5, 6]);
  expect(sortNumbersAr([1, 10, 5])).toEqual([1, 5, 10]);
  expect(sortNumbersAr([60, -1, 19, 0, 400, 65])).toEqual([-1, 0, 19, 60, 65, 400]);
});