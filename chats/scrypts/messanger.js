function alerts() {
    const header = document.getElementById('loggo');
    
    header.addEventListener('click', handleHeaderClick);
    
}


function handleHeaderClick() {
    alert("chatMessanger v1.0");
}

function initChat() {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const chatName = this.querySelector('.chat-name').textContent;
            
            alert(`Вы выбрали чат с: ${chatName}\n\n` +
                  'Чат будет доступен спустя обновление, спасибо за ожидание :)');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    alerts();
    
    initChat();
});