from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import tensorflow as tf
import numpy as np

app = FastAPI(title="API Klasifikasi Teks")

keywords_keys = [
    'makanan', 'minuman', 'atk', 'transport', 'hiburan', 'kesehatan'
]
idx2label = {i: label for i, label in enumerate(keywords_keys)}

MODEL_PATH = "./app/best_model.h5"
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model berhasil dimuat.")
except Exception as e:
    print(f"Error saat memuat model: {e}")
    model = None 

class TextInput(BaseModel):
    text: str

class PredictionOutput(BaseModel):
    input_text: str
    predicted_category: str

@app.get("/")
def read_root():
    """Endpoint root untuk mengecek API."""
    return {"message": "Selamat datang di API QREP!"}

@app.post("/predict/", response_model=PredictionOutput)
async def predict_text_category(item: TextInput):
    """
    Menerima teks input dan mengembalikan kategori yang diprediksi.
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model tidak tersedia atau gagal dimuat.")

    try:
        text_to_predict = item.text
        logits = model.predict(tf.constant([text_to_predict]))
        predicted_idx = tf.argmax(logits[0]).numpy()
        predicted_label = idx2label.get(predicted_idx, "kategori_tidak_diketahui") 
        return PredictionOutput(input_text=text_to_predict, predicted_category=predicted_label)
    except Exception as e:
        print(f"Error selama prediksi: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan saat prediksi: {str(e)}")

# uvicorn app.main:app --reload