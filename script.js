// ========== NAVBAR SOLID ON SCROLL ==========
window.addEventListener("scroll", function(){
  const navbar = document.querySelector(".navbar");
  if(window.scrollY > 50){
    navbar.classList.add("solid");
  }else{
    navbar.classList.remove("solid");
  }
  
  // Panggil fungsi active menu saat scroll
  updateActiveMenu();
});

// ========== NAVBAR RESPONSIVE ==========
function createMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const navbarContainer = document.querySelector('.navbar-container');
  const menuItems = document.querySelector('.menu-items');
  
  // Buat hamburger button jika belum ada
  if (!document.querySelector('.hamburger')) {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    // Insert hamburger setelah logo
    const logo = document.querySelector('.logo');
    logo.parentNode.insertBefore(hamburger, logo.nextSibling);
    
    // Event listener untuk hamburger
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      menuItems.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu-items');
    
    if (hamburger && menu && menu.classList.contains('active')) {
      if (!e.target.closest('.navbar-container')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  });
  
  // Close menu when clicking on menu items
  const menuLinks = document.querySelectorAll('.menu-items a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      const hamburger = document.querySelector('.hamburger');
      const menu = document.querySelector('.menu-items');
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// ========== ACTIVE MENU ON SCROLL ==========
function updateActiveMenu() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.menu-items a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Offset untuk navbar
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1); // Hapus # dari href
    
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
}

// ========== SMOOTH SCROLL WITH OFFSET ==========
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.menu-items a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== PORTFOLIO FILTER ==========
document.addEventListener("DOMContentLoaded", function() {
  // Initialize responsive menu
  createMobileMenu();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize active menu
  updateActiveMenu();
  
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  function filterProjects(filterValue) {
    projectCards.forEach(card => {
      if (filterValue === "all") {
        card.classList.remove("hidden");
      } else {
        if (card.classList.contains(filterValue)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      
      const filterValue = this.getAttribute("data-filter");
      filterProjects(filterValue);
    });
  });

  projectCards.forEach(card => {
    card.classList.remove("hidden");
  });
  
  const allButton = document.querySelector(".filter-btn[data-filter='all']");
  if (allButton) {
    allButton.classList.add("active");
  }
});

// ========== CONTACT FORM - NETLIFY ==========
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    if (contactForm.getAttribute("data-netlify") === "true") {
      console.log("Netlify Form detected");
      
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const button = this.querySelector(".contact-btn");
        const originalHTML = button.innerHTML;
        
        button.disabled = true;
        button.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        formStatus.style.display = "none";
        
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(contactForm)).toString()
        })
        .then(() => {
          button.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
          button.style.background = "linear-gradient(45deg, #28a745, #218838)";
          
          if (formSuccess) {
            formSuccess.style.display = "block";
            formStatus.style.display = "none";
          } else {
            formStatus.textContent = "Thank you! Your message has been sent successfully.";
            formStatus.className = "form-status success";
            formStatus.style.display = "block";
          }
          
          contactForm.reset();
          
          setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalHTML;
            button.style.background = "linear-gradient(45deg, #25b79f, #1a806e)";
            if (formSuccess) formSuccess.style.display = "none";
            formStatus.style.display = "none";
          }, 5000);
        })
        .catch(error => {
          console.error("Error:", error);
          button.disabled = false;
          button.innerHTML = originalHTML;
          formStatus.textContent = "Something went wrong. Please try again.";
          formStatus.className = "form-status error";
          formStatus.style.display = "block";
        });
      });
    }
  }
});

// ========== DETEKSI NETLIFY SUCCESS PARAMETER ==========
window.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("success")) {
    const formSuccess = document.getElementById("formSuccess");
    if (formSuccess) {
      formSuccess.style.display = "block";
      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    }
  }
});