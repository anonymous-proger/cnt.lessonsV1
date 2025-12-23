
function initDeleteMessage() {

    const messagesContainer = document.getElementById('messages-container');
    
    const deleteButtonsState = new WeakMap();
    
 
    messagesContainer.addEventListener('click', handleMessageClick);
    
 
    function handleMessageClick(event) {
        const messageElement = event.target.closest('.message');
        
        if (!messageElement) return;
  
        if (event.target.closest('.delete-button')) {
            return; 
        }
        
        if (messageElement.classList.contains('deleted')) {
            hideDeleteButton(messageElement);
            return;
        }
    
        toggleDeleteButton(messageElement);
    }
    

    function toggleDeleteButton(messageElement) {
    
        const existingButton = messageElement.querySelector('.delete-button');
        
        if (existingButton) {
      
            hideDeleteButton(messageElement);
        } else {
        
            showDeleteButton(messageElement);
        }
    }
    
    function showDeleteButton(messageElement) {
     
        hideAllDeleteButtons();
        

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        

        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation(); 
            deleteMessage(messageElement);
        });
        

        messageElement.appendChild(deleteButton);
        
        deleteButtonsState.set(messageElement, true);
        

        messageElement.classList.add('has-delete-button');
    }
    

    function hideDeleteButton(messageElement) {
        const deleteButton = messageElement.querySelector('.delete-button');
        if (deleteButton) {
            deleteButton.remove();
            messageElement.classList.remove('has-delete-button');
            deleteButtonsState.delete(messageElement);
        }
    }
    

    function hideAllDeleteButtons() {
        const allDeleteButtons = messagesContainer.querySelectorAll('.delete-button');
        allDeleteButtons.forEach(button => {
            const messageElement = button.closest('.message');
            if (messageElement) {
                messageElement.classList.remove('has-delete-button');
                deleteButtonsState.delete(messageElement);
            }
            button.remove();
        });
    }
    

    function deleteMessage(messageElement) {
        if (!messageElement || messageElement.classList.contains('deleted')) {
            return;
        }
 
        messageElement.classList.add('deleted');
        

        hideDeleteButton(messageElement);
        

        messageElement.style.opacity = '0.5';
        messageElement.style.transform = 'translateX(-20px)';
        

        setTimeout(() => {
            messageElement.remove();
            

            const remainingMessages = messagesContainer.querySelectorAll('.message:not(.message-date)');
            if (remainingMessages.length === 0) {

                const noMessagesText = document.createElement('div');
                noMessagesText.className = 'no-messages-text';
                noMessagesText.textContent = 'Сообщений нет';
                noMessagesText.style.textAlign = 'center';
                noMessagesText.style.color = '#888';
                noMessagesText.style.padding = '20px';
                
 
                const dateElement = messagesContainer.querySelector('.message-date');
                if (dateElement) {
                    dateElement.insertAdjacentElement('afterend', noMessagesText);
                }
            }
        }, 300); 
    }
    

    document.addEventListener('click', function(event) {

        if (!event.target.closest('.message') && !event.target.closest('.delete-button')) {
            hideAllDeleteButtons();
        }
    });
    

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {

                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('message')) {

                    }
                });
            }
        });
    });
    

    observer.observe(messagesContainer, { childList: true });

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeleteMessage);
} else {
    initDeleteMessage();
}