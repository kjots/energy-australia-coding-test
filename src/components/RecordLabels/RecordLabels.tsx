import React from 'react';

import { useAppSelector } from '../../app/app.hooks';
import { MusicFestival } from '../../models/api/festivals.model';
import { selectFestivalsState } from '../../state/slices/festivals.slice';

import './RecordLabels.css';

export const RecordLabels = () => {
  const { musicFestivals } = useAppSelector(selectFestivalsState);

  const recordLabels = musicFestivals ? toRecordLabels(musicFestivals) : null;

  return (
    recordLabels && (
      <dl className="RecordLabels">
        {recordLabels.map(recordLabel => (
          <React.Fragment key={recordLabel.name}>
            <dt>{recordLabel.name}</dt>
            <dd>
              <dl>
                {recordLabel.bands.map(band => (
                  <React.Fragment key={band.name}>
                    <dt>{band.name}</dt>
                    <dd>
                      <ul>
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

interface RecordLabel {
  name: string;
  bands: Array<{
    name: string;
    musicFestivals: Array<string>;
  }>;
}

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
