function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  // Wait for the page to load
  await delay(100);
  // Fill in the answers
  const oNhap = document.querySelectorAll("input");
  oNhap.forEach((oNhap) => {
    if (oNhap.type !== "file") {
      oNhap.value = "a";
    }
  });
  // Wait
  await delay(50);
  // Click the Done buttons
  const btnDone = document.querySelector(
    'button.btn.btn-info.dnut[type="button"]'
  );
  if (btnDone) {
    btnDone.click();
  }
  // Find the Preview button and click it after
  const btnPreview = document.querySelector(
    'button.btn.btn-danger.dnut[type="button"]'
  );
  // Auto click the Preview button after 30 seconds
  if (btnPreview) {
    let countdown = 30;
    btnPreview.textContent = `Xem đáp án sau: ${countdown}`;
  
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      btnPreview.textContent = `Xem đáp án sau: ${countdown}`;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        btnPreview.click();
      }
    }, 1000);
  }
  
}

run();
