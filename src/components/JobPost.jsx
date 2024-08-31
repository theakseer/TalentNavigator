import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const JobPost = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const descriptionRef = useRef(null);
  const jobId = useRef(null);
  

  const handleSubmit = async (event) => {
    // Save the content to Firestore
    // await saveJobPostingToFirestore(content);
    event.preventDefault();

    // Gather all the form data into an object
    const jobPostData = {
      title,
      location,
      type,
      jobId: jobId.current.value,
      description: descriptionRef.current.value,
      timeStamp: new Date().toLocaleString(),
    };  
    console.log("Job Post", jobPostData)
    try {
      await setDoc(doc(db, "jobPostingToFirestore", jobId.current.value), jobPostData);
      console.log("done")
    } catch (error) {
      console.log(error);
    }
    // Perform other actions, such as sending the data to a server or saving to a database

    // Reset form fields after submission
    setTitle('');
    setType('');
    setLocation('');
    descriptionRef.current.value = "";

  };

  // handleDescripChange

  return (
    <div>
      <form className='form_job_post'>
      <div>
        <label>
          Job Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          JobId:
          <input
            type="text"
            ref={jobId}
            required
          />
        </label>
      </div>
      <div id='editor'></div>
      <ReactQuill style={{ width: "70vw", minHeight: "20vh", marginBottom: "2rem", color:"white"}}  defaultValue='Job description goes here...' ref={descriptionRef} />
      <button onClick={handleSubmit}>Submit Job Posting</button>
      </form>
    </div>
  );
};

export default JobPost;
