/********** ELEMENTS **********/
const elements = {
  body: document.querySelector("body"),
  navbar: document.querySelector(".navbar"),
  open_spotlight: document.querySelector(".open_Search"),
  spotlight_search: document.querySelector(".spotlight_search"),
  brightness_range: document.getElementById("brightness"),
  sound_range: document.getElementById("sound"),
  clockElement: document.getElementById("clock"),
  clockWrapper: document.querySelector(".clock"),
  widgetsPanel: document.querySelector(".widgets-panel"),
  batteryButton: document.querySelector(".battery"),
  batteryText: document.querySelector(".battery__text"),
  batteryPopup: document.querySelector(".battery__popup"),
  batteryPopupText: document.querySelector(".battery__popup header span"),
  batteryProgress: document.querySelector(".battery__progress"),
  batteryIsChargingLogo: document.querySelector(".is-charging"),
  powerSource: document.querySelector(".power-source"),
};

// Calculator App
const calculatorApp = {
  app_name: document.querySelector("#calculator"),
  window: document.querySelector(".calculator"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close-cal"),
  backfull: document.querySelector(".min-cal"),
  point: document.querySelector("#point-cal"),
  opening: document.querySelector(".open-cal"),
  opening_l: document.querySelector(".open-cal-launching"),
};

// Notes App
const notesApp = {
  app_name: document.querySelector("#Notes"),
  window: document.querySelector(".note"),
  full: document.querySelector(".full-note"),
  close: document.querySelector(".close-note"),
  backfull: document.querySelector(".backfull-note"),
  point: document.querySelector("#point-note"),
  adding: document.querySelector(".adding"),
  deleting: document.querySelector(".deleting"),
  content_typing: document.querySelector(".content__typing"),
  opening: document.querySelector(".open-note"),
  notes: document.querySelector(".content__sidebar--notes"),
};

// Terminal App
const terminalApp = {
  app_name: document.querySelector("#Terminal"),
  window: document.querySelector(".terminal"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close"),
  backfull: document.querySelector(".backfull"),
  point: document.querySelector("#point-terminal"),
  content: document.querySelector(".terminal .terminal_content"),
  taskbar: document.querySelector(".terminal .window__taskbar"),
  opening: document.querySelector(".open-terminal"),
};

// VScode App

/*  Can't connect to the github.dev or vscode.dev 
const vscodeApp = {
  app_name: document.querySelector("#VScode"),
  window: document.querySelector(".Vscode"),
  close: document.querySelector(".close-Vscode"),
  backfull: document.querySelector(".backfull-Vscode"),
  full: document.querySelector(".full-Vscode"),
  point: document.querySelector("#point-vscode"),
  opening: document.querySelector(".open-vscode")
};
*/

// Maps App
const mapsApp = {
  app_name: document.querySelector("#map"),
  window: document.querySelector(".maps"),
  full: document.querySelector(".full-map"),
  close: document.querySelector(".close-map"),
  backfull: document.querySelector(".backfull-map"),
  point: document.querySelector("#point-maps"),
  opening: document.querySelector(".open-map"),
};

// File Converter App
const fileConverterApp = {
  app_name: document.querySelector("#fileConverter"),
  window: document.querySelector(".file-converter"),
  full: document.querySelector(".full-file-converter"),
  close: document.querySelector(".close-file-converter"),
  backfull: document.querySelector(".backfull-file-converter"),
  point: document.querySelector("#point-file-converter"),
  opening: document.querySelector(".open-file-converter"),
  opening_l: document.querySelector(".open-fileconverter-launching"),
  input: document.querySelector(".file-converter .file-input"),
  widthInput: document.querySelector(".file-converter .width-input"),
  heightInput: document.querySelector(".file-converter .height-input"),
  dimensionInputs: document.querySelector(".file-converter .dimension-inputs"),
  format: document.querySelector(".file-converter .format-select"),
  convertBtn: document.querySelector(".file-converter .convert-btn"),
  downloadLink: document.querySelector(".file-converter .download-link"),
  status: document.querySelector(".file-converter .status-message"),
  preview: document.querySelector(".file-converter .preview"),
  library: document.querySelector(".file-converter .conversion-library"),
};

// Instagram Downloader App
const instagramApp = {
  app_name: document.querySelector("#instagram"),
  window: document.querySelector(".instagram"),
  full: document.querySelector(".full-instagram"),
  close: document.querySelector(".close-instagram"),
  backfull: document.querySelector(".backfull-instagram"),
  point: document.querySelector("#point-instagram"),
  opening: document.querySelector(".open-instagram"),
  opening_l: document.querySelector(".open-instagram-launching"),
  input: document.querySelector(".instagram .insta-url"),
  fetchBtn: document.querySelector(".instagram .insta-fetch"),
  preview: document.querySelector(".instagram .preview"),
  status: document.querySelector(".instagram .status-message"),
};

// Ensure convert button exists if HTML was missing it
if (!fileConverterApp.convertBtn && fileConverterApp.window) {
  const content = fileConverterApp.window.querySelector(
    ".file-converter__content"
  );
  if (content) {
    fileConverterApp.convertBtn = document.createElement("button");
    fileConverterApp.convertBtn.className = "convert-btn";
    fileConverterApp.convertBtn.textContent = "Convert";
    content.appendChild(fileConverterApp.convertBtn);
    fileConverterApp.convertBtn.addEventListener("click", handleFileConversion);
  }
}

// Launchpad
const launchpad = {
  container: document.querySelector(".container__Window"),
  window: document.querySelector(".launchpad"),
  searchbox: document.querySelector(".launchpad .searchbox"),
  app_container: document.querySelector(".Apps-container"),
  point: document.querySelector("#point-launchpad"),
  opening: document.querySelector(".open-launchpad"),
};

const APP_MAP = {
  terminal: { app: "Terminal", point: "point-terminal" },
  note: { app: "Notes", point: "point-note" },
  calculator: { app: "calculator", point: "point-cal" },
  maps: { app: "map", point: "point-maps" },
  "file-converter": { app: "fileConverter", point: "point-file-converter" },
  instagram: { app: "instagram", point: "point-instagram" },
};

function blobToDataURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

let conversionLibrary = [];

function loadConversionLibrary() {
  const stored = JSON.parse(localStorage.getItem("conversionLibrary") || "[]");
  conversionLibrary = stored;
  if (fileConverterApp.library) {
    fileConverterApp.library.innerHTML = "";
    stored.forEach((item) => addItemToLibraryElement(item));
  }
}

function saveConversionLibrary() {
  localStorage.setItem("conversionLibrary", JSON.stringify(conversionLibrary));
}

function addItemToLibraryElement(item) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = item.data || item.url;
  a.download = item.name;
  a.textContent = item.name;
  li.appendChild(a);
  fileConverterApp.library.appendChild(li);
}

function addToLibrary(data, name) {
  const item = { data, name };
  conversionLibrary.push(item);
  saveConversionLibrary();
  if (fileConverterApp.library) addItemToLibraryElement(item);
}

function showPreview(url, type) {
  if (!fileConverterApp.preview) return;
  fileConverterApp.preview.innerHTML = "";
  if (type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = url;
    fileConverterApp.preview.appendChild(img);
  } else if (type === "application/pdf") {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    fileConverterApp.preview.appendChild(iframe);
  } else if (type === "text/plain") {
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        const pre = document.createElement("pre");
        pre.textContent = text.slice(0, 1000);
        fileConverterApp.preview.appendChild(pre);
      });
  }
}

