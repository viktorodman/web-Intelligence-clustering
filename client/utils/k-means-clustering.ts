import { BlogData, WordOccurrence } from "../types/blog-types"
import { readBlogsFromFile } from "./file-reader"

type WordBlogAppearance = {
    word: string;
    min: number;
    max: number;
}

type Centroid = {
    assignments: BlogData[];
    wordCounts: WordOccurrence[]
}

export const kMeansClustering = async () => {
    const blogData: BlogData[] = await readBlogsFromFile()
    const wordsMinMax: WordBlogAppearance[] = calcWordAppearances(blogData)

    kMeansCalc(blogData, wordsMinMax)
}

const pearson = (firstBlog: WordOccurrence[], secondBlog: WordOccurrence[]) => {
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

const calcWordAppearances = (blogData: BlogData[]): WordBlogAppearance[] => {
    const wordsMinMax: WordBlogAppearance[] = []

    const wordList = blogData[0].wordOccurrences

    for (let i = 0; i < wordList.length; i++) {
        const currentWord: WordBlogAppearance = {
            word: wordList[i].word,
            max: wordList[i].occurrences,
            min: wordList[i].occurrences
        } 
        for (let j = 1; j < blogData.length - 1; j++) {
            const currentVal = blogData[j].wordOccurrences[i].occurrences

            if (currentVal > currentWord.max) {
                currentWord.max = currentVal
            } else if (currentVal < currentWord.min) {
                currentWord.min = currentVal
            }
        }
        wordsMinMax.push(currentWord)
    }

    return wordsMinMax
}

const kMeansCalc = (blogs: BlogData[], wordBlogAppearances: WordBlogAppearance[]) => {
    const n = 706
    const k = 5

    const centroids: Centroid[] = []

    for (let i = 0; i < k; i++) {
        const currentCentroid: Centroid = {
            assignments: [],
            wordCounts: []
        }
        
        for (let j = 0; j < n; j++) {
            const currentWord = wordBlogAppearances[j]
            const word: WordOccurrence = {
                occurrences: (Math.floor(Math.random() * (currentWord.max - currentWord.min + 1) + currentWord.min)),
                word: currentWord.word
            }
            currentCentroid.wordCounts.push(word)
        }
        centroids.push(currentCentroid)
    }

    const MAX_ITERATIONS = 20

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        
        for (let j = 0; j < blogs.length; j++) {
            let distance = Number.MAX_VALUE
            
            let best: Centroid = {
                assignments: [],
                wordCounts: []
            }
            
            for (let k = 0; k < centroids.length; k++) {
                const cDist = pearson(blogs[j].wordOccurrences, centroids[k].wordCounts)
                
                if(cDist < distance) {
                    best = centroids[k]
                    distance = cDist
                }
                best.assignments.push(blogs[j])
            }
        }
        for (let m = 0; m < centroids.length; m++) {
            const element = array[m];
            
        }
    }

}