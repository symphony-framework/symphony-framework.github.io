const sectionHeadings = document.querySelectorAll(".section-heading");
const subsectionHeadings = document.querySelectorAll('.subsection-heading');
const sidebarSections = document.querySelectorAll(".sidebar-section");
const sidebarSubsectionLists = document.querySelectorAll('.sidebar-subsection-list');
const sidebarSubsections = document.querySelectorAll('.sidebar-subsection');
const sidebar = document.querySelector('#sidebar');
const intro = document.querySelector('#intro');

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
}

const selectSidebarSubsection = (subsectionNumber) => {
  sidebarSubsections.forEach(sidebarSubsection => {
    if (sidebarSubsection.dataset.subsection === subsectionNumber) {
      sidebarSubsection.classList.remove('font-normal');
      sidebarSubsection.classList.add('font-bold');
    }
  });
}

const showSidebarSubsectionList = (sectionNumber) => {
  sidebarSubsectionLists.forEach(list => {
    console.log(list.dataset.section, sectionNumber);
    if (list.dataset.section === sectionNumber) {
      console.log('here')
      list.classList.remove('hidden');
      list.classList.add('block');
    }
  });
};

const unselectAllSidebarSections = () => {
  sidebarSections.forEach(sidebarSection => {
    sidebarSection.classList.remove('font-bold');
    sidebarSection.classList.add('font-normal');
  })
}

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
}

const handleNewSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionNumber = entry.target.dataset.section;
      handleSelectSection(sectionNumber);
    }
  })
};

const handleNewSubsection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const subsectionNumber = entry.target.dataset.subsection;
      handleSelectSubsection(subsectionNumber);
    }
  })
}

const handleShowSidebar = (entries, observer) => {
  if (!entries[0].isIntersecting) {
    sidebar.classList.add('translate-x-96')
  } else {
    sidebar.classList.remove('translate-x-96')
  }
};

const handlePageLoad = () => {
  const sectionObserver = new IntersectionObserver(handleNewSection, { threshold: 1 });
  sectionHeadings.forEach(heading => {
    sectionObserver.observe(heading);
  });

  const subsectionObserver = new IntersectionObserver(handleNewSubsection, { threshold: 1 });
  subsectionHeadings.forEach(subheading => {
    subsectionObserver.observe(subheading);
  })

  const introObserver = new IntersectionObserver(handleShowSidebar, { threshold: 0.02 });
  introObserver.observe(intro);
};


document.addEventListener("DOMContentLoaded", handlePageLoad)