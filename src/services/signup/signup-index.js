import { duplicateUsername, setupFormValidation } from "./signup-service.js";

document.addEventListener("DOMContentLoaded", () => {
    duplicateUsername();
    setupFormValidation();
});
