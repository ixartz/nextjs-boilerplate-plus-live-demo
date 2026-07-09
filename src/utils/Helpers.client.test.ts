import { createTranslator } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { getAuthErrorMessage } from './Helpers.client';

describe('getAuthErrorMessage', () => {
  const t = createTranslator({
    locale: 'en',
    messages: {
      TOO_MANY_REQUESTS: 'translated:TOO_MANY_REQUESTS',
      BAD_REQUEST: 'translated:BAD_REQUEST',
      INVALID_PASSWORD: 'translated:INVALID_PASSWORD',
      UNAUTHORIZED: 'translated:UNAUTHORIZED',
      UNKNOWN_ERROR: 'translated:UNKNOWN_ERROR',
    },
  });

  it('returns UNKNOWN_ERROR when all error attributes are undefined', () => {
    expect(getAuthErrorMessage(t, { })).toBe('translated:UNKNOWN_ERROR');
  });

  it('prioritizes status 429 over any error code', () => {
    expect(getAuthErrorMessage(t, { status: 429 })).toBe('translated:TOO_MANY_REQUESTS');
    expect(getAuthErrorMessage(t, { code: 'INVALID_PASSWORD', status: 429 })).toBe('translated:TOO_MANY_REQUESTS');
    expect(getAuthErrorMessage(t, { code: 'UNKNOWN_CODE', status: 429 })).toBe('translated:TOO_MANY_REQUESTS');
  });

  it('returns UNKNOWN_ERROR for missing or unrecognized codes', () => {
    expect(getAuthErrorMessage(t, { code: 'UNRECOGNIZED_CODE', status: 500 })).toBe('translated:UNKNOWN_ERROR');
    expect(getAuthErrorMessage(t, { code: 'random_error', status: 500 })).toBe('translated:UNKNOWN_ERROR');
    expect(getAuthErrorMessage(t, { status: 500 })).toBe('translated:UNKNOWN_ERROR');
    expect(getAuthErrorMessage(t, { code: undefined, status: 500 })).toBe('translated:UNKNOWN_ERROR');
    expect(getAuthErrorMessage(t, { code: '', status: 500 })).toBe('translated:UNKNOWN_ERROR');
  });

  it('returns BAD_REQUEST for bad request status text without a known code', () => {
    expect(getAuthErrorMessage(t, { status: 400 })).toBe('translated:BAD_REQUEST');
    expect(getAuthErrorMessage(t, { code: 'UNRECOGNIZED_CODE', status: 400 })).toBe(
      'translated:BAD_REQUEST',
    );
  });

  it('returns translated message for known error codes', () => {
    expect(getAuthErrorMessage(t, { code: 'INVALID_PASSWORD', status: 400 })).toBe('translated:INVALID_PASSWORD');
    expect(getAuthErrorMessage(t, { code: 'UNAUTHORIZED', status: 400 })).toBe('translated:UNAUTHORIZED');
  });

  it('prioritizes known codes over BAD_REQUEST status text', () => {
    expect(getAuthErrorMessage(t, { code: 'INVALID_PASSWORD', status: 400 })).toBe(
      'translated:INVALID_PASSWORD',
    );
  });
});
