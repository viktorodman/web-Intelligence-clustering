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

    public add(centroid: Centroid): void {
        this._centroids.push(centroid)
    }


}