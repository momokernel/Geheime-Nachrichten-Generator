const input = document.getElementById("input");
const output = document.getElementById("output");
const keyInput = document.getElementById("key");
const methodSelect = document.getElementById("method");

document.getElementById("encode").addEventListener("click", () => {
    const text = input.value;
    const key = keyInput.value || "key";
    const method = methodSelect.value;
    let result = "";

    switch (method) {
        case "caesar":
            result = caesar(text, 5);
            break;
        case "vigenere":
            result = vigenere(text, key, true);
            break;
        case "base64":
            result = btoa(text);
            break;
        case "xor":
            result = xorEncrypt(text, key);
            break;
    }
    output.value = result;
});

document.getElementById("decode").addEventListener("click", () => {
    const text = input.value;
    const key = keyInput.value || "key";
    const method = methodSelect.value;
    let result = "";

    switch (method) {
        case "caesar":
            result = caesar(text, -5);
            break;
        case "vigenere":
            result = vigenere(text, key, false);
            break;
        case "base64":
            result = atob(text);
            break;
        case "xor":
            result = xorEncrypt(text, key);
            break;
    }
    output.value = result;
});

document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText(output.value);
});

document.getElementById("download").addEventListener("click", () => {
    const blob = new Blob([output.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "geheime_nachricht.txt";
    a.click();
});

function caesar(str, shift) {
    return str.replace(/[a-z]/gi, c =>
        String.fromCharCode((c.charCodeAt(0) - 65 + shift + 26) % 26 + 65)
    );
}

function vigenere(text, key, encode = true) {
    const a = "A".charCodeAt(0);
    key = key.toUpperCase();
    return text.replace(/[a-z]/gi, (c, i) => {
        const k = key[i % key.length].charCodeAt(0) - a;
        const shift = encode ? k : -k;
        const base = c === c.toUpperCase() ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base);
    });
}

function xorEncrypt(text, key) {
    let output = "";
    for (let i = 0; i < text.length; i++) {
        output += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return output.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}
