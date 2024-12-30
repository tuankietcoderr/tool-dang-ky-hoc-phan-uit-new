const successLog = (message) =>
  console.log("%c" + message, "font-weight:bold; color:green;");
const errorLog = (message) =>
  console.log("%c" + message, "font-weight:bold; color:red;");

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, subjects } = obj;
  if (type === "REGISTER") {
    DangKy(subjects);
    Duyet();
  }
});

function DangKy(monDangKyString) {
  try {
    var listMonDangKy = monDangKyString
      .trim()
      .split("\n")
      .map((it) => it.trim());

    var allRows = [...document.querySelectorAll("table > tbody > tr")];

    var rowsToDangKy = allRows.filter((it) =>
      listMonDangKy.includes(
        it.querySelector("td:nth-child(2)")?.textContent?.trim()
      )
    );

    rowsToDangKy.forEach((it, index) => {
      it.querySelector('td:first-child input[type="checkbox"]').click();
      var tenLop = it.querySelector("td:nth-child(2)")?.textContent?.trim();
      successLog(index + 1 + ".Đã chọn lớp " + tenLop);
    });
  } catch {
    errorLog("Chọn lớp không thành công! Bạn tự chọn lớp đi nhé!");
  }
}

function Duyet() {
  const button =
    document.querySelector('button[class*="chakra-button css-kyhdse"]') ||
    document.querySelector('button[class*="chakra-button css-14qea61"]') ||
    Array.from(
      document.querySelectorAll('button[class*="chakra-button"]')
    ).pop(); // get the last button
  if (!button) return;
  button.click();
}
