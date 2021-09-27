/* eslint-disable no-undef */

const { lexicalAnalyse } = require('./lexical-analyse')

describe('字句解析', () => {
  test('*', () => {
    expect(lexicalAnalyse('*')).toStrictEqual([{ type: 'Asterisk' }])
  })
  test('==', () => {
    expect(lexicalAnalyse('==')).toStrictEqual([{ type: 'isEqual' }])
  })
  test('=', () => {
    expect(lexicalAnalyse('=')).toStrictEqual([{ type: 'Equal' }])
  })
  test('1', () => {
    expect(lexicalAnalyse('1')).toStrictEqual([{ type: 'Int', value: 1 }])
  })
  test('123', () => {
    expect(lexicalAnalyse('123')).toStrictEqual([{ type: 'Int', value: 123 }])
  })
  test('+', () => {
    expect(lexicalAnalyse('+')).toStrictEqual([{ type: 'Plus' }])
  })
  test('1+2', () => {
    expect(lexicalAnalyse('1+2')).toStrictEqual([
      { type: 'Int', value: 1 },
      { type: 'Plus' },
      { type: 'Int', value: 2 }])
  })
  test('改行', () => {
    expect(lexicalAnalyse('1\n2')).toStrictEqual([
      { type: 'Int', value: 1 },
      { type: 'Newline' },
      { type: 'Int', value: 2 }])
  })
  test('空白は無視する', () => {
    expect(lexicalAnalyse('\t 1 ')).toStrictEqual([{ type: 'Int', value: 1 }])
    expect(lexicalAnalyse('     ')).toStrictEqual([])
  })
  test('無効な文字列', () => {
    expect(lexicalAnalyse('あ')).toStrictEqual([{ type: 'UnknownCharacter', value: 'あ' }])
  })
  test('識別子', () => {
    expect(lexicalAnalyse('test abc')).toStrictEqual([
      { type: 'Ident', value: 'test' },
      { type: 'Ident', value: 'abc' },
    ])
  })
  test('括弧', () => {
    expect(lexicalAnalyse('()')).toStrictEqual([
      { type: 'LParen' },
      { type: 'RParen' },
    ])
  })
  test('コンマ', () => {
    expect(lexicalAnalyse(',')).toStrictEqual([{ type: 'Comma' }])
  })
})
