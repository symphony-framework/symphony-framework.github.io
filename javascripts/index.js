const sectionHeadings = document.querySelectorAll(".section-heading");
const subsectionHeadings = document.querySelectorAll('.subsection-heading');
const sidebarSections = document.querySelectorAll(".sidebar-section");
const sidebarSubsectionLists = document.querySelectorAll('.sidebar-subsection-list');
const sidebarSubsections = document.querySelectorAll('.sidebar-subsection');
const sidebar = document.querySelector('#sidebar');
const intro = document.querySelector('#intro');
const hamburger = document.querySelector("#hamburger");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const ourTeam = document.querySelector("#our-team");
const presentation = document.querySelector('#presentation');

const hideAllSidebarSubsectionLists = () => {
  sidebarSubsectionLists.forEach(list => {
    list.classList.add('hidden');
  });
};

const selectSidebarSection = (sectionNumber) => {
  sidebarSections.forEach(sidebarSection => {
    if (sidebarSection.dataset.section === sectionNumber) {
      sidebarSection.classList.remove('font-normal');
      sidebarSection.classList.add('font-bold');
    }
  });
};

const selectSidebarSubsection = (subsectionNumber) => {
  sidebarSubsections.forEach(sidebarSubsection => {
    if (sidebarSubsection.dataset.subsection === subsectionNumber) {
      sidebarSubsection.classList.remove('font-normal');
      sidebarSubsection.classList.add('font-bold');
    }
  });
};

const showSidebarSubsectionList = (sectionNumber) => {
  sidebarSubsectionLists.forEach(list => {
    if (list.dataset.section === sectionNumber) {
      list.classList.remove('hidden');
      list.classList.add('block');
    }
  });
};

const unselectAllSidebarSections = () => {
  sidebarSections.forEach(sidebarSection => {
    sidebarSection.classList.remove('font-bold');
    sidebarSection.classList.add('font-normal');
  });
};

const unselectAllSidebarSubsections = () => {
  sidebarSubsections.forEach(sidebarSubsection => {
    sidebarSubsection.classList.remove('font-bold');
    sidebarSubsection.classList.add('font-normal');
  });
};

const handleSelectSection = (sectionNumber) => {
  unselectAllSidebarSections();
  unselectAllSidebarSubsections();
  hideAllSidebarSubsectionLists();

  showSidebarSubsectionList(sectionNumber);
  selectSidebarSection(sectionNumber);
};

const handleSelectSubsection = (subsectionNumber) => {
  unselectAllSidebarSections();
  unselectAllSidebarSubsections();
  hideAllSidebarSubsectionLists();

  const sectionNumber = subsectionNumber.split('.')[0];
  selectSidebarSection(sectionNumber);
  showSidebarSubsectionList(sectionNumber);
  selectSidebarSubsection(subsectionNumber);
};

const handleShowSidebar = (entries, observer) => {
  if (!entries[0].isIntersecting) {
    sidebar.classList.add('translate-x-96')
  } else {
    sidebar.classList.remove('translate-x-96')
  }
};

const handlePageLoad = () => {
  // Helper
  const throttle = (callback, limit) => {
    let wait = false;
    return (...args) => {
      if (!wait) {
        callback(...args);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  };

  // Show or hide sidebar
  const introAndOutroObserver = new IntersectionObserver(handleShowSidebar, { threshold: 0.05 });
  introAndOutroObserver.observe(intro);
  introAndOutroObserver.observe(presentation);

  // Highlight sidebar menu sections
  let sections = [...sectionHeadings].map(heading => heading.parentElement);
  let subsections = [...subsectionHeadings].map(heading => heading.parentElement);

  const handleScroll = () => {
    sections.forEach(section => {
      if (section.offsetTop <= window.scrollY + 80 * 2) {
        unselectAllSidebarSections();
        unselectAllSidebarSubsections();
        hideAllSidebarSubsectionLists();

        let sectionNumber = section.firstElementChild.dataset.section;
        selectSidebarSection(sectionNumber);
        showSidebarSubsectionList(sectionNumber);
      }
    });

    subsections.forEach(subsection => {
      if (subsection.offsetTop <= window.scrollY + 80 * 2) {
        unselectAllSidebarSubsections();

        let subsectionNumber = subsection.firstElementChild.dataset.subsection;
        selectSidebarSubsection(subsectionNumber);
      }
    });
  };

  document.addEventListener("scroll", throttle(handleScroll, 100));

  // Hmaburger menu
  hamburger.addEventListener("click", () => {
    if (hamburgerMenu.style.display === "none") {
      hamburger.style.border = "1px solid #15376e";
      hamburgerMenu.style.display = "block";
    } else {
      hamburger.style.border = "none";
      hamburgerMenu.style.display = "none";
    }
  });
};

document.addEventListener("DOMContentLoaded", handlePageLoad);

const REACT_SERVER = 'https://symphony-demo.vercel.app/';

window.onload = () => {
  const randRoom = () => `${REACT_SERVER}${Math.floor(Math.random() * 10000)}`;

  const singleWhiteboardFrame = document.getElementById('singleplayer-demo').children[0];
  const multiWhiteboardFrames = document.getElementById('multiplayer-demo').children;

  singleWhiteboardFrame.setAttribute('src', randRoom());

  const multiplayerDemoRoom = randRoom();
  [...multiWhiteboardFrames].forEach(frame => frame.src = multiplayerDemoRoom)
}
