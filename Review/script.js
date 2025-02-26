document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const form = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviews");

    let selectedRating = 0;

    // Handle star selection
    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            updateStarColors(index);
        });
    });

    function updateStarColors(index) {
        stars.forEach((s, i) => {
            s.classList.toggle("selected", i <= index);
        });
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const reviewText = document.getElementById("reviewText").value;

        if (selectedRating === 0) {
            alert("Please select a star rating!");
            return;
        }

        const reviewHTML = `
            <div class="review">
                <h4>${name}</h4>
                <p class="stars">${"★".repeat(selectedRating) + "☆".repeat(5 - selectedRating)}</p>
                <p>${reviewText}</p>
            </div>
        `;

        // Append review to the container
        reviewsContainer.innerHTML += reviewHTML;

        // Clear form fields
        form.reset();
        selectedRating = 0;
        stars.forEach(star => star.classList.remove("selected"));
    });
});
