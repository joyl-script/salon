'use client'

import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Camera, Menu, Phone, Star, X } from 'lucide-react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const categories = ['Все услуги', 'Волосы', 'Ногти', 'Брови'] as const
type Category = (typeof categories)[number]
const services: { category: Exclude<Category, 'Все услуги'>; title: string; detail: string; price: string }[] = [
  { category: 'Волосы', title: 'Стрижка и укладка', detail: 'Форма, которая остаётся вашей', price: 'от 2 500 ₽' },
  { category: 'Волосы', title: 'Окрашивание', detail: 'Точный оттенок и бережный уход', price: 'от 6 000 ₽' },
  { category: 'Волосы', title: 'Уход для волос', detail: 'Восстановление и мягкий блеск', price: 'от 3 500 ₽' },
  { category: 'Ногти', title: 'Маникюр', detail: 'Чистая форма и безупречное покрытие', price: 'от 2 000 ₽' },
  { category: 'Ногти', title: 'Педикюр', detail: 'Деликатный уход с вниманием к деталям', price: 'от 2 800 ₽' },
  { category: 'Брови', title: 'Архитектура бровей', detail: 'Форма и оттенок, подходящие именно вам', price: 'от 1 500 ₽' },
]
const reviews = [
  { name: 'Алина', source: 'Яндекс Карты', text: 'Наконец нашла своего мастера. Очень бережно отнеслись к волосам, цвет получился именно таким, как я хотела.' },
  { name: 'Мария', source: '2ГИС', text: 'В салоне удивительно спокойно. Красивый интерьер, чудесный кофе и маникюр, которым любуюсь уже две недели.' },
  { name: 'Екатерина', source: 'Яндекс Карты', text: 'Записалась на стрижку, а ушла с ощущением, что обо мне позаботились. Обязательно вернусь.' },
  { name: 'Ольга', source: '2ГИС', text: 'Очень внимательные мастера и никакой спешки. Понравилось, что сначала обсудили результат, а потом приступили.' },
  { name: 'Виктория', source: 'Яндекс Карты', text: 'Тот самый случай, когда реальность лучше фотографий. Красиво, чисто и очень уютно.' },
  { name: 'Полина', source: '2ГИС', text: 'Хожу на окрашивание уже несколько месяцев. Волосы в прекрасном состоянии, а оттенок всегда идеальный.' },
]

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className={`photo-fallback ${className}`} role="img" aria-label={alt}><span>ПРЕСТИЖ</span><small>{alt}</small></div> : <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />
}

