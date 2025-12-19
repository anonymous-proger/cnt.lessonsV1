function alerts() {
    const header = document.getElementById('loggo');
    
    header.addEventListener('click', handleHeaderClick);
    
}


function handleHeaderClick() {
    alert("chatMessanger v1.1");
}

function initChat() {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const chatName = this.querySelector('.chat-name').textContent;  
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    alerts();
    
    initChat();
});