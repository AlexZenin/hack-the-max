// pages/api/submit.js
import { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'
import { allowCors } from '../../utils/allowCors'

const redis = new Redis({
  url: 'https://apn1-unique-rabbit-33775.upstash.io',
  token:
    'AYPvASQgOTJhOThiOTctMGU0Mi00MmJiLWFjY2YtNGExNWZlOGM4MGE1OWU0YmZkNDkxOGJlNDhkNGJkNjI5MGI4MDdhZTAzMTk=',
})

const submitHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  console.log(JSON.stringify(req.body))

  const dateTime = Date.now()

  const location = {
    lat: String(body.location.lat) || '',
    lng: String(body.location.lng) || '',
    timestamp: dateTime || '',
  }

  const data = {
    name: String(body.email),
    accountName: String(body.accountName) || '',
    accountNumber: String(body.accountNumber) || '',
    phoneNumber: String(body.phoneNumber) || 'N/A',
    imageURL: String(body.imageURL) || '',
    location: location,
  }

  console.log(JSON.stringify(data))
  // Generate a random id to store the survey entry under
  const id = String(body.email)

  // Insert data into Upstash redis
  try {
    //Store the survey data
    await redis.hset(`entries:${id}`, data)

    //Store the id of the survey to retrieve it later
    await redis.sadd('entries', `entries:${id}`)
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

export default allowCors(submitHandler)
