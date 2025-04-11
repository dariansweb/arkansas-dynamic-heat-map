// PDF Modal Elements
const openPdfModal = document.getElementById("open-pdf-modal");
const pdfModal = document.getElementById("pdf-modal");
const cancelPdf = document.getElementById("cancel-pdf");
const generatePdf = document.getElementById("generate-pdf");

console.log("📦 PDF script loaded");

// Open Modal
openPdfModal?.addEventListener("click", () => {
  console.log("🖱️ PDF button clicked");
  pdfModal.classList.remove("hidden");
  console.log("✅ jsPDF type is:", typeof window.jsPDF);
});

// Close Modal
cancelPdf?.addEventListener("click", () => {
  pdfModal.classList.add("hidden");
});

// Generate PDF
generatePdf?.addEventListener("click", async () => {
  const jsPDF = window.jsPDF;

  if (typeof jsPDF !== "function") {
    console.error("❌ jsPDF is not available.");
    return;
  }

  console.log("✅ jsPDF loaded:", jsPDF);

  const title =
    document.getElementById("pdf-title").value || "Arkansas Heat Map";
  const description = document.getElementById("pdf-description").value || "";

  // Hide the modal
  pdfModal.classList.add("hidden");

  // Capture map area
  const mapEl = document.getElementById("map-container");
  const canvas = await html2canvas(mapEl);

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width + 100, canvas.height + 120],
  });

  const marginX = 40;
  let currentY = 40;

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(title, marginX, currentY);

  currentY += 20;

  // Map Image
  pdf.addImage(imgData, "PNG", marginX, currentY, canvas.width, canvas.height);

  currentY += canvas.height + 20;

  // Description
  if (description) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    const splitDesc = pdf.splitTextToSize(description, canvas.width);
    pdf.text(splitDesc, marginX, currentY);
  }

  // Save the file
  pdf.save(`${title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
  console.log("📄 PDF generation completed.");
});
