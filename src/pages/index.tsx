import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders'

const BUCKET_URL =
  'https://guess-who-hackathon.s3.ap-southeast-2.amazonaws.com/'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Guess Who</title>
        <meta
          name="description"
          content="Enter your profile to make your Reece experience smoother"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignupForm />
    </>
  )
}

export default Home

const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('init')
  // const [imageUrl, imageUrl] = useState<any>()
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [uploadingStatus, setUploadingStatus] = useState<any>()
  const [coordinate, setCoordinate] = useState({
    lat: 0,
    long: 0,
  })

  useEffect(() => {
    //get the email from session storage and if exists, set it to the email field
    const alreadyAddedEmail = sessionStorage.getItem('email')
    if (alreadyAddedEmail) {
      ;(document.getElementById('email') as HTMLInputElement).value =
        alreadyAddedEmail
      console.log(' alreadyAddedEmail - ', alreadyAddedEmail)
    }

    const geoId = window.navigator.geolocation.watchPosition((position) => {
      setCoordinate({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      })
    })

    return () => {
      navigator.geolocation.clearWatch(geoId)
    }
  })

  function selectFile(e: any) {
    const file = e.target.files[0]
    uploadFile(file)
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    const { name, email, company } = e.target.elements
    console.log(
      JSON.stringify({
        name: name.value,
        email: email.value,
        company: company.value,
      }),
    )
    // uploadFile()
    setLoading(true)
    // save email in session storage
    sessionStorage.setItem('email', email.value)
    // fetch('/api/user')
    //   .then(() => {
    //     setStatus('success')
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }

  const uploadFile = async (file) => {
    //for ux info
    setUploadingStatus('Uploading the file to AWS S3')

    //post req to own endpoint to get aws fancy url ting
    const { data } = await axios.post('/api/s3/uploadFile', {
      name: file.name,
      type: file.type,
    })

    //what did we get
    console.log(data)

    //get the url
    const url = data.url

    //upload the file
    const { data: newData } = await axios.put(url, file, {
      headers: {
        'Content-type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    })

    setUploadedFile(BUCKET_URL + file.name)
    console.log(uploadedFile)
    setFile(null)
  }

  return (
    <div className="max-w-lg mx-[auto] h-screen">
      <div className="flex flex-col items-center bg-gradient-to-r from-[#003057] to-[#347EB7] h-2/6">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto"
        >
          <g clipPath="url(#clip0_14_937)">
            <path
              d="M80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"
              fill="white"
              fillOpacity="0.3"
            />
            <path
              d="M79.9999 79.9998C96.0663 79.9998 109.091 66.9754 109.091 50.9089C109.091 34.8425 96.0663 21.818 79.9999 21.818C63.9334 21.818 50.9089 34.8425 50.9089 50.9089C50.9089 66.9754 63.9334 79.9998 79.9999 79.9998Z"
              fill="white"
            />
            <path
              d="M95.3769 92.4675H64.7275C45.7145 92.4675 30.1301 108.052 30.1301 127.065V139.013C30.1301 140.26 30.234 141.506 30.3379 142.753C43.9483 153.558 61.1951 160 80.0003 160C98.8055 160 116.052 153.558 129.663 142.649C129.766 141.403 129.87 140.156 129.87 138.909V126.961C129.87 108.052 114.286 92.4675 95.3769 92.4675Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_14_937">
              <rect width="160" height="160" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="relative text-xs left-2 -top-16 w-20">{`Upload your photo`}</div>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-32 right-24"
        >
          <g filter="url(#filter0_d_14_944)">
            <circle cx="28" cy="24" r="24" fill="white" />
            <g clipPath="url(#clip0_14_944)">
              <path
                d="M28 28.2C29.7674 28.2 31.2 26.7673 31.2 25C31.2 23.2327 29.7674 21.8 28 21.8C26.2327 21.8 24.8 23.2327 24.8 25C24.8 26.7673 26.2327 28.2 28 28.2Z"
                fill="black"
              />
              <path
                d="M25 15L23.17 17H20C18.9 17 18 17.9 18 19V31C18 32.1 18.9 33 20 33H36C37.1 33 38 32.1 38 31V19C38 17.9 37.1 17 36 17H32.83L31 15H25ZM28 30C25.24 30 23 27.76 23 25C23 22.24 25.24 20 28 20C30.76 20 33 22.24 33 25C33 27.76 30.76 30 28 30Z"
                fill="black"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_14_944"
              x="0"
              y="0"
              width="56"
              height="56"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_14_944"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_14_944"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_14_944">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(16 13)"
              />
            </clipPath>
          </defs>
        </svg>
        <h1 className="text-white font-bold text-xl py-3">{`Welcome to guess who!`}</h1>
      </div>
      <form
        className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 h-4/6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <div className="mx-auto w-64 text-center ">
            <div className="relative w-64"></div>
          </div>
          <h2 className="font-bold text-lg py-3">Create your account</h2>
          <div className="text-base pt-2 pb-8">{`Create your account here. Don't forget, the most creative profile photo will win a prize`}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="name"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="company"
            htmlFor="company"
          >
            Company
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            type="text"
            placeholder="ABC Plumbing"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="example@reece.com"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          {/* preloader button */}
          {loading && status === 'init' && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-full justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2C20.6274 2 26 7.37258 26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 11.3321 2.87062 8.86758 4.34324 6.875"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          {!loading && status === 'init' && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-full justify-center">
              <span>Opt In</span>
            </button>
          )}
        </div>

        {status === 'success' && (
          <div className="flex items-center justify-between mb-4">
            {/* success button */}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center w-full justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 8.5H17V6.5C17 3.74 14.76 1.5 12 1.5C9.24 1.5 7 3.74 7 6.5V8.5H6C4.9 8.5 4 9.4 4 10.5V20.5C4 21.6 4.9 22.5 6 22.5H18C19.1 22.5 20 21.6 20 20.5V10.5C20 9.4 19.1 8.5 18 8.5ZM12 17.5C10.9 17.5 10 16.6 10 15.5C10 14.4 10.9 13.5 12 13.5C13.1 13.5 14 14.4 14 15.5C14 16.6 13.1 17.5 12 17.5ZM9 6.5V8.5H15V6.5C15 4.84 13.66 3.5 12 3.5C10.34 3.5 9 4.84 9 6.5Z"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="container flew items-center p-4 mx-auto min-h screen justify-center">
          <main>
            <p>Please select an image to upload so that we can identify you!</p>
            <input type="file" onChange={(e) => selectFile(e)} />
          </main>
        </div>
        <div className="flex items-center justify-between text-xs text-center mb-4">
          {`By opting in to guess who you will be providing your phone's location data when the web page is open`}
        </div>
      </form>
      <img src={uploadedFile} />
    </div>
  )
}
