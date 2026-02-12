// Navbar solid on scroll
window.addEventListener("scroll", function(){
  const navbar = document.querySelector(".navbar");
  if(window.scrollY > 50){
    navbar.classList.add("solid");
  }else{
    navbar.classList.remove("solid");
  }
});

// ========== PORTFOLIO FILTER ==========
document.addEventListener("DOMContentLoaded", function() {
  
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // Fungsi filter
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

  // Event listener untuk setiap button
  filterButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      
      const filterValue = this.getAttribute("data-filter");
      filterProjects(filterValue);
    });
  });

  // INITIAL STATE
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
    // Cek apakah ini Netlify Form
    if (contactForm.getAttribute("data-netlify") === "true") {
      console.log("Netlify Form detected");
      
      // Handle form submission dengan AJAX
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Hanya untuk AJAX, jika tidak pakai redirect
        
        const button = this.querySelector(".contact-btn");
        const originalHTML = button.innerHTML;
        
        // Loading state
        button.disabled = true;
        button.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        formStatus.style.display = "none";
        
        // Kirim form dengan fetch API
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(contactForm)).toString()
        })
        .then(() => {
          // Success
          button.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
          button.style.background = "linear-gradient(45deg, #28a745, #218838)";
          
          // Tampilkan pesan sukses
          if (formSuccess) {
            formSuccess.style.display = "block";
            formStatus.style.display = "none";
          } else {
            formStatus.textContent = "Thank you! Your message has been sent successfully.";
            formStatus.className = "form-status success";
            formStatus.style.display = "block";
          }
          
          // Reset form
          contactForm.reset();
          
          // Reset button setelah 5 detik
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
// Untuk menampilkan pesan sukses jika redirect balik ke halaman
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