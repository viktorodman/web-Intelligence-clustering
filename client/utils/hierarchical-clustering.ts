import { BlogData } from "../types/blog-types"
import { Cluster } from "../types/cluster"
import { readBlogsFromFile } from "./file-reader"


export const createHierarchicalCluster = async () => {
    const blogData: BlogData[] = await readBlogsFromFile()

    const starterClusters: Cluster[] = generateStarterClusters(blogData)

}

const merge = (clusterA: Cluster, clusterB: Cluster, distance: number): Cluster => {
    const n = 706
    const p: Cluster = { blog: null, distance: 0, left: null, right: null, parent: null}

    p.left = clusterA
    clusterA.parent = p
    p.right = clusterB
    clusterB.parent = p

    const nb: BlogData = {
        blogName: "",
        wordOccurrences: []
    }

    if (clusterA.blog && clusterB.blog) {
        for (let i = 0; i < clusterA.blog?.wordOccurrences.length; i++) {
            const word = clusterA.blog.wordOccurrences[i].word
            const cntA = clusterA.blog.wordOccurrences[i].occurrences
            const cntB = clusterB.blog.wordOccurrences[i].occurrences

            const cnt = (cntA + cntB) / 2

            nb.wordOccurrences.push({ occurrences: cnt, word })
        }
    }

    p.blog = nb
    p.distance = distance

    return p
}

const generateStarterClusters = (blogData: BlogData[]): Cluster[] => {
    const clusters: Cluster[] = []

    for (const blog of blogData) {
        const cluster: Cluster = {blog, distance: 0, left: null, right: null, parent: null}
        clusters.push(cluster)
    }

    return clusters
}
