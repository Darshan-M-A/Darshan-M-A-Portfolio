// Loading Screen Logic
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainPortfolio = document.getElementById('main-portfolio');
    const enterButton = document.getElementById('enter-button');
    const skipButton = document.getElementById('skip-button');
    const loadingText = document.getElementById('loading-text');
    

    window.addEventListener('DOMContentLoaded', () => {
  const hint = document.getElementById('easter-egg-hint');
  if (hint) {
    setTimeout(() => {
      hint.style.transition = 'opacity 1s ease';
      hint.style.opacity = '0';
      setTimeout(() => {
        hint.style.display = 'none';
      }, 1000); // Wait 1s for fade-out before hiding completely
    }, 15000); // Wait 6 seconds before starting fade-out
  }
});

    // Typing effect for loading text
    const messages = [
        "INITIALIZING SPACE SYSTEM...",
        "LOADING QUANTUM PROCESSORS...", 
        "ESTABLISHING COSMIC CONNECTION...",
        "CALIBRATING STAR NAVIGATION...",
        "SYSTEM READY FOR LAUNCH..."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let autoLoadTimeout;

    function typeWriter() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            loadingText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            loadingText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 25 : 60;

        if (!isDeleting && charIndex === currentMessage.length) {
            typeSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typeSpeed = 300;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    function enterPortfolio() {
        clearTimeout(autoLoadTimeout);
        
        // Show main portfolio IMMEDIATELY before hiding loading screen
        mainPortfolio.classList.remove('hidden');
        mainPortfolio.style.opacity = '0';
        mainPortfolio.style.transition = 'opacity 0.8s ease-in';
        
        // Start fading in main portfolio
        setTimeout(() => {
            mainPortfolio.style.opacity = '1';
        }, 50);
        
        // Start fading out loading screen at the same time
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Initialize scroll animations after portfolio is visible
            initializeScrollAnimations();
        }, 800);
    }

    // Start typing effect
    setTimeout(typeWriter, 500);

    // Auto-load after exactly 3 seconds maximum
    autoLoadTimeout = setTimeout(() => {
        enterButton.classList.remove('hidden');
        enterButton.style.animation = 'fadeInUp 0.8s ease-out';
        
        // Auto-proceed immediately to stay within 3 second limit
        setTimeout(enterPortfolio, 200);
    }, 2800);

    // Skip button functionality
    skipButton.addEventListener('click', enterPortfolio);

    // Enter button click handler
    enterButton.addEventListener('click', enterPortfolio);

    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
});

