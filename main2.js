function URLProvider() {
    const path = window.location.pathname.toLowerCase().split("/").pop();
    
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            
            console.log('Link clicked, but default behavior prevented!');
        });
    });
    
    if (path.includes("aboutus")) {
        console.log("hello");
    }
};
URLProvider();
