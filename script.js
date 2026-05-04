// Scroll-based fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to sections
  const animatedElements = document.querySelectorAll(
    '.for-you-card, .service-card, .framework-card, .stat-card, .work-card, ' +
    '.success-logo-card, .section-title, .framework-header, .success-header, ' +
    '.testimonial-container, .demo-card, .learning-container, .video-container, ' +
    '.hero-container, .client-logos'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.style.borderBottomColor = 'rgba(30, 30, 30, 0.8)';
    } else {
      navbar.style.borderBottomColor = 'rgba(30, 30, 30, 0.3)';
    }

    lastScrollY = currentScrollY;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Calendar interaction
  const calendarDates = document.querySelectorAll('.calendar-dates span');
  calendarDates.forEach(date => {
    date.addEventListener('click', () => {
      calendarDates.forEach(d => d.classList.remove('active'));
      if (date.textContent.trim()) {
        date.classList.add('active');
      }
    });
  });

  // Time slot interaction
  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
    });
  });

  // Staggered animation for grid items
  const staggerContainers = [
    { selector: '.for-you-grid', children: '.for-you-card' },
    { selector: '.services-grid', children: '.service-card' },
    { selector: '.success-stats', children: '.stat-card' }
  ];

  staggerContainers.forEach(({ selector, children }) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const items = container.querySelectorAll(children);

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((item, index) => {
              item.style.transitionDelay = `${index * 0.1}s`;
              item.classList.add('visible');
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    staggerObserver.observe(container);
  });

  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const match = text.match(/(\d+)/);

          if (match) {
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const increment = Math.ceil(target / 40);
            const duration = 1500;
            const stepTime = duration / (target / increment);

            const counter = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(counter);
              }
              el.textContent = current + suffix;
            }, stepTime);
          }

          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => statsObserver.observe(el));
});
