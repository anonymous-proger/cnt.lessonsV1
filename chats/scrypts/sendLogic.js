
function initSendLogic() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages-container');
    
    if (!messageInput || !sendButton || !messagesContainer) {
        return;
    }
  
    function sendMessage() {
        const messageText = messageInput.value.trim();
        
        if (!messageText) {
            return;
        }
        
        const messageElement = createMessageElement(messageText, true);
        
        messagesContainer.appendChild(messageElement);

        messageInput.value = '';
        messageInput.style.height = 'auto';
        

        scrollToBottom();
        
        setTimeout(() => {
            const responses = [
                'ок',
                'Понял',
                'Интересно',
                'Спасибо за информацию',
                'Обсудим позже',
                'Согласен',
                'Все в порядке?',
                'Забавно',
                'АХАХ',
                '🤡',
                'Сам такой',
                '😎',
                'Как дела',
                'Умно',
                'Приятно знать, но тем неменее',
                'Извини, но нет',
                'Нет',
                'Да',
                'Взаимно'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseElement = createMessageElement(randomResponse, false);
            messagesContainer.appendChild(responseElement);
            scrollToBottom();
        }, 1000 + Math.random() * 1000);
    }
    
    function createMessageElement(text, isOwn) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOwn ? 'own-message' : 'other-message'}`;
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        messageTime.textContent = `${hours}:${minutes}`;
        
        messageDiv.appendChild(messageText);
        messageDiv.appendChild(messageTime);
        
        return messageDiv;
    }
    
    function scrollToBottom() {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }
    
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        const maxHeight = 120;
        const newHeight = Math.min(this.scrollHeight, maxHeight);
        this.style.height = newHeight + 'px';
        
        const maxCharsPerLine = Math.floor(this.clientWidth / 8);
        const lines = this.value.split('\n');
        let totalChars = 0;
        
        for (let line of lines) {
            totalChars += Math.ceil(line.length / maxCharsPerLine);
        }
        
        if (totalChars > 5) {
            this.style.overflowY = 'auto';
        } else {
            this.style.overflowY = 'hidden';
        }
    });
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    sendButton.addEventListener('click', sendMessage);
    

    const chatItems = document.querySelectorAll('.chat-item');
    if (chatItems.length) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.chat-item')) {
                setTimeout(() => {
                    if (messageInput && messageInput.offsetParent !== null) {
                        messageInput.focus();
                    }
                }, 100);
            }
        });
    }
    
}

// Ждем полной загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSendLogic);
} else {
    initSendLogic();
}