if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}


window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

    if (link.hasAttribute("data-inquire-trigger")) return;

    const targetId = link.getAttribute("href");

    const target =
        targetId && targetId !== "#"
        ? document.querySelector(targetId)
        : null;


    if (!target) return;


    event.preventDefault();

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    });

});


const revealItems =
    document.querySelectorAll(
    "section, .feature, .program, .price-card, .testimonial"
    );


const revealObserver =
    new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

        }

    });

    }, {

    threshold: 0.12,

    rootMargin: "0px 0px -30px 0px"

    });


revealItems.forEach(item => {

    item.classList.add("reveal");

    revealObserver.observe(item);

});


const menuButton =
    document.querySelector(".menu-btn");


const navLinks =
    document.querySelector(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    });


    document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        });

    });

}


const inquiryModal =
    document.querySelector(".inquiry-modal");


const inquiryTrigger =
    document.querySelector("[data-inquire-trigger]");


const inquiryClose =
    document.querySelector("[data-inquire-close]");


const setInquiryModal = (isOpen) => {

    if (!inquiryModal) return;


    inquiryModal.hidden = !isOpen;
    document.body.classList.toggle("modal-open", isOpen);


    if (isOpen && inquiryClose) {
        inquiryClose.focus();
    }


    if (!isOpen && inquiryTrigger) {
        inquiryTrigger.focus();
    }

};


if (inquiryModal && inquiryTrigger) {

    inquiryTrigger.addEventListener("click", event => {

        event.preventDefault();
        setInquiryModal(true);

    });


    inquiryClose?.addEventListener("click", () => {
        setInquiryModal(false);
    });


    inquiryModal.addEventListener("click", event => {

        if (event.target === inquiryModal) {
            setInquiryModal(false);
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && !inquiryModal.hidden) {
            setInquiryModal(false);
        }

    });

}
