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
      previewBtn.dataset.preview === "show" ? previewTemp : clone
    );

    previewBtnOne.replaceChildren(
      previewBtnOne.dataset.preview === "show" ? markDownTemp : cloneOne
    );
  } else {
    previewBtn.replaceChildren(
      previewBtn.dataset.preview === "show" ? markDownTemp : clone
    );

    previewBtnOne.replaceChildren(
      previewBtnOne.dataset.preview === "show" ? previewTemp : cloneOne
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
  // console.log(previewBtn);

  // for (const previewBtn of previewBtns) {
  //   const tempView = previewBtn.closest("[data-show]");
  //   if (tempView != view) {
  //     previewBtn.setAttribute(
  //       "data-preview",
  //       previewBtn.dataset.preview == "show" ? "hide" : "show"
  //     );
  //     previewBtn.replaceChildren(
  //       previewBtn.dataset.preview === "show" ? previewTemp : clone
  //     );
  //   }
  // }

  // console.log(clone);
  // console.log(previewBtns);
  // for (const previewBtn of previewBtns) {
  //   const tempView = previewBtn.closest("[data-show]");
  //   tempView.setAttribute("data-show", view !== tempView);

  //   if (e.currentTarget.id == "preview-btn") {
  //     e.currentTarget.setAttribute(
  //       "data-preview",
  //       e.currentTarget.dataset.preview === "show" ? "hide" : "show"
  //     );
  //     e.currentTarget.replaceChildren(
  //       e.currentTarget.dataset.preview === "hide" ? clone : previewTemp
  //     );
  //     console.log(e.currentTarget);
  //   } else if (e.currentTarget.id === "markdown-btn") {
  //     console.log("markdown-btn");
  // }
  // if (
  //   previewBtn.id === "preview-btn" &&
  //   e.currentTarget.id === previewBtn.id
  // ) {
  //   previewBtn.classList.toggle(
  //     "hide",
  //     !previewBtn.classList.contains("hide")
  //   );
  //   previewBtn.classList.toggle(
  //     "hide",
  //     previewBtn.classList.contains("hide")
  //   );
  // } else if (
  //   previewBtn.id === "preview-btn-tablet" &&
  //   e.currentTarget.id === previewBtn.id
  // ) {
  // }
  // if (previewBtn.id !== "preview-btn-tablet") {
  // } else {
  //   console.log(e.currentTarget.dataset.preview);
  //   tempView.setAttribute(
  //     "data-show",
  //     `${e.currentTarget.dataset.preview == "hide" ? true : false}`
  //   );
  //   e.currentTarget.setAttribute(
  //     "data-preview",
  //     `${
  //       e.currentTarget.getAttribute("data-preview") == "hide"
  //         ? "show"
  //         : "hide"
  //     }`
  //   );
  // }
  // }
}

for (const previewBtn of previewBtns) {
  previewBtn.addEventListener("click", togglePreview);
}
