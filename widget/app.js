const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

function appendMessage(content, sender) {
    const messageElement = document.createElement('p');
    messageElement.textContent = content;
    messageElement.classList.add(sender);
    chatBox.appendChild(messageElement);
}

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    userInput.value = '';

    appendMessage(userMessage, 'user');

    try {
        const response = await fetch('/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        appendMessage(data.message, 'gpt');
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
