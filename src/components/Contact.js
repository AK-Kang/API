import {useRef} from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
        const form = useRef()

        const sendEmail = (e) => {
            e.preventDefault();
        
            emailjs.sendForm('service_erxj56m', 'template_l1xp0el', form.current, '-Q2QvsXyxMvz94RKa')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                }
                );
                e.target.reset()
        };
        

    return(
        <section>
            <div>
                <h2>
                    Enter your information
                </h2>
                <form ref = {form} onSubmit={sendEmail}>
                    <input type="text"
                    placeholder="First Name"
                    name="firstName" required/>
                    <input type="text"
                    placeholder="Last Name"
                    name="lastName" required/>
                    <input type="Gender"
                    placeholder="gender"
                    name="gender" required/>
                    <input type="date"
                    placeholder="Date of Birth"
                    name="dob" required/>
                    <input type="email"
                    placeholder="email"
                    name="email" required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default Contact