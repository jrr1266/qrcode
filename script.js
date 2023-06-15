const download = document.querySelector(".download");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector("#share-btn");
const sizes = document.querySelector("#talla");

qrText.addEventListener("input", driveQRText);
sizes.addEventListener("change", driveSize);
shareBtn.addEventListener("click", driveShare);

const defaultUrl = "";
let text = defaultUrl ;
let size = 400;

function driveQRText(e) {
  const value = e.target.value;
  text = value;
  if (!value) {
    text = defaultUrl;
  }
  generateQRCode();
}

async function generateQRCode() {
  qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
  });
   download.href = await resolveDataUrl();
}

async function driveShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("Tu navegador no es compatible con share");
    }
  }, 100);
}

function driveSize(e) {
  size = e.target.value;
  generateQRCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 50);
  });
}
generateQRCode();
