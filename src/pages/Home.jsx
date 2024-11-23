import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import JobRow from '../components/JobRow'
import { jobStore } from '../lib/jobStore'
import { Link } from 'react-router-dom'

/* 
[
job1 : {
jobid,
title,
location,
description,
times
},
]
*/

const Home = () => {
  const { Jobs, setJobsArray } = jobStore()
  useEffect(() => {
    const testFirestoreConnection = async () => {
      const collectionOneSnapshot = await getDocs(collection(db, "jobPostingToFirestore"));
      const collectionDocs = collectionOneSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobsArray(collectionDocs)
    };
    testFirestoreConnection();
  }, [])
  return (
    <>
      <div className="md:max-w-6xl">
        <Banner />
        <br />
        <br />
      </div>
      <div className="flex max-w-6xl w-full">
        <table className="job-table">
          <thead>
            <tr className=''>
              <th><div className="dataTables_sizing" >Job Title</div></th>
              <th><div className="dataTables_sizing" >Location</div></th>
              <th><div className="dataTables_sizing" >Department</div></th>
              <th><div className="dataTables_sizing" >Type</div></th>
              <th><div className="dataTables_sizing" >Opened</div></th>
            </tr>
          </thead>
          <tbody>
            {
              Jobs.map((job, i) => (
                <JobRow job={job} key={i} />
              ))
            }
          </tbody>
        </table>
      </div>
      <br />
      <HomeFooter />
    </>
  )
}

export default Home

const HomeFooter = () => {
  return (
    <footer style={{ textAlign: "center" }}>
      <p>
        If we don't currently have an open position in your area, you may submit a <Link href='#'>Resume</Link>
      </p>
      <p>Check the <Link to={"#"}>status</Link> of any position(s) you applied for
      </p>
    </footer>
  )
}