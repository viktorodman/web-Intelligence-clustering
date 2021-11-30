import { BlogData } from "../types/blog-types"

export type Cluster = {
    parent: Cluster | null
    left: Cluster | null
    right: Cluster | null
    blog: BlogData | null
    distance: number
}

/* export default class Cluster {
    private _parent?: Cluster = undefined
    private _left?: Cluster = undefined
    private _right?: Cluster = undefined
    private _blog?: BlogData = undefined
    private _distance: number = 0
    


    get blog() {
        return this._blog
    }

    set left(cluster: Cluster) {
        this._left = cluster
    }
    set right(cluster: Cluster) {
        this._right = cluster
    }
    set parent(cluster: Cluster) {
        this._parent = cluster
    }
} */