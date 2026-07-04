// Typing animation
const phrases = [
    {text: "Network Engineer.", deleteUntil: 5},
    {text: "I'm a AI Enthusiast.", deleteUntil: 0},
    {text: "and also a Geek.", deleteUntil: 0}
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenPhrases = 1000;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;  // Exit if element doesn't exist

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.text.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.text.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.text.length) {
        isDeleting = true;
        setTimeout(typeText, pauseBetweenPhrases);
    } else if (isDeleting && charIndex === currentPhrase.deleteUntil) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Hamburger menu
function toggleMenu(e) {
    if (e) {
        e.stopPropagation();
    }
    const menus = document.querySelectorAll(".menu-links");
    const icons = document.querySelectorAll(".hamburger-icon");
    menus.forEach(menu => menu.classList.toggle("open"));
    icons.forEach(icon => icon.classList.toggle("open"));
}

// Project management
const projects = [
  {
    "name": "CONFIGURE MY OWN HOME SERVER (PART 2)",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/15cKAEq6_Mb_b7sO-bf26SguCp4saxLc8?usp=drive_link",
    "isnew": true
  },
  {
    "name": "BASIC DATACOM SIMULATION FOR ROUTER & SWITCH",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1-3IKt8alxLHquHUp7q304o2K58-X8Cbr",
    "isnew": true
  },
  {
    "name": "LEVERAGE TASKS WITH AI",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1GdOpu-EyyUGgBQ_H1LkgWEzYgVCVOkrU",
    "isnew": true
  },
  {
    "name": "AUTOMATE TASKS WITH PYTHON",
    "description": "NULL",
    "url": "https://github.com/engkufizz/AutomateTools",
    "isnew": true
  },
  {
    "name": "TRAIN GPT WITH LARGE TEXT DATA",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1-zV-gpjkN4yG9W8fFlP_KzHku0MAPxb8",
    "isnew": true
  },
  {
    "name": "MY SECOND BRAIN WITH AI",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1-3xS_8uHGA-v4xbg3UnEKxSQFok_2T4J",
    "isnew": true
  },
  {
    "name": "MY OWN GPT @ minGPT (OFFLINE)",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/107bkkkt9UaOzhuZevulDu7BQxfU__k7n",
    "isnew": true
  },
  {
    "name": "TALK TO THE PRIVATE DOCUMENTS LOCALLY",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1135e1n7sbZS8oJ1AsHWgUb5U2ypqNzwa",
    "isnew": true
  },
  {
    "name": "FINE-TUNING LLM USING QLoRA (CUSTOM DATASET)",
    "description": "NULL",
    "url": "https://huggingface.co/engkufizz/falcon-7b-qlora-datacom",
    "isnew": true
  },
  {
    "name": "FINE-TUNING LLAMA 2 WITH CUSTOM DATASET",
    "description": "NULL",
    "url": "https://huggingface.co/engkufizz/llama-2-7b-datacom",
    "isnew": true
  },
  {
    "name": "CREATE a CUSTOM DATASET for SPECIFIC CASES",
    "description": "NULL",
    "url": "https://huggingface.co/datasets/engkufizz/router-switch-instruct",
    "isnew": true
  },
  {
    "name": "QUANTIZE the LLAMA to GGML",
    "description": "NULL",
    "url": "https://huggingface.co/engkufizz/llama-2-7b-datacom-ggml",
    "isnew": true
  },
  {
    "name": "FACE RECOGNITION USING OPENCV",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/13qMdeV1bwFWP0wtWcgjBs5_eQVjNmFYl?usp=drive_link",
    "isnew": false
  },
  {
    "name": "IOT - SMART HOME USING ESP8266",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/15auD4OQF8sctjGF5E9IKxNXJ_FsWf36k?usp=drive_link",
    "isnew": false
  },
  {
    "name": "VOICE RECOGNITION USING PYTHON",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/163F3VpWbp5SDnvobXndKWfXlF8YcAMsx?usp=drive_link",
    "isnew": false
  },
  {
    "name": "ROBOT CAR BY USING ARDUINO",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1U8RRoUlwzLiOIUEya3pqmosmITj01v14?usp=drive_link",
    "isnew": false
  },
  {
    "name": "SMART PICK-UP SYSTEM USING FINGERPRINT",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1eqTPki5rkYc30FXd_j5AkjmSWTimpxUL?usp=drive_link",
    "isnew": false
  },
  {
    "name": "SMART QUEUING SYSTEM USING TELEGRAM BOT",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/13yd-iQzVmD2jt2uSqGJRCFo-1AU0OEcd?usp=drive_link",
    "isnew": false
  },
  {
    "name": "ANDROID APP DEVELOPMENT USING ANDROID STUDIO",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1oTcgvjhM6qmQjeaOBQLzeOUkvkQM0enK?usp=drive_link",
    "isnew": false
  },
  {
    "name": "CREATE A WEBSITE USING AWS CLOUD",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1aOQcGy_k5FLtlhFOgK9CocrAlYjYUS8o?usp=drive_link",
    "isnew": false
  },
  {
    "name": "CREATE A LANDING PAGE USING FIREBASE",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/14OYKs0n65SRD3FQjamnLfKsuwKmEE3bD?usp=drive_link",
    "isnew": false
  },
  {
    "name": "RASPBERRY PI & MINI KEYBOARD CONTROLLER",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1tfIRv6TED6S5_xXM2nNGd1MJIfA-mgKP",
    "isnew": false
  },
  {
    "name": "PYTHON SOCKET SERVER USING a CLOUD",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1zaoq3BXJtVLyNuqo5-I7BGBV885NrMzq?usp=drive_link",
    "isnew": false
  },
  {
    "name": "LEARN SQL COMMANDS",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1sKK17FObu5wYu0drVlQRkjtQXFBuzRL8?usp=drive_link",
    "isnew": false
  },
  {
    "name": "LEARN TO SET UP A SERVER (PART 1)",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/10FS4L6GaVnto9EroNvsu9d5wZGEZV4SR?usp=drive_link",
    "isnew": false
  },
  {
    "name": "CYBER SECURITY MATERIALS",
    "description": "NULL",
    "url": "https://drive.google.com/drive/folders/1javrGyLZLAUuB1VmVLdVwmMLeRW83Rrf",
    "isnew": false
  }
];

