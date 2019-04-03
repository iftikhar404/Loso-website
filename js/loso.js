// initialize slick carousel
$(document).ready(function(){
    $('.testimonial-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
    });
});

$(document).ready(function() {
    $('.screens-container').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        responsive: [
            {
              breakpoint: 950,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
                breakpoint: 720,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
            }
        ]
    });

    // counter Up library
    $('.stat-number').counterUp({
        delay: 10,
        time: 1000
    });

    // wow js library initialization
    new WOW().init();
});

const sections = [
    document.getElementById('header'),
    document.getElementById('about-us'),
    document.getElementById('features'),
    document.getElementById('screens'),
    document.getElementById('download'),
    document.getElementById('contact')
];

const navLinks = [
    document.getElementById('link-header'),
    document.getElementById('link-about-us'),
    document.getElementById('link-features'),
    document.getElementById('link-screens'),
    document.getElementById('link-download'),
    document.getElementById('link-contact'),
];

const navbar = document.getElementsByTagName('nav')[0];

window.addEventListener('scroll', scrollEventCallBack);

document.body.addEventListener('click', (e) => {
    if (e.target.tagName === "A" && e.target.id !== 'toTopLink') {
        e.preventDefault();
        window.scrollTo(0, document.getElementById(e.target.id.substring(5)).offsetTop - navbar.offsetHeight);

        // if in collapsed navigation mode and event.target is not "take tour" button
        if (document.querySelector('.collapsed-navbar') && e.target.id !== 'tour-about-us') {
            toggleCollapsedNavbar();
            toggleHamburgerMenu();
        }
    }
});

const navLinksContainer = document.getElementsByClassName('nav-links-container')[0];
moveNavLinksContainer();

window.addEventListener('resize', (e) => {
    moveNavLinksContainer();
});

const hamburgerContainer = document.querySelector('.hamburger');
const bar1 = document.querySelector('.bar1');
const bar2 = document.querySelector('.bar2');
const bar3 = document.querySelector('.bar3');
const bar4 = document.querySelector('.bar4');

hamburgerContainer.addEventListener('click', (e) => {
    toggleHamburgerMenu();
    toggleCollapsedNavbar();
});

function scrollEventCallBack() {
    if (window.pageYOffset < 30) {
        navbar.classList.add('nav-hidden');
        navbar.classList.remove('nav-displayed');
    } else if (window.pageYOffset > 30) {
        navbar.classList.add('nav-displayed');
        navbar.classList.remove('nav-hidden');
    }

    sections.forEach((section, index) => {
        // if window current vertical position is between the topOffset of the current section
        // and the point where current section ends, add the active class to the link tag
        // in navLinks array that is present at the same index as the current section
        // and remove active class from all other links
       if (window.pageYOffset >= section.offsetTop - navbar.offsetHeight && window.pageYOffset < (section.offsetTop + section.offsetHeight)) {
            navLinks[index].classList.add('active');
            navLinks.filter((link, i) => i !== index)
                    .forEach(link => link.classList.remove('active'));
       }
       // special case of contact section as window vertical scroll position never equals its offetTop,
       // add the active class to contact link if window vertical scroll position is after the downloads
       // section ending point
       // remove the active class from all other links except the last one which is contact link
       else if (section.id === 'contact' && window.pageYOffset >= sections[4].offsetTop + sections[4].offsetHeight - 190) {
            navLinks[navLinks.length - 1].classList.add('active');
            navLinks.forEach((link, index) => {
                if (index !== navLinks.length - 1) {
                    link.classList.remove('active')
                }
            });
       }
    });
};

// inserts nav links container as a first child of body
function moveNavLinksContainer() {
    if(window.innerWidth < 720) {
        document.body.insertAdjacentElement('afterbegin', navLinksContainer);
        navLinksContainer.classList.add('collapsed-navbar');
    } else {
        document.getElementsByClassName('nav-logo-image')[0].insertAdjacentElement('afterend', navLinksContainer);
        navLinksContainer.classList.remove('collapsed-navbar');
    }
}

function toggleHamburgerMenu() {
    bar1.classList.toggle('moveBar1');
    bar2.classList.toggle('moveBar2');
    bar3.classList.toggle('moveBar3');
    bar4.classList.toggle('moveBar4');
    hamburgerContainer.classList.toggle('decreasePadding');
}

function toggleCollapsedNavbar() {
    document.querySelector('.collapsed-navbar').classList.toggle('expand-collapsed-navbar');
    navbar.classList.toggle('dark-nav');

    // if collapsed nav Links container is open, disable scroll event
    // so that navbar doesn't hides when page is scrolled to the top
    // navbar will have 'dark-nav' class when nav links container is open
    if (navbar.classList.contains('dark-nav')) {
        window.removeEventListener('scroll', scrollEventCallBack);
    } else {
        window.addEventListener('scroll', scrollEventCallBack);
    }
}