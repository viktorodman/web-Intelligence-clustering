export type WordOccurrence = {
    word: string;
    occurrences: number;
}

export type BlogData = {
    blogName: string
    wordOccurrences: WordOccurrence[]
}