const inp = <HTMLInputElement>document.getElementById("inp");
const list: HTMLElement | null = document.getElementById("list");

function successBlock(boo?: boolean) {
  const span1: HTMLElement | null = document.getElementById("deleted");
  const span2: HTMLElement | null = document.getElementById("done");

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
        createElem(
          localStorage.getItem(localStorage.key(i)),
          localStorage.key(i)
        );
      }
    }
  }
}
successBlock(true);

function createElem(
  storageVal?: string,
  elementId: string = localStorage.getItem("id")
): void {
  const li: HTMLElement = document.createElement("li");

  li != null
    ? (li.textContent = storageVal ? storageVal : inp.value)
    : console.log("li-n havasara null");

  inp.value !== "" ? (inp.value = "") : "";

  li.setAttribute("id", elementId);
  localStorage.setItem(elementId, li.textContent);

  const div: HTMLElement = document.createElement("div");

  const span1: HTMLElement = document.createElement("span");
  const span2: HTMLElement = document.createElement("span");

  span1.textContent = "delete";
  span2.textContent = "done";

  span1?.setAttribute("class", "delete");
  span1?.setAttribute("onclick", `deleted('${elementId}')`);

  span2?.setAttribute("class", "done");
  span2?.setAttribute("onclick", `done('${elementId}')`);

  div.append(span1, span2);
  li.append(div);
  list?.append(li);

  storageVal
    ? ""
    : localStorage.setItem("id", `${1 + +localStorage.getItem("id")}`);
}

function deleted(liIndex: string) {
  const li: HTMLElement | null = document.getElementById(liIndex);
  if (li) {
    list?.removeChild(li);
  }

  localStorage.removeItem(liIndex);
  localStorage.setItem("deleted", `${1 + +localStorage.getItem("deleted")}`);

  successBlock();
}

function done(liIndex: string) {
  const li: HTMLElement | null = document.getElementById(liIndex);
  if (li) {
    list?.removeChild(li);
  }
  localStorage.removeItem(liIndex);
  localStorage.setItem("done", `${1 + +localStorage.getItem("done")}`);
  successBlock();
}
