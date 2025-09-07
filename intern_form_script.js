// Auto-fill internship role from query param
const urlParams = new URLSearchParams(window.location.search);
const role = urlParams.get("role");
if (role) {
  document.getElementById("internshipRole").value = role;
}

// Price update logic
const durationSelect = document.getElementById("duration");
const priceBox = document.getElementById("priceBox");

durationSelect.addEventListener("change", () => {
  let price = 0;
  if (durationSelect.value === "1 Month") price = 199;
  if (durationSelect.value === "6 Weeks") price = 299;
  if (durationSelect.value === "2 Months") price = 449;
  priceBox.textContent = "Price: ₹" + price;
});
