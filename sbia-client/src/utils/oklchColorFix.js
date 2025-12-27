/**
 * PDF generation with oklch color handling via CSS replacement
 * Injects a style tag to override oklch colors with hex equivalents
 */

// Crop passport photo to exact dimensions (160x200px)
export const cropPassportPhoto = async (photoFile) => {
  if (!photoFile) return null;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");

        // Calculate center crop
        const sourceWidth = img.width;
        const sourceHeight = img.height;
        const sourceRatio = sourceWidth / sourceHeight;
        const targetRatio = 160 / 200; // 0.8

        let srcX, srcY, srcW, srcH;

        if (sourceRatio > targetRatio) {
          // Image is wider, crop horizontally
          srcH = sourceHeight;
          srcW = sourceHeight * targetRatio;
          srcX = (sourceWidth - srcW) / 2;
          srcY = 0;
        } else {
          // Image is taller, crop vertically
          srcW = sourceWidth;
          srcH = sourceWidth / targetRatio;
          srcX = 0;
          srcY = (sourceHeight - srcH) / 2;
        }

        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, 160, 200);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/png",
          0.95
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(photoFile);
  });
};

// Complete Tailwind color palette in hex format
const tailwindColors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#ffffff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1a6",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfdf5",
    200: "#d1fae5",
    300: "#a7f3d0",
    400: "#6ee7b7",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#145231",
  },
  emerald: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#145231",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#134e4a",
    900: "#0f3f3a",
  },
  cyan: {
    50: "#ecf0f1",
    100: "#cff0f1",
    200: "#a1e9e9",
    300: "#6ee7e0",
    400: "#34d9d9",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f8a0d8",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
};

/**
 * Generate comprehensive CSS override for oklch colors
 */
const generateColorOverrideCss = () => {
  let css = "/* PDF Export Color Overrides */\n";
  css += "* { color-space: srgb !important; }\n";

  // Add all color classes
  Object.entries(tailwindColors).forEach(([colorName, shades]) => {
    if (typeof shades === "string") {
      // Single value colors
      css += `.bg-${colorName} { background-color: ${shades} !important; }\n`;
      css += `.text-${colorName} { color: ${shades} !important; }\n`;
      css += `.border-${colorName} { border-color: ${shades} !important; }\n`;
    } else {
      // Shade variants
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `.bg-${colorName}-${shade} { background-color: ${hex} !important; }\n`;
        css += `.text-${colorName}-${shade} { color: ${hex} !important; }\n`;
        css += `.border-${colorName}-${shade} { border-color: ${hex} !important; }\n`;
      });
    }
  });

  return css;
};

/**
 * Generate PDF with CSS color overrides
 */
export const generatePDFWithOklchFix = async (element, fileName) => {
  if (!element) {
    throw new Error("Element not found");
  }

  try {
    console.log("🔍 Starting PDF export...");

    // Dynamically import html2pdf
    const html2pdf = (await import("html2pdf.js")).default;

    // Clone the element
    const clonedElement = element.cloneNode(true);

    // Create a style element with color overrides
    const styleElement = document.createElement("style");
    styleElement.textContent = generateColorOverrideCss();
    clonedElement.insertBefore(styleElement, clonedElement.firstChild);

    // Suppress all oklch-related errors
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalLog = console.log;

    const errorFilter = (msg) => {
      if (typeof msg === "string") {
        return (
          msg.toLowerCase().includes("oklch") ||
          msg.toLowerCase().includes("unsupported color")
        );
      }
      return false;
    };

    console.warn = function (...args) {
      if (!args.some((arg) => errorFilter(arg))) {
        originalWarn.apply(console, args);
      }
    };

    console.error = function (...args) {
      if (!args.some((arg) => errorFilter(arg))) {
        originalError.apply(console, args);
      }
    };

    const options = {
      margin: [10, 10, 10, 10],
      filename: fileName,
      image: { type: "png", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowHeight: clonedElement.scrollHeight,
        onclone: (clonedDoc) => {
          // Add style overrides to cloned document too
          const style = clonedDoc.createElement("style");
          style.textContent = generateColorOverrideCss();
          clonedDoc.head.appendChild(style);
        },
      },
      jsPDF: {
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      },
      pagebreak: { mode: "avoid-all" },
    };

    console.log("📄 Converting to PDF...");

    // Generate PDF
    await html2pdf().set(options).from(clonedElement).save();

    // Restore console
    console.warn = originalWarn;
    console.error = originalError;
    console.log = originalLog;

    console.log("✅ PDF downloaded successfully");
    return true;
  } catch (error) {
    console.error("PDF error:", error);
    throw new Error(
      `PDF download failed. ${error.message || "Please try again."}`
    );
  }
};
/**
 * Generate PDF blob with oklch color fixes
 * Returns a Blob object instead of downloading
 */
export const generatePDFBlobWithOklchFix = async (element) => {
  if (!element) {
    throw new Error("Element not found");
  }

  try {
    console.log("🔍 Starting PDF blob generation...");

    // Dynamically import html2pdf
    const html2pdf = (await import("html2pdf.js")).default;

    // Clone the element
    const clonedElement = element.cloneNode(true);

    // Create a style element with color overrides
    const styleElement = document.createElement("style");
    styleElement.textContent = generateColorOverrideCss();
    clonedElement.insertBefore(styleElement, clonedElement.firstChild);

    // Suppress all oklch-related errors
    const originalWarn = console.warn;
    const originalError = console.error;

    const errorFilter = (msg) => {
      if (typeof msg === "string") {
        return (
          msg.toLowerCase().includes("oklch") ||
          msg.toLowerCase().includes("unsupported color")
        );
      }
      return false;
    };

    console.warn = function (...args) {
      if (!args.some((arg) => errorFilter(arg))) {
        originalWarn.apply(console, args);
      }
    };

    console.error = function (...args) {
      if (!args.some((arg) => errorFilter(arg))) {
        originalError.apply(console, args);
      }
    };

    console.log("📄 Converting to PDF blob...");

    const options = {
      margin: [5, 5, 5, 5],
      filename: "BankForm.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowHeight: clonedElement.scrollHeight,
        onclone: (clonedDoc) => {
          // Add style overrides to cloned document
          const style = clonedDoc.createElement("style");
          style.textContent = generateColorOverrideCss();
          clonedDoc.head.appendChild(style);

          // Force crop passport photo to exact dimensions
          const passportPhotoStyle = clonedDoc.createElement("style");
          passportPhotoStyle.textContent = `
            img[alt="Passport Photo"] {
              width: 160px !important;
              height: 200px !important;
              max-width: 160px !important;
              max-height: 200px !important;
              object-fit: cover !important;
              object-position: center !important;
              display: block !important;
            }
            img[alt="Passport Photo"] + * {
              display: none !important;
            }
          `;
          clonedDoc.head.appendChild(passportPhotoStyle);
        },
      },
      jsPDF: {
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: false,
      },
      pagebreak: { mode: "avoid-all" },
    };

    // Generate PDF and return as blob
    const pdf = await html2pdf()
      .set(options)
      .from(clonedElement)
      .toPdf()
      .output("blob");

    // Restore console
    console.warn = originalWarn;
    console.error = originalError;

    console.log("✅ PDF blob generated successfully");
    return pdf;
  } catch (error) {
    console.error("PDF blob generation error:", error);
    throw new Error(
      `PDF generation failed. ${error.message || "Please try again."}`
    );
  }
};
