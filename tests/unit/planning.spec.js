import { fireEvent } from '@testing-library/vue';
import Planning from '@/components/Planning.vue';
import render from '../render';

describe('Planning.vue', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify([
            {
                variety: {
                    name: 'variety1', imageUrl: 'imageUrl', seed: [0, 1], plant: [2, 3], harvest: [4, 5],
                },
            },
            {
                variety: {
                    name: 'variety2', imageUrl: 'imageUrl', seed: [0, 1], plant: [2, 3], harvest: [4, 5],
                },
            },
        ]));
    });

    it('lists plants', async () => {
        const { container, findByText } = render(Planning);
        await findByText('variety1');
        await findByText('variety2');
        expect(container).toMatchSnapshot();
    });

    it('filters plants', async () => {
        const { getByLabelText, findByText, queryByText } = render(Planning);
        await fireEvent.update(getByLabelText('Search'), 'variety2');
        expect(queryByText('variety1')).not.toBeInTheDocument();
        await findByText('variety2');
    });
});
