import { NextApiResponse } from 'next'
// pages/api/results.js

import { Redis } from '@upstash/redis'

const resultsHandler = async (_, res: NextApiResponse) => {
  // Retrieve data from redis

  const redis = new Redis({
    url: 'https://apn1-unique-rabbit-33775.upstash.io',
    token:
      'AYPvASQgOTJhOThiOTctMGU0Mi00MmJiLWFjY2YtNGExNWZlOGM4MGE1OWU0YmZkNDkxOGJlNDhkNGJkNjI5MGI4MDdhZTAzMTk=',
  })

  console.log('request received')
  try {
    //Find all the entries in the set
    // const entries = await redis.smembers("entries");

    //Get all survey entries by id/key

    //To run multiple queries at once, Upstash supports the use of the pipeline command. This way we can run multiple queries at once and get the results in a single call.
    // const p = redis.pipeline();
    // entries.forEach((id) => {
    //   p.hgetall(id);
    // });
    // const results = await p.exec();
    console.log('request received')
    const results = await redis.get('pos1')

    return res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: results,
    })
  } catch (error) {
    console.error('Failed to retrieve data from redis', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve data from redis',
    })
  }
}

export default resultsHandler
