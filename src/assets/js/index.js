const toggle = () => {
   const navBtn = document.querySelector('.nav__btn');
   const navBg = document.querySelector('.nav__background');
   const navLinks = document.querySelectorAll('.nav__menu-link');

   navBtn.classList.toggle('active');
   navBg.classList.toggle('show');
   navLinks.forEach(link => {
      link.classList.toggle("show");
   })
};

lightGallery(document.getElementById('captions'), {
   mode: 'lg-slide-circular',
});


//It also supports NodeList
VanillaTilt.init(document.querySelectorAll(".card__item"), {
   max: 25,
   speed: 100
});


ScrollReveal({ reset: true });


ScrollReveal().reveal('.products', { delay: 400 });

ScrollReveal().reveal('.service__item--1', { delay: 200 });
ScrollReveal().reveal('.service__item--2', { delay: 400 });
ScrollReveal().reveal('.service__item--3', { delay: 600 });
ScrollReveal().reveal('.service__item--4', { delay: 800 });


ScrollReveal().reveal('.card__item--1', { delay: 200 });
ScrollReveal().reveal('.card__item--2', { delay: 400 });
ScrollReveal().reveal('.card__item--3', { delay: 600 });
ScrollReveal().reveal('.card__item--4', { delay: 800 });

ScrollReveal().reveal('.contact', { delay: 300 });


ScrollReveal().reveal('.footer', { delay: 300 });

