import { fireEvent } from '@testing-library/vue';
import Plants from '@/components/Plants/Plants.vue';
import { EXPOSURE_SHADE, WATERING_LOW } from '@/constants';
import render from '../render';

describe('Plants.vue', () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify([
            {
                variety: {
                    name: 'plant1',
                    exposure: EXPOSURE_SHADE,
                    watering: WATERING_LOW,
                    seed: [0, 1],
                    plant: [2, 3],
                    harvest: [4, 5],
                },
            },
            {
                variety: {
                    name: 'plant2',
                    exposure: EXPOSURE_SHADE,
                    watering: WATERING_LOW,
                    seed: [0, 1],
                    plant: [2, 3],
                    harvest: [4, 5],
                },
            },
        ]));
    });

    it('lists plants', async () => {
        const { container, findByText } = render(Plants);
        await findByText('plant1');
        await findByText('plant2');
        expect(container).toMatchSnapshot();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('creates plant', async () => {
        fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'variety1' }]));

        const { getByText, getByTestId, getByLabelText } = render(Plants);
        await fireEvent.click(getByText('Add plant'));
        await fireEvent.update(getByLabelText('Notes'), 'bla');

        await fireEvent.update(getByTestId('plant-autocomplete'), 'query');
        expect(fetch).toHaveBeenCalledTimes(3);
    });

    it('filters plants', async () => {
        const { getByLabelText, findByText, queryByText } = render(Plants);
        await fireEvent.update(getByLabelText('Search'), 'plant2');
        expect(queryByText('plant1')).not.toBeInTheDocument();
        await findByText('plant2');
    });
});
