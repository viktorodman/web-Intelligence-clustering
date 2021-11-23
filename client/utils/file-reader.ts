import { readFile } from 'fs/promises'
import { BlogData, WordOccurrence } from '../types/blog-types'



export const readBlogsFromFile = async (): Promise<BlogData[]> => {
    const result = await readFile("data/blogdata.txt", "utf8")
    const blogData: BlogData[] = []

    const rows = result.split("\n").map(row => row.split("\t"))
    const words = rows[0]
    

    for (let i = 1; i < rows.length - 1; i++) {
        const blog: BlogData = {
            blogName: rows[i][0],
            wordOccurrences: []
        }

        for (let j = 1; j < rows[i].length; j++) {
            const currentWord: WordOccurrence = {
                word: words[j].trim(),
                occurrences: Number(rows[i][j])
            }
            blog.wordOccurrences.push(currentWord)
        }
        blogData.push(blog)
    }

    return blogData
}