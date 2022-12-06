import { NextApiRequest, NextApiResponse } from 'next'

import FetchError from '@/utils/FetchError'
import fetcher from '@/utils/fetcher'
import { storeToken } from '@/utils/cookies'

interface IResponseSignin {
    access_token: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        try {
            const result: IResponseSignin = await fetcher({
                method: 'POST',
                url: '/user/login',
                data: {
                    email: req.body.email,
                    password: req.body.password,
                },
            })
            storeToken(res, result.access_token)
            return res.json({ data: result.access_token, errors: [] })
        } catch (e) {
            if (e instanceof FetchError) {
                return res.status(e.status).json(e.data)
            }
            return res.status(500).json({
                message: 'Unkown error',
            })
        }
    }
}
