import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
const { window } = new JSDOM("<!DOCTYPE html>");
const domPurify = DOMPurify(window);

// user shouldn't write any html tags into any input on this site
// TODO: is this async or not?
const sanitizeHTML = (text: string) => domPurify.sanitize(text, { ALLOWED_TAGS: [""] });

export { sanitizeHTML };
