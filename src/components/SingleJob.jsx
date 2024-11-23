import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import JobApplication from './JobApplication'

const SingleJob = () => {
  const { jobId } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [currentJob, setCurrentJob] = useState({})
  useEffect(() => {
    var fetchCurentJob = async () => {
      setLoading(true)
      try {
        const docRef = doc(db, "jobPostingToFirestore", jobId);
        const docSnap = await getDoc(docRef);
        setCurrentJob(docSnap.data())
        console.log(`Job`)
      } catch (error) {
        setError(error);
        console.log("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCurentJob()
  },[])
  if (currentJob?.title!==undefined) {
    document.title = `${currentJob.title} in ${currentJob.location}`
  }
  return (
    <div className='job_page'>
      <div className='header'>
        <div className="img-container">
          <Link to={`/`}>
            <img src="/talentnavigator.jpeg" className='w-36 md:w-52' alt="logo" />
          </Link>
        </div>
      </div>
      <h2 className='text-2xl md:text-3xl md:text-center mt-2'>
        {loading
          ? 'Please wait...'
          : error
          ? "Something went wrong."
          : currentJob
              ? <div className='md:text-right'>{currentJob.title} in {currentJob.location}</div>
              : 'This position has been put on hold.'}
      </h2> 
      <hr />
      <br />
      <div>
        <a data-role="none" href="#jobs_form">
          {currentJob && <button type="button" className="ui-button  float-right apply_btn">Apply Now</button>}
        </a>
      </div>
      <br />
      <br /> 
      <br /> 
      {currentJob && (<div className="job_listing" dangerouslySetInnerHTML={{ __html: currentJob.description }}></div>)}
      <hr />
      <div className="jobs_careers_link">
        <br id='jobs_form' />
        Visit <Link to='/'> Carees </Link> at Talent Navigator</div>
      <br />
      <JobApplication />
    </div>
  )
}

export default SingleJob