function getAppKey(el) {
  return Array.from(el.classList).find((c) => c !== "window");
}

function saveState() {
  const openApps = [];
  document.querySelectorAll(".window, .calculator").forEach((win) => {
    if (win.style.display !== "none") {
      const key = getAppKey(win);
      if (key) openApps.push(key);
    }
  });
  localStorage.setItem("openApps", JSON.stringify(openApps));
  if (notesApp.content_typing)
    localStorage.setItem("notesContent", notesApp.content_typing.value);
  if (elements.brightness_range)
    localStorage.setItem("brightness", elements.brightness_range.value);
  if (elements.sound_range)
    localStorage.setItem("sound", elements.sound_range.value);
}

function restoreAppState() {
  const openApps = JSON.parse(localStorage.getItem("openApps") || "[]");
  openApps.forEach((key) => {
    const map = APP_MAP[key] || {};
    const win = document.querySelector(`.${key}`);
    const point = map.point ? document.getElementById(map.point) : null;
    const appItem = map.app ? document.getElementById(map.app) : null;
    if (win) win.style.display = "block";
    if (point) point.style.display = "block";
    if (appItem) appItem.style.display = "block";
  });

  const noteContent = localStorage.getItem("notesContent");
  if (noteContent !== null && notesApp.content_typing)
    notesApp.content_typing.value = noteContent;

  const brightness = localStorage.getItem("brightness");
  if (brightness !== null && elements.brightness_range)
    elements.brightness_range.value = brightness;

  const sound = localStorage.getItem("sound");
  if (sound !== null && elements.sound_range)
    elements.sound_range.value = sound;
}

