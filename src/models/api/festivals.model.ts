export interface MusicFestival {
  name?: string;
  bands: Array<Band>;
}

export interface Band {
  name: string;
  recordLabel?: string;
}
