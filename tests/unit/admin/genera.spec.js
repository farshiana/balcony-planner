import { fireEvent } from '@testing-library/vue';
import Genera from '@/components/Admin/Genera/Genera.vue';
import { CATEGORY_FRUITS } from '@/constants';
import render from '../../render';

describe('Genera.vue', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify([
            { name: 'genus1', category: CATEGORY_FRUITS },
            { name: 'genus2', category: CATEGORY_FRUITS },
        ]));
    });

    it('lists genera', async () => {
        const { container, findByText } = render(Genera);
        await findByText('genus1');
        await findByText('genus2');
        expect(container).toMatchSnapshot();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('creates genus', async () => {
        fetch.mockResponseOnce(JSON.stringify({ id: 1 }));

        const { getByText, getByLabelText, getByTestId } = render(Genera);
        await fireEvent.click(getByText('Add genus'));
        await fireEvent.click(getByLabelText('Category'));
        await fireEvent.click(getByText('Fruits'));
        await fireEvent.update(getByLabelText('Name'), 'toto');
        await fireEvent.click(getByTestId('save-genus'));
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    it('filters genera', async () => {
        const { getByLabelText, findByText, queryByText } = render(Genera);
        await fireEvent.update(getByLabelText('Search'), 'genus2');
        expect(queryByText('genus1')).not.toBeInTheDocument();
        await findByText('genus2');
    });
});
