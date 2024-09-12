import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// document.getElementById("content").innerHTML = marked.parse(
//   "# Marked in the browser\n\nRendered by **marked**."
// );
const dataResponse = await fetch("data.json");
const data = await dataResponse.json();
const previewBtns = document.querySelectorAll("[data-preview]");
const hideBtnTemplate = document.getElementById("hide-template");

const previewTemp = previewBtns[1].children[0];
const markDownTemp = previewBtns[0].children[0];
console.log(markDownTemp);
function togglePreview(e) {
  const view = document.querySelector('[data-show="true"');
  const tempView = view.parentElement.querySelector('[data-show="false"');
  tempView.setAttribute("data-show", view.dataset.show);
  view.setAttribute("data-show", !view.dataset.show);
  const clone = hideBtnTemplate.content.cloneNode(true);
  const cloneOne = hideBtnTemplate.content.cloneNode(true);

  const previewBtn = tempView.querySelector("[data-preview]");
  const previewBtnOne = view.querySelector("[data-preview]");
  // const previewBtnOne = view.querySelector(#)

  console.log(markDownTemp);

  if (previewBtn.id === "preview-btn") {
    previewBtn.replaceChildren(
      previewBtn.dataset.preview !== "show" ? previewTemp : clone
    );

    previewBtnOne.replaceChildren(
      previewBtnOne.dataset.preview === "show" ? markDownTemp : cloneOne
    );
  } else {
    previewBtn.replaceChildren(
      previewBtn.dataset.preview === "show" ? markDownTemp : clone
    );

    previewBtnOne.replaceChildren(
      previewBtnOne.dataset.preview !== "show" ? previewTemp : cloneOne
    );
  }
  previewBtn.setAttribute(
    "data-preview",
    previewBtn.dataset.preview === "show" ? "hide" : "show"
  );
  previewBtnOne.setAttribute(
    "data-preview",
    previewBtnOne.dataset.preview === "show" ? "hide" : "show"
  );
}

for (const previewBtn of previewBtns) {
  previewBtn.addEventListener("click", togglePreview);
}
