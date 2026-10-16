// Extra behavior for the book's JavaScript code boxes.
(function () {
  const STORAGE_PREFIX = "fopjs:code:";

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked */ }
  }

  function editorFor(box) {
    const cm = box.querySelector(".CodeMirror");
    return cm ? cm.CodeMirror : null;
  }

  // 1. Show console.log output under the code box that ran it.
  // Runestone's JavaScript boxes only show text written with writeln(),
  // but students learn console.log.
  let currentOutput = null;

  // 2. Save each code box's code in the browser when it runs.
  document.addEventListener("click", function (event) {
    const button = event.target.closest(".run-button");
    if (!button) return;
    const box = button.closest("[data-component=activecode]");
    if (!box) return;
    currentOutput = document.getElementById(box.id + "_stdout");
    const editor = editorFor(box);
    if (editor) storageSet(STORAGE_PREFIX + box.id, editor.getValue());
  }, true);

  function show(value) {
    if (typeof value === "string") return value;
    if (value === undefined) return "undefined";
    if (typeof value === "function") return String(value);
    try {
      return JSON.stringify(value);
    } catch (e) {
      return String(value);
    }
  }

  const realLog = console.log.bind(console);
  console.log = function (...values) {
    realLog(...values);
    // Only copy calls made by student code. That code runs through eval(),
    // so "eval" shows up in the call stack; Runestone's own logging does not.
    const fromStudentCode = /\beval\b/.test(new Error().stack || "");
    if (currentOutput && fromStudentCode) {
      currentOutput.textContent += values.map(show).join(" ") + "\n";
      const outDiv = currentOutput.closest(".ac_output");
      if (outDiv) outDiv.classList.remove("ac_output--collapsed");
    }
  };

  // 3. Put saved code back once Runestone has built each code box.
  function restore(box) {
    if (box.dataset.fopjsRestored) return;
    const editor = editorFor(box);
    if (!editor) return;
    box.dataset.fopjsRestored = "yes";
    const saved = storageGet(STORAGE_PREFIX + box.id);
    if (saved !== null && saved !== editor.getValue()) editor.setValue(saved);
  }

  function restoreAll() {
    document.querySelectorAll("[data-component=activecode]").forEach(restore);
  }

  new MutationObserver(restoreAll).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", restoreAll);
})();
