function initChatFunctionality() {
    const chatItems = document.querySelectorAll('.chat-item');
    const chatPlaceholder = document.getElementById('chat-placeholder');
    const activeChatContainer = document.getElementById('active-chat-container');
    
    let currentOpenChat = null;
    
       
    chatItems.forEach(chatItem => {
        chatItem.addEventListener('click', function() {
            const chatId = this.getAttribute('data-chat-id');
            const userName = this.getAttribute('data-user-name');
            const userStatus = this.getAttribute('data-user-status');
            const userAvatar = this.getAttribute('data-user-avatar');
            
            if (currentOpenChat === chatId) {
                closeChat();
                currentOpenChat = null;
            } else {
                openChat(chatId, userName, userStatus, userAvatar, this);
                currentOpenChat = chatId;
            }
        });
    });
    
    function openChat(chatId, userName, userStatus, userAvatar, clickedElement) {
        
        chatItems.forEach(item => {
            item.classList.remove('active');
        });
        
        clickedElement.classList.add('active');
        
        chatPlaceholder.style.display = 'none';
        activeChatContainer.style.display = 'flex';
        
        updateChatHeader(userName, userStatus, userAvatar);
        
        loadChatHistory(chatId);
        
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            setTimeout(() => {
                messageInput.focus();
            }, 100);
        }
    }
    
    function closeChat() {
        chatItems.forEach(item => {
            item.classList.remove('active');
        });
        
        currentOpenChat = null;
        
        chatPlaceholder.style.display = 'flex';
        activeChatContainer.style.display = 'none';
        
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.value = '';
            messageInput.style.height = 'auto';
        }
    }
    
    function updateChatHeader(userName, userStatus, userAvatar) {
        const userNameElement = document.getElementById('chat-user-name');
        const userStatusElement = document.getElementById('user-status');
        const userStatusTextElement = document.getElementById('chat-user-status-text');
        const userAvatarElement = document.getElementById('chat-user-avatar');
        
        if (userNameElement) userNameElement.textContent = userName;
        if (userStatusElement) {
            userStatusElement.className = 'user-status ' + userStatus;
        }
        if (userStatusTextElement) {
            userStatusTextElement.textContent = userStatus === 'online' ? 'В сети' : 'Не в сети';
        }
        if (userAvatarElement) {
            userAvatarElement.src = userAvatar;
            userAvatarElement.alt = `Аватар ${userName}`;
        }
    }
    
    function loadChatHistory(chatId) {
        const messagesContainer = document.getElementById('messages-container');
        
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        const dateElement = document.createElement('div');
        dateElement.className = 'message-date';
        dateElement.textContent = 'Сегодня';
        messagesContainer.appendChild(dateElement);
        
        const testMessages = generateTestMessages(chatId);
        
        testMessages.forEach(message => {
            const messageElement = createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });
        

        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
    }
    
    function generateTestMessages(chatId) {
        const messages = [];
     
        const messageSets = {
            1: [
                { text: 'Привет', isOwn: false, time: '10:15' },
                { text: 'И тебе того же', isOwn: true, time: '10:20' },
            ],
            2: [
                { text: 'Встреча в 18:00 у офиса', isOwn: false, time: '15:30' },
                { text: 'Хорошо, буду вовремя', isOwn: true, time: '15:35' },
            ],
            3: [
                { text: 'Отправил документы на проверку', isOwn: false, time: 'Вчера 14:20' },
                { text: 'Получил, спасибо', isOwn: true, time: 'Вчера 14:25' },
            ],
            4: [
                { text: 'Спасибо', isOwn: false, time: '09:15' },
                { text: 'рад помочь 👌', isOwn: true, time: '09:20' },
            ]
        };
        
        return messageSets[chatId] || [
            { text: 'Это начало вашего диалога', isOwn: false, time: 'Только что' },
            { text: 'Начните общение!', isOwn: true, time: 'Только что' }
        ];
    }
    
    function createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isOwn ? 'own-message' : 'other-message'}`;
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message.text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = message.time;
        
        messageDiv.appendChild(messageText);
        messageDiv.appendChild(messageTime);
        
        return messageDiv;
    }
    
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            const newHeight = Math.min(this.scrollHeight, 120);
            this.style.height = newHeight + 'px';
        });
        

        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.value = '';
                this.style.height = 'auto';
            }
        });
    }
    const header = document.getElementById('header');
    if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            alert('Добро пожаловать в chatMessage!');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatFunctionality);
} else {
    initChatFunctionality();
}