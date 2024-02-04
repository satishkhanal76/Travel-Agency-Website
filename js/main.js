const markerSvg = `<svg class="svg-icon" viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;
const globeContainer = document.getElementById("globe-container");
const myGlobe = Globe({
  animateIn: false,
});
let globe = myGlobe(globeContainer).globeImageUrl(
  "//unpkg.com/three-globe/example/img/earth-night.jpg"
);

myGlobe.onGlobeReady(() => {
  myGlobe.enablePointerInteraction(false);
  const controls = myGlobe.controls();
  // controls.autoRotate = true;

  controls.enabled = false;
  console.log(myGlobe.controls());

  setTimeout(() => {
    let data = {
      lat: 27.9881,
      lng: 86.925,
      altitude: 1,
    };

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

  //   setTimeout(() => {
  //     myGlobe.pointOfView(
  //       {
  //         lat: 27.7172,
  //         lng: 85.324,
  //         altitude: 1.5,
  //       },
  //       2000
  //     );
  //   }, 1000);

  //   setTimeout(() => {
  //     let data = {
  //       lat: 27.7172,
  //       lng: -85.324,
  //       altitude: 2,
  //     };
  //     myGlobe.pointOfView(data, 1000);
  //     myGlobe.htmlElementsData([data]).htmlElement((d) => {
  //       const el = document.createElement("div");
  //       el.innerHTML = markerSvg;
  //       el.style.color = d.color;

  //       el.onclick = () => console.info(d);
  //       return el;
  //     });
  //     // addPoints(20);
  //   }, 3000);

  //   setTimeout(() => {
  //     let data = {
  //       lat: -30,
  //       lng: 45,
  //       altitude: 3,
  //     };
  //     myGlobe.htmlElementsData([data]);
  //     myGlobe.pointOfView(data, 3000);
  //     // controls.autoRotate = true;
  //     // controls.autoRotateSpeed = -5;
  //   }, 5000);
});

const addPoints = (N) => {
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 7 + Math.random() * 30,
    color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
  }));

  myGlobe.htmlElementsData(gData).htmlElement((d) => {
    const el = document.createElement("div");
    el.innerHTML = markerSvg;
    el.style.color = d.color;

    el.onclick = () => console.info(d);
    return el;
  });
};
