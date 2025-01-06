// import React, { useState } from "react";

// function App() {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//     setPrediction(null); // Reset prediction when a new image is uploaded
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!image) {
//       alert("Please upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.error) {
//         alert(data.error);
//       } else {
//         setPrediction(data); // Set prediction and probability
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while processing the image.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Groundnut Disease Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         <button type="submit" style={{ marginLeft: "10px" }}>
//           Predict
//         </button>
//       </form>

//       {image && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Uploaded Image:</h2>
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Uploaded"
//             style={{ maxWidth: "400px", maxHeight: "300px", marginTop: "10px" }}
//           />
//         </div>
//       )}

//       {prediction && (
//         <div style={{ marginTop: "30px" }}>
//           <h2>Prediction Results:</h2>
//           <p>
//             <strong>Class:</strong> {prediction.prediction}
//           </p>
//           <p>
//             <strong>Probability:</strong> {(prediction.probability * 100).toFixed(2)}%
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPrediction(null); // Reset prediction when a new image is uploaded
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://10.6.20.99:5000/predict", {  // Use network IP address
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setPrediction(data); // Set prediction and probability
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while processing the image.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Groundnut Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Predict
        </button>
      </form>

      {image && (
        <div style={{ marginTop: "20px" }}>
          <h2>Uploaded Image:</h2>
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            style={{ maxWidth: "400px", maxHeight: "300px", marginTop: "10px" }}
          />
        </div>
      )}

      {prediction && (
        <div style={{ marginTop: "30px" }}>
          <h2>Prediction Results:</h2>
          <p>
            <strong>Class:</strong> {prediction.prediction}
          </p>
          <p>
            <strong>Probability:</strong> {(prediction.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
