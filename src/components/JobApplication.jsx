import React, { useState } from 'react';
import './JobApplication.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function JobApplication() {
    const [file, setFile] = useState(null);
    const [laoding, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');


    const { jobId } = useParams()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        availability: '',
        reasonForLooking: '',
        certifications: '',
        desiredCompensation: '',
        resumeURL: fileUrl,
        callTimes: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const callTimes = checked
                ? [...prevState.callTimes, value]
                : prevState.callTimes.filter((time) => time !== value);
            return { ...prevState, callTimes };
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
        console.log(selectedFile)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first');
            return;
        }
        setLoading(true);
        const fileRef = ref(storage, `resumes/TAM//${jobId}/${file.name}`);
        try {
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setFileUrl(downloadURL);
            await updateDoc(doc(db, "JobApplicants", `${jobId}_applicants`), {
                applicants: arrayUnion({
                    id: uuid(),
                    ...formData,
                    resumeURL: downloadURL,
                    date: Timestamp.now(),
                }),
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            return alert("Something went wrong.")
        }
        setLoading(false);
        alert("Applicantion submitted successfully")
        setFormData({
            fullName: '',
            email: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
            availability: '',
            reasonForLooking: '',
            certifications: '',
            desiredCompensation: '',
            resumeURL: fileUrl,
            callTimes: [],
        })
        setFile(null)
    };

    return (
        <form onSubmit={handleSubmit} className="application_form">
            <span>{fileUrl}</span>
            <span>{laoding}</span>
            <table className="formTable">
                <tbody>
                    <tr>
                        <td className="labelStyle">Full Name</td>
                        <td>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="labelStyle">Email</td>
                        <td>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">City</td>
                        <td>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">State</td>
                        <td>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="labelStyle">Zip Code</td>
                        <td>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">Phone Number</td>
                        <td>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">Attach your Resume</td>
                        <td>
                            <input
                                type="file"
                                name="resume"
                                onChange={handleFileChange}
                                className="fileInputStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">What is your availability to start a new position?</td>
                        <td>
                            <textarea
                                name="availability"
                                value={formData.availability}
                                onChange={handleInputChange}
                                className="textareaStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">Why are you looking for a new opportunity?</td>
                        <td>
                            <textarea
                                name="reasonForLooking"
                                value={formData.reasonForLooking}
                                onChange={handleInputChange}
                                className="textareaStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">List all certifications and licenses that you currently possess.</td>
                        <td>
                            <textarea
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleInputChange}
                                className="textareaStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">Desired compensation?</td>
                        <td>
                            <input
                                type="text"
                                name="desiredCompensation"
                                value={formData.desiredCompensation}
                                onChange={handleInputChange}
                                className="inputStyle"
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="labelStyle">
                            If we contact you for a phone screen, when should we call? (Pick as many slots as you wish)
                        </td>
                        <td className="checkboxContainer">
                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    name="callTimes"
                                    value="8am to 11am"
                                    checked={formData.callTimes.includes("8am to 11am")}
                                    onChange={handleCheckboxChange}
                                    className="checkboxStyle"
                                />
                                8am to 11am
                            </label>
                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    name="callTimes"
                                    value="11am to 3pm"
                                    checked={formData.callTimes.includes("11am to 3pm")}
                                    onChange={handleCheckboxChange}
                                    className="checkboxStyle"
                                />
                                11am to 3pm
                            </label>
                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    name="callTimes"
                                    value="3pm to 6pm"
                                    checked={formData.callTimes.includes("3pm to 6pm")}
                                    onChange={handleCheckboxChange}
                                    className="checkboxStyle"
                                />
                                3pm to 6pm
                            </label>
                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    name="callTimes"
                                    value="6pm to 8pm"
                                    checked={formData.callTimes.includes("6pm to 8pm")}
                                    onChange={handleCheckboxChange}
                                    className="checkboxStyle"
                                />
                                6pm to 8pm
                            </label>
                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    name="callTimes"
                                    value="Any of these times"
                                    checked={formData.callTimes.includes("Any of these times")}
                                    onChange={handleCheckboxChange}
                                    className="checkboxStyle"
                                />
                                Any of these times
                            </label>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" className='text-center'>
                            <button type="submit" className="float-left md:float-none mt-2 px-10"
                                disabled={laoding}
                            >
                                {
                                    laoding ? "Submitting..." : "Apply"
                                }
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

    );
}

export default JobApplication;