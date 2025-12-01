// ===================================
// RETRO 2000s WEBSITE JAVASCRIPT
// ~*~MaXiMuM cHaOs~*~
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initCursorTrail();
    initVisitorCounter();
    initWelcomePopup();
    initClickGame();
    initMagic8Ball();
    initMoodRing();
    initBonziBuddy();
    initFloatingElements();
    initPopupAds();
    initSparkles();
    initAnnoyingAlerts();
    initGuestbook();
    
    // Console Easter Egg
    console.log('%c~*~WeLcOmE 2 My HoMePaGe~*~', 'font-size: 30px; color: #ff00ff; text-shadow: 2px 2px #00ffff; font-family: Comic Sans MS;');
    console.log('%cYou found the secret console! You\'re a real hacker! 😎', 'color: #00ff00;');
    console.log('%cTry typing "eels" in the console for a surprise!', 'color: #ffff00;');
});

// Global variable for easter egg
window.eels = function() {
    alert('⚡⚡⚡ GO THE EELS!!! ⚡⚡⚡\n\nNext year is our year!\n\n(It\'s always next year...)');
    document.body.style.background = 'linear-gradient(45deg, #005baa, #ffd000)';
    setTimeout(() => {
        document.body.style.background = '';
    }, 3000);
};

// ===================================
// Cursor Trail Effect
// ===================================
function initCursorTrail() {
    const container = document.getElementById('cursorTrail');
    const emojis = ['⭐', '✨', '💫', '🌟', '⚡', '💖', '🔥', '🌈'];
    
    let lastX = 0;
    let lastY = 0;
    let throttle = false;
    
    document.addEventListener('mousemove', (e) => {
        if (throttle) return;
        throttle = true;
        
        setTimeout(() => {
            throttle = false;
        }, 50);
        
        // Only create trail if mouse moved enough
        const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
        if (distance < 20) return;
        
        lastX = e.clientX;
        lastY = e.clientY;
        
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        star.style.left = e.clientX + 'px';
        star.style.top = e.clientY + 'px';
        
        container.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 1000);
    });
}

// ===================================
// Visitor Counter
// ===================================
function initVisitorCounter() {
    // Fake visitor count that increases
    let baseCount = 42069;
    const stored = localStorage.getItem('visitorCount');
    
    if (stored) {
        baseCount = parseInt(stored) + Math.floor(Math.random() * 10);
    }
    
    localStorage.setItem('visitorCount', baseCount);
    
    // Update counter displays
    const visitorSpan = document.getElementById('visitorCount');
    const welcomeNum = document.getElementById('welcomeVisitorNum');
    
    if (visitorSpan) {
        visitorSpan.textContent = baseCount.toString().padStart(6, '0');
    }
    
    if (welcomeNum) {
        welcomeNum.textContent = baseCount;
    }
    
    // Animate hit counter
    const counterDigits = document.querySelectorAll('#hitCounter span');
    const countStr = baseCount.toString().padStart(6, '0');
    
    counterDigits.forEach((digit, i) => {
        setTimeout(() => {
            digit.textContent = countStr[i];
            digit.style.animation = 'none';
            digit.offsetHeight; // Trigger reflow
            digit.style.animation = 'digitFlip 0.3s ease';
        }, i * 100);
    });
}

// ===================================
// Welcome Popup
// ===================================
function initWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    
    // Show popup after a short delay
    setTimeout(() => {
        popup.style.display = 'flex';
        
        // Play annoying sound effect (just kidding, that would be too evil)
        // But we can make the page shake!
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }, 1000);
    
    // Close on click outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeWelcome();
        }
    });
}

function closeWelcome() {
    const popup = document.getElementById('welcomePopup');
    popup.style.display = 'none';
    
    // Show age verification after a delay (for the memes)
    setTimeout(() => {
        document.getElementById('agePopup').style.display = 'flex';
    }, 5000);
}

function enableAwesomeMode() {
    closeWelcome();
    document.body.classList.add('awesome-mode');
    
    alert('🎸 AWESOME MODE ACTIVATED!!! 🎸\n\nEverything is now 200% more EXTREME!!!');
    
    // Add extra chaos
    setTimeout(() => {
        document.body.classList.remove('awesome-mode');
    }, 10000);
}