/********** LISTENERS **********/

/* 
Now it's not good cause when i set this, the default blur will be remove of everywhere.

function change_brightness() {
  var brightnessVal = elements.brightness_range.value;

  elements.body.style.filter = `brightness(${brightnessVal + '%'})`;
  elements.body.style.backdropFilter = `brightness(${brightnessVal + '%'})`;
}
*/

// Spotlight
function handleopen_spotlight() {
  if (elements.spotlight_search.style.display === "none") {
    elements.spotlight_search.style.display = "flex";
  } else {
    elements.spotlight_search.style.display = "none";
  }
}

// Notes app function start
function handleAdding() {
  const create_input = document.createElement("input");
  create_input.placeholder = "Writing name";
  notesApp.notes.appendChild(create_input);
}

function handleDeleting() {
  const inputChild = document.querySelector(".content__sidebar--notes input");
  inputChild.remove();
  notesApp.content_typing.style.display = "none";
}

function handleNotes() {
  notesApp.content_typing.style.display = "block";
}

// Notes app function end

function handleMinimize(Minimize) {
  Minimize.style.maxWidth = "80%";
  Minimize.style.minWidth = "70%";
  Minimize.style.height = "430px";
}

function handleFullScreen(maximize) {
  maximize.style.maxWidth = "95%";
  maximize.style.minWidth = "95%";
  maximize.style.height = "90%";
}

function close_window(close, point, appName) {
  close.style.display = "none";
  point.style.display = "none";
  appName.style.display = "none";
  saveState();
}

function open_window(open, point, appName) {
  elements.navbar.style.display = "flex";
  open.style.display = "block";
  launchpad.container.style.display = "flex";
  launchpad.window.style.display = "none";
  launchpad.point.style.display = "none";
  appName.style.display = "block";
  point.style.display = "block";
  saveState();
}

// Launchpad function start
launchpad.opening.addEventListener("click", handleOpenLaunching);

function handleOpenLaunching() {
  if (launchpad.window.style.display === "none") {
    launchpad.window.style.display = "block";
    elements.navbar.style.display = "none";
    launchpad.point.style.display = "block";
  } else {
    launchpad.window.style.display = "none";
    elements.navbar.style.display = "flex";
    launchpad.point.style.display = "none";
  }
  launchpad.container.style.display = "none";
}

function handleLaunchpadSearch(e) {
  for (let app of launchpad.app_container.children) {
    if (e.target.value) {
      app.style.display = "none";
      if (app.dataset.keywords.includes(e.target.value)) {
        app.style.display = "flex";
      }
    } else app.style.display = "flex";
  }
}
// Launchpad function end

