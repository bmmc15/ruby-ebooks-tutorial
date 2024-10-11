// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import * as bootstrap from "bootstrap";
import "./components";
import ahoy from "ahoy.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const userToken = localStorage.getItem("jwt");

  ahoy.configure({
    urlPrefix: "http://localhost:3000",
    visitsUrl: "/ahoy/visits",
    eventsUrl: "/ahoy/events",
    userToken: userToken,
  });
});
