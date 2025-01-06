from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import torch
import torchvision.transforms as transforms

# Check if CUDA is available and set the device accordingly
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model and move it to the appropriate device
model = torch.load("C:/Users/MADHAV/Documents/ICRISATInternship/Groundnutapplication/backend/models/ViT_Groundnut(pretrained).pth", map_location=device)
model.to(device)
model.eval()

# Class names
class_names = ['Groundnut_Alternaria',
               'Groundnut_Healthy',
               'Groundnut_Late_and_Early_Leaf_Spot',
               'Groundnut_Leaf_Hopper_and_Jassids',
               'Groundnut_Leaf_Miner',
               'Groundnut_Rust',
               'Groundnut_Tobacco_Caterpillar']

# Flask app setup
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Serve the index.html file when accessing the root URL
@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

# Image preprocessing
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Match the model's input size
        transforms.ToTensor(),
        transforms.Normalize([0.5], [0.5])  # Assuming the model expects normalized images
    ])
    return transform(image).unsqueeze(0)  # Add batch dimension

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    image = Image.open(file).convert('RGB')
    input_tensor = preprocess_image(image).to(device)  # Move input tensor to appropriate device

    # Make prediction
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.softmax(output, dim=1)  # Calculate probabilities
        max_prob, predicted_idx = torch.max(probabilities, 1)
        predicted_class = class_names[predicted_idx.item()]

    return jsonify({
        'prediction': predicted_class,
        'probability': max_prob.item()  # Return the max probability as a float
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Ensure the app is accessible from the network