function renderProjects(filteredProjects) {
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) return;  // Exit if element doesn't exist

    projectsContainer.innerHTML = '';
    for (let project of filteredProjects) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <h3>${project.name}${project.isnew ? ' <span class="new-tag">NEW</span>' : ''}</h3>
            <p>${project.description}</p>
            <a href='${project.url}' target='_blank'>View Project</a>
        `;
        projectsContainer.appendChild(projectDiv);
    }
}

// Sort projects
let sortAsc = true;

function sortProjects() {
    if (sortAsc) {
        projects.sort((a, b) => a.name.localeCompare(b.name));
        const sortBtn = document.getElementById('sort-btn');
        if (sortBtn) sortBtn.innerHTML = `<i class='fas fa-sort-alpha-down'></i>`;
    } else {
        projects.sort((a, b) => b.name.localeCompare(a.name));
        const sortBtn = document.getElementById('sort-btn');
        if (sortBtn) sortBtn.innerHTML = `<i class='fas fa-sort-alpha-up'></i>`;
    }
    sortAsc = !sortAsc;
    renderProjects(projects);
}

// Search projects
function searchProjects(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm));
    renderProjects(filteredProjects);
}

function showSearchBox() {
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.classList.add('show');
        searchBox.focus();
    }
}

function hideSearchBox() {
    const searchBox = document.getElementById('search-box');
    if (searchBox && !searchBox.value) {
        searchBox.classList.remove('show');
    }
}

// Loading animation
function initLoaderHome() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;  // Exit if element doesn't exist

    var tl = gsap.timeline();

    tl.set(".loading-screen", { top: "0" });

    const firstGreeting = document.querySelector('.home-active-first');
    const greetings = document.querySelectorAll('.home-active:not(.home-active-first):not(.home-active-last)');
    const lastGreeting = document.querySelector('.home-active-last');

    gsap.set([firstGreeting, ...greetings, lastGreeting], { opacity: 0 });

    tl.to(firstGreeting, {
        opacity: 1,
        duration: 0.1
    }).to(firstGreeting, {
        opacity: 1,
        duration: 1
    }).to(firstGreeting, {
        opacity: 0,
        duration: 0.1
    });

    greetings.forEach((greeting, index) => {
        tl.to(greeting, {
            opacity: 1,
            duration: 0.1,
            onComplete: function() {
                if (index > 0) {
                    gsap.to(greetings[index - 1], { opacity: 0, duration: 0.5 });
                }
            }
        }).to(greeting, {
            opacity: 0,
            duration: 0.1,
            delay: 0.1
        });
    });

    tl.to(lastGreeting, {
        opacity: 1,
        duration: 0.1
    }).to(lastGreeting, {
        opacity: 1,
        duration: 1
    });

    tl.to(".loading-screen", {
        duration: 0.2,
        top: "-100%",
        ease: "Power4.easeInOut",
        delay: 0.1
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    typeText();
    initLoaderHome();
    renderProjects(projects);

    const sortBtn = document.getElementById('sort-btn');
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');

    if (sortBtn) sortBtn.addEventListener('click', sortProjects);
    if (searchBtn) searchBtn.addEventListener('click', showSearchBox);
    if (searchBox) {
        searchBox.addEventListener('input', searchProjects);
        searchBox.addEventListener('blur', hideSearchBox);
    }

    // Attach menu toggle listeners
    document.querySelectorAll('.hamburger-icon').forEach(icon => {
        icon.addEventListener('click', toggleMenu);
    });

    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Close menu after clicking a link
            const menus = document.querySelectorAll(".menu-links");
            const icons = document.querySelectorAll(".hamburger-icon");
            menus.forEach(menu => menu.classList.remove("open"));
            icons.forEach(icon => icon.classList.remove("open"));
        });
    });

    // Close menu when clicking anywhere else on the document
    document.addEventListener('click', function() {
        const menus = document.querySelectorAll(".menu-links");
        const icons = document.querySelectorAll(".hamburger-icon");
        
        let isAnyOpen = false;
        menus.forEach(menu => {
            if (menu.classList.contains('open')) isAnyOpen = true;
        });

        if (isAnyOpen) {
            menus.forEach(menu => menu.classList.remove("open"));
            icons.forEach(icon => icon.classList.remove("open"));
        }
    });

    // Handle layout changes
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    handleLayoutChange(mediaQuery); // Call listener function at run time
    mediaQuery.addListener(handleLayoutChange); // Attach listener function on state changes

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const menus = document.querySelectorAll(".menu-links");
            const icons = document.querySelectorAll(".hamburger-icon");
            menus.forEach(menu => menu.classList.remove("open"));
            icons.forEach(icon => icon.classList.remove("open"));
        }
    });
});

// Function to handle layout changes
function handleLayoutChange(e) {
    const desktopNav = document.getElementById('desktop-nav') || document.getElementById('projects-desktop-nav') || document.getElementById('posts-desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');
    
    if (e.matches) {
        // Mobile layout
        if (desktopNav) desktopNav.style.display = 'none';
        if (hamburgerNav) hamburgerNav.style.display = 'flex';
    } else {
        // Desktop layout
        if (desktopNav) {
            desktopNav.style.display = 'flex';
            if (hamburgerNav) hamburgerNav.style.display = 'none';
        } else {
            if (hamburgerNav) hamburgerNav.style.display = 'flex';
        }
        
        // Ensure menu is closed when switching to desktop
        const menus = document.querySelectorAll(".menu-links");
        const icons = document.querySelectorAll(".hamburger-icon");
        menus.forEach(menu => menu.classList.remove("open"));
        icons.forEach(icon => icon.classList.remove("open"));
    }
}