function handleOpenFileConverter_launchpad() {
  fileConverterApp.window.style.display = "block";
  fileConverterApp.app_name.style.display = "block";
  launchpad.container.style.display = "flex";
  elements.navbar.style.display = "flex";
  launchpad.window.style.display = "none";
  fileConverterApp.point.style.display = "block";
  launchpad.point.style.display = "none";
}

function handleOpenInstagram_launchpad() {
  instagramApp.window.style.display = "block";
  instagramApp.app_name.style.display = "block";
  launchpad.container.style.display = "flex";
  elements.navbar.style.display = "flex";
  launchpad.window.style.display = "none";
  instagramApp.point.style.display = "block";
  launchpad.point.style.display = "none";
}

// Calculator app start
function handleOpenCal_launchpad() {
  calculatorApp.window.style.display = "block";
  calculatorApp.app_name.style.display = "block";
  launchpad.container.style.display = "flex";
  elements.navbar.style.display = "flex";
  launchpad.window.style.display = "none";
  calculatorApp.point.style.display = "block";
  launchpad.point.style.display = "none";
}
// Calculator app end

handleopen_spotlight();
handleOpenLaunching();
notesApp.adding.addEventListener("click", handleAdding);
calculatorApp.backfull.addEventListener("click", () =>
  handleMinimize(calculatorApp.window)
);
notesApp.backfull.addEventListener("click", () =>
  handleMinimize(notesApp.window)
);
terminalApp.close.addEventListener("click", () =>
  close_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);
notesApp.close.addEventListener("click", () =>
  close_window(notesApp.window, notesApp.point, notesApp.app_name)
);
mapsApp.close.addEventListener("click", () =>
  close_window(mapsApp.window, mapsApp.point, mapsApp.app_name)
);
fileConverterApp.close.addEventListener("click", () =>
  close_window(fileConverterApp.window, fileConverterApp.point, fileConverterApp.app_name)
);
instagramApp.close.addEventListener("click", () =>
  close_window(instagramApp.window, instagramApp.point, instagramApp.app_name)
);
notesApp.deleting.addEventListener("click", handleDeleting);
terminalApp.full.addEventListener("click", () =>
  handleFullScreen(terminalApp.window)
);
notesApp.full.addEventListener("click", () =>
  handleFullScreen(notesApp.window)
);
/*
vscodeApp.full.addEventListener("click", () =>
  handleFullScreen(vscodeApp.window)
);
*/
mapsApp.full.addEventListener("click", () => handleFullScreen(mapsApp.window));
fileConverterApp.full.addEventListener("click", () =>
  handleFullScreen(fileConverterApp.window)
);
instagramApp.full.addEventListener("click", () =>
  handleFullScreen(instagramApp.window)
);
notesApp.window.addEventListener("click", handleNotes);
terminalApp.opening.addEventListener("click", () =>
  open_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);
notesApp.opening.addEventListener("click", () =>
  open_window(notesApp.window, notesApp.point, notesApp.app_name)
);
calculatorApp.opening.addEventListener("click", () =>
  open_window(calculatorApp.window, calculatorApp.point, calculatorApp.app_name)
);
fileConverterApp.opening.addEventListener("click", () =>
  open_window(fileConverterApp.window, fileConverterApp.point, fileConverterApp.app_name)
);
instagramApp.opening.addEventListener("click", () =>
  open_window(instagramApp.window, instagramApp.point, instagramApp.app_name)
);
/*
vscodeApp.opening.addEventListener("click", () =>
  open_window(vscodeApp.window, vscodeApp.point, vscodeApp.app_name)
);
*/
mapsApp.opening.addEventListener("click", () =>
  open_window(mapsApp.window, mapsApp.point, mapsApp.app_name)
);
fileConverterApp.opening_l.addEventListener(
  "click",
  handleOpenFileConverter_launchpad
);
instagramApp.opening_l.addEventListener("click", handleOpenInstagram_launchpad);
/*
vscodeApp.close.addEventListener("click", () =>
  close_window(vscodeApp.window, vscodeApp.point, vscodeApp.app_name)
);
vscodeApp.backfull.addEventListener("click", () =>
  handleMinimize(vscodeApp.window)
);
*/
mapsApp.backfull.addEventListener("click", () =>
  handleMinimize(mapsApp.window)
);
fileConverterApp.backfull.addEventListener("click", () =>
  handleMinimize(fileConverterApp.window)
);
instagramApp.backfull.addEventListener("click", () =>
  handleMinimize(instagramApp.window)
);
calculatorApp.close.addEventListener("click", () =>
  close_window(
    calculatorApp.window,
    calculatorApp.point,
    calculatorApp.app_name
  )
);
calculatorApp.opening_l.addEventListener("click", handleOpenCal_launchpad);
elements.open_spotlight.addEventListener("click", handleopen_spotlight);
launchpad.searchbox.addEventListener("input", handleLaunchpadSearch);
elements.clockWrapper.addEventListener("click", () => {
  elements.widgetsPanel.classList.toggle("open");
});

