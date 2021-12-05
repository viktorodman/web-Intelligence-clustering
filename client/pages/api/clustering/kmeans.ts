import type { NextApiRequest, NextApiResponse } from 'next'
import { ClusterResult } from '../../../types/cluster-result'
import { kMeansClustering } from '../../../utils/k-means-clustering'


export default async function handler(req: NextApiRequest, res: NextApiResponse<ClusterResult[]>) {
    console.time("kmeans-calc-time:");
    const data = await kMeansClustering()
    console.timeEnd("kmeans-calc-time:")
    res.status(200).json(data)
}