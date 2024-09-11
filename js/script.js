import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// document.getElementById("content").innerHTML = marked.parse(
//   "# Marked in the browser\n\nRendered by **marked**."
// );
const dataResponse = await fetch("data.json");
const data = await dataResponse.json();

console.log(data);
