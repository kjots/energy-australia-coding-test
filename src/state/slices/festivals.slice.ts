import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { MusicFestival } from '../../models/api/festivals.model';
import { FestivalsService } from '../../services/api/festivals.service';

const festivalsService = new FestivalsService('/api/v1');

export interface FestivalsState {
  status: 'idle' | 'fetching' | 'error';
  musicFestivals: Array<MusicFestival> | null;
}

const name = 'festivals';
const initialState: FestivalsState = {
  status: 'idle',
  musicFestivals: null
};

export const fetchMusicFestivals = createAsyncThunk(`${name}/fetch`, async () => festivalsService.getMusicFestivals());

export const festivalsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMusicFestivals.pending, state => {
      state.status = 'fetching';
    });

    builder.addCase(fetchMusicFestivals.fulfilled, (state, action) => {
      state.status = 'idle';
      state.musicFestivals = action.payload;
    });

    builder.addCase(fetchMusicFestivals.rejected, (state, action) => {
      state.status = 'error';
    });
  }
});

export const selectFestivalsState = (state: { [name]: FestivalsState }) => state[name];
