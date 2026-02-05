import Globe from "globe.gl";

import {parseCsv, getAnimationString, createSectionElements, findTransitionObject, calculateGlobeScale} from "./utils.js";


// grab elements
const mainContainer = document.getElementById("main-content");
const globeContainer = document.getElementById("globe-container");


const allMarkers = [];
const myGlobe = new Globe(globeContainer, {
  animateIn: true,
  autoRotate: false,
  width: globeContainer.clientWidth,
  height: globeContainer.clientHeight,
  pointOfView: {altitude: calculateGlobeScale(globeContainer)},
  pointsData: allMarkers,
});
myGlobe.globeImageUrl(
  "./textures/earth_day.jpg"
);

function addSectionObserver(sectionElements, sectionsData) {

  let cameraTimeout;

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const name = entry.target.dataset.name;
      
      const sectionData = sectionsData.find(item => item.name === name);
      const transitionDetails = sectionData.transtionDetails;


      const isVisible = entry.isIntersecting;
      const section = entry.target;

      if (isVisible) {
        myGlobe.controls().autoRotate = false;

        const title = section.querySelector('.content-title');
        const desc = section.querySelector('.content-desc');
        const images = section.querySelectorAll('.image-container');


         // Add animation styles directly through JavaScript
        if (title) {
          title.style.animation = getAnimationString(transitionDetails.titleTransitionDetails);
        }

        if (desc) {
          // Adding delay to the description
          desc.style.animation = getAnimationString(transitionDetails.descTransitionDetails);
        }

        images.forEach(img => {
          img.style.animation = getAnimationString(transitionDetails.imageTransitionDetails);
        });

        const cameraTransition = transitionDetails.cameraPanTransitionDetails;


        addMarker(sectionData.lat, sectionData.lng, sectionData.color);

        myGlobe.pointOfView({
          lat: sectionData.lat,
          lng: sectionData.lng,
          altitude: 0.9
        }, parseInt(cameraTransition.transitionDelay));

        clearTimeout(cameraTimeout);

        cameraTimeout = setTimeout(() => {
          myGlobe.pointOfView({
            altitude: 2.5
          }, parseInt(cameraTransition.transitionDelay));

          myGlobe.controls().autoRotate = true;
        }, (parseInt(cameraTransition.transitionDelay) + parseInt(cameraTransition.transitionDuration)));

      }
    });
  }, options);

  sectionElements.forEach(section => observer.observe(section));
}

async function loadData() {
  const data = await parseCsv("./data/details.csv");
  const transitionData = await parseCsv("./data/transitions.csv");

  const sectionData = data.map((item) => {
    

    const transitionDetails = {
      titleTransitionDetails: findTransitionObject(item.titleTransitionName, transitionData),
      descTransitionDetails: findTransitionObject(item.descTransitionName, transitionData),
      imageTransitionDetails: findTransitionObject(item.imageTransitionName, transitionData),
      cameraPanTransitionDetails: findTransitionObject(item.cameraPanTransitionName, transitionData)

    }

    item.transtionDetails = transitionDetails;
    return item;
  });

  const sectionElements = createSectionElements(data);

  mainContainer.append(...sectionElements);


  addSectionObserver(sectionElements, sectionData);
}


loadData();



const addMarker = (lat, lng, color = "red") => {
  allMarkers.push({
    lat,
    lng,
    altitude: 0.05,
    color,
  });
  myGlobe.pointColor((points) => {
    return points.color;
  });

  myGlobe.pointAltitude((points) => {
    return points.altitude;
  }
  );
  myGlobe.pointsData(allMarkers);
};



window.addEventListener('resize', () => {
  myGlobe.width([globeContainer.clientWidth]);
  myGlobe.height([globeContainer.clientHeight]);
});