// Navigation Logic
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Mobile menu toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Journey Timeline Animation
function initializeScrollAnimations() {
    const timelineItems = document.querySelectorAll('.journey-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add special glow effect to the node
                    const node = entry.target.querySelector('.journey-node');
                    if (node) {
                        node.style.animation = 'nodeActivate 0.8s ease-out';
                    }
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Initialize other scroll animations
    initializeGeneralAnimations();
}

function initializeGeneralAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all floating elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Contact Form Logic
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simulate form submission
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.style.opacity = '0.7';
    
    setTimeout(() => {
        submitBtn.textContent = 'MESSAGE SENT!';
        submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.opacity = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Chatbot Logic
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotHeader = document.getElementById('chatbot-header');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Enhanced chatbot responses
const chatbotResponses = {
    'hello': "Hello! How can I assist you with my portfolio? ✨",
    'hi': "Hello! How can I assist you with my portfolio? ✨",
    'hey': "Hello! How can I assist you with my portfolio? ✨",
    'education': "I am pursuing my B.Tech degree in Computer Science and Engineering at Sharnbasva University, Kalaburagi, Karnataka, expected to graduate in 2026. 🎓",
    'projects': "I have completed multiple projects including web apps, note-taking apps with authentication, and an entertainment booking platform. Please check the Projects section for live demos and code! 💻",
    'skills': "My technical skills include HTML, CSS, JavaScript, React, Node.js, Python, Golang, database management, Git, Figma, Cloud technologies, and DevOps practices. 🚀",
    'about': "I'm Darshan M Allurkar, a final-year B.Tech student specialized in Computer Science. Passionate about backend development, AI, blockchain, and IoT. 👨‍💻",
    'github': "You can visit my GitHub profile at https://github.com/Darshan-M-A to check all my repositories and contributions! 💼",
    'linkedin': "Find my professional profile on LinkedIn: https://www.linkedin.com/in/darshan-m-allurkar-a8193a27a/ 🔗",
    'instagram': "Follow me on Instagram for coding updates and more: https://www.instagram.com/darshan_m_714 📸",
    'email': "You can reach me at darshanallurkar615@gmail.com 📬",
    'phone': "You can call me at +91 9353157384 📞",
    'experience': "i am a fresher",
    'journey': "My journey includes starting B.Tech in 2022, participating in hackathons, developing multiple projects, and preparing for graduation in 2026! Check the Journey section for the full timeline. 🛤️",
    'university': "I'm studying at Sharnbasva University, Kalaburagi, Karnataka 🏫",
    'graduation': "I'm expected to graduate in 2026 🎉",
    'backend': "I'm passionate about backend development and currently learning Go (Golang) to strengthen my backend development skills. 🔧",
    'technologies': "I'm interested in emerging technologies like AI, blockchain, embedded systems, and IoT. 🤖",
    'internship': "I completed an internship at Octanet pvt limited, VOC, Zaalima Development as a Development Engineer. 💼",
    'hackathon': "I participated in a college hackathon at Sharnbasva University, which enhanced my problem-solving and rapid development skills! 🏆",
    'future': "I aim to start my career as a backend developer or data scientist/analyst, applying my technical skills to deliver practical solutions. 🎯"
};

// Default responses for unrecognized inputs
const defaultResponses = [
    "I'm not sure I understand. You can ask me about my education, skills, projects, journey, contact information, or experience! 🤔",
    "Could you please rephrase that? I can help with information about my background, skills, projects, or contact details. 💭",
    "I didn't catch that. Try asking about my education, skills, projects, experience, journey, or how to contact me! ❓",
    "Sorry, I don't understand. Ask me about my portfolio, skills, education, projects, journey, or contact information! 🚀"
];

let chatbotCollapsed = false;

// Toggle chatbot
chatbotHeader.addEventListener('click', function() {
    chatbotCollapsed = !chatbotCollapsed;
    chatbotBody.classList.toggle('collapsed', chatbotCollapsed);
    
    const icon = document.querySelector('.chatbot-toggle i');
    icon.className = chatbotCollapsed ? 'fas fa-chevron-up' : 'fas fa-robot';
});

// Send message function
function sendMessage() {
    const messageRaw = chatbotInput.value.trim();
    if (!messageRaw) return;

    const message = messageRaw.toLowerCase();

    // Add user message
    addMessage(messageRaw, 'user-message');
    chatbotInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate bot response with delay
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot-message');
    }, 800);
}

// Add message to chat
function addMessage(text, className) {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = `<span>${text}</span>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = '<span>Space Assistant is typing... ⌨️</span>';
    typingDiv.id = 'typing-indicator';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get bot response with enhanced matching
function getBotResponse(msg) {
    // Attempt exact match first
    if (chatbotResponses[msg]) {
        return chatbotResponses[msg];
    }

    // Partial match in chatbotResponses keys
    for (const key in chatbotResponses) {
        if (msg.includes(key)) {
            return chatbotResponses[key];
        }
    }

    // Navigation conditions (check more specific ones first)
    if (msg.includes('skills section')|| msg.includes('skills')|| msg.includes('skill')) {
        window.location.href = '#skills';
        return "Taking you to the Skills section!";
    }
    if (msg.includes('project') || msg.includes('projects section') || msg.includes('project demo') || msg.includes('show me projects')) {
        window.location.href = '#projects';
        return "Navigating to the Projects section where you can see my work demos.";
    }
    if (msg.includes('contact section') || msg.includes('contact form')|| msg.includes('get in touch') || msg.includes('reach you section') || msg.includes('how to contact') || msg.includes('contact')) {
        window.location.href = '#contact';
        return "Opening the Contact section to get in touch!";
    }

    // Other keyword-based responses
    if (msg.includes('email') || msg.includes('phone') || msg.includes('reach you')){
        return "I'm happy to connect! You can use the contact form or email me at darshanallurkar615@gmail.com. My phone number is +91 9353157384.";
    }
    if (msg.includes('github')) {
        return "You can visit my GitHub profile at https://github.com/Darshan-M-A to check all my repositories and contributions.";
    }
    if (msg.includes('linkedin')) {
        return "Find my professional profile on LinkedIn: https://www.linkedin.com/in/darshan-m-allurkar-a8193a27a/";
    }
    if (msg.includes('instagram')) {
        return "Follow me on Instagram for coding updates and more: https://www.instagram.com/darshan_m_714";
    }
    if (msg.includes('graduation') || msg.includes('education') || msg.includes('degree') || msg.includes('university') || msg.includes('school') || msg.includes('college')) {
        return "I am pursuing my B.Tech degree in Computer Science and Engineering at Sharnbasva University, Kalaburagi, Karnataka, expected to graduate in 2026.";
    }
    if (msg.includes('technology') || msg.includes('tech stack') || msg.includes('languages') || msg.includes('tools')) {
        return "My technical skills include HTML, CSS, JavaScript, React, Node.js, Python, Golang, database management, Git, Figma, Cloud technologies, and DevOps practices.";
    }
    if ((msg.includes('what') && msg.includes('do')) || msg.includes('about me') || (msg.includes('tell') && msg.includes('about'))) {
        return "I'm Darshan M Allurkar, a final-year B.Tech student specialized in Computer Science. Passionate about backend development, AI, blockchain, and IoT.";
    }
    if (msg.includes('experience') || msg.includes('internship') || msg.includes('work experience') || msg.includes('professional')) {
        return "I have completed one internship and actively participated in hackathons to enhance my practical skills.";
    }
    if (msg.includes('location') || msg.includes('where are you') || msg.includes('based')) {
        return "I am based in Karnataka, India.";
    }
    if (msg.includes('hobbies') || msg.includes('interests') || msg.includes('free time') || msg.includes('outside coding')) {
        return "In my free time, I enjoy bike riding, fitness activities, gaming, basketball, and music.";
    }
    if (msg.includes('goals') || msg.includes('future plans') || msg.includes('career')) {
        return "I aim to start my career as a backend developer or data scientist/analyst, focusing on practical solutions and continuous learning.";
    }
    if (msg.includes('willing') || msg.includes('work with') || msg.includes('hire') || msg.includes('job') || msg.includes('opportunity') || msg.includes('collaborate')) {
        return "Yes! I’m currently open to internship and full-time job opportunities in backend development and data science. Let’s connect and create something amazing!";
    }
    if (msg.includes('availability') || msg.includes('hire') || msg.includes('job opportunity')) {
        return "I'm currently open to internship and full-time job opportunities in backend development and data science.";
    }
    if (msg.includes('resume') || msg.includes('cv') || msg.includes('download')) {
        return "You can download my CV from the Home section by clicking the 'Download CV' button.";
    }
    if (msg.includes('languages you know') || msg.includes('programming languages')) {
        return "I am proficient in Python, Java, C, JavaScript, and currently learning Go (Golang).";
    }
    if (msg.includes('can you help me') || msg.includes('how can you help')) {
        return "I can help by showcasing my projects, skills, and experience that might be relevant to your requirements. Feel free to ask about anything specific.";
    }

    // Regex for greetings whole word matching
    const greetingsRegex = /\b(hello|hi|hey)\b/;
    if (greetingsRegex.test(msg)) {
        return "Hello! How can I assist you with my portfolio? ✨";
    }

    // Regex for farewell whole word matching
    const farewellsRegex = /\b(bye|see you later|goodbye|thanks|thank you)\b/;
    if (farewellsRegex.test(msg)) {
        return "You're welcome! Feel free to reach out if you have more questions. Have a great day!";
    }

    if (msg.includes('social') || msg.includes('media')) {
        return `You can find me on:\n🐙 GitHub: https://github.com/Darshan-M-A\n💼 LinkedIn: https://www.linkedin.com/in/darshan-m-allurkar-a8193a27a/\n📸 Instagram: https://www.instagram.com/darshan_m_714`;
    }
    if (msg.includes('timeline') || msg.includes('path')) {
        return chatbotResponses.journey;
    }

    // Easter eggs responses
    const easterEggs = {
        'space': 'Welcome to the cosmic dimension of my portfolio! 🚀✨',
        'rocket': 'Ready for launch! 🚀 Let\'s explore the digital universe together!',
        'star': '⭐ You\'re a star for checking out my portfolio!',
        'moon': '🌙 Thanks for visiting my lunar base of coding projects!',
        'alien': '👽 Greetings, fellow digital explorer!',
        'galaxy': '🌌 Welcome to my coding galaxy!',
        'cosmos': '✨ You\'ve entered the cosmos of creativity and code!',
        'robot': '🤖 Beep boop! You\'re talking to a space assistant!',
        'astronaut': '👨‍🚀 Ready to explore the coding cosmos together!'
    };

    for (const egg in easterEggs) {
        if (msg.includes(egg)) {
            return easterEggs[egg];
        }
    }

    // Return random default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Back to top button logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add staggered animations for skills and projects
document.addEventListener('DOMContentLoaded', function() {
    // Add floating delay for staggered animations
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Enhanced scroll animations for sections
function handleScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize sections with initial styles
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Trigger initial scroll check after a delay
    setTimeout(handleScroll, 1000);
});

// Add glitch effect to title on hover
document.addEventListener('DOMContentLoaded', function() {
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        glitchText.addEventListener('animationend', function() {
            this.style.animation = 'textGlow 2s ease-in-out infinite alternate';
        });
    }
});

