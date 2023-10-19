import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000', formData);
        console.log(response.data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                <div>
                    Gender:
                    <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                    <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                </div>
                <div>
                    Date of Birth: 
                    <input type="date" name="dob" onChange={handleChange} />
                </div>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
