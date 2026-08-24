import { useEffect, useState, type ReactNode } from 'react';
import { buildWhatsAppLink, contactConfig } from './constants';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const navItems = [
  { label: 'Ana Sayfa', href: '#anasayfa' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'İletişim', href: '#iletisim' },
];

const valueCards = [
  {
    title: 'Günlük Hazırlanır',
    text: 'Yemeklerimizi her gün taze şekilde hazırlıyor, beklemiş üretime yer vermiyoruz.',
    icon: '01',
  },
  {
    title: 'Taze Malzeme',
    text: 'Malzemelerimizi kalite ve tazelik odaklı seçerek mutfağımıza taşıyoruz.',
    icon: '02',
  },
  {
    title: 'Ev Yemeği Lezzeti',
    text: 'Tanıdığınız, özlediğiniz ve güvenle tercih edeceğiniz sıcak ev yemeği tadı.',
    icon: '03',
  },
  {
    title: 'Özenle Paketlenir',
    text: 'Sıcaklığını ve lezzetini koruyan düzenli paketleme ile servis ediyoruz.',
    icon: '04',
  },
];

const galleryItems = [
  {
    title: 'Sulu Yemekler',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Çorba ve Başlangıçlar',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Pilav ve Yan Lezzetler',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Et Yemekleri',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sebze Yemekleri',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Ev Yapımı Tatlılar',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
  },
];

const processSteps = [
  'Taze Malzemeler',
  'Günlük Hazırlık',
  'Özenli Paketleme',
  'Sıcacık Teslimat',
];

const trustHighlights = [
  'Günlük Üretim',
  'Taze Malzeme',
  'Ev Yapımı Lezzet',
  'Paket Servis',
];

