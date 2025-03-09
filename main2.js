function URLProvider() {
    const path = window.location.pathname.toLowerCase().split("/").pop();

    // Loop through all anchor links on the page
    document.querySelectorAll("a").forEach(link => {
        // Add click event listener to prevent default behavior
        link.addEventListener("click", function(event) {
            // Prevent the default navigation behavior
            event.preventDefault();
            
            // Check if the path contains "aboutus"
            if (path.includes("aboutus")) {
                console.log("You are on the About Us page!");
            }
            
            // Optionally, manually handle the navigation or custom action
            console.log('Link clicked, but default behavior prevented!');
            window.location.href = this.href;  // This will still navigate after preventDefault
        });
    });

    // Check if the path contains "aboutus" (for any additional logic)
    if (path.includes("aboutus")) {
        console.log("hello");
    }
}

URLProvider();
