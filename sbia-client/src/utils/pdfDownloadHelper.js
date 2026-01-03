import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Temporarily hide elements with oklch colors
 * @param {HTMLElement} element - The element to check
 * @returns {Array} Array of elements that were modified
 */
const tempFixOklchColors = (element) => {
  const modifiedElements = [];

  try {
    // Walk through all elements and check computed styles
    const allElements = element.querySelectorAll("*");

    for (let el of allElements) {
      try {
        const computedStyle = window.getComputedStyle(el);
        const bgColor = computedStyle.backgroundColor;
        const color = computedStyle.color;

        // If any computed style contains oklch, try to fix it
        if (
          (bgColor && bgColor.includes("oklch")) ||
          (color && color.includes("oklch"))
        ) {
          // Store original styles
          const originalBgColor = el.style.backgroundColor;
          const originalColor = el.style.color;

          if (bgColor && bgColor.includes("oklch")) {
            el.style.backgroundColor = "rgb(255, 255, 255)";
            modifiedElements.push({ el, originalBgColor, type: "bgColor" });
          }
          if (color && color.includes("oklch")) {
            el.style.color = "rgb(0, 0, 0)";
            modifiedElements.push({ el, originalColor, type: "color" });
          }
        }
      } catch (err) {}
    }
  } catch (err) {
    console.warn("Warning: Could not fix oklch colors", err);
  }

  return modifiedElements;
};

/**
 * Restore original styles
 * @param {Array} modifiedElements - Array of modified elements from tempFixOklchColors
 */
const restoreOriginalStyles = (modifiedElements) => {
  for (let item of modifiedElements) {
    try {
      if (item.type === "bgColor") {
        item.el.style.backgroundColor = item.originalBgColor || "";
      } else if (item.type === "color") {
        item.el.style.color = item.originalColor || "";
      }
    } catch (err) {}
  }
};

/**
 * Helper function to generate PDF from element (shared logic)
 * @param {HTMLElement} elementRef - Reference to the DOM element
 * @param {Object} options - Additional options for PDF generation
 * @returns {Promise<Object>} - Returns {pdf, modifiedElements}
 */
const generatePDFFromElement = async (elementRef, options = {}) => {
  let modifiedElements = [];

  try {
    modifiedElements = tempFixOklchColors(elementRef);

    const canvasOptions = {
      allowTaint: true,
      useCORS: true,
      backgroundColor: "#ffffff",
      scale: 2,
      letterRendering: true,
      logging: false,
      windowHeight: elementRef.scrollHeight,
      ...options.canvas,
    };

    const canvas = await html2canvas(elementRef, canvasOptions);

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdfOptions = {
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
      ...options.pdf,
    };

    const pdf = new jsPDF(pdfOptions);

    let position = 0;
    const pageHeight = 295;
    const imgData = canvas.toDataURL("image/png");

    while (heightLeft > 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position = heightLeft;
      if (heightLeft > 0) {
        pdf.addPage();
      }
    }

    return { pdf, modifiedElements };
  } catch (error) {
    restoreOriginalStyles(modifiedElements);
    throw error;
  }
};

/**
 * Generate and download PDF from a DOM element
 * @param {HTMLElement} elementRef - Reference to the DOM element to convert to PDF
 * @param {string} fileName - Name for the downloaded file
 * @param {Object} options - Additional options for PDF generation
 * @returns {Promise<boolean>} - Returns true if successful, false otherwise
 */
export const generateAndDownloadPDF = async (
  elementRef,
  fileName = "document",
  options = {}
) => {
  if (!elementRef) {
    console.error("Element reference is null");
    return false;
  }

  let modifiedElements = [];

  try {
    console.log(`Starting PDF generation for: ${fileName}`);

    const { pdf, modifiedElements: modified } = await generatePDFFromElement(
      elementRef,
      options
    );
    modifiedElements = modified;

    console.log(`Fixed ${modifiedElements.length} elements with oklch colors`);

    const finalFileName = fileName.includes(".pdf")
      ? fileName
      : `${fileName}-${new Date().getTime()}.pdf`;

    console.log(`Downloading as: ${finalFileName}`);

    if (pdf && typeof pdf.save === "function") {
      pdf.save(finalFileName);
    } else {
      throw new Error("PDF save method not available");
    }

    return true;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(" Error generating PDF:", errorMsg);
    throw new Error(`PDF Generation Failed: ${errorMsg}`);
  } finally {
    restoreOriginalStyles(modifiedElements);
  }
};

/**
 * Generate PDF and return as Blob (for uploading or further processing)
 * @param {HTMLElement} elementRef - Reference to the DOM element to convert to PDF
 * @param {Object} options - Additional options for PDF generation
 * @returns {Promise<Blob>} - Returns PDF as Blob
 */
export const generatePDFBlob = async (elementRef, options = {}) => {
  if (!elementRef) {
    throw new Error("Element reference is null");
  }

  let modifiedElements = [];

  try {
    console.log("Starting PDF Blob generation");

    const { pdf, modifiedElements: modified } = await generatePDFFromElement(
      elementRef,
      options
    );
    modifiedElements = modified;

    console.log(`Fixed ${modifiedElements.length} elements with oklch colors`);
    console.log("✅ Canvas created successfully");
    console.log(" PDF Blob generated successfully");

    if (pdf && typeof pdf.output === "function") {
      return pdf.output("blob");
    } else {
      throw new Error("PDF output method not available");
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(" Error generating PDF Blob:", errorMsg);
    throw new Error(`PDF Blob Generation Failed: ${errorMsg}`);
  } finally {
    restoreOriginalStyles(modifiedElements);
  }
};
