// src/utils/resume/resumePdfGenerator.ts
// Dynamic Resume PDF Generator (Exact format matching Akshay Kumar original resume)
// Dynamically fetches live data from MySQL and formats pixel-perfect A4 2-page document.

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function generateResumePdfBuffer(): Promise<Buffer> {
  const [profile, skills, experiences, projects, education] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skillCategory.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
  ]);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 38,
        bufferPages: true,
        autoFirstPage: true,
        info: {
          Title: `${profile?.name || "Akshay Kumar"} - Resume`,
          Author: profile?.name || "Akshay Kumar",
          Subject: "Backend Developer Resume",
        },
      });

      const buffers: Buffer[] = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      const leftMargin = 38;
      const pageWidth = doc.page.width - 76; // ~519.28 pt
      const headerBlue = "#1e40af"; // Royal Blue matching original resume
      const darkText = "#111827";   // Deep Charcoal
      const bodyText = "#1f2937";   // Clean readable slate
      const mutedText = "#4b5563";  // Muted grey for subheaders

      // Helper to draw section header with blue underline
      const drawSectionHeader = (title: string) => {
        doc.moveDown(0.55);
        doc
          .font("Helvetica-Bold")
          .fontSize(9.5)
          .fillColor(headerBlue)
          .text(title.toUpperCase(), leftMargin, doc.y, { characterSpacing: 2 });

        doc.moveDown(0.2);
        const lineY = doc.y;
        doc
          .strokeColor(headerBlue)
          .lineWidth(1.2)
          .moveTo(leftMargin, lineY)
          .lineTo(leftMargin + pageWidth, lineY)
          .stroke();

        doc.moveDown(0.35);
      };

      // ==================== PAGE 1 ====================

      // --- HEADER ---
      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .fillColor(darkText)
        .text((profile?.name || "AKSHAY KUMAR").toUpperCase(), { align: "center" });

      doc.moveDown(0.2);
      const subtitle = profile?.subtitles || "Backend Developer | Node.js | Laravel | REST APIs";
      doc
        .font("Helvetica")
        .fontSize(9.5)
        .fillColor(mutedText)
        .text(subtitle, { align: "center" });

      doc.moveDown(0.2);
      const contactText = `${profile?.email || "kapilakshu848@gmail.com"}   •   ${profile?.phone || "+91 7876060984"}   •   ${profile?.location || "Himachal Pradesh, India"}`;
      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor(mutedText)
        .text(contactText, { align: "center" });

      // Blue divider line below header
      doc.moveDown(0.35);
      doc
        .strokeColor(headerBlue)
        .lineWidth(1.2)
        .moveTo(leftMargin, doc.y)
        .lineTo(leftMargin + pageWidth, doc.y)
        .stroke();
      doc.moveDown(0.25);

      // --- PROFESSIONAL SUMMARY ---
      drawSectionHeader("PROFESSIONAL SUMMARY");
      if (profile?.summary) {
        doc
          .font("Helvetica")
          .fontSize(8.2)
          .fillColor(bodyText)
          .text(profile.summary, {
            align: "justify",
            lineGap: 2.2,
          });
      }

      // --- PROFESSIONAL EXPERIENCE ---
      drawSectionHeader("PROFESSIONAL EXPERIENCE");
      for (const exp of experiences) {
        // Company | Location
        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor(darkText)
          .text(exp.company, leftMargin, doc.y, { continued: true })
          .font("Helvetica")
          .fillColor(mutedText)
          .text(` | ${exp.location}`, { continued: false });

        doc.moveDown(0.12);

        // Role & Period
        doc
          .font("Helvetica-Bold")
          .fontSize(8.5)
          .fillColor(headerBlue)
          .text(exp.role, leftMargin, doc.y, { continued: true })
          .font("Helvetica")
          .fillColor(mutedText)
          .text(`   ${exp.period}`, { continued: false });

        doc.moveDown(0.25);

        let subsections: any[] = [];
        try {
          subsections = typeof exp.subsections === "string" ? JSON.parse(exp.subsections) : exp.subsections;
        } catch {
          subsections = [];
        }

        for (const sub of subsections) {
          if (sub.title) {
            doc
              .font("Helvetica-Bold")
              .fontSize(8.5)
              .fillColor(darkText)
              .text(sub.title, { underline: true });
            doc.moveDown(0.15);
          }

          const points = Array.isArray(sub.points) ? sub.points : [];
          for (const pt of points) {
            doc
              .font("Helvetica")
              .fontSize(8)
              .fillColor(bodyText)
              .text(`•  ${pt}`, {
                indent: 8,
                lineGap: 1.8,
                align: "justify",
              });
          }
          doc.moveDown(0.2);
        }
      }

      // --- TECHNICAL SKILLS ---
      drawSectionHeader("TECHNICAL SKILLS");
      for (const sc of skills) {
        doc
          .font("Helvetica-Bold")
          .fontSize(8.5)
          .fillColor(darkText)
          .text(`${sc.name}: `, { continued: true })
          .font("Helvetica")
          .fillColor(bodyText)
          .text(sc.skills, { lineGap: 1.8 });
      }

      // KEY PROJECTS (Starts at bottom of page 1, exactly like original)
      drawSectionHeader("KEY PROJECTS");

      // ==================== PAGE 2 ====================
      doc.addPage();

      for (const p of projects) {
        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor(darkText)
          .text(p.title);

        doc.moveDown(0.1);
        doc
          .font("Helvetica-Oblique")
          .fontSize(8)
          .fillColor(mutedText)
          .text(`Tech Stack: ${p.techStack}`);

        doc.moveDown(0.2);

        let highlights: string[] = [];
        try {
          highlights = typeof p.highlights === "string" ? JSON.parse(p.highlights) : p.highlights;
        } catch {
          highlights = [];
        }

        for (const h of highlights) {
          doc
            .font("Helvetica")
            .fontSize(8)
            .fillColor(bodyText)
            .text(`•  ${h}`, {
              indent: 8,
              lineGap: 1.8,
              align: "justify",
            });
        }
        doc.moveDown(0.35);
      }

      // --- EDUCATION TABLE ---
      drawSectionHeader("EDUCATION");

      const tableTop = doc.y;
      const colWidths = [130, 229, 80, 80]; // Total = 519 pt
      const tableHeaders = ["Qualification", "Institution", "Year", "Score"];
      const headerHeight = 18;

      // Table Header Row Background
      doc
        .rect(leftMargin, tableTop, pageWidth, headerHeight)
        .fill("#eff6ff");

      // Table Header Text
      let curX = leftMargin;
      for (let i = 0; i < tableHeaders.length; i++) {
        doc
          .font("Helvetica-Bold")
          .fontSize(8.5)
          .fillColor(headerBlue)
          .text(tableHeaders[i], curX + 6, tableTop + 5, {
            width: colWidths[i] - 12,
            align: i >= 2 ? "center" : "left",
          });
        curX += colWidths[i];
      }

      // Table Header Border
      doc
        .rect(leftMargin, tableTop, pageWidth, headerHeight)
        .strokeColor("#94a3b8")
        .lineWidth(0.75)
        .stroke();

      // Header Column Dividers
      curX = leftMargin;
      for (let i = 0; i < colWidths.length - 1; i++) {
        curX += colWidths[i];
        doc
          .moveTo(curX, tableTop)
          .lineTo(curX, tableTop + headerHeight)
          .strokeColor("#94a3b8")
          .lineWidth(0.75)
          .stroke();
      }

      let rowTop = tableTop + headerHeight;

      // Dynamic Data Rows (height calculated dynamically to prevent text overlapping)
      for (const edu of education) {
        const cleanScore = edu.score?.replace(/Graduated with /i, "")?.replace(/ Aggregate/i, "") || edu.score || "";
        const cells = [edu.degree, edu.institution, edu.year, cleanScore];

        // Measure cell heights
        doc.font("Helvetica-Bold").fontSize(8);
        const h0 = doc.heightOfString(cells[0], { width: colWidths[0] - 12 });
        doc.font("Helvetica").fontSize(8);
        const h1 = doc.heightOfString(cells[1], { width: colWidths[1] - 12 });
        const rowHeight = Math.max(h0, h1, 14) + 10;

        // Row background
        doc
          .rect(leftMargin, rowTop, pageWidth, rowHeight)
          .strokeColor("#cbd5e1")
          .lineWidth(0.5)
          .stroke();

        // Render cells
        curX = leftMargin;
        for (let i = 0; i < cells.length; i++) {
          doc
            .font(i === 0 ? "Helvetica-Bold" : "Helvetica")
            .fontSize(8)
            .fillColor(darkText)
            .text(cells[i], curX + 6, rowTop + 5, {
              width: colWidths[i] - 12,
              align: i >= 2 ? "center" : "left",
              lineGap: 1.5,
            });

          if (i > 0) {
            doc
              .moveTo(curX, rowTop)
              .lineTo(curX, rowTop + rowHeight)
              .strokeColor("#cbd5e1")
              .lineWidth(0.5)
              .stroke();
          }
          curX += colWidths[i];
        }

        rowTop += rowHeight;
      }

      doc.y = rowTop + 10;

      // --- PERSONAL DETAILS ---
      drawSectionHeader("PERSONAL DETAILS");

      const personalFields = [
        { label: "Date of Birth", value: profile?.dob || "23 August 2002" },
        { label: "Languages Known", value: profile?.languages || "Hindi, English" },
        { label: "Address", value: profile?.address || "Vill. Suglani, P/O Dhangota, Teh. Dhatwal, Distt. Hamirpur, Himachal Pradesh – 176040" },
        { label: "Availability", value: profile?.availability || "Immediate" },
      ];

      for (const item of personalFields) {
        doc
          .font("Helvetica-Bold")
          .fontSize(8.5)
          .fillColor(darkText)
          .text(`${item.label}: `, leftMargin, doc.y, { continued: true })
          .font("Helvetica")
          .fillColor(bodyText)
          .text(item.value, { lineGap: 2.5 });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Regenerates the static resume file in /public/Akshay_Kumar_Resume.pdf
 * so both static links and dynamic downloads stay completely updated.
 */
export async function syncResumePdf(): Promise<boolean> {
  try {
    const buffer = await generateResumePdfBuffer();
    const publicPath = path.join(process.cwd(), "public", "Akshay_Kumar_Resume.pdf");
    await fs.promises.writeFile(publicPath, buffer);
    console.log(`[RESUME_SYNC] Resume PDF synced successfully to ${publicPath} (${buffer.length} bytes)`);
    return true;
  } catch (error) {
    console.error("[RESUME_SYNC_ERROR] Error syncing resume PDF:", error);
    return false;
  }
}
