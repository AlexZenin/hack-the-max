import { NextApiRequest, NextApiResponse } from 'next'

const allowCors =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

function handler(_, res: NextApiResponse) {
  res.status(200).json(DUMMY_DATA)
}

export default allowCors(handler)

const DUMMY_DATA = [
  {
    name: 'John',
    accountName: 'ABC Plumbing',
    accountNumber: '3133569',
    imgSrc:
      'https://guess-who-hackathon.s3.ap-southeast-2.amazonaws.com/1659376825003.jpeg',
    location: {
      lat: -37.83001846475084,
      lng: 144.99322631118585,
    },
  },
  {
    name: 'John',
    accountName: 'Blue Plumbing',
    accountNumber: '3133569',
    imgSrc:
      'https://guess-who-hackathon.s3.ap-southeast-2.amazonaws.com/Screen+Shot+2022-09-14+at+7.32.09+pm.png',
    location: {
      lat: -37.83001846475084,
      lng: 144.99322631118585,
    },
  },
  {
    name: 'John',
    accountName: 'Quick Plumbing',
    accountNumber: '3133569',
    imgSrc:
      'https://guess-who-hackathon.s3.ap-southeast-2.amazonaws.com/debugmeme.jpeg',
    location: {
      lat: -37.83001846475084,
      lng: 144.99322631118585,
    },
  },
  {
    name: 'John',
    accountName: 'Shit Plumbing',
    accountNumber: '3133569',
    imgSrc:
      'https://trsuat08.reecenet.org/point-of-sale/static/media/reece-logo.2f37b2d6.svg',
    location: {
      lat: -37.83001846475084,
      lng: 144.99322631118585,
    },
  },
  {
    name: 'John',
    accountName: 'BBC Plumbing',
    accountNumber: '3133569',
    imgSrc:
      'https://guess-who-hackathon.s3.ap-southeast-2.amazonaws.com/kanye.jpeg',
    location: {
      lat: -37.83001846475084,
      lng: 144.99322631118585,
    },
  },
]