function verifyAge(isOldEnough) {
    document.getElementById('agePopup').style.display = 'none';
    
    if (isOldEnough) {
        alert('Welcome to the pain train! 🚂💔\n\nYou are now officially an Eels fan.\n\nThere is no going back.');
    } else {
        // Redirect to something "safe"
        alert('Redirecting you to a safer place...\n\n(Just kidding, you\'re stuck here forever!)');
    }
}

// ===================================
// Click the Eel Game
// ===================================
let clickScore = 0;

function initClickGame() {
    const gameArea = document.getElementById('clickGame');
    const target = document.getElementById('eelTarget');
    const scoreDisplay = document.getElementById('clickScore');
    
    function moveEel() {
        const maxX = gameArea.offsetWidth - 50;
        const maxY = gameArea.offsetHeight - 50;
        
        target.style.left = Math.random() * maxX + 'px';
        target.style.top = Math.random() * maxY + 'px';
    }
    
    target.addEventListener('click', () => {
        clickScore++;
        scoreDisplay.textContent = clickScore;
        moveEel();
        
        // Add sparkle effect
        createSparkle(target);
        
        // Easter eggs at certain scores
        if (clickScore === 10) {
            alert('10 eels caught! You\'re getting good at this!');
        } else if (clickScore === 25) {
            alert('25 eels! You should be a professional eel catcher!');
        } else if (clickScore === 50) {
            alert('50 EELS!!! 🏆\n\nYou win... nothing! But great job!');
        }
    });
    
    // Start moving
    moveEel();
    setInterval(moveEel, 2000);
}

function resetClickGame() {
    clickScore = 0;
    document.getElementById('clickScore').textContent = '0';
    alert('Score reset! Try again!');
}

// ===================================
// Magic 8 Ball
// ===================================
function initMagic8Ball() {
    // Already set up in HTML
}

function shake8Ball() {
    const ball = document.getElementById('magic8ball');
    const answer = document.getElementById('ballAnswer');
    
    const answers = [
        'YES!!!',
        'NO WAY',
        'MAYBE...',
        'ASK AGAIN',
        'DEFINITELY',
        'UNLIKELY',
        'EELS WILL WIN',
        'LOL NO',
        'TRY LATER',
        'SIGNS SAY YES',
        'DON\'T COUNT ON IT',
        'OUTLOOK GOOD',
        'VERY DOUBTFUL',
        'WITHOUT A DOUBT',
        'MY SOURCES SAY NO',
        'CONCENTRATE AND ASK AGAIN'
    ];
    
    ball.classList.add('shaking');
    answer.textContent = '...';
    
    setTimeout(() => {
        ball.classList.remove('shaking');
        answer.textContent = answers[Math.floor(Math.random() * answers.length)];
    }, 500);
}

// ===================================
// Mood Ring
// ===================================
const moods = [
    { color: 'linear-gradient(135deg, #4169e1, #000080)', mood: 'Calm & Relaxed 😌', text: '#4169e1' },
    { color: 'linear-gradient(135deg, #32cd32, #006400)', mood: 'Happy & Energetic 😄', text: '#32cd32' },
    { color: 'linear-gradient(135deg, #ff0000, #8b0000)', mood: 'Passionate & Excited 🔥', text: '#ff0000' },
    { color: 'linear-gradient(135deg, #800080, #4b0082)', mood: 'Mysterious & Creative 🔮', text: '#800080' },
    { color: 'linear-gradient(135deg, #ffd700, #ff8c00)', mood: 'Optimistic & Cheerful ☀️', text: '#ffd700' },
    { color: 'linear-gradient(135deg, #000000, #333333)', mood: 'Stressed (probably thinking about Eels) 😰', text: '#666666' },
    { color: 'linear-gradient(135deg, #ff69b4, #ff1493)', mood: 'In Love 💕', text: '#ff69b4' },
    { color: 'linear-gradient(135deg, #00ffff, #008b8b)', mood: 'Cool & Collected 😎', text: '#00ffff' }
];

