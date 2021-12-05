import { BlogData } from "../types/blog-types"
import { Cluster, HierarchicalResult } from "../types/cluster"
import { readBlogsFromFile } from "./file-reader"
import { pearson } from "./helpers"


export const createHierarchicalCluster = async (): Promise<HierarchicalResult> => {
    const blogData: BlogData[] = await readBlogsFromFile()
    const starterClusters: Cluster[] = generateStarterClusters(blogData)
    const cluster: Cluster = createCluster(starterClusters)

    return createHierarchicalResult(cluster)
}

const createHierarchicalResult = (cluster: Cluster): HierarchicalResult => {
    const hierarchicalResult: HierarchicalResult = { blog: "", left: null, right: null}

    innerHierarchicalResult(cluster, hierarchicalResult)

    return hierarchicalResult
}

const innerHierarchicalResult = (cluster: Cluster, hierarchicalResult: HierarchicalResult): void => {
    if (cluster.left !== null) {
        hierarchicalResult.left = { blog: cluster.left.blog?.blogName || "", left: null, right: null }
        innerHierarchicalResult(cluster.left, hierarchicalResult.left)
    } 
    if(cluster.right !== null) {
        hierarchicalResult.right = { blog: cluster.right.blog?.blogName || "", left: null, right: null }
        innerHierarchicalResult(cluster.right, hierarchicalResult.right)
    } else {
        hierarchicalResult = { blog: cluster.blog?.blogName || "", left: null, right: null }
    }
}


const createCluster = (starterClusters: Cluster[]): Cluster => {
    
    while (starterClusters.length > 1) {
        let closest = Number.MAX_VALUE
        let a: Cluster = { blog: null, distance: 0, left: null, right: null, parent: null}
        let b: Cluster = { blog: null, distance: 0, left: null, right: null, parent: null}

        let distance = 0
        for (const clusterA of starterClusters) {
            for (const clusterB of starterClusters) {
                if (clusterA.blog && clusterB.blog) {
                    distance = pearson(clusterA.blog.wordOccurrences, clusterB.blog.wordOccurrences)
                }
                if (distance < closest && clusterA != clusterB) {
                    closest = distance
                    a = clusterA
                    b = clusterB
                }
            }
        }

        const nC = merge(a, b, closest)

        starterClusters.push(nC)

        const aIndex = starterClusters.indexOf(a)
        starterClusters.splice(aIndex, 1)
        const bIndex = starterClusters.indexOf(b)
        starterClusters.splice(bIndex, 1)
    }
    
    return starterClusters[0]
}

const merge = (clusterA: Cluster, clusterB: Cluster, distance: number): Cluster => {
    const n = 706
    const p: Cluster = { blog: null, distance: 0, left: null, right: null, parent: null}

    p.left = clusterA
    /* clusterA.parent = p */
    p.right = clusterB
    /* clusterB.parent = p */

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
