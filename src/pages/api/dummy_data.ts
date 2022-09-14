import { NextApiResponse } from 'next'

export default function handler(_, res: NextApiResponse) {
  res.status(200).json(DUMMY_DATA)
}

const DUMMY_DATA = [
  {
    name: 'John',
    accountName: 'ABC Plumbing',
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
    accountName: 'Blue Plumbing',
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
    accountName: 'Quick Plumbing',
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
      'https://trsuat08.reecenet.org/point-of-sale/static/media/reece-logo.2f37b2d6.svg',
    location: {
      lat: -37.83001846475084,
      lng: 144.99322631118585,
    },
  },
]