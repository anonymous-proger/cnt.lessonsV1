function initChatFunctionality() {
    const chatItems = document.querySelectorAll('.chat-item');
    const chatPlaceholder = document.getElementById('chat-placeholder');
    const activeChatContainer = document.getElementById('active-chat-container');
    
    let currentOpenChat = null;
    
    const userAvatar = '/chats/img/image.png'; 
    const otherAvatar = '/chats/img/image.png'; 
    
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

        removeNoMessagesText();

        const dateElement = document.createElement('div');
        dateElement.className = 'message-date';
        dateElement.textContent = 'Сегодня';
        messagesContainer.appendChild(dateElement);

        const testMessages = generateTestMessages(chatId);

        testMessages.forEach(message => {
            const messageElement = createMessageElement(message.text, message.isOwn, message.time);
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
                { text: 'Привет! Как дела?', isOwn: false, time: '10:15' },
                { text: 'Привет!', isOwn: true, time: '10:20' },
               
            ],
            2: [
                { text: 'Встреча в 18:00 у офиса', isOwn: false, time: '15:30' },
                { text: 'Хорошо, буду вовремя!', isOwn: true, time: '15:35' },
            ],
            3: [
                { text: 'Отправил документы на проверку', isOwn: false, time: 'Вчера 14:20' },
                { text: 'Получил, спасибо! Проверю сегодня', isOwn: true, time: 'Вчера 14:25' },
            ],
            4: [
                { text: 'Спасибо за помощь вчера!', isOwn: false, time: '09:15' },
                { text: 'Не за что, всегда рад помочь!', isOwn: true, time: '09:20' },
            
            ]
        };
        
        return messageSets[chatId] || [
            { text: 'Это начало вашего диалога', isOwn: false, time: 'Только что' },
            { text: 'Начните общение!', isOwn: true, time: 'Только что' }
        ];
    }

    function createMessageElement(text, isOwn, time) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOwn ? 'own-message' : 'other-message'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const avatarImg = document.createElement('img');
        avatarImg.src = isOwn ? userAvatar : otherAvatar;
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
        messageTime.textContent = time;
        
        textContainerDiv.appendChild(messageText);
        textContainerDiv.appendChild(messageTime);
        
        contentDiv.appendChild(textContainerDiv);
        

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        return messageDiv;
    }
   
    function removeNoMessagesText() {
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
            const noMessagesText = messagesContainer.querySelector('.no-messages-text');
            if (noMessagesText) {
                noMessagesText.remove();
            }
        }
    }
    
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatFunctionality);
} else {
    initChatFunctionality();
}