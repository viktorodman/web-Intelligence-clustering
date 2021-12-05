import type { NextApiRequest, NextApiResponse } from 'next'
import { HierarchicalResult } from '../../../types/cluster';
import { createHierarchicalCluster } from '../../../utils/hierarchical-clustering';



export default async function handler(req: NextApiRequest, res: NextApiResponse<HierarchicalResult>) {
    console.time("hierarchical-calc-time:");
    const data = await createHierarchicalCluster()
    console.timeEnd("hierarchical-calc-time:")
    res.status(200).json(data)
}