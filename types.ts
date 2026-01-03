
export interface Scripture {
  id: string;
  reference: string;
  text: string;
  translation: string;
}

export interface ReflectionPrompt {
  id: string;
  scriptureId: string;
  question: string;
  context: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  scriptureId: string;
  verseReference: string;
  verseText: string;
  prompt: string;
  content: string;
  mood?: string;
}

export interface FavoriteVerse {
  id: string;
  scripture: Scripture;
  savedAt: string;
}
