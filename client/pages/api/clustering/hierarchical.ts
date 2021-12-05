import type { NextApiRequest, NextApiResponse } from 'next'
import { HierarchicalResult } from '../../../types/cluster';
import { createHierarchicalCluster } from '../../../utils/hierarchical-clustering';



export default async function handler(req: NextApiRequest, res: NextApiResponse<HierarchicalResult>) {
    console.time("dbsave");
    const data = await createHierarchicalCluster()
    console.timeEnd("dbsave")
    res.status(200).json(data)
}