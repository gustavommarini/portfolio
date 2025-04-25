import React from 'react';
import { Button, TitlePage } from '@/components';
import './contact.scss';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t: contactTranslation } = useTranslation(['contact']);
  const sendMessageAction = () => {};

  return (
    <section id="contact" className="container">
      <TitlePage
        title={contactTranslation('title')}
        subtitle={contactTranslation('subtitle')}
      />
      <div className="contact-content">
        <div className="contact-row simple-row">
          <div className="describe-contact simple-first-column">
            <h3 className="title-content">
              {contactTranslation('body_title')}
            </h3>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:name@domain.com">name@domain.com</a>
              <p>
                <strong>{contactTranslation('phone')}:</strong>{' '}
                <a href="tel:5551234567">(555)123-4567</a>
              </p>
              <p>
                <strong>{contactTranslation('location')}:</strong>{' '}
                {contactTranslation('location_data')}
              </p>
            </div>
            <p>{contactTranslation('description')}</p>
          </div>
          <div className="form-contact simple-second-column">
            <form className="contact_form">
              <div className="input-group">
                <div className="input-single-item">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder={contactTranslation('form.name')}
                    type="text"
                    required
                    value=""
                  />
                </div>
                <div className="input-single-item">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder={contactTranslation('form.email')}
                    type="email"
                    required
                    value=""
                  />
                </div>
              </div>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder={contactTranslation('form.message')}
                rows={5}
                required
              ></textarea>
              <Button onClick={sendMessageAction}>
                {contactTranslation('form.btn')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
