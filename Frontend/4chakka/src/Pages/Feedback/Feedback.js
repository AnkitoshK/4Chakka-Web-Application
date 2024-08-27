import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Feedback.module.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    rating: '',
    experience: '',
    referenceNumber: '',
    fullName: '',
    imageUrl: '',  // Ensure this field is part of the initial state
  });

  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/csrf/');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    fetchCsrfToken();
    fetchImageUrl();  // Fetch image URL on component mount
  }, []);

  const fetchImageUrl = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get_feedback_image/');
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: response.data.image_url,
      }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (ratingValue) => {
    const newRating = formData.rating === ratingValue.toString() ? '' : ratingValue.toString();
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.rating = formData.rating ? '' : 'This field is required.';
    tempErrors.experience = formData.experience ? '' : 'This field is required.';
    tempErrors.fullName = formData.fullName ? '' : 'This field is required.';

    if (formData.referenceNumber.trim() === '') {
      tempErrors.referenceNumber = 'This field is required.';
    } else if (!/^\d{10}$/.test(formData.referenceNumber)) {
      tempErrors.referenceNumber = 'Reference number must be a 10-digit numeric value.';
    } else {
      tempErrors.referenceNumber = '';
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          'http://localhost:8000/submit_feedback/',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
          }
        );
        console.log('Response:', response.data);
        toast.success('Form submitted successfully');

        setFormData((prevData) => ({
          rating: '',
          experience: '',
          referenceNumber: '',
          fullName: '',
          imageUrl: prevData.imageUrl,
        }));
        setErrors({});
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        toast.error('Failed to submit form. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.newaddFeedbackContainer}>
      <div className={styles.newaddFeedbackImageContainer}>
        <img src={formData.imageUrl} alt="Feedback" className={styles.newaddFeedbackImage} />
      </div>

      <div className={styles.newaddFeedbackRightSection}>
        <form onSubmit={handleSubmit} id="feedbackForm" className={styles.newaddFeedbackForm}>
          {/* Include CSRF token hidden input if it's not already included */}
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

          <h2>Rate Us</h2>
          <div className={styles.newaddStarRating}>
            {[1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  id={`star${num}`}
                  checked={formData.rating === num.toString()}
                  onChange={() => handleRatingChange(num)}
                  className={`${styles.newaddInput} ${errors.rating && styles.newaddInputError}`}
                />
                <label
                  htmlFor={`star${num}`}
                  className={`${styles.newaddStar} ${formData.rating >= num ? styles.newaddSelected : ''}`}
                >
                  &#9733;
                </label>
              </React.Fragment>
            ))}
          </div>
          {errors.rating && <div className={styles.newaddError}>{errors.rating}</div>}
          <div className={styles.newaddFormGroup}>
            <label htmlFor="experience"><span className={styles.newaddRequired}>*</span>Tell us about your experience: </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`${styles.newaddTextarea} ${errors.experience && styles.newaddInputError}`}
            ></textarea>
            {errors.experience && <div className={styles.newaddError}>{errors.experience}</div>}
          </div>
          <div className={styles.newaddFormGroup}>
            <label htmlFor="referenceNumber"><span className={styles.newaddRequired}>*</span>Enter Reference Number: </label>
            <input
              type="text"
              id="referenceNumber"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              className={`${styles.newaddInput} ${errors.referenceNumber && styles.newaddInputError}`}
            />
            {errors.referenceNumber && <div className={styles.newaddError}>{errors.referenceNumber}</div>}
          </div>
          <div className={styles.newaddFormGroup}>
            <label htmlFor="fullName"><span className={styles.newaddRequired}>*</span>Full Name: </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`${styles.newaddInput} ${errors.fullName && styles.newaddInputError}`}
            />
            {errors.fullName && <div className={styles.newaddError}>{errors.fullName}</div>}
          </div>
          <button type="submit" className={styles.newaddFeedbackButton}>Post review</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
