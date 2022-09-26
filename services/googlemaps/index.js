import { isBrowser } from "../utils";

const google = isBrowser && window.google ? window.google : {};
if (isBrowser && !window.google) {
    window.google = google;
}

export default google;