function changeMood() {
    const gem = document.querySelector('.ring-gem');
    const moodText = document.getElementById('moodText');
    
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    
    gem.style.background = randomMood.color;
    moodText.textContent = randomMood.mood;
    moodText.style.color = randomMood.text;
}

function initMoodRing() {
    // Initialize with a random mood
    changeMood();
}

// ===================================
// Bonzi Buddy
// ===================================
const bonziFacts = [
    'Did you know? The Eels last won a premiership in 1986!',
    'Fun fact: Jordan has been to 15+ countries!',
    'Hot tip: Sign the guestbook for good luck!',
    'Did you know? This website is best viewed in 800x600!',
    'Fun fact: Jordan is a Senior Business Analyst!',
    'Remember: Next year is ALWAYS the Eels\' year!',
    'Did you know? You can click me for more facts!',
    'Hot tip: Try the Magic 8 Ball for life advice!',
    'Fun fact: Jordan attended the 2018 World Cup!',
    'Remember: Vote for this site! It\'s really cool!',
    'Did you know? The Konami code does something special...',
    'Fun fact: Jordan plays social soccer!',
    'Hot tip: Check out the web rings at the bottom!',
    'Did you know? You\'re visitor #' + (localStorage.getItem('visitorCount') || '42069') + '!',
    'Remember: Don\'t forget to bookmark this page!'
];

function initBonziBuddy() {
    const bonzi = document.getElementById('bonziBuddy');
    const speech = document.getElementById('bonziSpeech');
    const speechText = speech.querySelector('p');
    
    bonzi.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            const randomFact = bonziFacts[Math.floor(Math.random() * bonziFacts.length)];
            speechText.textContent = randomFact;
            speech.style.display = 'block';
        }
    });
    
    // Random popup messages
    setInterval(() => {
        if (Math.random() > 0.7) {
            const randomFact = bonziFacts[Math.floor(Math.random() * bonziFacts.length)];
            speechText.textContent = randomFact;
            speech.style.display = 'block';
            
            setTimeout(() => {
                speech.style.display = 'none';
            }, 5000);
        }
    }, 30000);
}

function closeBonzi() {
    document.getElementById('bonziSpeech').style.display = 'none';
}

// ===================================
// Floating Elements
// ===================================
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-item');
    
    elements.forEach(el => {
        // Randomize starting position
        el.style.top = Math.random() * 80 + '%';
        el.style.left = Math.random() * 100 + '%';
    });
}

// ===================================
// Popup Ads (The Best Part!)
// ===================================
const fakeAds = [
    {
        title: '🔥 HOT SINGLES IN YOUR AREA! 🔥',
        content: 'Just kidding! But there ARE hot Eels games in your area!',
        button: 'SHOW ME THE FOOTY!'
    },
    {
        title: '💰 YOU WON $1,000,000!!! 💰',
        content: 'Nah just kidding. But you DID win my respect for visiting this site!',
        button: 'CLAIM MY RESPECT'
    },
    {
        title: '⚠️ YOUR COMPUTER HAS A VIRUS! ⚠️',
        content: 'The virus is called "Eels Fandom" and there is NO CURE!',
        button: 'EMBRACE THE PAIN'
    },
    {
        title: '🎰 SPIN TO WIN FREE iPOD!!! 🎰',
        content: 'Remember iPods? Good times. Anyway, sign my guestbook!',
        button: 'I MISS 2005'
    },
    {
        title: '💪 DOCTORS HATE THIS ONE TRICK! 💪',
        content: 'The trick is supporting the Eels. It builds character through suffering.',
        button: 'SHOW ME THE TRICK'
    },
    {
        title: '🌟 CONGRATULATIONS!!! 🌟',
        content: 'You\'ve been selected to receive absolutely nothing! But thanks for visiting!',
        button: 'CLAIM NOTHING'
    },
    {
        title: '🔮 FREE PSYCHIC READING! 🔮',
        content: 'I predict... the Eels will break your heart again next season.',
        button: 'TELL ME MORE'
    },
    {
        title: '📧 YOU HAVE 47 NEW MESSAGES! 📧',
        content: 'They\'re all from me asking you to sign the guestbook!',
        button: 'CHECK MESSAGES'
    },
    {
        title: '🎮 PLAY FREE GAMES NOW!!! 🎮',
        content: 'We have Click the Eel! It\'s the only game you need!',
        button: 'PLAY NOW'
    },
    {
        title: '🔥 ENLARGE YOUR... 🔥',
        content: '...knowledge of the Parramatta Eels! What did you think I meant?',
        button: 'LEARN MORE'
    }
];

