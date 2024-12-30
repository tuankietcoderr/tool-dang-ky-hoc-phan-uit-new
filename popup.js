import { $ } from "./utils.js";

const submitBtn = $("#submit_btn");
const textarea = $("textarea");

submitBtn.addEventListener("click", () => {
  if (textarea.value === "") {
    alert("Bạn chưa nhập môn học");
    return;
  }
  const proceed = confirm("Bạn có chắc chắn muốn đăng ký những môn học này?");
  if (!proceed) return;
  const subjects = textarea.value;
  chrome.tabs?.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        type: "REGISTER",
        subjects,
      });
    }
  );
});

const version = $("#version");
version.textContent = chrome.runtime?.getManifest().version || "0.1.0";
