document.getElementById('compressButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageUpload');
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');
    const originalSizeText = document.getElementById('originalSize');
    const compressedSizeText = document.getElementById('compressedSize');
    const downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        alert('请上传一张图片');
        return;
    }

    const file = fileInput.files[0];
    originalSizeText.textContent = `文件大小: ${file.size} 字节`;
    const reader = new FileReader();

    reader.onload = function(event) {
        originalImage.src = event.target.result;

        // 压缩图片
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const ratio = document.getElementById('compressionRatio').value / 100;

            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function(blob) {
                const compressedFile = new File([blob], file.name, { type: file.type });
                compressedSizeText.textContent = `文件大小: ${compressedFile.size} 字节`;
                compressedImage.src = URL.createObjectURL(blob);
                downloadLink.href = URL.createObjectURL(blob);
            }, file.type, ratio);
        };
    };

    reader.readAsDataURL(file);
}); 