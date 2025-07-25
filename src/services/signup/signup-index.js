import {
    duplicateUsername,
    setupFormValidation,
    validatePassword,
} from "./signup-service.js";

document.addEventListener("DOMContentLoaded", () => {
    duplicateUsername();
    setupFormValidation();
});
