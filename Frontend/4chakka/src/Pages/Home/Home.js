import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    vehicleType: '',
    pickupDate: '',
    phone: '',
    address: '',
    message: '' // Add message field to initial state
  });
  const [errors, setErrors] = useState({});
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vehicle_types/');
        setVehicleTypes(response.data);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/slider_images/');
        setImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await axios.get('http://localhost:8000/description/');
        setDescription(response.data.text);
      } catch (error) {
        console.error('Error fetching description:', error);
      }
    };

    fetchVehicleTypes();
    fetchImages();
    fetchDescription();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.pickup) tempErrors.pickup = 'Pickup location is required.';
    if (!formData.drop) tempErrors.drop = 'Drop location is required.';
    if (!formData.vehicleType) tempErrors.vehicleType = 'Vehicle type is required.';
    if (!formData.pickupDate) tempErrors.pickupDate = 'Pickup date is required.';
    if (!formData.phone) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!/^\+?\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number is invalid. Must be 10 digits.';
    }
    if (!formData.address) tempErrors.address = 'Address is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8000/create/', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200 || response.status === 201) {
          toast.success('Order booked successfully!');
          setFormData({
            pickup: '',
            drop: '',
            vehicleType: '',
            pickupDate: '',
            phone: '',
            address: '',
            message: '' // Clear message field
          });
          setErrors({});
        } else {
          setErrors(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          toast.error('Failed to submit form. Please try again later.');
        }
      }
    }
  };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homeLeftSide}>
        <div className={styles.homeDescription}>
          <p>{description}</p>
        </div>
        <div className={styles.homeImageSlider}>
          {images.length > 0 && (
            <img src={`http://localhost:8000${images[currentImageIndex].image}`} alt="Logistics" className={styles.homeImgs} />
          )}
        </div>
      </div>
      <div className={styles.homeRightSide}>
        <div className={styles.homeFormContainer}>
          <h2>Book Your Order</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="pickup" className={styles.homeLabelSmall}><span className={styles.homeRequired}>*</span>Pickup:</label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.pickup && styles.homeInputError}`}
                />
                {errors.pickup && <p className={styles.homeErrorMessage}>{errors.pickup}</p>}
              </div>
            </div>

            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="drop" className={styles.homeLabelSmall}><span className={styles.homeRequired}>*</span>Drop:</label>
                <input
                  type="text"
                  id="drop"
                  name="drop"
                  value={formData.drop}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.drop && styles.homeInputError}`}
                />
                {errors.drop && <p className={styles.homeErrorMessage}>{errors.drop}</p>}
              </div>
            </div>

            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="vehicleType" className={styles.homeLabelSmall}><span className={styles.homeRequired}>*</span>Vehicle Type:</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.vehicleType && styles.homeInputError}`}
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  ))}
                </select>
                {errors.vehicleType && <p className={styles.homeErrorMessage}>{errors.vehicleType}</p>}
              </div>
            </div>

            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="pickupDate" className={styles.homeLabelSmall}><span className={styles.homeRequired}>*</span>Pickup Date:</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.pickupDate && styles.homeInputError}`}
                />
                {errors.pickupDate && <p className={styles.homeErrorMessage}>{errors.pickupDate}</p>}
              </div>
            </div>

            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="phone" className={styles.homeLabelSmall}><span className={styles.homeRequired}>*</span>Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.phone && styles.homeInputError}`}
                />
                {errors.phone && <p className={styles.homeErrorMessage}>{errors.phone}</p>}
              </div>
            </div>

            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="address" className={styles.homeLabelSmall}><span className={styles.homeRequired}>*</span>Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.address && styles.homeInputError}`}
                />
                {errors.address && <p className={styles.homeErrorMessage}>{errors.address}</p>}
              </div>
            </div>

            <div className={styles.homeGroupNames}>
              <div className={styles.homeInputWrappers}>
                <label htmlFor="message" className={styles.homeLabelSmall}>Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.homeInputFields} ${errors.message && styles.homeInputError}`}
                />
              </div>
            </div>

            <button type="submit" className={styles.homeSubmitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
