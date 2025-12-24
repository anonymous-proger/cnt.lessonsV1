function initSendLogic() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages-container');
    
    
    const userAvatar = '/chats/img/image.png'; 
    const otherAvatar = '/chats/img/image.png'; 
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        
        if (!messageText) {
            return;
        }
        
        removeNoMessagesText();
        
        const messageElement = createMessageElement(messageText, true, userAvatar);
        
        messagesContainer.appendChild(messageElement);
        
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        scrollToBottom();
        
        setTimeout(() => {
            const responses = [
                'Хорошо!',
                'Понял',
                'Интересно',
                'Спасибо за информацию',
                'Обсудим позже',
                'Согласен'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseElement = createMessageElement(randomResponse, false, otherAvatar);
            messagesContainer.appendChild(responseElement);
            scrollToBottom();
        }, 1000 + Math.random() * 1000);
    }
    
    function createMessageElement(text, isOwn, avatarUrl) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOwn ? 'own-message' : 'other-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.src = avatarUrl;
        avatarImg.alt = isOwn ? 'Ваш аватар' : 'Аватар собеседника';
        
        avatarDiv.appendChild(avatarImg);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textContainerDiv = document.createElement('div');
        textContainerDiv.className = 'message-text-container';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        messageTime.textContent = `${hours}:${minutes}`;
        
        textContainerDiv.appendChild(messageText);
        textContainerDiv.appendChild(messageTime);
        
        contentDiv.appendChild(textContainerDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        return messageDiv;
    }
    
    function scrollToBottom() {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }
    
    function removeNoMessagesText() {
        const noMessagesText = messagesContainer.querySelector('.no-messages-text');
        if (noMessagesText) {
            noMessagesText.remove();
        }
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSendLogic);
} else {
    initSendLogic();
}