function initPopupAds() {
    // Show first ad after 10 seconds
    setTimeout(showRandomAd, 10000);
    
    // Show winner popup randomly
    setTimeout(() => {
        if (Math.random() > 0.5) {
            document.getElementById('winnerPopup').style.display = 'flex';
        }
    }, 45000);
}

function showRandomAd() {
    const container = document.getElementById('popupContainer');
    const ad = fakeAds[Math.floor(Math.random() * fakeAds.length)];
    
    const popup = document.createElement('div');
    popup.className = 'fake-ad';
    popup.style.top = Math.random() * 50 + 10 + '%';
    popup.style.left = Math.random() * 50 + 10 + '%';
    
    popup.innerHTML = `
        <div class="ad-header">
            <span>Advertisement</span>
            <button class="ad-close" onclick="this.parentElement.parentElement.remove()">X</button>
        </div>
        <div class="ad-content">
            <h3>${ad.title}</h3>
            <p>${ad.content}</p>
            <button onclick="adClicked(this)">${ad.button}</button>
        </div>
    `;
    
    container.appendChild(popup);
    
    // Make draggable
    makeDraggable(popup);
    
    // Schedule next ad
    setTimeout(showRandomAd, 20000 + Math.random() * 30000);
}

function adClicked(btn) {
    const responses = [
        'Thanks for clicking! Nothing happened but I appreciate it!',
        'You actually clicked it! 😂 You\'re awesome!',
        'CLICK REGISTERED! You\'re now subscribed to Eels facts!',
        'Congratulations! You won the satisfaction of clicking a button!',
        'ERROR 404: Prize not found. But here\'s a virtual high five! ✋',
        'Loading... just kidding, there\'s nothing to load!',
        'You fell for it! Classic! 😄',
        'Achievement Unlocked: Clicked a Fake Ad!'
    ];
    
    alert(responses[Math.floor(Math.random() * responses.length)]);
    btn.parentElement.parentElement.remove();
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    const header = element.querySelector('.ad-header');
    header.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// ===================================
// Winner Popup
// ===================================
function claimPrize() {
    alert('🎉 CONGRATULATIONS!!! 🎉\n\nYour prize is:\n\n✨ The eternal hope that the Eels will win next year ✨\n\n(Terms: Hope may lead to disappointment)');
    document.getElementById('winnerPopup').style.display = 'none';
}

function closeWinner() {
    alert('You\'re refusing a FREE prize?!\n\nFine, more hope for the rest of us!');
    document.getElementById('winnerPopup').style.display = 'none';
}

// ===================================
// Sparkle Effects
// ===================================
function initSparkles() {
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            createSparkleAt(e.clientX, e.clientY);
        }
    });
}

function createSparkle(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        createSparkleAt(x, y);
    }
}

