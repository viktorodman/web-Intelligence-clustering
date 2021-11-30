import { WordOccurrence } from "../types/blog-types"

export const pearson = (firstBlog: WordOccurrence[], secondBlog: WordOccurrence[]): number => {
    let sumFirst = 0
    let sumSecond = 0
    let sumFirstSq = 0
    let sumSecondSq = 0
    let pSum = 0

    let n = 706

    for (let i = 0; i < n; i++) {
        const cntFirst = firstBlog[i].occurrences
        const cntSecond = secondBlog[i].occurrences

        sumFirst += cntFirst
        sumSecond += cntSecond
        sumFirstSq += cntFirst**2
        sumSecondSq += cntSecond**2
        pSum += cntFirst * cntSecond
    }


    const num = pSum - ((sumFirst * sumSecond) / n)
    const den = Math.sqrt((sumFirstSq - sumFirst**2 / n) * (sumSecondSq - sumSecond**2 / n))

    return 1 - (num/den)
}