import Globe from "globe.gl";

const container = document.getElementById("globe-container");
const homeBtn = document.getElementById("lost-home-btn");

// If you host this app under a subpath like /travel, this keeps redirects correct.
function getAppBasePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  return `/${parts[0]}/`;
}

function goHome() {
  window.location.href = getAppBasePath();
}

// --- Moon scene (simple) ---
const moonGlobe = new Globe(container, {
  animateIn: true,
  autoRotate: true,
  autoRotateSpeed: 0.25,
  width: container.clientWidth,
  height: container.clientHeight,
  pointOfView: { altitude: 2.6 },
});

moonGlobe.globeImageUrl("./textures/moon.jpg");

// Disable user controls (no drag / zoom / pan)
const controls = moonGlobe.controls && moonGlobe.controls();
if (controls) {
  controls.enabled = false;
}

function onResize() {
  moonGlobe.width(container.clientWidth);
  moonGlobe.height(container.clientHeight);
}
window.addEventListener("resize", onResize);

// Button: go home immediately
if (homeBtn) {
  homeBtn.addEventListener("click", goHome);
}

// Auto redirect after a short delay
// setTimeout(goHome, 3500);