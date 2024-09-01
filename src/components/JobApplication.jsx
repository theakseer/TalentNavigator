import React, { useState } from 'react';
import './JobApplication.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

function JobApplication() {
  const { jobId } = useParams()
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        resume: null,
        availability: '',
        reasonForLooking: '',
        certifications: '',
        desiredCompensation: '',
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
        setFormData({
            ...formData,
            resume: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send the data to a server
        console.log('Form data:', formData);
        try {
            // await setDoc(doc(db, "JobApplicants", `${jobId.current.value}`), jobPostData);
            console.log("done")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="application_form">
            <table className="formTable">
                <tbody>
                    <tr>
                        <td className="labelStyle">Full Name</td>
                        <td>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
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
                        <td colSpan="2" style={{ textAlign: 'center' }}>
                            <button type="submit" className="buttonStyle">Apply</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

    );
}

export default JobApplication;