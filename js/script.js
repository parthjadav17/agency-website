// Mobile Menu Toggle

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}
// Contact Form Validation

const form = document.querySelector("#contactForm");

if(form){

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const messageInput = document.querySelector("#message");

    const nameError = document.querySelector("#nameError");
    const emailError = document.querySelector("#emailError");
    const phoneError = document.querySelector("#phoneError");
    const messageError = document.querySelector("#messageError");

    const successMessage = document.querySelector("#successMessage");

    function validateName(){

        if(nameInput.value.trim().length < 3){

            nameError.textContent =
            "Name must contain at least 3 characters";

            nameInput.classList.add("input-error");

            return false;
        }

        nameError.textContent = "";
        nameInput.classList.remove("input-error");

        return true;
    }

    function validateEmail(){

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(emailInput.value.trim())){

            emailError.textContent =
            "Please enter a valid email address";

            emailInput.classList.add("input-error");

            return false;
        }

        emailError.textContent = "";
        emailInput.classList.remove("input-error");

        return true;
    }

    function validatePhone(){

        const phonePattern =
        /^[0-9]{10}$/;

        if(!phonePattern.test(phoneInput.value.trim())){

            phoneError.textContent =
            "Please enter a valid 10-digit number";

            phoneInput.classList.add("input-error");

            return false;
        }

        phoneError.textContent = "";
        phoneInput.classList.remove("input-error");

        return true;
    }

    function validateMessage(){

        const words =
        messageInput.value.trim().split(/\s+/);

        if(words.length < 10){

            messageError.textContent =
            "Message must contain at least 10 words";

            messageInput.classList.add("input-error");

            return false;
        }

        messageError.textContent = "";
        messageInput.classList.remove("input-error");

        return true;
    }

    form.addEventListener("submit", async function(event){

        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();

        if(!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid){
            return;
        }

        const submitBtn = form.querySelector("button");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try{
            await window.firebaseAddDoc(
                window.firebaseCollection(
                    window.firebaseDB,
                    "ContactMessages"
                ),
                {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    message: messageInput.value,
                    createdAt: new Date()
                }
            );

            successMessage.textContent = "Message sent successfully!";
            successMessage.classList.add("success");

            form.reset();
        }
        catch(error){
            successMessage.textContent = "Unable to send message.";
        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    });
}
// Testimonials Slider

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

if(slides.length > 0){

    let currentIndex = 0;

    function showSlide(index){

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    function nextSlide(){

        currentIndex++;

        if(currentIndex >= slides.length){
            currentIndex = 0;
        }

        showSlide(currentIndex);
    }

    function prevSlide(){

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = slides.length - 1;
        }

        showSlide(currentIndex);
    }

    nextBtn.addEventListener("click", nextSlide);

    prevBtn.addEventListener("click", prevSlide);

    let autoPlay = setInterval(nextSlide, 4000);

    function stopAutoPlay(){
        clearInterval(autoPlay);
    }

    nextBtn.addEventListener("mouseenter", stopAutoPlay);
    prevBtn.addEventListener("mouseenter", stopAutoPlay);

}
// Scroll To Top

const topBtn = document.querySelector("#topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
// Sticky Navbar

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){
        navbar.classList.add("sticky");
    }
    else{
        navbar.classList.remove("sticky");
    }

});
// FAQ Accordion

const questions = document.querySelectorAll(".question");

questions.forEach(question => {

    question.addEventListener("click", () => {

        const currentAnswer = question.nextElementSibling;

        document.querySelectorAll(".answer").forEach(answer => {

            if(answer !== currentAnswer){

                answer.classList.remove("active");

            }

        });

        currentAnswer.classList.toggle("active");

    });

});