// Calculator code
// select all the buttons
const calculatorButtons = document.querySelectorAll(".input button");
// select the <input type="text" class="display" disabled> element
const calculatorDisplay = document.querySelector(".display");

// add eventListener to each button
calculatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    calculate(event.target.value, calculatorDisplay);
    console.log("btn");
  });
});

function lastNumber(value) {
  return value.split(/[\+\-\*\/\%]/).pop();
}

const operators = ["+", "-", "*", "/", "%"];

function calculate(value, display) {
  const latestChar = display.value[display.value.length - 1];

  const isEmpty = display.value === "0";
  const isDecimalLastOperand = lastNumber(display.value).includes(".");
  const isNumber = /^[0-9]$/.test(value);

  if (isEmpty && isNumber) {
    return (display.value = value);
  }

  switch (value) {
    case "=":
      if (!isEmpty) display.value = eval(display.value);
      return;
    case ".":
      if (!isDecimalLastOperand) display.value += ".";
      return;
    case "C":
      return (display.value = "0");
    case "+/-":
      if (
        !operators.some((operator) =>
          display.value.replace(/^-/, "").includes(operator)
        )
      )
        display.value = -1 * parseFloat(display.value);
      return;
    case "*":
    case "/":
    case "-":
    case "+":
    case "%":
      if (operators.includes(latestChar)) {
        return (display.value = display.value.slice(0, -1) + value);
      }
    // Fall through to default case
    default:
      display.value += value;
  }
}

// App draggable
$(function () {
  $(".terminal").draggable();
  $(".note").draggable();
  $(".calculator").draggable();
$(".Vscode").draggable();
  $(".spotlight_search").draggable();
  $(".maps").draggable();
  $(".file-converter").draggable();
  $(".instagram").draggable();
});

