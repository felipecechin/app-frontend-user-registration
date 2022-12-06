import { NextApiRequest, NextApiResponse } from 'next'

import { getToken } from '@/utils/cookies'

interface IResponseSuccess {
    data: string
}

interface IResponseError {
    message: string
    status: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResponseSuccess | IResponseError>
): Promise<void> {
    const token = getToken(req)
    if (token) {
        return res.json({ data: token })
    }
    return res.status(401).json({
        message: 'Unauthorized',
        status: 401,
    })
}
