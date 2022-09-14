import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'

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