function createSparkleAt(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (x + (Math.random() - 0.5) * 50) + 'px';
    sparkle.style.top = (y + (Math.random() - 0.5) * 50) + 'px';
    sparkle.style.background = `radial-gradient(circle, ${getRandomColor()}, transparent)`;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

function getRandomColor() {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8f00ff', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===================================
// Annoying Random Alerts
// ===================================
function initAnnoyingAlerts() {
    const alerts = [
        'Don\'t forget to sign my guestbook! 📝',
        'Have you voted for my site yet? 🗳️',
        'Remember: GO THE EELS! ⚡',
        'Thanks for visiting! You\'re awesome! 🌟',
        'Did you try the Magic 8 Ball? 🎱',
        'Click on Bonzi for fun facts! 🦍'
    ];
    
    // Random alert every 60-120 seconds
    setInterval(() => {
        if (Math.random() > 0.7) {
            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            // Use a less intrusive notification
            showNotification(randomAlert);
        }
    }, 60000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(180deg, #ffff00, #ff8c00);
        border: 3px outset #ffffff;
        padding: 15px 20px;
        color: #000;
        font-family: 'Comic Neue', cursive;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        cursor: pointer;
    `;
    notification.textContent = message;
    notification.onclick = () => notification.remove();
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 5000);
}

// ===================================
// Guestbook
// ===================================
function initGuestbook() {
    // Load saved entries
    const savedEntries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    
    savedEntries.forEach(entry => {
        addGuestbookEntry(entry.name, entry.message, entry.date, false);
    });
}

function submitGuestbook(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value || 'Anonymous';
    const message = document.getElementById('guestMessage').value;
    
    if (!message) {
        alert('Please write a message! Don\'t be shy!');
        return;
    }
    
    const date = new Date().toLocaleDateString();
    
    addGuestbookEntry(name, message, date, true);
    
    // Save to localStorage
    const savedEntries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    savedEntries.unshift({ name, message, date });
    localStorage.setItem('guestbookEntries', JSON.stringify(savedEntries.slice(0, 10)));
    
    // Clear form
    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
    
    alert('Thanks for signing my guestbook! You\'re the best! 🌟');
}

function addGuestbookEntry(name, message, date, prepend) {
    const container = document.querySelector('.guestbook-entries');
    
    const entry = document.createElement('div');
    entry.className = 'guestbook-entry';
    entry.innerHTML = `
        <p class="entry-author">${escapeHtml(name)} wrote:</p>
        <p class="entry-text">${escapeHtml(message)}</p>
        <p class="entry-date">Posted: ${date}</p>
    `;
    
    if (prepend) {
        container.insertBefore(entry, container.firstChild);
    } else {
        container.appendChild(entry);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Photo Enlargement
// ===================================
function enlargePhoto(frame) {
    const placeholder = frame.querySelector('.photo-placeholder');
    const text = placeholder.textContent;
    
    alert(`📸 ${text} 📸\n\n(Imagine a beautiful photo here!)\n\nReal photos coming soon... maybe... probably not...`);
}

// ===================================
// Konami Code Easter Egg
// ===================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateKonamiCode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiCode() {
    alert('🎮 KONAMI CODE ACTIVATED!!! 🎮\n\n+30 LIVES!\n+UNLIMITED POWER!\n+EELS PREMIERSHIP!\n\n(One of these is a lie)');
    
    // Rainbow explosion!
    document.body.style.animation = 'awesomeBg 0.5s infinite';
    
    // Create confetti
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${getRandomColor()};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 10000;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }
    
    // Add confetti animation
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
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ===================================
// Add shake animation
// ===================================
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes digitFlip {
        0% { transform: rotateX(90deg); }
        100% { transform: rotateX(0deg); }
    }
`;
document.head.appendChild(shakeStyle);

// ===================================
// Random cursor changes
// ===================================
const cursors = ['⭐', '🌟', '✨', '💫', '⚡', '🔥', '💖', '🎮'];
setInterval(() => {
    const randomCursor = cursors[Math.floor(Math.random() * cursors.length)];
    document.body.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ctext y='24' font-size='24'%3E${randomCursor}%3C/text%3E%3C/svg%3E"), auto`;
}, 10000);

// ===================================
// Status bar message (like old IE)
// ===================================
window.status = 'Welcome to Jordan\'s Homepage! ★★★';

// ===================================
// Prevent right-click (old school move!)
// ===================================
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('🚫 NO STEALING MY CODE!!! 🚫\n\n(Just kidding, view source all you want! 😄)');
});

// ===================================
// Page visibility change
// ===================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '😢 COME BACK!!! - Jordan\'s Homepage';
    } else {
        document.title = '~*~JoRdAn VaZ~*~ WeLcOmE 2 My HoMePaGe!!! ★★★';
    }
});

// ===================================
// Before unload warning
// ===================================
window.addEventListener('beforeunload', (e) => {
    // This won't show a custom message in modern browsers, but it will prompt
    e.preventDefault();
    e.returnValue = '';
});

console.log('%c🎉 All retro features loaded! Enjoy the chaos! 🎉', 'color: #ff00ff; font-size: 16px;');
