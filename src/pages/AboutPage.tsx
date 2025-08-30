import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const AboutPage: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Дякуємо, ${formData.name}! Ваше повідомлення надіслано. Ми зв'яжемося з вами найближчим часом.`);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowContactForm(false);
  };

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const hideContactForm = () => {
    setShowContactForm(false);
  };
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 fw-bold mb-4 glass-text">
            <i className="bi bi-info-circle me-3"></i>
            Про SerjStore
          </h1>
          <p className="lead glass-text mb-4">
            Ваш надійний партнер у світі комп'ютерних технологій. 
            Якісні комплектуючі за найкращими цінами з гарантією якості.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="glass-card h-100 p-4">
            <h2 className="h3 fw-bold mb-3 glass-text">
              <i className="bi bi-star me-2 text-primary"></i>
              Наша історія
            </h2>
            <p className="glass-text">
              SerjStore був заснований у 2020 році з простою місією - зробити високоякісні 
              комп'ютерні комплектуючі доступними для кожного. Почавши як невеликий 
              інтернет-магазин, ми швидко стали одним з провідних постачальників 
              технологій в Україні.
            </p>
            <p className="glass-text">
              За роки роботи ми обслужили понад 50,000 задоволених клієнтів та 
              побудували репутацію надійного партнера для геймерів, професіоналів 
              та ентузіастів технологій.
            </p>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="glass-card h-100 p-4">
            <h2 className="h3 fw-bold mb-3 glass-text">
              <i className="bi bi-bullseye me-2 text-success"></i>
              Наша місія
            </h2>
            <p className="glass-text">
              Ми прагнемо зробити найсучасніші технології доступними для всіх, 
              надаючи якісні продукти за справедливими цінами та забезпечуючи 
              виняткову підтримку клієнтів.
            </p>
            <p className="glass-text">
              Наша команда експертів ретельно відбирає кожен продукт, щоб 
              гарантувати, що ви отримуєте найкраще співвідношення ціни та якості.
            </p>
          </div>
        </div>
      </div>

      {/* Цінності */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center fw-bold mb-4 glass-text">
            <i className="bi bi-heart me-2 text-danger"></i>
            Наші цінності
          </h2>
        </div>
        <div className="col-md-4 mb-4">
          <div className="glass-card text-center p-4 h-100">
            <div className="icon-wrapper mb-3">
              <i className="bi bi-shield-check display-4 text-primary"></i>
            </div>
            <h3 className="h5 fw-bold glass-text">Якість</h3>
            <p className="glass-text">
              Ми працюємо тільки з перевіреними брендами та гарантуємо 
              якість кожного продукту.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="glass-card text-center p-4 h-100">
            <div className="icon-wrapper mb-3">
              <i className="bi bi-lightning display-4 text-warning"></i>
            </div>
            <h3 className="h5 fw-bold glass-text">Швидкість</h3>
            <p className="glass-text">
              Швидке оформлення замовлень та експрес-доставка по всій Україні 
              в найкоротші терміни.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="glass-card text-center p-4 h-100">
            <div className="icon-wrapper mb-3">
              <i className="bi bi-people display-4 text-success"></i>
            </div>
            <h3 className="h5 fw-bold glass-text">Підтримка</h3>
            <p className="glass-text">
              Наша команда технічних експертів завжди готова допомогти 
              з вибором та налаштуванням.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="glass-card p-4">
            <h2 className="text-center fw-bold mb-4 glass-text">
              <i className="bi bi-graph-up me-2 text-info"></i>
              Наші досягнення
            </h2>
            <div className="row text-center">
              <div className="col-md-3 mb-3">
                <div className="stat-item">
                  <h3 className="display-5 fw-bold text-primary">50K+</h3>
                  <p className="glass-text">Задоволених клієнтів</p>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="stat-item">
                  <h3 className="display-5 fw-bold text-success">15K+</h3>
                  <p className="glass-text">Товарів в асортименті</p>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="stat-item">
                  <h3 className="display-5 fw-bold text-warning">24/7</h3>
                  <p className="glass-text">Технічна підтримка</p>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="stat-item">
                  <h3 className="display-5 fw-bold text-danger">5</h3>
                  <p className="glass-text">Років досвіду</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="glass-card text-center p-5">
            <h2 className="fw-bold mb-3 glass-text">
              <i className="bi bi-chat-dots me-2 text-info"></i>
              Готові почати?
            </h2>
            <p className="glass-text mb-4">
              Маєте питання або потребуєте консультації? Наша команда завжди готова допомогти!
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button 
                onClick={toggleContactForm}
                className="btn btn-primary btn-lg px-4 py-2 fw-semibold"
                key={`contact-btn-${showContactForm}`}
              >
                <i className="bi bi-telephone me-2"></i>
                {showContactForm ? 'Сховати форму' : 'Зв\'язатися з нами'}
              </button>
              <Link to="/catalog" className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold">
                <i className="bi bi-shop me-2"></i>
                Переглянути каталог
              </Link>
            </div>

            {/* Контактна форма */}
            {showContactForm && (
              <div className="mt-4 pt-4 border-top border-light border-opacity-25">
                <div className="glass-card p-4">
                  <h4 className="fw-bold mb-3 glass-text text-center">
                    <i className="bi bi-envelope-paper me-2"></i>
                    Напишіть нам
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label glass-text fw-semibold">
                          <i className="bi bi-person me-2"></i>Ім'я *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Введіть ваше ім'я"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label glass-text fw-semibold">
                          <i className="bi bi-envelope me-2"></i>Email *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label glass-text fw-semibold">
                        <i className="bi bi-telephone me-2"></i>Телефон
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+380 (50) 123-45-67"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label glass-text fw-semibold">
                        <i className="bi bi-chat-text me-2"></i>Повідомлення *
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Опишіть ваше питання або запит..."
                        required
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
                        <button 
                          type="submit" 
                          className="btn btn-lg px-5 py-2 fw-semibold border-0"
                          style={{
                            background: 'linear-gradient(135deg, #28a745, #20c997)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                          }}
                        >
                          <i className="bi bi-send me-2"></i>
                          Надіслати повідомлення
                        </button>
                        <button 
                          type="button" 
                          onClick={hideContactForm}
                          className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold border-2"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            color: 'white'
                          }}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Скасувати
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-top border-light border-opacity-25">
              <div className="row text-center">
                <div className="col-md-4 mb-3">
                  <div className="contact-info">
                    <i className="bi bi-geo-alt text-primary me-2"></i>
                    <span className="glass-text">м. Київ, вул. Технологічна, 1</span>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="contact-info">
                    <i className="bi bi-telephone text-success me-2"></i>
                    <span className="glass-text">+380 (50) 123-45-67</span>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="contact-info">
                    <i className="bi bi-envelope text-warning me-2"></i>
                    <span className="glass-text">info@serjstore.ua</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;