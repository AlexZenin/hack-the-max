import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

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
  const [file, setFile] = useState<any>()
  const [uploadingStatus, setUploadingStatus] = useState<any>()
  const [uploadedFile, setUploadedFile] = useState<any>()

  function selectFile(e: any) {
    console.log(e.target.files)
    setFile(e.target.files[0])
    console.log(file)
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
    uploadFile()
    setLoading(true)
    fetch('/api/user')
      .then(() => {
        setStatus('success')
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const uploadFile = async () => {
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
    setFile(null)
  }

  return (
    <div className="max-w-lg mx-[auto] pt-4">
      <form
        className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
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
          {/* <p className="text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="container flew items-center p-4 mx-auto min-h screen justify-center">
          <main>
            <p>Please select an image to upload so that we can identify you!</p>
            <input type="file" onChange={(e) => selectFile(e)} />
          </main>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            {loading ? <p>Spinner</p> : <p>Opt In</p>}
          </button>
        </div>
      </form>
    </div>
  )
}
