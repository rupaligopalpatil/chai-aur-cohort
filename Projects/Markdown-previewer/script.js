const clearBtn = document.getElementById("clear-btn");
const markdownInput = document.getElementById("markdown-input");
const previewContent = document.getElementById("preview-content");

function parseMarkdown(text) {
    // Convert headings
    text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Convert bold and italics
    text = text.replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>'); // Bold
    text = text.replace(/\*(.*?)\*/gm, '<i>$1</i>'); // Italics

    // Convert links
    text = text.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" target="_blank">$1</a>');

    // Convert unordered lists
    text = text.replace(/^\- (.*$)/gm, '<li>$1</li>'); 
    text = text.replace(/<\/li>\n<li>/gm, '</li><li>'); // Fix list structure

    text = text.replace(/\n/g, '<br>');


    return text;
}

clearBtn.addEventListener("click", () => {
    markdownInput.value = "";
    previewContent.innerHTML = "";
});

markdownInput.addEventListener("input", function () {
    let markdownText = this.value;
    previewContent.innerHTML = parseMarkdown(markdownText);
});
