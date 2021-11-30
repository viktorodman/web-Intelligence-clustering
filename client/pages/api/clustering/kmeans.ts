import type { NextApiRequest, NextApiResponse } from 'next'
import { ClusterResult } from '../../../types/cluster-result'
import { kMeansClustering } from '../../../utils/k-means-clustering'


export default async function handler(req: NextApiRequest, res: NextApiResponse<ClusterResult[]>) {
    console.time("dbsave");
    const data = await kMeansClustering()
    console.timeEnd("dbsave")
    res.status(200).json(data)
}