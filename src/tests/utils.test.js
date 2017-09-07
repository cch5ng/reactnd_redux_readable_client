import { sortNumbersAr, prettySortVotes, prettySortTime, prettyTime } from '../utils'

test('sort array of sortNumbersAr', () => {
  expect(sortNumbersAr([6, 1, 3, 5, 0])).toEqual([0, 1, 3, 5, 6]);
  expect(sortNumbersAr([1, 10, 5])).toEqual([1, 5, 10]);
  expect(sortNumbersAr([60, -1, 19, 0, 400, 65])).toEqual([-1, 0, 19, 60, 65, 400]);
});

test('prettySortVotes', () => {
  expect(prettySortVotes(true)).toBe('high to low');
  expect(prettySortVotes(false)).toBe('low to high');
  expect(prettySortVotes()).toBe('unknown');
});

test('prettySortTime', () => {
  expect(prettySortTime(true)).toBe('recent to oldest');
  expect(prettySortTime(false)).toBe('oldest to recent');
  expect(prettySortTime()).toBe('unknown');
});

test('prettyTime', () => {
  expect(prettyTime(1504681200000)).toBe('Wed Sep 06 2017 00:00:00 GMT-0700 (PDT)');
  expect(prettyTime(949046400000)).toBe('Fri Jan 28 2000 00:00:00 GMT-0800 (PST)');
  expect(prettyTime()).toBe('');
});

