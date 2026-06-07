/*=========================
   MENU
==========================*/
const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRw0TSlj58aDGvc7UP51kdZzqkNfKngaGXiZgKR7qKXbXMjYPActocKh5pWubgZNpHqfj5Jx_4siqMM/pub?output=csv";
async function loadWeeklyMenu(){

    const container =
    document.getElementById("weekly-menu");

    if(!container) return;

    try{

        const response =
        await fetch(SHEET_URL);

        const text =
        await response.text();

        const rows =
        text.trim().split("\n").slice(1);

        let html = "";

        rows.forEach(row => {

            const [day, special] = row.split(",");

            if(day && special){

                html += `
                    <div class="weekly-item">
                        <span class="weekly-day">${day}</span>
                        <span>${special}</span>
                    </div>
                `;
            }

        });

        container.innerHTML = html;

    }catch(error){

        console.error(error);

        container.innerHTML =
        "Unable to load weekly specials.";

    }

}

loadWeeklyMenu();
/* =========================
   NAVIGATION
========================= */

function goTo(page){
    window.location.href = page;
}

/* =========================
   GALLERY LIGHTBOX
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryImages =
    document.querySelectorAll(".gallery-image");

    const lightbox =
    document.getElementById("lightbox");

    const lightboxImage =
    document.getElementById("lightbox-image");

    if(galleryImages.length > 0){

        galleryImages.forEach(image => {

            image.addEventListener("click", () => {

                lightbox.style.display = "flex";

                lightboxImage.src = image.src;

            });

        });

    }

    if(lightbox){

        lightbox.addEventListener("click", () => {

            lightbox.style.display = "none";

        });

    }

});

/* =========================
   TESTIMONIAL SLIDER
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const testimonials =
    document.querySelectorAll(".testimonial");

    if(testimonials.length === 0) return;

    let current = 0;

    testimonials[current].classList.add("active");

    setInterval(() => {

        testimonials[current]
        .classList.remove("active");

        current++;

        if(current >= testimonials.length){
            current = 0;
        }

        testimonials[current]
        .classList.add("active");

    }, 5000);

});

/* =========================
   EMAILJS SETUP
========================= */

/*
1. Create account:
   https://www.emailjs.com

2. Replace values below:

   YOUR_PUBLIC_KEY
   YOUR_SERVICE_ID
   YOUR_TEMPLATE_ID

3. Create email template using:

   {{customer_name}}
   {{customer_email}}
   {{customer_phone}}
   {{reservation_date}}
   {{reservation_time}}
   {{guests}}
   {{special_requests}}

*/

(function(){

    if(typeof emailjs !== "undefined"){

        emailjs.init("YOUR_PUBLIC_KEY");

    }

})();

/* =========================
   RESERVATION FORM
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const form =
    document.getElementById("reservationForm");

    if(!form) return;

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const phone =
        document.getElementById("phone").value;

        const date =
        document.getElementById("date").value;

        const time =
        document.getElementById("time").value;

        const guests =
        document.getElementById("guests").value;

        const notes =
        document.getElementById("notes").value;

        const submitButton =
        document.querySelector(".submit-btn");

        submitButton.innerText =
        "Sending...";

        emailjs.send(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            {
                customer_name: name,
                customer_email: email,
                customer_phone: phone,
                reservation_date: date,
                reservation_time: time,
                guests: guests,
                special_requests: notes
            }
        )
        .then(() => {

            alert(
                "Reservation request sent successfully!"
            );

            form.reset();

            submitButton.innerText =
            "Reserve Table";

        })
        .catch((error) => {

            console.error(error);

            alert(
                "Something went wrong. Please try again."
            );

            submitButton.innerText =
            "Reserve Table";

        });

    });

});

/* =========================
   CONTACT FORM
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm =
    document.getElementById("contactForm");

    if(!contactForm) return;

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        alert(
            "Message sent successfully!"
        );

        contactForm.reset();

    });

});

/* =========================
   SCROLL TO TOP
========================= */

function scrollTopSmooth(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* =========================
   YEAR
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const year =
    document.getElementById("year");

    if(year){

        year.textContent =
        new Date().getFullYear();

    }

});
