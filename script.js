document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded!");
});

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mrnwburger-menubutton');
    const menu = document.getElementById('mrnw-menu-content');
    const burgerMenu = document.getElementById('mrnwburger-menu');
    const logoTextElements = document.querySelectorAll('.mrnw-logotext'); // SVG paths
    const giveElement = document.querySelector('.mrnwgive');

    if (!menuButton || !menu || !burgerMenu) {
      console.warn("Menu script: Required elements not found.");
      return;
    }

    let isMenuOpen = false; 
    let isAtTop = true; 

    const showElement = (element) => {
      if (element) {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.pointerEvents = 'auto'; // Enable interaction
      }
    };

    const hideElement = (element) => {
      if (element) {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        element.style.pointerEvents = 'none'; // Fully disable interaction
      }
    };

    const disableSVGPathClicks = () => {
      logoTextElements.forEach(path => {
        path.style.pointerEvents = 'none'; // Ensures SVG paths don't block clicks
      });
    };

    const enableSVGPathClicks = () => {
      logoTextElements.forEach(path => {
        path.style.pointerEvents = 'auto'; // Restores clickability
      });
    };

    menuButton.addEventListener('click', () => {
      const isSmallScreen = window.innerWidth < 900;

      if (!menu.classList.contains('show')) {
        menu.style.display = 'flex';
        setTimeout(() => {
          menu.classList.add('show');
          menu.style.pointerEvents = 'auto';
        }, 10);
        menuButton.classList.add('active');
        burgerMenu.classList.add('active');
        isMenuOpen = true;

        if (isSmallScreen) {
          logoTextElements.forEach(hideElement);
          showElement(giveElement);
          disableSVGPathClicks(); // Ensure SVG paths don’t block clicks
        }
      } else {
        closeMenu();
      }
    });

    const closeMenu = () => {
      const isSmallScreen = window.innerWidth < 900;

      menu.classList.remove('show');
      menu.classList.add('hide');
      setTimeout(() => {
        menu.style.display = 'none';
        menu.classList.remove('hide');
        menu.style.pointerEvents = 'none';
      }, 100);
      menuButton.classList.remove('active');
      burgerMenu.classList.remove('active');
      isMenuOpen = false;

      if (isSmallScreen && isAtTop) {
        logoTextElements.forEach(showElement);
        hideElement(giveElement);
        enableSVGPathClicks(); // Re-enable SVG clickability
      }
    };

    const handleScroll = () => {
      const isSmallScreen = window.innerWidth < 900;
      const scrollTop = window.scrollY;

      if (scrollTop === 0) {
        if (!isAtTop) {
          isAtTop = true;
          if (!isMenuOpen) {
            logoTextElements.forEach(showElement);
            if (isSmallScreen) hideElement(giveElement);
            enableSVGPathClicks(); // Enable SVG clicks if visible
          }
        }
      } else {
        if (isAtTop) {
          isAtTop = false;
          logoTextElements.forEach(hideElement);
          if (isSmallScreen) showElement(giveElement);
          disableSVGPathClicks(); // Disable clicks on hidden SVG
        }
      }
    };

    const setInitialVisibility = () => {
      const isSmallScreen = window.innerWidth < 900;

      if (isSmallScreen) {
        if (window.scrollY > 0) {
          logoTextElements.forEach(hideElement);
          showElement(giveElement);
          disableSVGPathClicks(); // Disable clicks if SVG is hidden
        } else {
          logoTextElements.forEach(showElement);
          hideElement(giveElement);
          enableSVGPathClicks(); // Ensure SVG paths are clickable if shown
        }
      } else {
        showElement(giveElement);
        enableSVGPathClicks();
      }
    };

    window.addEventListener('scroll', () => {
      handleScroll();
      if (isMenuOpen) closeMenu();
    });

    window.addEventListener('resize', setInitialVisibility);

    setInitialVisibility();
  });

  console.log("Menu script loaded independently!");
})();
