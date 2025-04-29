import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, TitlePage } from '@/components';
import './contact.scss';

const Contact: FC = () => {
  const { t: contactTranslation } = useTranslation(['contact']);
  const sendMessageAction = () => {};

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
                <a href="mailto:name@domain.com">name@domain.com</a>
              </p>
              <p>
                <strong>{contactTranslation('phone')}:</strong>{' '}
                <a href="tel:5551234567">(555)123-4567</a>
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
