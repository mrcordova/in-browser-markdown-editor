import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// document.getElementById("content").innerHTML = marked.parse(
//   "# Marked in the browser\n\nRendered by **marked**."
// );
const dataResponse = await fetch("data.json");
const data = await dataResponse.json();
const previewBtns = document.querySelectorAll("[data-preview]");
console.log(data);

console.log(previewBtns);
function togglePreview(e) {
  //   console.log(e.currentTarget.dataset.preview);
  for (const previewBtn of previewBtns) {
    const view = e.currentTarget.closest("div[data-show]");
    view.setAttribute("data-show");
  }
}

for (const previewBtn of previewBtns) {
  previewBtn.addEventListener("click", togglePreview);
}
