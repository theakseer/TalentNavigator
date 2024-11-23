import React from 'react'
import { Link } from 'react-router-dom'

const JobRow = ({ job }) => {

    const timestamp = new Date(job.timeStamp) // Convert Firestore timestamp to JavaScript Date

    // Format the date to mm/dd/yyyy
    const formattedDate = timestamp.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
    // console.log(job)
    return (
        <>
            <tr id="trBY4530" role="row">
                <td className="pos_title sorting_1">
                    <Link to={{
                    pathname: `job/${job.id}`,  // The path you want to navigate to
                    state: job
                }} className="pos_title">{job.title}</Link></td>
                <td>{job.location}</td>
                <td >Health Science</td>
                <td >{job.type}</td>
                <td >{formattedDate}</td>

            </tr>
        </>
    )
}

export default JobRow