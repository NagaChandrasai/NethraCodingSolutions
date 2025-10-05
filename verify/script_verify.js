const form = document.getElementById("verify-form");
  const resultBox = document.getElementById("result-box");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const internId = document.getElementById("intern_id").value.trim();
    if (!internId) return;

    resultBox.innerHTML = `<p class="loading">Verifying, please wait...</p>`;

    // 🔗 Replace with your own Google Apps Script web app URL
    const apiUrl = "https://script.google.com/macros/s/AKfycbwv37-PqOcVP3p16WVD3RQmVPUrKitHMk-8UDz-fHLQeznPpqVJQuZyWAEG_Mv3UmcR/exec?id=" + encodeURIComponent(internId);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.error) {
        resultBox.innerHTML = `<p class="error">${data.error}</p>`;
      } else {
        resultBox.innerHTML = `
          <div class="details-card">
            <h3>Intern Details</h3>
            <div class="details-table">
              <p><strong>Intern ID:</strong> ${data["Intern ID"]}</p>
              <p><strong>Name:</strong> ${data["Name"]}</p>
              <p><strong>College:</strong> ${data["College"]}</p>
              <p><strong>Domain:</strong> ${data["Domain"]}</p>
              <p><strong>Start Date:</strong> ${data["Start Date"]}</p>
              <p><strong>End Date:</strong> ${data["End Date"]}</p>
              <p><strong>Duration:</strong> ${data["Duration"]}</p>
              <p><strong>Certificate Issued:</strong> ${data["Certificate Issued"]}</p>
              <p><strong>Mail ID:</strong> ${data["Mail ID"]}</p>
              <p><strong>Mobile No:</strong> ${data["Mobile No"]}</p>
            </div>
          </div>
        `;
      }
    } catch (err) {
      resultBox.innerHTML = `<p class="error">Error verifying data. Please try again later.</p>`;
    }
  });