export default function Page() {
  const [category, setCategory] = useState<Category>('Все услуги')
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const filtered = category === 'Все услуги' ? services : services.filter((service) => service.category === category)
  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const phone = String(data.get('phone') ?? '').replace(/\D/g, '')
    if (String(data.get('name') ?? '').trim().length < 2 || phone.length < 10) {
      setFormError('Проверьте имя и номер телефона — мы перезвоним, чтобы подобрать удобное время.')
      return
    }
    setFormError('')
    setSubmitted(true)
  }
  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <div className="concept-note">КОНЦЕПТ САЙТА · ДАННЫЕ И ОТЗЫВЫ ПРЕДСТАВЛЕНЫ ДЛЯ ДЕМОНСТРАЦИИ</div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Престиж — на главную"><span>ПРЕСТИЖ</span><small>салон красоты</small></a>
        <nav className="desktop-nav" aria-label="Основная навигация"><a href="#services">Услуги</a><a href="#about">О салоне</a><a href="#reviews">Отзывы</a><a href="#contacts">Контакты</a></nav>
        <a className="button button-small header-book" href="#booking">Записаться <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Мобильная навигация"><a href="#services" onClick={closeMenu}>Услуги</a><a href="#about" onClick={closeMenu}>О салоне</a><a href="#reviews" onClick={closeMenu}>Отзывы</a><a href="#contacts" onClick={closeMenu}>Контакты</a><a className="button" href="#booking" onClick={closeMenu}>Записаться <ArrowUpRight size={16}/></a></nav>}

      <section id="top" className="hero"><div className="hero-photo"><Photo src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=2200&q=85" alt="Светлый интерьер салона красоты" /></div><div className="hero-shade"/><div className="hero-content"><h1>Красота —<br/>в своём <em>ритме.</em></h1><p>Место, где забота о себе становится вашей любимой привычкой.</p><a className="button" href="#booking">Выбрать время <ArrowUpRight size={16}/></a></div><div className="hero-index"><span>01</span><i/> САЛОН КРАСОТЫ</div><div className="hero-caption">МЕСТО ДЛЯ ВАШЕГО ВРЕМЕНИ</div></section>

      <section id="about" className="intro section-wrap"><div className="intro-top"><span className="eyebrow">ПРОСТРАНСТВО ЗАБОТЫ</span><span className="intro-number">01 — 04</span></div><div className="intro-grid"><h2>Здесь можно<br/>выдохнуть <em>и быть собой.</em></h2><div className="intro-copy"><p>«Престиж» — камерный салон для тех, кто выбирает внимание к деталям вместо спешки. Хороший свет, любимый кофе и мастера, которые слышат.</p><a className="text-link" href="#services">Познакомиться с услугами <ArrowRight size={16}/></a></div></div><div className="intro-image"><Photo src={`${basePath}/images/prestige-space.png`} alt="Уютное пространство салона"/><span>КАЖДАЯ ДЕТАЛЬ — С ЗАБОТОЙ</span></div><div className="intro-values"><div><b>01</b><span>Время без спешки</span></div><div><b>02</b><span>Внимание к вам</span></div><div><b>03</b><span>Результат с характером</span></div></div></section>

      <section id="services" className="services-section"><div className="section-wrap"><div className="section-heading"><div><span className="eyebrow">ПОВОД ПОБЫТЬ СОБОЙ</span><h2>Забота в деталях</h2></div><a className="text-link desktop-link" href="#booking">Найти своё время <ArrowRight size={16}/></a></div><div className="service-layout"><div className="service-list-wrap"><div className="category-tabs" role="group" aria-label="Категория услуг">{categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="service-list">{filtered.map((service, index) => <article className="service-row" key={service.title}><div className="service-row-top"><span className="service-index">0{index + 1}</span><span className="service-category">{service.category}</span><a href="#booking" className="service-arrow" aria-label={`Записаться: ${service.title}`}><ArrowUpRight size={18}/></a></div><h3>{service.title}</h3><p>{service.detail}</p><span className="service-price">{service.price}</span></article>)}</div><p className="price-note">Итоговая стоимость зависит от длины волос и выбранного мастера. Всё обсудим до начала.</p></div></div></div></section>

      <section className="quote-band"><span className="quote-mark">“</span><blockquote>Иногда лучший план —<br/>запланировать время <em>для себя.</em></blockquote><span className="quote-caption">ТИШИНА. ВНИМАНИЕ. ВАШЕ ВРЕМЯ.</span><span className="quote-flower" aria-hidden="true">✳</span></section>

      <section id="reviews" className="reviews-section section-wrap"><div className="reviews-heading"><div><span className="eyebrow">СЛОВА, КОТОРЫЕ НАС ГРЕЮТ</span><h2>После визита</h2></div><div className="rating"><span>4,8</span><div><div className="stars" aria-label="Рейтинг 4,8 из 5"><Star/><Star/><Star/><Star/><Star/></div><small>по оценкам гостей</small></div></div></div><div className="review-grid">{reviews.map((review, index) => <article className="review-card" key={review.name}><div className="review-top"><div className="review-monogram">{review.name[0]}</div><div><h3>{review.name}</h3><span>{review.source}</span></div><div className="review-stars" aria-label="5 из 5">★★★★★</div></div><p>«{review.text}»</p><span className="review-date">{['12 мая', '4 мая', '28 апреля', '19 апреля', '10 апреля', '2 апреля'][index]} · концепт-отзыв</span></article>)}</div><div className="reviews-bottom"><span>ОТЗЫВЫ ДЛЯ ДЕМОНСТРАЦИИ КОНЦЕПТА</span><a className="text-link" href="https://yandex.ru/maps/35/krasnodar/" target="_blank" rel="noreferrer">Все отзывы на картах <ArrowUpRight size={16}/></a></div></section>

      <section id="booking" className="booking-section"><div className="booking-inner"><div className="booking-copy"><span className="eyebrow">ВАШЕ ВРЕМЯ — ВАШЕ</span><h2>Начнём с<br/><em>приятного.</em></h2><p>Оставьте номер — администратор подберёт время и ответит на вопросы. Никаких обязательств.</p><div className="booking-hours"><Clock3 size={16}/><span>Ежедневно<br/><b>10:00 — 21:00</b></span></div></div><form className="booking-form" onSubmit={submitForm} noValidate><span className="form-step">ЗАПИСЬ · 01 / 01</span>{submitted ? <div className="success-state" role="status"><span className="success-icon"><Check size={24}/></span><h3>Спасибо, мы на связи.</h3><p>Администратор перезвонит вам в ближайшее время. До встречи в «Престиже».</p></div> : <><label htmlFor="name">Как к вам обращаться?</label><input id="name" name="name" autoComplete="name" placeholder="Ваше имя" required minLength={2}/><label htmlFor="phone">Номер телефона</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required minLength={10}/><label htmlFor="service-select">Что вас интересует?</label><div className="select-wrap"><select id="service-select" name="service"><option>Пока не решила</option><option>Стрижка и укладка</option><option>Окрашивание</option><option>Маникюр</option><option>Архитектура бровей</option></select><ChevronDown size={16}/></div>{formError && <p className="form-error" role="alert">{formError}</p>}<button type="submit" className="button form-submit">Позвоните мне <ArrowUpRight size={16}/></button><p className="form-privacy">Нажимая на кнопку, вы соглашаетесь с <a href="#privacy">политикой конфиденциальности</a>.</p></>}</form></div></section>

      <section id="contacts" className="contacts-section section-wrap"><div className="contacts-heading"><div><span className="eyebrow">МЫ РЯДОМ</span><h2>До встречи</h2></div><a href="tel:+78612000000" className="contacts-call"><Phone size={17}/><span>+7 (861) 200-00-00</span><ArrowUpRight size={16}/></a></div><div className="contacts-grid"><div className="map-frame"><iframe title="Карта расположения салона" src="https://maps.google.com/maps?q=Krasnodar%20Russia&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div><div className="contact-details"><div><span>АДРЕС</span><p>г. Краснодар, ул. Красная, 176<br/><small>Вход со стороны тихого двора · концепт-адрес</small></p></div><div><span>ЧАСЫ РАБОТЫ</span><p>Ежедневно<br/>10:00 — 21:00</p></div><div><span>МЫ НА СВЯЗИ</span><p><a href="tel:+78612000000">+7 (861) 200-00-00</a><br/><a href="https://wa.me/78612000000" target="_blank" rel="noreferrer">WhatsApp ↗</a></p></div><a className="button contact-book" href="#booking">Записаться на визит <ArrowUpRight size={16}/></a><span className="social-caption">БУДЕМ РАДЫ ВАШЕМУ ВИЗИТУ</span></div></div></section>

      <footer className="site-footer"><div className="footer-top"><a href="#top" className="brand footer-brand"><span>ПРЕСТИЖ</span><small>салон красоты</small></a><div className="footer-contacts"><span>КОНТАКТЫ</span><a href="tel:+78612000000">+7 (861) 200-00-00</a><a href="#contacts">Адрес и часы работы</a></div><a href="https://instagram.com/" target="_blank" rel="noreferrer" className="instagram-link" aria-label="Instagram"><Camera size={18}/></a></div><div className="footer-bottom"><span>© 2025 «ПРЕСТИЖ» · ДИЗАЙН-КОНЦЕПТ</span><a id="privacy" href="#privacy">Политика конфиденциальности</a><a href="#top">НАВЕРХ ↑</a></div><div className="footer-watermark">ПРЕСТИЖ</div></footer>
    </main>
  )
}