// ----------------- File converter functionality -----------------
function handleFileConversion() {
  const file = fileConverterApp.input.files[0];
  if (!file) {
    fileConverterApp.status.textContent = "Select a file first.";
    return;
  }
  fileConverterApp.status.textContent = "Converting...";
  const format = fileConverterApp.format.value;
  const fileType = file.type;

  if (fileType.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const w = parseInt(fileConverterApp.widthInput.value);
        const h = parseInt(fileConverterApp.heightInput.value);
        canvas.width = w || img.width;
        canvas.height = h || img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const mime =
          format === "jpeg"
            ? "image/jpeg"
            : format === "webp"
            ? "image/webp"
            : "image/png";
        canvas.toBlob(async function (blob) {
          const dataUrl = await blobToDataURL(blob);
          fileConverterApp.downloadLink.href = dataUrl;
          fileConverterApp.downloadLink.download =
            file.name.replace(/\.[^.]+$/, "") + "." + format;
          fileConverterApp.downloadLink.textContent =
            "Download " + format.toUpperCase();
          fileConverterApp.downloadLink.style.display = "inline-block";
          fileConverterApp.status.textContent = "Conversion complete!";
          showPreview(dataUrl, mime);
          addToLibrary(dataUrl, fileConverterApp.downloadLink.download);
        }, mime);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else if (fileType === "text/plain") {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const text = e.target.result;
      if (format === "pdf") {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(text, 180);
        doc.text(lines, 10, 10);
        const blob = doc.output("blob");
        const dataUrl = await blobToDataURL(blob);
        fileConverterApp.downloadLink.href = dataUrl;
        fileConverterApp.downloadLink.download =
          file.name.replace(/\.[^.]+$/, "") + ".pdf";
        fileConverterApp.downloadLink.textContent = "Download PDF";
        fileConverterApp.downloadLink.style.display = "inline-block";
        fileConverterApp.status.textContent = "Conversion complete!";
        showPreview(dataUrl, "application/pdf");
        addToLibrary(dataUrl, fileConverterApp.downloadLink.download);
      } else if (format === "txt") {
        const blob = new Blob([text], { type: "text/plain" });
        const dataUrl = await blobToDataURL(blob);
        fileConverterApp.downloadLink.href = dataUrl;
        fileConverterApp.downloadLink.download =
          file.name.replace(/\.[^.]+$/, "") + ".txt";
        fileConverterApp.downloadLink.textContent = "Download TXT";
        fileConverterApp.downloadLink.style.display = "inline-block";
        fileConverterApp.status.textContent = "Conversion complete!";
        showPreview(dataUrl, "text/plain");
        addToLibrary(dataUrl, fileConverterApp.downloadLink.download);
      } else {
        fileConverterApp.status.textContent = "Unsupported conversion";
      }
    };
    reader.readAsText(file);
  } else if (fileType === "application/pdf") {
    if (format === "txt") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const typedarray = new Uint8Array(e.target.result);
        pdfjsLib
          .getDocument({ data: typedarray })
          .promise.then((doc) => {
            const pages = [];
            const tasks = [];
            for (let i = 1; i <= doc.numPages; i++) {
              tasks.push(
                doc.getPage(i).then((page) =>
                  page.getTextContent().then((txt) => {
                    const str = txt.items.map((s) => s.str).join(" ");
                    pages.push(str);
                  })
                )
              );
            }
            Promise.all(tasks).then(async () => {
              const text = pages.join("\n\n");
              const blob = new Blob([text], { type: "text/plain" });
              const dataUrl = await blobToDataURL(blob);
              fileConverterApp.downloadLink.href = dataUrl;
              fileConverterApp.downloadLink.download =
                file.name.replace(/\.[^.]+$/, "") + ".txt";
              fileConverterApp.downloadLink.textContent = "Download TXT";
              fileConverterApp.downloadLink.style.display = "inline-block";
              fileConverterApp.status.textContent = "Conversion complete!";
              showPreview(dataUrl, "text/plain");
              addToLibrary(dataUrl, fileConverterApp.downloadLink.download);
            });
          })
          .catch(() => {
            fileConverterApp.status.textContent = "Error reading PDF";
          });
      };
      reader.readAsArrayBuffer(file);
    } else {
      fileConverterApp.status.textContent = "Unsupported conversion";
    }
  } else {
    fileConverterApp.status.textContent = "Unsupported file type";
  }
}

if (fileConverterApp.convertBtn) {
  fileConverterApp.convertBtn.addEventListener("click", handleFileConversion);
}

