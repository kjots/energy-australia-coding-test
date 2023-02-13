import axios from 'axios';

import { MusicFestival } from '../../models/api/festivals.model';

import { FestivalsService } from './festivals.service';

jest.mock('axios');

describe('FestivalsService', () => {
  let service: FestivalsService;

  beforeEach(() => {
    service = new FestivalsService('http://example.com/codingtest/api/v1');
  });

  describe('baseUrl', () => {
    it('should be the festivals base URL', () => {
      expect(service.baseUrl).toBe('http://example.com/codingtest/api/v1/festivals');
    });
  });

  describe('getMusicFestivals()', () => {
    it('should retrieve the festivals', () => {
      // Given
      jest.mocked(axios.get).mockResolvedValue({});

      // When
      service.getMusicFestivals();

      // Then
      expect(axios.get).toBeCalledWith('http://example.com/codingtest/api/v1/festivals');
    });

    describe('when the festivals are retrieved successfully', () => {
      it('should result in the festivals', async () => {
        // Given
        const festivals: Array<MusicFestival> = [];

        jest.mocked(axios.get).mockResolvedValue({ data: festivals });

        // When
        const result = await service.getMusicFestivals();

        // Then
        expect(result).toBe(festivals);
      });
    });

    describe('when the festivals are not retrieved successfully', () => {
      it('should result in the error', async () => {
        // Given
        const error = new Error();

        jest.mocked(axios.get).mockRejectedValue(error);

        // When
        const result = await service.getMusicFestivals().catch(error => error);

        // Then
        expect(result).toBe(error);
      });
    });
  });
});
