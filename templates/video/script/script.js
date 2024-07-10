document.getElementById('adminLoginButton').addEventListener('click', function() {
    document.getElementById('adminPanel').style.display = 'block';
});

document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const youtubeLink = document.getElementById('youtubeLink').value;
    const adminPassword = document.getElementById('adminPassword').value;

    fetch('/update-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ youtubeLink, adminPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('videoFrame').src = data.newLink;
        } else {
            alert('Failed to update video: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const deletePassword = document.getElementById('deletePassword').value;

    fetch('/delete-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminPassword: deletePassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('videoFrame').src = '';
        } else {
            alert('Failed to delete video: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
