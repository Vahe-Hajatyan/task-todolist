"use strict";
const inp = document.getElementById("inp");
const list = document.getElementById("list");
function successBlock(boo) {
    const span1 = document.getElementById("deleted");
    const span2 = document.getElementById("done");
    if (!localStorage.getItem("deleted") || !localStorage.getItem("done")) {
        localStorage.setItem("deleted", "0");
        localStorage.setItem("done", "0");
    }
    if (!localStorage.getItem("id")) {
        localStorage.setItem("id", "1");
    }
    span1 !== null
        ? (span1.textContent = localStorage.getItem("deleted"))
        : console.log("no have span element");
    span2 !== null
        ? (span2.textContent = localStorage.getItem("done"))
        : console.log("no have span element");
    if (boo) {
        for (let i = 0; i < localStorage.length; ++i) {
            if (+localStorage.key(i)) {
                createElem(localStorage.getItem(localStorage.key(i)), localStorage.key(i));
            }
        }
    }
}
successBlock(true);
function createElem(storageVal, elementId = localStorage.getItem("id")) {
    const li = document.createElement("li");
    li != null
        ? (li.textContent = storageVal ? storageVal : inp.value)
        : console.log("li-n havasara null");
    inp.value !== "" ? (inp.value = "") : "";
    li.setAttribute("id", elementId);
    localStorage.setItem(elementId, li.textContent);
    const div = document.createElement("div");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    span1.textContent = "delete";
    span2.textContent = "done";
    span1 === null || span1 === void 0 ? void 0 : span1.setAttribute("class", "delete");
    span1 === null || span1 === void 0 ? void 0 : span1.setAttribute("onclick", `deleted('${elementId}')`);
    span2 === null || span2 === void 0 ? void 0 : span2.setAttribute("class", "done");
    span2 === null || span2 === void 0 ? void 0 : span2.setAttribute("onclick", `done('${elementId}')`);
    div.append(span1, span2);
    li.append(div);
    list === null || list === void 0 ? void 0 : list.append(li);
    storageVal
        ? ""
        : localStorage.setItem("id", `${1 + +localStorage.getItem("id")}`);
}
function deleted(liIndex) {
    const li = document.getElementById(liIndex);
    if (li) {
        list === null || list === void 0 ? void 0 : list.removeChild(li);
    }
    localStorage.removeItem(liIndex);
    localStorage.setItem("deleted", `${1 + +localStorage.getItem("deleted")}`);
    successBlock();
}
function done(liIndex) {
    const li = document.getElementById(liIndex);
    if (li) {
        list === null || list === void 0 ? void 0 : list.removeChild(li);
    }
    localStorage.removeItem(liIndex);
    localStorage.setItem("done", `${1 + +localStorage.getItem("done")}`);
    successBlock();
}