// Add dynamic CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px) translateY(1px); }
        40% { transform: translateX(2px) translateY(-1px); }
        60% { transform: translateX(-1px) translateY(2px); }
        80% { transform: translateX(1px) translateY(-2px); }
        100% { transform: translateX(0); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes nodeActivate {
        0% { transform: translate(-50%, -50%) scale(0.8); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

// Particle interaction on mouse move
document.addEventListener('mousemove', function(e) {
    const particles = document.querySelectorAll('.cosmic-particle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
        );
        
        if (distance < 100) {
            const angle = Math.atan2(mouseY - particleY, mouseX - particleX);
            const force = (100 - distance) / 100;
            const moveX = Math.cos(angle) * force * 10;
            const moveY = Math.sin(angle) * force * 10;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            particle.style.transform = 'translate(0, 0)';
        }
    });
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const senderEmail = document.getElementById('email').value.trim();
  const subject = encodeURIComponent(document.getElementById('subject').value.trim());
  const message = encodeURIComponent(document.getElementById('message').value.trim());

  const recipient = 'darshanallurkar615@gmail.com'; // Your email address

  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${senderEmail}\n\n${decodeURIComponent(message)}`
  );

  const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${emailBody}`;

  window.location.href = mailtoLink;
});




// Cosmic cursor trail effect (desktop only)
document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) {
        createCosmicTrail(e.clientX, e.clientY);
    }
});

function createCosmicTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.background = '#f99b05c4';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = '0 0 10px #f99b05c4';
    trail.style.opacity = '0.8';
    trail.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 100);
    
    setTimeout(() => {
        if (document.body.contains(trail)) {
            document.body.removeChild(trail);
        }
    }, 1100);
}

// Performance optimization - throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Handle section animations
    handleScroll();

    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// Journey path glow effect on scroll
window.addEventListener('scroll', function() {
    const journeyPath = document.querySelector('.journey-path');
    if (journeyPath) {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const glowIntensity = Math.min(scrollPercent * 2, 1);
        journeyPath.style.boxShadow = `0 0 ${20 + (glowIntensity * 20)}px rgba(249, 155, 5, ${0.3 + (glowIntensity * 0.3)})`;
    }
});

console.log('🚀 Space Portfolio Loaded Successfully! Welcome to the cosmic dimension of code! ✨');
console.log('🛤️ Journey through the timeline with enhanced animations!');
console.log('⚡ Fixed blank screen issue - seamless transition implemented!');