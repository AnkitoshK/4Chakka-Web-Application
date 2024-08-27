import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCall } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./ContactUs.module.css";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [services, setServices] = useState([]);
    const [pageData, setPageData] = useState({ title: "", description: "" });
    const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/services/');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchPageData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/contact_us_page/');
                setPageData(response.data);
            } catch (error) {
                console.error('Error fetching page data:', error);
            }
        };

        const fetchContactInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/contact_info/');
                setContactInfo(response.data);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchServices();
        fetchPageData();
        fetchContactInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!form.name) formErrors.name = "Name is required.";
        if (!form.email) {
            formErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            formErrors.email = "Email address is invalid.";
        }
        if (!form.phone) {
            formErrors.phone = "Phone number is required.";
        } else if (!/^\+?[1-9]\d{9}$/.test(form.phone)) {
            formErrors.phone = "Phone number must be a valid ten-digit number.";
        }
        if (!form.service) formErrors.service = "Service selection is required.";
        if (!form.message) formErrors.message = "Message is required.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/contact_us_page/",
                    form,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Response:", response.data);
                toast.success('Form submitted successfully');

                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                });
                setErrors({});
            } catch (error) {
                console.error("Error:", error);
                toast.error('Failed to submit form. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.contactUsContainer}>
            <div className={styles.contactForm}>
                <h3>Contact Us</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.groupName}>
                        <div
                            className={`${styles.inputWrapper} ${
                                errors.name ? styles.inputError : ""
                            }`}
                        >
                            <label htmlFor="name">
                                <span className={styles.required}>*</span>Name:{" "}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.name && (
                            <p className={styles.errorMessage}>{errors.name}</p>
                        )}
                    </div>

                    <div className={styles.groupName}>
                        <div
                            className={`${styles.inputWrapper} ${
                                errors.email ? styles.inputError : ""
                            }`}
                        >
                            <label htmlFor="email">
                                <span className={styles.required}>*</span>Email:{" "}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && (
                            <p className={styles.errorMessage}>{errors.email}</p>
                        )}
                    </div>

                    <div className={styles.groupName}>
                        <div
                            className={`${styles.inputWrapper} ${
                                errors.phone ? styles.inputError : ""
                            }`}
                        >
                            <label htmlFor="phone">
                                <span className={styles.required}>*</span>Phone:{" "}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="* +1234567890"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.phone && (
                            <p className={styles.errorMessage}>{errors.phone}</p>
                        )}
                    </div>

                    <div className={styles.groupName}>
                        <div
                            className={`${styles.inputWrapper} ${
                                errors.service ? styles.inputError : ""
                            }`}
                        >
                            <label htmlFor="service">
                                <span className={styles.required}>*</span>Services:{" "}
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                            >
                                <option value="">Select a service</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.name}>{service.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.service && (
                            <p className={styles.errorMessage}>{errors.service}</p>
                        )}
                    </div>

                    <div className={styles.groupName}>
                        <div
                            className={`${styles.inputWrapper} ${
                                errors.message ? styles.inputError : ""
                            }`}
                        >
                            <label htmlFor="message">
                                <span className={styles.required}>*</span>Message:{" "}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        {errors.message && (
                            <p className={styles.errorMessageP}>{errors.message}</p>
                        )}
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className={styles.description}>
                <h2>{pageData.title}</h2>
                <p>
                    {pageData.description}
                </p>
                <div className={styles.contactInfo}>
                    <div className={styles.email}>
                        <i>
                            <CgMail className="email-i" />
                        </i>
                        <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                    </div>
                    <div className={styles.phone}>
                        <i>
                            <IoCall className="phone-i" />
                        </i>
                        <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
