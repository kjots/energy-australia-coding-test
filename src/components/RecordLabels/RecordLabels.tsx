import React from 'react';

import { useAppSelector } from '../../app/app.hooks';
import { MusicFestival } from '../../models/api/festivals.model';
import { selectFestivalsState } from '../../state/slices/festivals.slice';

import './RecordLabels.css';

export interface RecordLabel {
  name: string;
  bands: Array<{
    name: string;
    musicFestivals: Array<string>;
  }>;
}

export interface RecordLabelsProps {
  'data-testid'?: string;
}

export const RecordLabels = ({ 'data-testid': testId }: RecordLabelsProps) => {
  const { musicFestivals } = useAppSelector(selectFestivalsState);

  const recordLabels = musicFestivals ? toRecordLabels(musicFestivals) : null;

  return (
    recordLabels && (
      <dl className="RecordLabels" data-testid={testId}>
        {recordLabels.map(recordLabel => (
          <React.Fragment key={recordLabel.name}>
            <dt data-testid={`${testId}-${recordLabel.name}-name`}>{recordLabel.name}</dt>
            <dd>
              <dl data-testid={`${testId}-${recordLabel.name}-bands`}>
                {recordLabel.bands.map(band => (
                  <React.Fragment key={band.name}>
                    <dt data-testid={`${testId}-${recordLabel.name}-${band.name}-name`}>{band.name}</dt>
                    <dd>
                      <ul data-testid={`${testId}-${recordLabel.name}-${band.name}-musicFestivals`}>
                        {band.musicFestivals.map(musicFestival => (
                          <li key={musicFestival}>{musicFestival}</li>
                        ))}
                      </ul>
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </dd>
          </React.Fragment>
        ))}
      </dl>
    )
  );
};

function toRecordLabels(musicFestivals: Array<MusicFestival>): Array<RecordLabel> {
  const recordLabels: {
    [recordLabelName: string]: {
      [bandName: string]: Set<string>;
    };
  } = {};

  for (const musicFestival of musicFestivals) {
    for (const band of musicFestival.bands) {
      if (band.recordLabel) {
        recordLabels[band.recordLabel] ??= {};
        recordLabels[band.recordLabel][band.name] ??= new Set();

        if (musicFestival.name) {
          recordLabels[band.recordLabel][band.name].add(musicFestival.name);
        }
      }
    }
  }

  return Object.entries(recordLabels)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([recordLabelName, bands]) => ({
      name: recordLabelName,
      bands: Object.entries(bands)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([bandName, musicFestivals]) => ({
          name: bandName,
          musicFestivals: [...musicFestivals].sort()
        }))
    }));
}
