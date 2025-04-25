import Globe from "globe.gl";


const allMarkers = [];
const globeContainer = document.getElementById("globe-container");

const myGlobe = new Globe(globeContainer);
myGlobe.globeImageUrl(
  "/earth_day.jpg"
);


myGlobe.onGlobeReady(() => {
  myGlobe.enablePointerInteraction(true);
  const controls = myGlobe.controls();

  controls.enabled = false;

  setTimeout(() => {
    let data = {
      lat: 27.9881,
      lng: 86.925,
      altitude: 1,
    };
    addMarker(27.1751, 78.0421, "red"); // Mount Everest


    myGlobe.pointOfView(data, 1000);

    setTimeout(() => {

      myGlobe.pointOfView(
        {
          lat: 10.9881,
          lng: 50.925,
          altitude: 2,
        },
        1000
      );
      controls.autoRotate = true;
    }, 5000);
  }, 1000);
});


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
