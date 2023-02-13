import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../app/app.store';

import { MusicFestival } from '../../models/api/festivals.model';
import { fetchMusicFestivals } from '../../state/slices/festivals.slice';

import { RecordLabel, RecordLabels } from './RecordLabels';

const mockFestivals: Array<MusicFestival> = require('./mock/festivals.json');
const mockRecordLabels: Array<RecordLabel> = require('./mock/recordLabels.json');

jest.mock('../../services/api/festivals.service', () => ({
  FestivalsService: jest.fn().mockImplementation(() => ({
    getMusicFestivals: async () => mockFestivals
  }))
}));

const testId = 'record-labels';

describe('RecordLabels', () => {
  describe('when the music festivals have not been fetched', () => {
    it('should not render the record labels', () => {
      render(
        <Provider store={store}>
          <RecordLabels data-testid={testId} />
        </Provider>
      );

      const recordLabels = screen.queryByTestId(testId);

      expect(recordLabels).not.toBeInTheDocument();
    });
  });

  describe('when the music festivals have been fetched', () => {
    beforeEach(() => {
      store.dispatch(fetchMusicFestivals());
    });

    it('should render the record labels', () => {
      render(
        <Provider store={store}>
          <RecordLabels data-testid={testId} />
        </Provider>
      );

      const recordLabels = screen.getByTestId(testId);

      expect(recordLabels).toBeInTheDocument();

      for (const mockRecordLabel of mockRecordLabels) {
        const recordLabelName = screen.getByTestId(`${testId}-${mockRecordLabel.name}-name`);

        expect(recordLabelName).toBeInTheDocument();
        expect(recordLabelName).toHaveTextContent(mockRecordLabel.name);

        const recordLabelBands = screen.getByTestId(`${testId}-${mockRecordLabel.name}-bands`);

        expect(recordLabelBands).toBeInTheDocument();

        for (const mockBand of mockRecordLabel.bands) {
          const bandName = screen.getByTestId(`${testId}-${mockRecordLabel.name}-${mockBand.name}-name`);

          expect(bandName).toBeInTheDocument();
          expect(bandName).toHaveTextContent(mockBand.name);

          const bandMusicFestivals = screen.getByTestId(
            `${testId}-${mockRecordLabel.name}-${mockBand.name}-musicFestivals`
          );

          expect(bandMusicFestivals).toBeInTheDocument();

          const bandMusicFestivalsItems = within(bandMusicFestivals).queryAllByRole('listitem');

          expect(bandMusicFestivalsItems.length).toBe(mockBand.musicFestivals.length);

          for (let i = 0; i < mockBand.musicFestivals.length; i++) {
            expect(bandMusicFestivalsItems[i]).toHaveTextContent(mockBand.musicFestivals[i]);
          }
        }
      }
    });
  });
});
