import { NextApiRequest, NextApiResponse } from 'next'

import { getToken } from '@/utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>): Promise<void> {
    const token = getToken(req)
    if (token) {
        return res.json(token)
    }
    return res.status(401).json('Unauthorized')
}
