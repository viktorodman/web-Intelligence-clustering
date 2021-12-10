import { BlogData } from "../types/blog-types"

export type Cluster = {
    parent: Cluster | null
    left: Cluster | null
    right: Cluster | null
    blog: BlogData | null
    distance: number
}

export type HierarchicalResult = {
    left: HierarchicalResult | null
    right: HierarchicalResult | null
    blog: string
}