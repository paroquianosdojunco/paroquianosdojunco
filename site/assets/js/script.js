document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".highlight-box");
    let maxHeight = 0;

    // Encontra a maior altura entre as caixas
    boxes.forEach((box) => {
        if (box.offsetHeight > maxHeight) {
            maxHeight = box.offsetHeight;
        }
    });

    // Adiciona um valor extra à altura máxima
    maxHeight += 1; // Aumenta a altura em 50 pixels

    // Define a altura de todas as caixas para a nova altura
    boxes.forEach((box) => {
        box.style.height = `${maxHeight}px`;
    });
});