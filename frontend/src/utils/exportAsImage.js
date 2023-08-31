import html2canvas from "html2canvas";

const exportAsImage = async (element, callback) => {
    const canvas = await html2canvas(element, {
        allowTaint: false,
        useCORS: true,
        scale: 1.0,
        scrollX: 0,
        scrollY: -window.scrollY,
    });
    //const image = canvas.toDataURL("image/png", 1.0);
    //downloadImage(image, imageFileName);
    canvas.toBlob(blob => {
        callback(blob);
    });
};

/*const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};*/

export default exportAsImage;
