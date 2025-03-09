function URLProvider() {
    const path = window.location.pathname.toLowerCase().split("/").pop();
    if (path.includes("aboutus")) {
        console.log("hello");
    }
}