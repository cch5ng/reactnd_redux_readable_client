import { sortNumbersAr, prettySortVotes, prettySortTime, prettyTime, sortList } from '../utils'

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

const postsList = [{id: "id1", voteScore: 4, timestamp: 444},
  {id: "id2", voteScore: 1, timestamp: 22},
  {id: "id3", voteScore: 2, timestamp: 151},
  {id: "id4", voteScore: 3, timestamp: 70}]


test('sortList sort by voteScore', () => {
  expect(sortList('voteScore', true, postsList)).toEqual([{id: "id1", voteScore: 4, timestamp: 444}, {id: "id4", voteScore: 3, timestamp: 70}, {id: "id3", voteScore: 2, timestamp: 151}, {id: "id2", voteScore: 1, timestamp: 22}]);
  expect(sortList('voteScore', false, postsList)).toEqual([{id: "id2", voteScore: 1, timestamp: 22}, {id: "id3", voteScore: 2, timestamp: 151}, {id: "id4", voteScore: 3, timestamp: 70}, {id: "id1", voteScore: 4, timestamp: 444}]);
});

test('sortList sort by timestamp', () => {
  expect(sortList('timestamp', true, postsList)).toEqual([{id: "id1", voteScore: 4, timestamp: 444}, {id: "id3", voteScore: 2, timestamp: 151}, {id: "id4", voteScore: 3, timestamp: 70}, {id: "id2", voteScore: 1, timestamp: 22}]);
  expect(sortList('timestamp', false, postsList)).toEqual([{id: "id2", voteScore: 1, timestamp: 22}, {id: "id4", voteScore: 3, timestamp: 70}, {id: "id3", voteScore: 2, timestamp: 151}, {id: "id1", voteScore: 4, timestamp: 444}]);
});

