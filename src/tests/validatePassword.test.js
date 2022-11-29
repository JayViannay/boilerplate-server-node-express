/* eslint-disable no-undef */
import { validatePassword } from '../services/security/validatePassword.js';

describe('validatePassword', () => {
    test('return false ..', () => {
        expect(validatePassword('')).toBe(false);
    });
});