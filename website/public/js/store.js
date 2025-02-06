window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get("view");

  if (view === "product") {
    loadProductView();
  } else {
    loadStoreView(); // Default to store view
  }
};

function loadStoreView() {
  fetch("store.html")
    .then(response => response.text())
    .then(htmlContent => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const storeContent = doc.getElementById("window").innerHTML;

      document.getElementById("window").innerHTML = storeContent;

      // Setup event for product card clicks
      setupCardClickHandler();
    })
    .catch(error => console.error("Error loading store.html:", error));
}

function loadProductView() {
  const window = document.getElementById("window");
  window.innerHTML = `
    <div class="image" style="margin: 30px;">
      <img src="./../images/product.jpg" style="width: 300px; height: auto;">
    </div>
    <div class="details">
      <h1>Product Name</h1>
      <h2>Product Price</h2>
      <select class="size">
        <option value="" disabled selected hidden>Select your Size...</option>
        <!-- Available -->
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="xl">XL</option>
      </select>
      <h4>Product Description</h4>
      <button type="submit"><i class="fa-solid fa-shopping-cart"></i> Buy Now</button>
      <button type="submit"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
    </div>
  `;

  // Back to store
  document.getElementById("backToStore").addEventListener("click", () => {
    window.location.href = "?view=store";
  });
}

function setupCardClickHandler() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = "?view=product";
    });
  });
}
