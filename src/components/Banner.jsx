import React from 'react'

export const Banner = () => {
  return (
    <div className="banner">
        <div className='header'>
            <div className="img-container">
                <img src="/talentnavigator.jpeg" alt="" />
            </div>
            <h2 className='text-center md:text-left text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>TalentNavigator</h2>
        </div>
    <hr />
    <h1 className='text-center text-4xl mt-4'>Empowering Your Hiring Journey with Efficiency and Insight</h1>
    <p className='text-center md:text-left mt-4'>Welcome to our Applicant Management System, where finding and managing top talent is streamlined and effortless. Our platform provides a seamless experience for tracking job openings, reviewing applications, and making informed hiring decisions. Whether you’re a small startup or a large enterprise, we offer intuitive tools and powerful insights to enhance your recruitment process. Discover how easy and efficient managing your hiring can be with us today!</p>
  </div>
  )
}