fileConverterApp.input.addEventListener("change", () => {
  fileConverterApp.downloadLink.style.display = "none";
  fileConverterApp.status.textContent = "";
  if (fileConverterApp.preview) fileConverterApp.preview.innerHTML = "";
  const file = fileConverterApp.input.files[0];
  if (!file) return;
  if (file.type.startsWith("image/")) {
    fileConverterApp.dimensionInputs.style.display = "flex";
    fileConverterApp.format.innerHTML =
      '<option value="png">PNG</option><option value="jpeg">JPEG</option><option value="webp">WEBP</option>';
  } else if (file.type === "text/plain") {
    fileConverterApp.dimensionInputs.style.display = "none";
    fileConverterApp.format.innerHTML =
      '<option value="pdf">PDF</option><option value="txt">TXT</option>';
  } else if (file.type === "application/pdf") {
    fileConverterApp.dimensionInputs.style.display = "none";
    fileConverterApp.format.innerHTML = '<option value="txt">TXT</option>';
  } else {
    fileConverterApp.dimensionInputs.style.display = "none";
    fileConverterApp.format.innerHTML = '<option value="">N/A</option>';
  }
});
fileConverterApp.widthInput.addEventListener("input", () => {
  fileConverterApp.downloadLink.style.display = "none";
  fileConverterApp.status.textContent = "";
  if (fileConverterApp.preview) fileConverterApp.preview.innerHTML = "";
});
fileConverterApp.heightInput.addEventListener("input", () => {
  fileConverterApp.downloadLink.style.display = "none";
  fileConverterApp.status.textContent = "";
  if (fileConverterApp.preview) fileConverterApp.preview.innerHTML = "";
});
fileConverterApp.format.addEventListener("change", () => {
  fileConverterApp.downloadLink.style.display = "none";
  fileConverterApp.status.textContent = "";
  if (fileConverterApp.preview) fileConverterApp.preview.innerHTML = "";
});

