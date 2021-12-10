import Centroid from "./centroid";

export default class CentroidList {
    private _centroids: Centroid[] = []

    get centroidList(): Centroid[] {
        return this._centroids
    }

    public clearAssignments(): void {
        for (const centroid of this._centroids) {
            centroid.clearAssignments()
        }
    }

    public hasNewAssignments(): boolean {
        for (const centroid of this._centroids) {
            if (centroid.hasNewAssignments()) {
                return true
            }
        }

        return false
    }

    public add(centroid: Centroid): void {
        this._centroids.push(centroid)
    }


}