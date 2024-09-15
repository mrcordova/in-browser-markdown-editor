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

let files = JSON.parse(localStorage.getItem("files") || null) || {};
const sidebarBtn = document.getElementById("sidebar-btn");
const sideBar = document.getElementById("sidebar");
// const sideBarLogo = document.getElementById("sidebar-logo");
const fileInput = document.getElementById("doc-name");
const docTemplate = document.getElementById("doc-template");
const documents = document.querySelector(".documents");
const newDocBtn = document.getElementById("new-document-btn");

let converter = new showdown.Converter();
let currentNewFile =
  JSON.parse(localStorage.getItem("currentNewFile") || null) || 0;
const options = {
  year: "numeric",
  month: "long",
  day: "2-digit",
};

function createDate() {
  return new Date().toLocaleDateString("en-AU", options);
}

// console.log(getTime());

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
function loadFile(e) {
  // console.log(e.currentTarget);
  currentFileName = e.currentTarget.textContent;
  fileInput.value = currentFileName;
  markdownTextArea.value = files[currentFileName].markdown;
}

window.addEventListener("load", (e) => {
  currentFileName = fileInput.value;
  files = JSON.parse(localStorage.getItem("files") || null) || {};
  console.log(files);
  for (const fileName in files) {
    // console.log(fileName);
    const clone = docTemplate.content.cloneNode(true);

    const docInfo = clone.querySelector(".doc-info");
    docInfo.dataset.file = fileName;
    docInfo.children[0].textContent = files[fileName].date;
    docInfo.children[1].textContent = fileName;
    docInfo.children[1].addEventListener("click", loadFile);
    // console.log(clone);
    // clone.children[1].children[1].textContent = fileName;
    documents.appendChild(clone);
  }
});
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
  // console.log(files);
  const docInfo = documents.querySelector(`[data-file="${fileInput.value}"]`);
  if (docInfo !== null) {
    docInfo.parentElement.remove();
    Reflect.deleteProperty(files, fileInput.value);

    localStorage.setItem("files", JSON.stringify(files));

    // console.log(files);

    const tempName =
      documents.children[documents.children.length - 1].children[1]?.dataset
        .file;
    if (tempName !== undefined) {
      markdownTextArea.value = files[tempName].markdown;
      fileInput.value = tempName;
    } else {
      markdownTextArea.value = "";
      fileInput.value = `untitled-document-${getTime()}.md`;
    }
  } else {
    markdownTextArea.value = "";
    fileInput.value = "";
  }

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

newDocBtn.addEventListener("click", (e) => {
  const clone = docTemplate.content.cloneNode(true);
  const docInfo = clone.querySelector(".doc-info");

  // console.log(docInfo);
  const fileName = `untitled-document${
    currentNewFile == 0 ? "" : `(${currentNewFile})`
  }.md`;
  currentNewFile++;
  localStorage.getItem("currentNewFile", currentNewFile);
  docInfo.dataset.file = fileName;
  docInfo.children[0].textContent = createDate();
  docInfo.children[1].textContent = fileName;
  docInfo.children[1].addEventListener("click", loadFile);
  fileInput.value = fileName;
  markdownTextArea.value = "";

  files[fileName] = {
    markdown: markdownTextArea.value,
    date: docInfo.children[0].textContent,
  };
  currentFileName = fileName;
  documents.appendChild(clone);

  localStorage.setItem("files", JSON.stringify(files));
  // console.log(files);
});

saveBtn.addEventListener("click", (e) => {
  // console.log(markdownTextArea.value);
  const clone = docTemplate.content.cloneNode(true);
  const checkFileExist = documents.querySelector(
    `[data-file="${currentFileName}"]`
  );
  let date = "";

  if (checkFileExist !== null) {
    checkFileExist.children[1].textContent = fileInput.value;
    date = checkFileExist.children[0].textContent;
    Reflect.deleteProperty(files, currentFileName);
  } else {
    const docInfo = clone.querySelector(".doc-info");
    docInfo.dataset.file = fileInput.value;
    docInfo.children[0].textContent = createDate();
    docInfo.children[1].textContent = fileInput.value;
    docInfo.children[1].addEventListener("click", loadFile);
    date = docInfo.children[0].textContent;
    documents.appendChild(clone);
  }
  files[fileInput.value] = {
    markdown: markdownTextArea.value,
    date,
  };

  localStorage.setItem("files", JSON.stringify(files));
  currentFileName = fileInput.value;
});
