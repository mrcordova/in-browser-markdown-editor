import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// import { showdown } from "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js";
// document.getElementById("content").innerHTML = marked.parse(
//   "# Marked in the browser\n\nRendered by **marked**."
// );
const dataResponse = await fetch("data.json");
const data = await dataResponse.json();
const previewBtns = document.querySelectorAll("[data-preview]");
const hideBtnTemplate = document.getElementById("hide-template");
const preview = document.getElementById("preview");
const previewTemp = previewBtns[1].children[0];
const markDownTemp = previewBtns[0].children[0];
const markdownTextArea = document.getElementById("markdown");

const labelToggle = document.querySelector("label[for='toggle']");

const deleteBtn = document.getElementById("delete-btn");
const deleteDialog = document.getElementById("delete-dialog");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

const sidebarBtn = document.getElementById("sidebar-btn");
const sideBar = document.getElementById("sidebar");
const sideBarLogo = document.getElementById("sidebar-logo");
let converter = new showdown.Converter();

function toggleSidebar(e) {
  // sideBar.style.display = "block";
  // sideBarLogo.style.display = "block";

  if (sideBar.style.display === "") {
    sideBar.style.display = "flex";
  } else {
    sideBar.style.display = "";
  }
  e.currentTarget.children[0].setAttribute(
    "src",
    `/assets/icon-${e.currentTarget.dataset.menu}.svg`
  );
  e.currentTarget.setAttribute(
    "data-menu",
    e.currentTarget.dataset.menu === "menu" ? "close" : "menu"
  );
}
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

  // console.log(markDownTemp);

  if (previewBtn.id === "preview-btn") {
    previewBtn.replaceChildren(
      previewBtn.dataset.preview !== "show" ? previewTemp : clone
    );

    previewBtnOne.replaceChildren(
      previewBtnOne.dataset.preview === "show" ? markDownTemp : clone
    );
  } else {
    previewBtn.replaceChildren(
      previewBtn.dataset.preview === "show" ? markDownTemp : clone
    );

    previewBtnOne.replaceChildren(
      previewBtnOne.dataset.preview !== "show" ? previewTemp : clone
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

markdownTextArea.addEventListener("input", (e) => {
  preview.replaceChildren();
  preview.insertAdjacentHTML(
    "afterbegin",
    converter.makeHtml(e.currentTarget.value)
  );
});

sidebarBtn.addEventListener("click", toggleSidebar);

labelToggle.addEventListener("click", (e) => {
  e.preventDefault();
  document.documentElement.classList.toggle("light-mode");
  const input = e.currentTarget.querySelector("#toggle");
  const themeImgs = e.currentTarget.querySelectorAll("[data-theme]");

  // console.log(themeImgs);
  for (const themeImg of themeImgs) {
    // console.log(!Boolean("false"));
    themeImg.setAttribute("data-theme", !(themeImg.dataset.theme === "true"));
  }
  input.checked = !input.checked;
  // console.log(e.currentTarget);
});

deleteBtn.addEventListener("click", (e) => {
  deleteDialog.showModal();
});

confirmDeleteBtn.addEventListener("click", (e) => {
  deleteDialog.close();
});
