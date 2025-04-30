import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contactConfig } from '@/services/data_content';
import { Button, TitlePage } from '@/components';
import './contact.scss';

const Contact: FC = () => {
  const { t: contactTranslation } = useTranslation(['contact']);
  const [formData, setFormdata] = useState({
    email: '',
    name: '',
    message: '',
    loading: false,
    show: false,
    alertmessage: '',
    variant: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormdata({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const sendMessageAction = () => {
    alert('This is not ready yet. Sorry :(');
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
            <form className="contact-action">
              <div className="input-group">
                <div className="input-single-item">
                  <input
                    className="form-control"
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
                    className="form-control rounded-0"
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
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder={contactTranslation('form.message')}
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
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
