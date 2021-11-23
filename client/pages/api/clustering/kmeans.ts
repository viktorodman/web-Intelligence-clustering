import type { NextApiRequest, NextApiResponse } from 'next'
import { readBlogsFromFile } from '../../../utils/file-reader'
import { kMeansClustering } from '../../../utils/k-means-clustering'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const data = await kMeansClustering()
    res.status(200).json({ name: 'K-means' })
}