import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { contactConfig } from '@/services/data_content';
import { Button, TitlePage } from '@/components';
import './contact.scss';

const Contact: FC = () => {
  const { t: contactTranslation } = useTranslation(['contact']);
  const [formData, setFormdata] = useState({
    email: '',
    name: '',
    message: '',
    error_email: false,
    error_name: false,
    error_message: false,
    loading: false,
  });

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(formData.email);
    const isValidName = !!formData.name.trim();
    const isValidMessage = !!formData.message.trim();
    setFormdata({
      ...formData,
      error_name: !isValidName,
      error_email: !isValidEmail,
      error_message: !isValidMessage,
    });

    return isValidEmail && isValidMessage && isValidName;
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormdata({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const sendMessageAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormdata({
      ...formData,
      loading: true,
    });
    const templateParams = {
      email: formData.email,
      name: formData.name,
      message: formData.message,
    };
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setFormdata({
            email: '',
            name: '',
            message: '',
            error_email: false,
            error_name: false,
            error_message: false,
            loading: false,
          });
          alert('Message Sent Successfully');
        },
        () => {
          setFormdata({
            ...formData,
            loading: true,
          });
          alert('Something went wrong!');
        }
      );
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-section container-xxl">
        <TitlePage
          title={contactTranslation('title')}
          subtitle={contactTranslation('subtitle')}
        />
        <div className="contact-content portfolio-row">
          <div className="contact-info portfolio-col-5">
            <h3 className="title-content">
              {contactTranslation('body_title')}
            </h3>
            <div className="contact-basic-details">
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${contactConfig.email}`}>
                  {contactConfig.email}
                </a>
              </p>
              <p>
                <strong>{contactTranslation('phone')}:</strong>{' '}
                <a href={`tel:${contactConfig.phone}`}>
                  {contactConfig.phone_formated}
                </a>
              </p>
              <p>
                <strong>{contactTranslation('location')}:</strong>{' '}
                {contactTranslation('location_data')}
              </p>
            </div>
            <p className="contact-info-description">
              {contactTranslation('description')}
            </p>
          </div>
          <div className="contact-form portfolio-col-7">
            <form className="contact-action" onSubmit={sendMessageAction}>
              <div className="input-group">
                <div className="input-single-item">
                  <input
                    className={`form-control ${formData.error_name ? 'error' : ''}`}
                    id="name"
                    name="name"
                    placeholder={contactTranslation('form.name')}
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-single-item">
                  <input
                    className={`form-control ${formData.error_email ? 'error' : ''}`}
                    id="email"
                    name="email"
                    placeholder={contactTranslation('form.email')}
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <textarea
                className={`form-control ${formData.error_message ? 'error' : ''}`}
                id="message"
                name="message"
                placeholder={contactTranslation('form.message')}
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <div className="error-messages">
                {formData.error_name && (
                  <small>{contactTranslation('error.name')}</small>
                )}
                {formData.error_email && (
                  <small>{contactTranslation('error.email')}</small>
                )}
                {formData.error_message && (
                  <small>{contactTranslation('error.message')}</small>
                )}
              </div>
              <Button disabled={formData.loading} isForSubmition>
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
