import React from 'react'
import { Link } from 'react-router-dom'

export const Banner = () => {
  return (
    <div className="banner max-w-7xl">
        <div className='flex flex-col md:flex-row w-full justify-between gap-3 md:items-center my-5'>
            <div className="img-container">
              <Link to={`/`}>
                <img src="/talentnavigator.jpeg" className='w-36 md:w-52' alt="" />
              </Link>
            </div>
            <h2 className='md:text-center text-left  text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>TalentNavigator</h2>
        </div>
    <hr />
    <h1 className='text-2xl font-bold mt-4'>Empowering Your Hiring Journey with Efficiency and Insight</h1>
    <p className='md:text-left text-justify mt-4'>Welcome to our Applicant Management System, where finding and managing top talent is streamlined and effortless. Our platform provides a seamless experience for tracking job openings, reviewing applications, and making informed hiring decisions. Whether you’re a small startup or a large enterprise, we offer intuitive tools and powerful insights to enhance your recruitment process. Discover how easy and efficient managing your hiring can be with us today!</p>
  </div>
  )
}
