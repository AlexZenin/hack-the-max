// pages/api/results.js
import { NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'
import { allowCors } from '../../utils/allowCors'

const resultsHandler = async (_, res: NextApiResponse) => {
  // Retrieve data from redis

  const redis = new Redis({
    url: 'https://us1-better-ox-38374.upstash.io',
    token:
      'AZXmASQgZDIwZmYxNTgtYTU3Yi00OGIxLWJjZGEtY2ZhYjkxZmUxZTViMjRkMmFjNzgxNmQzNDdiYzg0ODdlMmQwMzcwODUxMzc=',
  })

  console.log('request received')
  try {
    //Find all the entries in the set
    const entries = await redis.smembers('entries')

    //Get all survey entries by id/key

    //To run multiple queries at once, Upstash supports the use of the pipeline command. This way we can run multiple queries at once and get the results in a single call.
    const p = redis.pipeline()
    entries.forEach((id) => {
      p.hgetall(id)
    })
    const results = await p.exec()

    return res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      userProfiles: results,
    })
  } catch (error) {
    console.error('Failed to retrieve data from redis', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve data from redis',
    })
  }
}

export default allowCors(resultsHandler)
