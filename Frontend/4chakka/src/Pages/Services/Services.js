import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Services.module.css'; // Using CSS Modules for better scoping

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/services_page/');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className={styles.serviceContainer}>
      {services.map((service, index) => (
        <div key={index} className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <div className={styles.imageContainer}>
            <img src={`http://localhost:8000${service.image_url}`} alt={service.title} className={styles.serviceImage} />
          </div>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Service;
