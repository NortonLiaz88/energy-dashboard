export type MappedWordSerie = {
  category: string;
  value: number;
};

export type WordSerie = {
  word: string;
  weight: number;
};

export type MostUsedWordsParams = {
  location_code?: string;
  search?: string;
  start_at?: string;
  end_at?: string;
};

export type MostUsedWordsResponse = {
  word: string;
  weight: number;
};
