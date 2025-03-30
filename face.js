const video = document.getElementById('video');
const expressionElement = document.getElementById('expression');
const interestElement = document.getElementById('interest');
const cognitiveLoadElement = document.getElementById('cognitiveLoad');

const captureFrame = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append('file', blob, 'frame.jpg');

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.expression && data.interest_score && data.cognitive_load) {
                expressionElement.textContent = data.expression;
                interestElement.textContent = `${data.interest_score}%`;
                cognitiveLoadElement.textContent = data.cognitive_load;
            } else {
                console.error('Incomplete response:', data);
            }
        } catch (error) {
            console.error('Error analyzing face:', error);
        }
    }, 'image/jpeg');
};

navigator.mediaDevices.getUser Media({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        setInterval(captureFrame, 3000);
    })
    .catch((error) => console.error('Error accessing webcam:', error));