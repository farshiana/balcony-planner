import { fireEvent } from '@testing-library/vue';
import Auth from '@/components/Auth.vue';
import render from '../render';

describe('Auth.vue', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
    });

    it('shows login form', () => {
        const { container } = render(Auth);
        expect(container).toMatchSnapshot();
    });

    it('logs in', async () => {
        const { getByLabelText, getByTestId } = render(Auth);

        await fireEvent.update(getByLabelText('Username'), 'toto');
        await fireEvent.update(getByLabelText('Password'), 'short_pwd');
        await fireEvent.click(getByTestId('submit'));
        expect(fetch).toHaveBeenCalledTimes(0);

        await fireEvent.update(getByLabelText('Password'), 'longer_password');
        await fireEvent.click(getByTestId('submit'));
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('registers', async () => {
        const { getByLabelText, getByTestId } = render(Auth);

        await fireEvent.click(getByTestId('mode-switch'));
        await fireEvent.update(getByLabelText('Username'), 'toto');
        await fireEvent.update(getByLabelText('Password'), 'correct_password');
        await fireEvent.update(getByLabelText('Repeat password'), 'different_password');
        await fireEvent.click(getByTestId('submit'));
        expect(fetch).toHaveBeenCalledTimes(1);

        await fireEvent.update(getByLabelText('Repeat password'), 'correct_password');
        await fireEvent.click(getByTestId('submit'));
        expect(fetch).toHaveBeenCalledTimes(2);
    });
});