const whatsAppLink = buildWhatsAppLink();

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      data-reveal
    >
      {children}
    </div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(
              (entry.target as HTMLElement).dataset.stepIndex ?? 0,
            );
            setActiveStep(stepIndex);
          }
        });
      },
      { threshold: 0.55 },
    );

    const stepElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-step-index]'),
    );
    stepElements.forEach((element) => stepObserver.observe(element));

    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      stepObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-linen text-ink">
      <div className="fixed inset-x-0 top-0 -z-10 h-[32rem] bg-grain blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-white/60 bg-linen/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#anasayfa" className="flex items-center gap-3 font-display text-3xl font-semibold tracking-[0.16em] text-olive">
            <LogoMark className="h-12 w-12" />
            <span>TEMİZ YEMEK</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-semibold text-ink/75 transition hover:text-olive">
                {item.label}
              </a>
            ))}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sage"
            >
              <WhatsAppIcon />
              WhatsApp'tan Sipariş Ver
            </a>
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-white/80 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Menüyü aç"
            aria-expanded={mobileMenuOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full bg-olive transition ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-olive transition ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-olive transition ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        <div className={`mobile-menu md:hidden ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="space-y-5 rounded-[2rem] border border-sand/70 bg-white p-6 shadow-card">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="block text-lg font-medium text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon />
              WhatsApp'tan Sipariş Ver
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="anasayfa" className="relative">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-16">
            <Reveal className="flex flex-col justify-center">
              <span className="mb-5 inline-flex w-fit rounded-full border border-sage/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sage">
                Ev yemeğinin en temiz hâli
              </span>
              <h1 className="max-w-xl font-display text-5xl font-semibold leading-[0.95] text-olive sm:text-6xl lg:text-7xl">
                Ev Yemeğinin En Temiz Hâli
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-ink/72 sm:text-lg">
                Günlük hazırlanan ev yemeklerini, taze malzemeler ve özenli paketleme ile sofranıza ulaştırıyoruz.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-apricot px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <WhatsAppIcon />
                  WhatsApp'tan Sipariş Ver
                </a>
                <a
                  href="#hakkimizda"
                  className="inline-flex items-center justify-center rounded-full border border-olive/15 bg-white px-6 py-4 text-sm font-semibold text-olive transition hover:-translate-y-0.5 hover:border-olive/35"
                >
                  Bizi Tanıyın
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Günlük Üretim', 'Taze Malzeme', 'Özenli Paketleme', 'Paket Servis'].map((tag, index) => (
                  <span
                    key={tag}
                    className="rounded-full border border-olive/10 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-olive/80"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative" delay={100}>
              <div className="absolute -bottom-4 right-4 z-10 hidden rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white shadow-card sm:block">
                Sıcacık teslimat
              </div>
              <div
                className="hero-visual relative overflow-hidden rounded-[2rem] border border-white/70 bg-sand/60 p-3 shadow-card"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                  alt="Ev yemeği sofrası"
                  className="h-[25rem] w-full rounded-[1.5rem] object-cover sm:h-[32rem]"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-card">
              <img
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80"
                alt="Temiz bir mutfakta hazirlanan yemek"
                className="h-[26rem] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={120}>
            <span className="section-kicker">Tanıtım</span>
            <h2 className="section-title">Her Gün Taze, Her Gün Ev Yapımı</h2>
            <p className="section-copy">
              Temiz Yemek olarak lezzetli ev yemeklerini günlük olarak hazırlıyor, seçtiğimiz taze malzemeleri özenle pişiriyor ve sofranıza ulaştırıyoruz.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink/70">
              Samimi mutfak düzeni, temiz üretim anlayışı ve sıcak servis yaklaşımı ile markamızı sadece bir paket servis değil, güven veren bir yemek deneyimi olarak kuruyoruz.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <span className="section-kicker">Neden Temiz Yemek?</span>
            <h2 className="section-title">Günlük ritminize yakışan temiz, sıcak ve güvenilir bir yemek düzeni</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {valueCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 90}>
                <article className="h-full rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-card transition hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream font-display text-xl font-semibold text-olive">
                    {card.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-olive">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/72">{card.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <span className="section-kicker">Görsel Atmosfer</span>
            <h2 className="section-title">Markanın sıcaklığını gösteren editorial bir yemek galerisi</h2>
          </Reveal>
          <div className="mt-10 grid auto-rows-[220px] gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 80}
                className={index === 0 || index === 3 ? 'sm:col-span-2 xl:col-span-1 xl:row-span-2' : ''}
              >
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="hakkimizda" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <Reveal>
            <span className="section-kicker">Hakkımızda</span>
            <h2 className="section-title">Biz Kimiz?</h2>
            <p className="section-copy">
              Temiz Yemek, ev yemeğinin sıcaklığını paket servis kolaylığıyla buluşturmak için kuruldu. Günlük üretim, hijyen, kaliteli malzeme ve iyi yemek bizim için sadece bir tercih değil, çalışma biçimidir.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-ink/72">
              Amacımız; yoğun günlerde yemek hazırlamakla uğraşmadan, evde yapılmış hissini veren güvenilir ve lezzetli yemeklere kolayca ulaşabilmenizi sağlamak.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {trustHighlights.map((item, index) => (
                <div key={item} className="rounded-2xl border border-olive/10 bg-white/85 px-4 py-4 text-sm font-semibold text-olive">
                  {String(index + 1).padStart(2, '0')} {item}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white p-3 shadow-card">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
                alt="Hazırlık sürecinden samimi bir mutfak karesi"
                className="h-[32rem] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <span className="section-kicker">Hazırlık Süreci</span>
            <h2 className="section-title">Mutfağımızdan Sofranıza</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step}
                data-step-index={index}
                className={`rounded-[1.75rem] border p-6 transition duration-500 ${
                  activeStep >= index
                    ? 'border-olive bg-olive text-white shadow-card'
                    : 'border-white/80 bg-white/90 text-ink'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-[0.28em] opacity-70">
                  Adım {index + 1}
                </div>
                <div className="mt-8 text-2xl font-semibold">{step}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-6xl rounded-[2rem] bg-olive px-6 py-12 text-center text-white shadow-card sm:px-10 lg:px-16 lg:py-16">
              <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                WhatsApp Sipariş Hattı
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
                Bugünkü Siparişinizi Verin
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Sipariş ve detaylı bilgi için bize WhatsApp üzerinden ulaşabilirsiniz.
              </p>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-olive transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon />
                WhatsApp'tan Mesaj Gönder
              </a>
            </div>
          </Reveal>
        </section>

        <section id="iletisim" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <span className="section-kicker">İletişim</span>
            <h2 className="section-title">Bize Ulaşın</h2>
            <p className="section-copy">
              Sipariş ve bilgi için yalnızca WhatsApp kullanıyoruz. Hemen yazın, sizi hızlıca yönlendirelim.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="rounded-[2rem] border border-white/80 bg-white p-8 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage">
                  Sipariş ve Bilgi İçin
                </p>
                <h3 className="mt-4 font-display text-4xl font-semibold text-olive">
                  WhatsApp'tan bize ulaşabilirsiniz.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-ink/72">
                  Günün menüsü, servis detayları ve teslimat bilgileri için tek adımda mesaj gönderebilirsiniz.
                </p>
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-apricot px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  <WhatsAppIcon />
                  WhatsApp'tan Yaz
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[2rem] border border-white/80 bg-cream p-8 shadow-card">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-olive/55">Adres</p>
                    <p className="mt-2 text-base font-medium text-ink">{contactConfig.address}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-olive/55">Çalışma Saatleri</p>
                    <p className="mt-2 text-base font-medium text-ink">{contactConfig.workingHours}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-olive/55">Instagram</p>
                    <a
                      href={contactConfig.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex text-base font-medium text-olive underline decoration-olive/25 underline-offset-4"
                    >
                      @temizyemek
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/60 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <a href="#anasayfa" className="flex items-center gap-3 font-display text-3xl font-semibold tracking-[0.14em] text-olive">
              <LogoMark className="h-11 w-11" />
              <span>Temiz Yemek</span>
            </a>
            <p className="mt-3 text-base text-ink/68">Ev yemeğinin en temiz hâli.</p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex flex-wrap gap-5 text-sm font-medium text-ink/75">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-olive">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-olive text-white"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={contactConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-olive/12 text-olive"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={whatsAppLink}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="WhatsApp'tan Sipariş Ver"
      >
        <WhatsAppIcon />
      </a>

      <div className="mobile-bottom-cta md:hidden">
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-olive px-5 py-4 text-sm font-semibold text-white shadow-card"
        >
          <WhatsAppIcon />
          WhatsApp'tan Sipariş Ver
        </a>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12.05 2C6.55 2 2.1 6.45 2.1 11.95c0 1.76.46 3.47 1.33 4.97L2 22l5.26-1.38c1.45.79 3.08 1.2 4.79 1.2h.01c5.49 0 9.94-4.45 9.94-9.95A9.95 9.95 0 0 0 12.05 2Zm0 18.2c-1.5 0-2.96-.4-4.24-1.15l-.3-.18-3.12.82.84-3.04-.2-.31a8.28 8.28 0 0 1-1.28-4.4c0-4.58 3.73-8.31 8.32-8.31 2.22 0 4.3.86 5.86 2.43a8.24 8.24 0 0 1 2.43 5.88c0 4.58-3.73 8.26-8.31 8.26Zm4.56-6.2c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.86-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.43 1.02 2.6.13.17 1.77 2.7 4.28 3.79.6.26 1.07.42 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

function LogoMark({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="4" y="4" width="56" height="56" rx="18" className="fill-cream stroke-olive/15" strokeWidth="1.5" />
      <path
        d="M18 20h28"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M32 20v24"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M24 28l8 9 8-9"
        stroke="#dd8b45"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 37v8"
        stroke="#dd8b45"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.63A4.12 4.12 0 0 0 3.63 7.75v8.5a4.12 4.12 0 0 0 4.12 4.12h8.5a4.12 4.12 0 0 0 4.12-4.12v-8.5a4.12 4.12 0 0 0-4.12-4.12h-8.5Zm8.88 1.22a.97.97 0 1 1 0 1.94.97.97 0 0 1 0-1.94ZM12 6.4A5.6 5.6 0 1 1 6.4 12 5.6 5.6 0 0 1 12 6.4Zm0 1.63A3.97 3.97 0 1 0 15.97 12 3.98 3.98 0 0 0 12 8.03Z" />
    </svg>
  );
}

export default App;
