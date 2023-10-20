import React from 'react';
import html2pdf from 'html2pdf.js';

const PDFGeneration = ({ userData, age, dayOfWeek }) => {
  const generatePDF = () => {
    const content = `
      <h1>User Information</h1>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Gender:</strong> ${userData.gender}</p>
      <p><strong>Date of Birth:</strong> ${userData.dob}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Age:</strong> ${age} years old</p>
      <p><strong>Day of the Week:</strong> ${dayOfWeek}</p>
    `;

    const pdfOptions = {
      margin: 10,
      filename: 'user_info.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(content).set(pdfOptions).outputPdf((pdf) => {
      // You can save or email the PDF here (e.g., using EmailJS)
      const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_info.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <h2>PDF Generation</h2>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGeneration;