// ----------------- Instagram downloader functionality -----------------
function extractInstagramShortcode(url) {
  const match = url.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

async function fetchInstagramImages(url) {
  try {
    const short = extractInstagramShortcode(url);
    if (!short) return [];
    const api = `https://r.jina.ai/https://www.instagram.com/p/${short}/?__a=1&__d=dis`;
    const res = await fetch(api);
    const data = await res.json();
    let images = [];
    if (data.graphql && data.graphql.shortcode_media) {
      const media = data.graphql.shortcode_media;
      if (media.edge_sidecar_to_children) {
        images = media.edge_sidecar_to_children.edges.map((e) => e.node.display_url);
      } else if (media.display_url) {
        images = [media.display_url];
      }
    } else if (data.items && data.items[0]) {
      const item = data.items[0];
      if (item.carousel_media) {
        images = item.carousel_media.map((c) => c.image_versions2.candidates[0].url);
      } else if (item.image_versions2) {
        images = [item.image_versions2.candidates[0].url];
      }
    }
    return images;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function handleFetchInstagram() {
  const url = instagramApp.input.value.trim();
  if (!url) return;
  instagramApp.status.textContent = "Loading...";
  fetchInstagramImages(url).then((imgs) => {
    instagramApp.preview.innerHTML = "";
    instagramApp.status.textContent = "";
    if (!imgs.length) {
      instagramApp.status.textContent = "No images found";
      return;
    }
    imgs.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      instagramApp.preview.appendChild(img);
      const a = document.createElement("a");
      a.href = src;
      a.download = `instagram_${i + 1}.jpg`;
      a.textContent = `Download ${i + 1}`;
      instagramApp.preview.appendChild(a);
    });
  });
}

instagramApp.fetchBtn?.addEventListener("click", handleFetchInstagram);

// Date and time
const dateElement = document.getElementById("date");
const currentDate = new Date();
dateElement.innerHTML = currentDate.toDateString();

function digi() {
  const date = new Date();
  let hour = date.getHours();
  let minute = checkTime(date.getMinutes());

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  if (hour > 12) {
    hour = hour - 12;
    if (hour === 12) {
      hour = checkTime(hour);
      elements.clockElement.innerHTML = hour + ":" + minute + " AM";
    } else {
      hour = checkTime(hour);
      elements.clockElement.innerHTML = hour + ":" + minute + " PM";
    }
  } else {
    elements.clockElement.innerHTML = hour + ":" + minute + " AM";
  }
}

let terminal_line_html = document.querySelector(".terminal_line").outerHTML;
let path = "~";
let dirName;
let dirs = ["Desktop", "Downloads", "Music", "Documents"];

function init_terminal_line() {
  $(".cursor").keydown(function (e) {
    if (e.keyCode === 13) {
      console.log("hello");
      e.preventDefault();
      let command = $(this).text().trim(); // Use .text() for contenteditable elements
      if (!command) return;

      let command_output = "zsh: command not found: " + command + "<br>";

      if (command.startsWith("cd ")) {
        path = command.substring(3);
        command_output = "";
      } else if (command === "ls") {
        command_output = dirs.join("\t");
      } else if (command === "pwd") {
        command_output = path + "/";
      } else if (command.startsWith("mkdir ")) {
        dirName = command.substring(6);
        dirs.push(dirName);
        command_output = "";
      } else if (command === "rmdir") {
        dirs.pop();
        command_output = "";
      } else if (command === "ps -aux") {
        command_output = "CPU = 56% <br> MEMORY = 25% <br> DISK = 34%";
      } else if (command.startsWith("cat ")) {
        command_output =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.<br> Fugiat nihil totam expedita sint necessitatibus quos ducimus.";
      } else if (command.startsWith("du -hs ")) {
        command_output = Math.floor(Math.random() * 100) + "GB";
      }

      $(this).removeAttr("contenteditable");
      $(this).removeClass("cursor");
      terminalApp.content.innerHTML += command_output; // Use .innerHTML to append string content
      let new_terminal_line_html = terminal_line_html.replace("~", path);
      terminalApp.content.innerHTML += new_terminal_line_html;
      placeCaretAtEnd(document.querySelector(".cursor"));
      init_terminal_line();
    }
  });
}

init_terminal_line();
terminalApp.content.addEventListener("click", function () {
  placeCaretAtEnd(document.querySelector(".cursor"));
});

function placeCaretAtEnd(el) {
  el.focus();
  var range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// Right click to desktop
document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
  document.getElementById("contextMenu").style.opacity = "0";
}

function rightClick(e) {
  e.preventDefault();

  if (document.getElementById("contextMenu").style.opacity == "1") hideMenu();
  else {
    var menu = document.getElementById("contextMenu");

    menu.style.opacity = "1";
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
  }
}

// Loading
// const load = document.getElementById("loading");
// function lockload() {
//   load.style.display = "none";
// }

/********** Start Battery **********/
const calculateBattery = () => {
  let number = Math.floor(Math.random() * 100); // If there is any error, it will be the random default battery level
  let batteryIsCharging = false; // Charging status

  navigator
    .getBattery()
    .then(function (battery) {
      number = battery.level * 100;

      batteryIsCharging = battery.charging;
      battery.addEventListener("chargingchange", function () {
        batteryIsCharging = battery.charging;
      });
    })
    .finally(() => {
      elements.batteryText.textContent = `${number}%`;
      elements.batteryProgress.style.width = `${number}%`;
      elements.batteryPopupText.textContent = `${number}%`;

      if (number <= 20) {
        elements.batteryProgress.classList.add("battery__low");
      } else if ((number > 90 && batteryIsCharging) || batteryIsCharging) {
        elements.batteryProgress.classList.add("battery__high");
        elements.batteryIsChargingLogo.classList.add("is-charging-visibel");
        elements.powerSource.textContent = "Power Adapter";
      }
    });
};

elements.batteryButton.addEventListener("click", () => {
  elements.batteryPopup.classList.toggle("opened");
  elements.batteryButton.classList.toggle("selected");
});
/********** End Battery **********/

// Restore state when page loads
document.addEventListener("DOMContentLoaded", () => {
  restoreAppState();
  loadConversionLibrary();
});

// Save state on user interactions
if (notesApp.content_typing)
  notesApp.content_typing.addEventListener("input", saveState);
if (elements.brightness_range)
  elements.brightness_range.addEventListener("input", saveState);
if (elements.sound_range)
  elements.sound_range.addEventListener("input", saveState);

// Call the functions
calculateBattery();
digi();
