import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Banner } from './Banner';


const JobPost = () => {
  const [auth, setAuth] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const descriptionRef = useRef(null);
  const jobIdRef = useRef(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title ||
      !location ||
      !type || !jobId) {
        alert('Please enter all required fields');
        return;
    }
 
    try {
      setLoading(true);
      const jobPostData = {
        title,
        location,
        type,
        jobId: jobIdRef.current.value,
        description: descriptionRef.current.value,
        timeStamp: new Date().toLocaleString(),
      };
      await setDoc(doc(db, "jobPostingToFirestore", jobIdRef.current.value), jobPostData);
    } catch (error) {
      console.log("Error posting job:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }

    // Reset form fields after submission
    setTitle('');
    setType('');
    setLocation('');
    descriptionRef.current.value = "";
    jobIdRef.current.value = "";
    alert("Job posted successfully.")
  };
  if (!auth) {
    return <Security auth setAuth={setAuth}/>
  }
  else return (
    <div>
      <Banner desc={false} />
      <form className='form_job_post'>
        <div className='form_inputs'>
          {/* Job Title Field */}
          <div className="form_group">
            <label htmlFor="job_title">
              Job Title:
            </label>
            <input
              id="job_title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the job title"
              required
            />
          </div>

          {/* Location Field */}
          <div className="form_group">
            <label htmlFor="location">
              Location:
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the job location"
              required
            />
          </div>

          {/* Type Field */}
          <div className="form_group">
            <label htmlFor="job_type">
              Type:
            </label>
            <input
              id="job_type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g., Full-time, Part-time"
              required
            />
          </div>

          {/* Job ID Field */}
          <div className="form_group">
            <label htmlFor="job_id">
              Job ID:
            </label>
            <input
              id="job_id"
              type="text"
              ref={jobIdRef}
              placeholder="Auto-generated or custom"
              required
            />
          </div>
        </div>
        <ReactQuill style={{ width: "70vw", minHeight: "20vh", marginBottom: "2rem", color: "white" }} defaultValue='Job description goes here...' ref={descriptionRef} />
        <button onClick={handleSubmit} type='submit'
          disabled={loading}
        >
          {
            loading ? "Please wait..." : "Submit Job Posting"
          }
        </button>
      </form>
    </div>
  );
};

export default JobPost;

const Security = ({setAuth}) => {
  const [pass, setPass] = useState('')
  return (
    <div className='h-screen w-full flex items-center justify-center text-black'>
      <div className='flex gap-2 items-center'>
        <label htmlFor="job_type">
          Password:
        </label>
        <input
          id="job_type"
          type="password"
          className='px-2 p-1 rounded'
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            if (pass== import.meta.env.VITE_ADMIN_PASSWORD) setAuth(true);
          }}
          placeholder="Password"
          required
        />
      </div>
    </div>
  )
}