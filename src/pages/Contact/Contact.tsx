import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { contactConfig, PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from '@/services';
import { useToast } from '@/hooks/useToast';
import { useForm } from '@/hooks/useForm';
import { Button, TitlePageV2, Toast, ToastTypes } from '@/components';
import './contact.scss';

const Contact: FC = () => {
  const { t: contactTranslation } = useTranslation(['contact']);
  const [loading, setLoading] = useState(false);
  const { closeToast, addToastOptions, toastMsg, toastType, toastVisible } =
    useToast();
  const { resetFormStates, handleChange, formData, formErrors } = useForm();
  const isFormValid =
    Object.values(formErrors).every((error) => error === false) &&
    Object.values(formData).every((field) => field !== '');

  const sendMessageAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { email, name, message } = formData;
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        { email, name, message },
        {
          publicKey: PUBLIC_KEY,
        }
      )
      .then(
        () => {
          resetFormStates();
          setLoading(false);
          addToastOptions(
            contactTranslation('messages.success'),
            ToastTypes.success
          );
        },
        () => {
          setLoading(false);
          addToastOptions(
            contactTranslation('messages.error'),
            ToastTypes.error
          );
        }
      );
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-section container-xxl">
        <TitlePageV2
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
                    className={`form-control ${formErrors.name ? 'error' : ''}`}
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
                    className={`form-control ${formErrors.email ? 'error' : ''}`}
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
                className={`form-control ${formErrors.message ? 'error' : ''}`}
                id="message"
                name="message"
                placeholder={contactTranslation('form.message')}
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <div className="error-messages">
                {formErrors.name && (
                  <small>{contactTranslation('error.name')}</small>
                )}
                {formErrors.email && (
                  <small>{contactTranslation('error.email')}</small>
                )}
                {formErrors.message && (
                  <small>{contactTranslation('error.message')}</small>
                )}
              </div>
              <Button disabled={loading || !isFormValid} isForSubmition>
                {contactTranslation('form.btn')}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Toast type={toastType} show={toastVisible} onClose={closeToast}>
        {toastMsg}
      </Toast>
    </section>
  );
};

export default Contact;
