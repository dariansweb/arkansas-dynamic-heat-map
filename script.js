document.addEventListener("DOMContentLoaded", () => {
  const counties = [
    "Arkansas",
    "Ashley",
    "Baxter",
    "Benton",
    "Boone",
    "Bradley",
    "Calhoun",
    "Carroll",
    "Chicot",
    "Clark",
    "Clay",
    "Cleburne",
    "Cleveland",
    "Columbia",
    "Conway",
    "Craighead",
    "Crawford",
    "Crittenden",
    "Cross",
    "Dallas",
    "Desha",
    "Drew",
    "Faulkner",
    "Franklin",
    "Fulton",
    "Garland",
    "Grant",
    "Greene",
    "Hempstead",
    "Hot Spring",
    "Howard",
    "Independence",
    "Izard",
    "Jackson",
    "Jefferson",
    "Johnson",
    "Lafayette",
    "Lawrence",
    "Lee",
    "Lincoln",
    "Little River",
    "Logan",
    "Lonoke",
    "Madison",
    "Marion",
    "Miller",
    "Mississippi",
    "Monroe",
    "Montgomery",
    "Nevada",
    "Newton",
    "Ouachita",
    "Perry",
    "Phillips",
    "Pike",
    "Poinsett",
    "Polk",
    "Pope",
    "Prairie",
    "Pulaski",
    "Randolph",
    "St. Francis",
    "Saline",
    "Scott",
    "Searcy",
    "Sebastian",
    "Sevier",
    "Sharp",
    "Stone",
    "Union",
    "Van Buren",
    "Washington",
    "White",
    "Woodruff",
    "Yell",
  ];

  const countyInputsContainer = document.getElementById("county-inputs");
  const renderMapButton = document.getElementById("render-map");
  const mapObject = document.getElementById("arkansas-map");

  // Step 1: Populate the sidebar
  counties.forEach((county) => {
    const div = document.createElement("div");
    div.className = "county-input";

    const label = document.createElement("label");
    label.textContent = county;

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.value = "0";
    input.setAttribute("data-county", county);

    div.appendChild(label);
    div.appendChild(input);
    countyInputsContainer.appendChild(div);
  });

  // Step 2: Wait for SVG to load before binding logic
  mapObject.addEventListener("load", () => {
    const svgDoc = mapObject.contentDocument;
    if (!svgDoc) {
      console.error("Failed to access SVG.");
      return;
    }

    // Step 3: Color fill function
    function getHeatColor(value) {
      if (value == 0) return "#e0e0e0";
      if (value <= 25) return "#ffc107";
      if (value <= 50) return "#ff9800";
      if (value <= 75) return "#f44336";
      return "#b71c1c";
    }

    // Step 4: Render button click event
    renderMapButton.addEventListener("click", () => {
      const inputs = document.querySelectorAll("#county-inputs input");

      // Grab all values
      const values = Array.from(inputs).map(
        (input) => parseInt(input.value) || 0
      );
      const maxValue = Math.max(...values);

      // Safety fallback if all values are 0
      const scaledMax = maxValue === 0 ? 1 : maxValue;

      const svgDoc = mapObject.contentDocument;
      if (!svgDoc) return;

      inputs.forEach((input) => {
        const county = input.getAttribute("data-county");
        const value = parseInt(input.value) || 0;
        const path = svgDoc.getElementById(county);
        if (path) {
          path.style.fill = getHeatColor(value, scaledMax);
        }
      });
    });
  });
});
