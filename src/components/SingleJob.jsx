import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { jobStore } from '../lib/jobStore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import JobApplication from './JobApplication'

const SingleJob = () => {
  const { Jobs } = jobStore()
  const { jobId } = useParams()

  const [currentJob, setCurrentJob] = useState({})
  useEffect(() => {
    const fetchCurentJob = async () => {
      const docRef = doc(db, "jobPostingToFirestore", jobId);
      const docSnap = await getDoc(docRef);
      setCurrentJob(docSnap.data())
    }
    fetchCurentJob()
  }, [])
  return (
    <div className='job_page'>
      <div className='header'>
        <div className="img-container">
          <Link to={`/`}>
          <img src="/talentnavigator.jpeg" alt="" />
          </Link>
        </div>
      </div>
      {currentJob ? (<h2 className='text-2xl md:text-3xl md:text-right'>{`${currentJob?.title} in ${currentJob?.location}`}</h2>) : ( <h2>This position has be put on hold.</h2> )}
      <hr />
      <br />
      <div className="float_right spacer_10">
        <a data-role="none" href="#jobs_form">
          {currentJob && <button type="button" className="ui-button apply_btn">Apply Now</button>}
        </a>
      </div>
      <br />
     {currentJob && (<div className="job_listing" dangerouslySetInnerHTML={{__html:currentJob.description}}></div>)  } 
      <hr />
      <div className="jobs_careers_link">
        <br id='jobs_form'/>
        Visit <Link to='/'> Carees </Link> at Talent Navigator</div>
        <br />
        <JobApplication />
    </div>
  )
}

export default SingleJob