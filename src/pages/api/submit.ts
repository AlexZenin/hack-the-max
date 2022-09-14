import { NextApiRequest, NextApiResponse } from 'next'
// pages/api/submit.js

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://apn1-unique-rabbit-33775.upstash.io',
  token:
    'AYPvASQgOTJhOThiOTctMGU0Mi00MmJiLWFjY2YtNGExNWZlOGM4MGE1OWU0YmZkNDkxOGJlNDhkNGJkNjI5MGI4MDdhZTAzMTk=',
})

const submitHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  console.log(JSON.stringify(req.body))

  // Prepare data to be inserted into the DB
  const data = {
    email: String(body.email) || '',
    customerNumber: String(body.customerNumber) || '',
    company: String(body.company) || 'Your Company',
    imageURL: String(body.imageURL) || '',
  }

  // Generate a random id to store the survey entry under
  const id = String(body.email)

  // Insert data into Upstash redis
  try {
    //Store the survey data
    await redis.hset(`entries:${id}`, data)

    //Store the id of the survey to retrieve it later
    // await redis.sadd("entries", `entries:${id}`);
  } catch (error) {
    console.error('Failed to insert data into redis', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to insert data into redis',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Data inserted successfully',
  })
}

export default submitHandler
