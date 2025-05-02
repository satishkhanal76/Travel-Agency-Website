import Papa from 'papaparse';

export async function parseCsv(pathToFile) {
    const request = await fetch(pathToFile)
    if (!request.ok) {
        throw new Error(`HTTP error! status: ${request.status}`);
    }
    const csvData = await request.text();
    const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
    });
    return parsedData.data;
}


export const createSectionElements = (data) => data.map((item) => {
    const section = document.createElement("section");
    section.dataset.name = item.name;
    section.classList.add("snap-section");

    const divLeft = document.createElement("div");
    divLeft.classList.add("content-left");

    const divRight = document.createElement("div");
    divRight.classList.add("content-right");

    const title = document.createElement("h1");
    title.textContent = item.title;
    title.classList.add("content-title");

    const desc = document.createElement("p");
    desc.innerText = item.desc;
    desc.classList.add("content-desc");

    [title,desc].forEach((el) => {
        el.style.opacity = 0;

    }
    );

    divLeft.append(title);
    divLeft.append(desc);

    section.append(divLeft);
    section.append(divRight);

    return section;
  });


  export const getAnimationString = ({transitionName, transitionTimingFunction, transitionDelay, transitionDuration, transitionDirection}) => {
    return `${transitionName} ${transitionDuration}ms ${transitionTimingFunction} ${transitionDelay}ms ${transitionDirection}`;
  };


  export const findTransitionObject = (name, transitionData) => {
    const transition = transitionData.find(transitionItem => transitionItem.name === name);
    
    return transition || transitionData.find(transitionItem => transitionItem.name === "default");
  }

  export const calculateGlobeScale = (globeContainer) => {
    // Responsive scale based on actual container size
    const area = globeContainer.clientWidth * globeContainer.clientHeight;
    const baseArea = 786432; // reference desktop area (1024x768)
    const baseScale = Math.max(0.6, Math.min(1, area / baseArea));
    return globeContainer.clientWidth < 768 ? baseScale + 0.3 : baseScale;
  }