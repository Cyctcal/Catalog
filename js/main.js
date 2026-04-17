/* =============================================
   LUXELE - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }

    // Mobile Category Toggle
    document.querySelectorAll('.mobile-cat-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var list = btn.nextElementSibling;
            var icon = btn.querySelector('i');
            if (list) list.classList.toggle('hidden');
            if (icon) icon.classList.toggle('rotate-180');
        });
    });

    // Search Overlay
    var searchToggle = document.getElementById('search-toggle');
    var searchOverlay = document.getElementById('search-overlay');
    var searchInput = document.getElementById('search-input');
    var searchClose = document.getElementById('search-close');

    function openSearch() {
        if (searchOverlay) searchOverlay.classList.remove('hidden');
        if (searchInput) searchInput.focus();
    }

    function closeSearch() {
        if (searchOverlay) searchOverlay.classList.add('hidden');
        if (searchInput) searchInput.value = '';
    }

    if (searchToggle) searchToggle.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay) closeSearch();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSearch();
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });

    // Scroll Animations
    var animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkVisibility() {
        animateElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // Header Scroll Effect
    var header = document.querySelector('header');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });

    // Back to Top Button
    var backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Product Filter (for products page)
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var category = btn.getAttribute('data-category');
            var productCards = document.querySelectorAll('.product-item');

            productCards.forEach(function (card) {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Handling
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                submitBtn.classList.remove('bg-primary');
                submitBtn.classList.add('bg-green-500');

                setTimeout(function () {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-500');
                    submitBtn.classList.add('bg-primary');
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Hero Carousel
    var heroSlides = document.querySelectorAll('.hero-slide');
    var heroDots = document.querySelectorAll('.hero-dot');
    var heroSection = document.getElementById('hero');
    var currentSlide = 0;
    var slideCount = heroSlides.length;
    var heroInterval;

    function showSlide(index) {
        heroSlides.forEach(function (s) { s.classList.remove('active'); });
        heroDots.forEach(function (d) { d.classList.remove('active'); });
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slideCount);
    }

    function startHeroCarousel() {
        if (slideCount > 1) {
            heroInterval = setInterval(nextSlide, 5000);
        }
    }

    function resetHeroCarousel() {
        clearInterval(heroInterval);
        startHeroCarousel();
    }

    if (slideCount > 0) {
        heroDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                showSlide(parseInt(dot.getAttribute('data-index')));
                resetHeroCarousel();
            });
        });

        if (heroSection) {
            heroSection.addEventListener('mouseenter', function () { clearInterval(heroInterval); });
            heroSection.addEventListener('mouseleave', startHeroCarousel);
        }

        startHeroCarousel();
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
