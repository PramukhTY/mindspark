from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np
import mediapipe as mp

app = FastAPI()

@app.get("/api/analyse")
async def analyze(file: UploadFile = File(...)):
    # Read image data
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Dummy emotion detection (replace with real analysis)
    expression = "Happy"
    interest_score = 85
    cognitive_load = "Low"

    return {
        "expression": expression,
        "interest_score": interest_score,
        "cognitive_load": cognitive_load
    }
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True)

def detect_emotion(landmarks):
    left_eye = np.array([landmarks[159].x, landmarks[159].y])
    right_eye = np.array([landmarks[386].x, landmarks[386].y])
    mouth_upper = np.array([landmarks[13].x, landmarks[13].y])
    mouth_lower = np.array([landmarks[14].x, landmarks[14].y])
    left_eyebrow = np.array([landmarks[70].x, landmarks[70].y])
    right_eyebrow = np.array([landmarks[300].x, landmarks[300].y])

    eye_distance = np.linalg.norm(left_eye - right_eye)
    mouth_openness = mouth_lower[1] - mouth_upper[1]
    eyebrow_distance = np.linalg.norm(left_eyebrow - right_eyebrow)

    if mouth_openness > 0.04 and eye_distance < 0.045 and eyebrow_distance > 0.022:
        return {"expression": "Surprise", "interest_score": 95, "cognitive_load": "Very High"}
    elif mouth_openness < 0.015 and eye_distance > 0.065 and eyebrow_distance < 0.014:
        return {"expression": "Neutral", "interest_score": 75, "cognitive_load": "Moderate"}
    elif mouth_openness > 0.06 and eyebrow_distance > 0.028:
        return {"expression": "Happy", "interest_score": 99, "cognitive_load": "Very Low"}
    elif mouth_openness < 0.010 and eyebrow_distance > 0.010:
        return {"expression": "Angry", "interest_score": 45, "cognitive_load": "High"}
    else:
        return {"expression": "Sad", "interest_score": 55, "cognitive_load": "Moderate"}

@app.post("/analyze")
async def analyze_face(file: UploadFile = File(...)):
    contents = await file.read()
    np_array = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb_img)

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            return detect_emotion(face_landmarks.landmark)

    return {"expression": "Unknown", "interest_score": 0, "cognitive_load": "N/A"}