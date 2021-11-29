import type { NextApiRequest, NextApiResponse } from 'next'
import { Cluster } from '../../../types/cluster'
import { kMeansClustering } from '../../../utils/k-means-clustering'


export default async function handler(req: NextApiRequest, res: NextApiResponse<Cluster[]>) {
    console.time("dbsave");
    const data = await kMeansClustering()
    console.timeEnd("dbsave")
    res.status(200).json(data)
}