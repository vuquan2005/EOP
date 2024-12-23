function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAnswer() {
    const inputs = document.querySelectorAll(
        'input[style*="background-image"]'
    );
    const imageArray = [];
    inputs.forEach((input) => {
        const style = input.style.backgroundImage;
        const url = style.slice(5, -2); // Extract URL from 'url("...")'
        imageArray.push(url);
    });
    return imageArray;
}

async function imgToTxt(images) {
    const results = [];

    for (const imagePath of images) {
        try {
            const {
                data: { text },
            } = await Tesseract.recognize(imagePath, "eng");
            results.push({ image: imagePath, text });
        } catch (err) {
            results.push({ image: imagePath, text: null });
        }
    }

    return results;
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

    // Create a button inside <div id="mfooter">
    const mfooter = document.getElementById("mfooter");
    const clockBtn = document.createElement("button");
    clockBtn.style.fontSize = "16px";
    clockBtn.style.borderRadius = "5px";
    mfooter.appendChild(clockBtn);

    // Find the Preview button and click it
    const btnPreview = document.querySelector(
        'button.btn.btn-danger.dnut[type="button"]'
    );
    // Auto click the Preview button after 30 seconds
    if (btnPreview) {
        let countdown = 30;
        clockBtn.textContent = `Xem đáp án sau: ${countdown}`;
        const countdownInterval = setInterval(() => {
            countdown -= 1;
            clockBtn.textContent = `Xem đáp án sau: ${countdown}`;
            if (countdown <= 0) {
                clearInterval(countdownInterval);

                btnPreview.click();
                clockBtn.textContent = "Đã có đáp án";
            }
        }, 1000);
    }
    // Wait 31s for the answers 
    await delay(31000);
    // Create an array containing images from input elements
    const answersImg = getAnswer();
    // Use Tesseract to recognize the text in the images
    console.log(answersImg);
    var answersTxt = [];
    await imgToTxt(answersImg)
        .then((results) => {
            results.forEach((text) => {
                answersTxt.push(text.text);
            });
        })
        .catch((err) => {
            console.error("Lỗi trong quá trình nhận diện:", err);
        });

    console.log(answersTxt);

    await delay(1000);
    const btnReW = document.querySelector(
        'button.btn.btn-primary.dnut[type="button"]'
    );
    if (btnReW) {
        btnReW.click();
    }

    // Fill in the recognized text into the input fields
    const inputFields = document.querySelectorAll("input[type='text']");
    inputFields.forEach((input, index) => {
        if (answersTxt[index]) {
            input.value = answersTxt[index];
        }
    });

    //end
}

run();
