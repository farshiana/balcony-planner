import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.setMock('../src/i18n', require('./__mocks__/i18n.js'));

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error.message);
});
