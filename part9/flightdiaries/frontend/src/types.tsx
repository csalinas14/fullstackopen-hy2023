export interface HeaderProps {
  name: string;
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
  
 export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

export interface DiaryFormProps {
  diaries: DiaryEntry[],
  setDiariesFunc: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

export type ContentProps = Omit<DiaryEntry, 'comment'>;

export type NewDiary = Omit<DiaryEntry, "id">;

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
  response: {
    data: string;
  }
}