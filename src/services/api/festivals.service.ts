import axios from 'axios';

import { MusicFestival } from '../../models/api/festivals.model';

export class FestivalsService {
  constructor(private readonly codingTestApiBaseUrl: string) {}

  get baseUrl(): string {
    return `${this.codingTestApiBaseUrl}/festivals`;
  }

  async getMusicFestivals(): Promise<Array<MusicFestival>> {
    const { data } = await axios.get<Array<MusicFestival>>(this.baseUrl);

    return data;
  }
}
