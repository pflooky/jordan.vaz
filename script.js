// ===================================
// Jordan Vaz - Personal Website
// Interactive JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initFloatingBalls();
    initNavigation();
    initTypewriter();
    initCounters();
    initSkillBars();
    initTimeline();
    initSportsTabs();
    initQuiz();
    initRandomFacts();
    initEasterEgg();
    initScrollAnimations();
    initTiltEffect();
});

// ===================================
// Floating Sports Balls Background
// ===================================
function initFloatingBalls() {
    const container = document.getElementById('floatingBalls');
    const balls = ['🏉', '🏏', '⚽', '🏈', '⚡'];
    const numBalls = 15;
    
    for (let i = 0; i < numBalls; i++) {
        const ball = document.createElement('div');
        ball.className = 'floating-ball';
        ball.textContent = balls[Math.floor(Math.random() * balls.length)];
        ball.style.left = `${Math.random() * 100}%`;
        ball.style.top = `${Math.random() * 100}%`;
        ball.style.animationDelay = `${Math.random() * 20}s`;
        ball.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(ball);
    }
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Typewriter Effect
// ===================================
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const phrases = [
        'Senior Business Analyst',
        'Parramatta Eels Tragic',
        'NSW Blues Supporter',
        'Cricket Enthusiast',
        'World Traveller',
        'Social Soccer Player',
        'Brisbane Local',
        'CPA in Progress'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ===================================
// Animated Counters
// ===================================
function initCounters() {
    const stats = document.querySelectorAll('.stat');
    const travelNumbers = document.querySelectorAll('.travel-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countElement = target.querySelector('.stat-number') || target;
                const endValue = parseInt(target.dataset.count);
                
                animateCounter(countElement, endValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
    travelNumbers.forEach(num => {
        num.dataset.count = num.dataset.count || num.textContent;
        observer.observe(num);
    });
}

function animateCounter(element, endValue) {
    let startValue = 0;
    const duration = 2000;
    const increment = endValue / (duration / 16);
    
    const counter = setInterval(() => {
        startValue += increment;
        
        if (startValue >= endValue) {
            element.textContent = endValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(startValue);
        }
    }, 16);
}

// ===================================
// Skill Bars Animation
// ===================================
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const skillFill = skillItem.querySelector('.skill-fill');
                const skillLevel = skillItem.dataset.skill;
                
                setTimeout(() => {
                    skillFill.style.width = `${skillLevel}%`;
                }, 200);
                
                observer.unobserve(skillItem);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}

// ===================================
// Timeline Animation
// ===================================
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '-50px' });
    
    timelineItems.forEach(item => observer.observe(item));
}

// ===================================
// Sports Tabs
// ===================================
function initSportsTabs() {
    const tabs = document.querySelectorAll('.sport-tab');
    const panels = document.querySelectorAll('.sport-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sport = tab.dataset.sport;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === sport) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// ===================================
// Quiz Functionality
// ===================================
function initQuiz() {
    const quizContainer = document.getElementById('quiz');
    const questions = quizContainer.querySelectorAll('.quiz-question');
    const result = document.getElementById('quizResult');
    let currentQuestion = 0;
    let score = 0;
    
    quizContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-option')) {
            const option = e.target;
            const question = questions[currentQuestion];
            const options = question.querySelectorAll('.quiz-option');
            
            // Disable all options
            options.forEach(opt => opt.disabled = true);
            
            // Show correct/wrong
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('wrong');
                // Show correct answer
                options.forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Move to next question after delay
            setTimeout(() => {
                question.classList.remove('active');
                currentQuestion++;
                
                if (currentQuestion < questions.length) {
                    questions[currentQuestion].classList.add('active');
                } else {
                    showQuizResult(score, questions.length);
                }
            }, 1500);
        }
    });
    
    function showQuizResult(score, total) {
        result.classList.add('active');
        const resultContent = result.querySelector('.result-content');
        
        if (score === total) {
            resultContent.innerHTML = `
                <span class="result-emoji">🏆</span>
                <h4>True Blue Legend!</h4>
                <p>Perfect score! You know your Eels. Welcome to the pain train. 🔵🟡</p>
            `;
        } else if (score >= total / 2) {
            resultContent.innerHTML = `
                <span class="result-emoji">👍</span>
                <h4>Not Bad!</h4>
                <p>You got ${score}/${total}. You're on your way to becoming a true fan!</p>
            `;
        } else {
            resultContent.innerHTML = `
                <span class="result-emoji">😅</span>
                <h4>Back to Basics!</h4>
                <p>You got ${score}/${total}. Time to watch some classic Eels games!</p>
            `;
        }
    }
}

// ===================================
// Random Facts Generator
// ===================================
function initRandomFacts() {
    const factBtn = document.getElementById('factBtn');
    const factDisplay = document.getElementById('randomFact');
    
    const facts = [
        "Jordan has been supporting the Eels since before they last won a premiership. That's dedication.",
        "He attended the 2018 FIFA World Cup in Russia. The Socceroos were robbed. 🇷🇺",
        "Jordan completed all three levels of the Duke of Edinburgh Award. Overachiever much?",
        "He's a qualified CPA (in progress). Numbers are his love language.",
        "Jordan moved from Sydney to Brisbane but still bleeds NSW Blue for Origin. 💙",
        "He plays social soccer. Midfielder energy with yellow card tendencies.",
        "Jordan has worked across APAC, so he's basically an international man of mystery.",
        "He conquered the Moroccan desert. Camels were involved. 🐪",
        "Jordan's been to more countries than the Eels have won premierships. Low bar, but still impressive.",
        "He's a Senior Business Analyst who actually enjoys spreadsheets. Rare breed.",
        "Jordan's Origin banter is next level, especially living in Queensland.",
        "He's been known to name every Eels player since 1986. It's a blessing and a curse.",
        "Jordan's favourite saying: 'Next year is our year.' - Every Eels fan ever.",
        "He's explored Croatia's coastline. Island hopping is his cardio. 🇭🇷",
        "Jordan stood at Brandenburg Gate and definitely took the tourist photo. 🇩🇪"
    ];
    
    factBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factDisplay.style.opacity = 0;
        
        setTimeout(() => {
            factDisplay.textContent = facts[randomIndex];
            factDisplay.style.opacity = 1;
        }, 300);
    });
}

// ===================================
// Easter Egg (Konami Code)
// ===================================
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const easterEgg = document.getElementById('easterEgg');
    const closeBtn = document.getElementById('closeEasterEgg');
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                easterEgg.classList.add('active');
                konamiIndex = 0;
                
                // Confetti effect
                createConfetti();
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    closeBtn.addEventListener('click', () => {
        easterEgg.classList.remove('active');
    });
    
    easterEgg.addEventListener('click', (e) => {
        if (e.target === easterEgg) {
            easterEgg.classList.remove('active');
        }
    });
}

function createConfetti() {
    const colors = ['#005baa', '#ffd000', '#ffffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 10000;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
    
    // Add confetti animation if not exists
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .adventure-card, .banter-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// Tilt Effect for Cards
// ===================================
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===================================
// Smooth Scroll for All Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Add some fun console messages
// ===================================
console.log('%c🏉 G\'day! Welcome to Jordan Vaz\'s website!', 'font-size: 20px; color: #ffd000; background: #005baa; padding: 10px; border-radius: 5px;');
console.log('%c⚡ Go the Eels! Next year is our year!', 'font-size: 14px; color: #005baa;');
console.log('%c💡 Try the Konami Code for a surprise...', 'font-size: 12px; color: #666;');

