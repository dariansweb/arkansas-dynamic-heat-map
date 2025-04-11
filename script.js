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
    if (!svgDoc) return;

    // Color fill function
    function getHeatColor(value, max) {
      if (value === 0) return "#e0e0e0";
      const percent = value / max;
      const lightness = 90 - percent * 60;
      return `hsl(0, 100%, ${lightness}%)`;
    }

    // Tooltip setup
    const tooltip = document.getElementById("tooltip");

    // Get all inputs
    const inputs = document.querySelectorAll("#county-inputs input");

    // Bind tooltip and hover
    counties.forEach((county) => {
      const path = svgDoc.getElementById(county);
      const input = document.querySelector(`input[data-county="${county}"]`);
      const rect = mapObject.getBoundingClientRect();

      if (path && input) {
        path.addEventListener("mousemove", (e) => {
          const value = parseInt(input.value) || 0;
          tooltip.innerHTML = `<strong>${county} County</strong><br/>Value: ${value}`;
          tooltip.style.left = `${e.clientX + rect.left + 10}px`;
          tooltip.style.top = `${e.clientY + rect.top + 10}px`;

          tooltip.classList.remove("hidden");
        });

        path.addEventListener("mouseleave", () => {
          tooltip.classList.add("hidden");
        });
      }
    });

    // Render logic
    renderMapButton.addEventListener("click", () => {
      const values = Array.from(inputs).map(
        (input) => parseInt(input.value) || 0
      );
      const maxValue = Math.max(...values);
      const scaledMax = maxValue === 0 ? 1 : maxValue;

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
