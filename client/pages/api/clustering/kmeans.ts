import type { NextApiRequest, NextApiResponse } from 'next'
import { Cluster } from '../../../types/cluster'
import { kMeansClustering } from '../../../utils/k-means-clustering'


export default async function handler(req: NextApiRequest, res: NextApiResponse<Cluster[]>) {
    const data = await kMeansClustering()
    res.status(200).json(data)
}