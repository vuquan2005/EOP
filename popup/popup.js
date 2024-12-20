var runEOP = document.getElementById("runEOP");

runEOP.onclick = function () {
  alert("btn click");

  chrome.scripting.executeScript({
    target: { allFrames: true },
    files: ['scripts/eop.js']
  });
};
