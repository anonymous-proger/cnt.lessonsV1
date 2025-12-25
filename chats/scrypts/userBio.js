function initUserBio() {

    const profileButton = document.getElementById('profile-button');
    const closeProfileButton = document.getElementById('close-profile');
    const profileContainer = document.getElementById('profile-container');
    const chatPlaceholder = document.getElementById('chat-placeholder');
    const activeChatContainer = document.getElementById('active-chat-container');
    const chatItems = document.querySelectorAll('.chat-item');
    
    let isProfileOpen = false;
    
    function openProfile() {
        
        activeChatContainer.style.display = 'none';
        chatPlaceholder.style.display = 'none';
        
        profileContainer.style.display = 'flex';
        
        isProfileOpen = true;
        
        chatItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    function closeProfile() {
        
        profileContainer.style.display = 'none';
        
        chatPlaceholder.style.display = 'flex';
        
        isProfileOpen = false;
    }
    
    profileButton.addEventListener('click', function() {
        if (isProfileOpen) {
            closeProfile();
        } else {
            openProfile();
        }
    });
    
    if (closeProfileButton) {
        closeProfileButton.addEventListener('click', closeProfile);
    }
    
    chatItems.forEach(chatItem => {
        const originalClickHandler = chatItem.onclick;
        
        chatItem.addEventListener('click', function() {
            if (isProfileOpen) {
                closeProfile();
                
                setTimeout(() => {
                    if (originalClickHandler) {
                        originalClickHandler.call(this);
                    }
                }, 50);
            }
        });
    });
    
    const editProfileBtn = document.getElementById('edit-profile');
    const logoutBtn = document.getElementById('logout');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('Функция редактирования профиля в разработке');
            
            const nicknameElement = document.getElementById('profile-nickname');
            const phoneElement = document.getElementById('profile-phone');
            
            const newNickname = prompt('Введите новый никнейм:', nicknameElement.textContent);
            if (newNickname && newNickname.trim() !== '') {
                nicknameElement.textContent = newNickname.trim();
            }
            
            const newPhone = prompt('Введите новый номер телефона:', phoneElement.textContent);
            if (newPhone && newPhone.trim() !== '') {
                phoneElement.textContent = newPhone.trim();
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите выйти?')) {
                alert('Выход из аккаунта...');
            }
        });
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isProfileOpen) {
            closeProfile();
        }
    });
    
    document.addEventListener('click', function(event) {
        if (isProfileOpen && 
            !profileContainer.contains(event.target) && 
            !profileButton.contains(event.target) &&
            event.target !== profileButton) {
            closeProfile();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserBio);
} else {
    initUserBio();
}