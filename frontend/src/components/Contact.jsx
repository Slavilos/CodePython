import React from 'react';
import "./ContactPage.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Свяжитесь с нами</h2>
      <div className="contact-content">
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2114.10430659173!2d56.218435877498095!3d58.00300197399937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43e8c7309d80f6f7%3A0x1136fcce4175fc82!2z0YPQuy4g0J_Rg9GI0LrQuNC90LAsIDEwN9CwLCDQn9C10YDQvNGMLCDQn9C10YDQvNGB0LrQuNC5INC60YDQsNC5LCA2MTQwNjg!5e0!3m2!1sru!2sru!4v1746009143553!5m2!1sru!2sru"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="info">
          <p>📍 Адрес: г. Пермь, ул. Пушкина, 107а</p>
          <p>📞 Телефон: +7 (342) 123-45-67</p>
          <p>✉️ Email: example@mail.ru</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
