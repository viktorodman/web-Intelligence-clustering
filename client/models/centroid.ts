import { BlogData, WordOccurrence } from "../types/blog-types";

export default class Centroid {
    private _assignments: BlogData[] = []
    private _prevAssignments: BlogData[] = []
    private _wordCounts: WordOccurrence[] = []

    get wordCounts(): WordOccurrence[] {
        return this._wordCounts
    }

    get assignments(): BlogData[] {
        return this._assignments
    }

    public clearAssignments(): void {
        this._prevAssignments = [...this._assignments]
        this._assignments = []
    }

    public hasNewAssignments(): boolean {
        if (this._assignments.length !== this._prevAssignments.length) {
            return true
        }

        this._assignments.sort((a, b) => a.blogName.localeCompare(b.blogName))
        this._prevAssignments.sort((a, b) => a.blogName.localeCompare(b.blogName))

        for (let i = 0; i < this._assignments.length; i++) {
            if (this._assignments[i].blogName !== this._prevAssignments[i].blogName) {
                return true
            }
            
        }

        return false
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