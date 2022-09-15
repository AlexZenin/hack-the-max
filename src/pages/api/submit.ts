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

  console.log(JSON.stringify(req.body))
  let body
   // we need to convert this back to json as req.body is coming as a string
  if (typeof req.body === 'string') {
    body = JSON.parse(req.body)
  } else {
    body = req.body
  }

  const currentTime = Date.now()

  const location: Location = {
    lat: String(body.location.lat),
    lng: String(body.location.lng),
    timestamp: String(currentTime),
  }

  interface Location {
    lat: string
    lng: string
    timestamp: string 
  }
  interface PostedData {
    name: string
    accountName?: string
    accountNumber?: string
    phoneNumber?: string
    imageURL?: string
    location?: Location
  }

  // Generate a random id to store the survey entry under
  const id = String(body.email)

  // Insert data into Upstash redis
  try {

    // retrieve if it exists
    const profile = await redis.hgetall(`entries:${id}`)
    let updatedProfile: any
    if(profile != null) {
      updatedProfile = {
        name: String(body.email),
        accountName: body.accountName  === undefined ? String(profile.accountName) : String(body.accountName),
        accountNumber: body.accountNumber  === undefined ? String(profile.accountNumber) : String(body.accountNumber),
        phoneNumber: body.phoneNumber  === undefined ? String(profile.phoneNumber) : String(body.phoneNumber),
        imageURL: body.imageURL  === undefined ? String(profile.imageURL) : String(body.imageURL),
        location: location,
      }
    } else {
      updatedProfile =   {
          name: String(body.email),
          accountName: String(body.accountName),
          accountNumber: String(body.accountNumber),
          phoneNumber: String(body.phoneNumber),
          imageURL: String(body.imageURL),
          location: location,
      }
    }
    console.log(JSON.stringify(updatedProfile))
    //Store the survey data
    await redis.hset(`entries:${id}`, updatedProfile)

    //Set default expire time to 600 seconds
    // await redis.expire(`entries:${id}`, 600)

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
