const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll('.reveal, .panel, .skill-card, .timeline-item, .project, .edu, .cert');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 70}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
    }
  });
});

const cards = document.querySelectorAll('.profile-card, .project, .skill-card, .panel, .contact-link');

cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 10;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

const avatar = document.querySelector('.avatar');
if (avatar) {
  avatar.setAttribute('role', 'img');
  avatar.setAttribute('aria-label', 'Haard Shukla profile badge');
}

const heroActions = document.querySelector('.hero-actions');
if (heroActions) {
  const resumeButton = document.createElement('a');
  resumeButton.className = 'btn resume-btn';
  resumeButton.href = '#';
  resumeButton.textContent = 'Download Resume';
  resumeButton.setAttribute('aria-label', 'Download Haard Shukla resume as a text file');

  resumeButton.addEventListener('click', (event) => {
    event.preventDefault();
    const resumeText = [
      'HAARD SHUKLA',
      'Computer Science Engineer | Full-Stack Developer',
      'Bharuch, Gujarat, India',
      'Phone: +91 99980 26676',
      'Email: haard2003@gmail.com',
      'LinkedIn: https://www.linkedin.com/in/haard-shukla-326b911a3',
      '',
      'PROFILE',
      'Computer Science Engineer focused on full-stack web development, intuitive UI/UX, and AI-powered applications.',
      '',
      'EDUCATION',
      'B.Tech, Computer Science & Engineering - P P Savani University (2022-2025), CGPA 6.64',
      'Diploma in Computer Engineering - Ganpat University (2019-2022), CGPA 8.51',
      '',
      'SKILLS',
      'HTML5, CSS3, JavaScript, React.js, Next.js, Bootstrap, Tailwind CSS, Node.js, PHP, Express.js, MySQL, PostgreSQL, Git, GitHub, AI, Machine Learning, UI/UX',
      '',
      'PROJECTS',
      'CaseSync, VEXORA AI, Student Management System, RailTrack AI, LOOP, Tricolour Hospital Website'
    ].join('\n');

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Haard-Shukla-Resume.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  heroActions.appendChild(resumeButton);
}
