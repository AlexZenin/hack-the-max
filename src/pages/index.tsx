import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import handler from './api/s3/uploadFile'
import { NextApiRequest, NextApiResponse } from 'next'
import handleUpload from './api/s3/uploadFile'
import _default from 'next/dist/client/router'
import { any } from 'zod'

const BUCKET_URL = "https://guess-who-hackathon.s3.ap-southeast-2.amazonaws.com/";
//^add the key name to get the photo. eg. puppy.png

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
  function handleSubmit(e: any) {
    e.preventDefault()
    const { username, password } = e.target.elements
    console.log(
      JSON.stringify({ username: username.value, password: password.value }),
    )
    //go to my uploadFile class.
    axios.post('/api/s3/uploadFile', e.target.elements.file);
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
            id="username"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
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
            placeholder="friends@reece.com"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="mobile"
            htmlFor="mobile"
          >
            Mobile
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobile"
            type="number"
            placeholder="0410 000 000"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="password"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          {/* <p className="text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-7">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2"
            id="image"
            htmlFor="image"
            >
              Image
          </label>
          <input 
            id="image"
            type = "file"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  )
}