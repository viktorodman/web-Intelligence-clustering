import { BlogData, WordOccurrence } from "../types/blog-types";

export default class Centroid {
    private _assignments: BlogData[] = []
    private _wordCounts: WordOccurrence[] = []

    get wordCounts(): WordOccurrence[] {
        return this._wordCounts
    }

    get assignments(): BlogData[] {
        return this._assignments
    }

    public clearAssignments(): void {
        this._assignments = []
    }

    public assign(blog: BlogData) {
        this._assignments.push(blog)
    }

    public setWordCount(word: string, count: number) {
        const wordAlreadyExists = this._wordCounts.find(w => w.word === word)

        if (wordAlreadyExists) {
            wordAlreadyExists.occurrences = count
        } else {
            this._wordCounts.push({
                occurrences: count,
                word
            })
        }
    } 
} 