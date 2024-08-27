import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AboutUs.module.css';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const AboutUs = () => {
  const [data, setData] = useState({ title: '', description: '' });
  const [imageURL, setImageURL] = useState('');
  const [companyInfo, setCompanyInfo] = useState({ email: '', phone: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/about_us/');
        setData(response.data);
        setImageURL(`http://localhost:8000${response.data.image}`);
      } catch (error) {
        console.error('Error fetching About Us data:', error);
      }
    };

    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/company_info/');
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchData();
    fetchCompanyInfo();
  }, []);

  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.description}>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          {imageURL && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={imageURL} alt="About Us Image" className={styles.aboutUsImage} />
          )}
        </div>
        <div className={styles.right}>
          <h3>DV TRANSIT PVT LTD</h3>
          <p>Raigarh(C.G.)</p>
          <p><FaEnvelope className={styles.icon} /> <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></p>
          <p><FaPhone className={styles.icon} /> <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a></p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
