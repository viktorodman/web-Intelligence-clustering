import Centroid from "../models/centroid"
import CentroidList from "../models/centroid-list"
import { BlogData, WordOccurrence } from "../types/blog-types"
import { ClusterResult } from "../types/cluster-result"
import { readBlogsFromFile } from "./file-reader"
import { pearson } from "./helpers"

type WordBlogAppearance = {
    word: string;
    min: number;
    max: number;
}

export const kMeansClustering = async (): Promise<ClusterResult[]> => {
    const blogData: BlogData[] = await readBlogsFromFile()
    const wordsMinMax: WordBlogAppearance[] = calcWordAppearances(blogData)

    const kMeansMeasurement: CentroidList = kMeansCalc(blogData, wordsMinMax)

    return createClusters(kMeansMeasurement.centroidList)
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

const kMeansCalc = (blogs: BlogData[], wordBlogAppearances: WordBlogAppearance[]): CentroidList => {
    const MAX_ITERATIONS = 300
    const n = 706
    const k = 5

    let iterationCounter = 0

    const centroids: CentroidList = generateCentroids(k, n, wordBlogAppearances)

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        centroids.clearAssignments()

        for (const blog of blogs) {
            let distance = Number.MAX_VALUE
            let best = new Centroid()

            for (const centroid of centroids.centroidList) {
                const cDist = pearson(blog.wordOccurrences, centroid.wordCounts)
                if (cDist < distance) {
                    best = centroid
                    distance = cDist
                }
            }
            best.assign(blog)
        }

        if (i > 0 && !centroids.hasNewAssignments()) {
            console.log(iterationCounter)
            return centroids
        }

        for (const centroid of centroids.centroidList) {
            
            for (let w = 0; w < n; w++) {
                let avg = 0

                for (const assignment of centroid.assignments) {
                    avg += assignment.wordOccurrences[w].occurrences
                }
                avg /= centroid.assignments.length

                centroid.setWordCount(wordBlogAppearances[w].word, avg)
            }
        }

        iterationCounter++
    }

    console.log(iterationCounter)

    return centroids
}


const generateCentroids = (numOfCentroids: number, numOfWords: number, wordBlogAppearances: WordBlogAppearance[]): CentroidList => {
    const centroids = new CentroidList()

    for (let c = 0; c < numOfCentroids; c++) {
        const centroid = new Centroid()
        for (let i = 0; i < numOfWords; i++) {
            const currentWord = wordBlogAppearances[i]
            centroid.setWordCount(currentWord.word, generateRandomNumber(currentWord.min, currentWord.max))
        }
        centroids.add(centroid)
    }

    return centroids
}

/**
 * SRC: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 */
const generateRandomNumber = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1) + min)
} 

const createClusters = (centroidList: Centroid[]): ClusterResult[] => {
    const clusters: ClusterResult[] = []
    
    for (const centroid of centroidList) {
        const blogNames: string[] = []

        for (const blog of centroid.assignments) {
            blogNames.push(blog.blogName)
        }
        clusters.push({
            items: blogNames
        })
    }

    return clusters
}

