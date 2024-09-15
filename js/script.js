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
let currentFileName = "";
const deleteBtn = document.getElementById("delete-btn");
const deleteDialog = document.getElementById("delete-dialog");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const saveBtn = document.getElementById("save-btn");

let files = null;
const sidebarBtn = document.getElementById("sidebar-btn");
const sideBar = document.getElementById("sidebar");
// const sideBarLogo = document.getElementById("sidebar-logo");
const fileInput = document.getElementById("doc-name");
const docTemplate = document.getElementById("doc-template");
const documents = document.querySelector(".documents");

let converter = new showdown.Converter();
function toggleSidebar(e) {
  if (sideBar.style.display === "") {
    sideBar.style.display = "flex";
  } else {
    sideBar.style.display = "";
  }
  e.currentTarget.children[0].setAttribute(
    "src",
    `./assets/icon-${e.currentTarget.dataset.menu}.svg`
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

window.addEventListener("load", (e) => {
  // console.log(files);
  currentFileName = fileInput.value;
  files = JSON.parse(localStorage.getItem("files") || null) || {};
  for (const fileName in files) {
    // console.log(fileName);
    const clone = docTemplate.content.cloneNode(true);

    const docInfo = clone.querySelector(".doc-info");
    docInfo.dataset.file = fileName;
    docInfo.children[1].textContent = fileName;
    // console.log(clone);
    // clone.children[1].children[1].textContent = fileName;
    documents.appendChild(clone);
  }
});

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
  console.log(files);
  Reflect.deleteProperty(files, fileInput.value);
  documents
    .querySelector(`[data-file="${fileInput.value}"]`)
    .parentElement.remove();
  deleteDialog.close();
});

// fileInput.addEventListener("click", (e) => {
//   e.currentTarget.readOnly = !e.currentTarget.readOnly;
// });

fileInput.addEventListener("focusin", (e) => {
  e.currentTarget.readOnly = false;
});
fileInput.addEventListener("focusout", (e) => {
  e.currentTarget.readOnly = true;

  const idx = e.currentTarget.value.indexOf(".md");
  const len = e.currentTarget.value.length;

  if (idx == -1 || idx + 3 !== len) {
    e.currentTarget.value += ".md";
  }
  currentFileName = e.currentTarget.value;
});

saveBtn.addEventListener("click", (e) => {
  // console.log(markdownTextArea.value);
  const clone = docTemplate.content.cloneNode(true);
  const checkFileExist = documents.querySelector(
    `[data-file="${currentFileName}"]`
  );

  if (checkFileExist !== null) {
    checkFileExist.children[1].textContent = fileInput.value;
    Reflect.deleteProperty(files, currentFileName);
  } else {
    const docInfo = clone.querySelector(".doc-info");
    docInfo.dataset.file = fileInput.value;
    docInfo.children[1].textContent = fileInput.value;
    documents.appendChild(clone);
  }
  files[fileInput.value] = markdownTextArea.value;

  localStorage.setItem("files", JSON.stringify(files));
  currentFileName = fileInput.value;
});
