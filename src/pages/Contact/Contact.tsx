import React from 'react';
import { Button, TitlePage } from '@/components';
import './contact.scss';

const Contact = () => {
  const sendMessageAction = () => {};

  return (
    <section id="contact" className="container">
      <TitlePage
        title="get <span>in touch</span>"
        subtitle="I design and code beautiful things, and I love what I do."
      />
      <div className="contact-content">
        <div className="contact-row simple-row">
          <div className="describe-contact simple-first-column">
            <h3 className="title-content">Get in touch</h3>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:name@domain.com">name@domain.com</a>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:5551234567">(555)123-4567</a>
              </p>
              <p>
                <strong>Location:</strong> Salerno, Italy
              </p>
            </div>
            <p>
              If you have any suggestion, project or even you want to say
              Hello.. please fill out the form below and I will reply you
              shortly. I’m always open to discussing product design work or
              partnerships.
            </p>
          </div>
          <div className="form-contact simple-second-column">
            <form className="contact_form">
              <div className="input-group">
                <div className="input-single-item">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
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
                    placeholder="Email"
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
                placeholder="Message"
                rows={5}
                required
              ></textarea>
              <Button onClick={sendMessageAction}>Send</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
