let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const URL = 'https://teachablemachine.withgoogle.com/models/6z8n96uvW/'; // Replace with your model's URL
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(200, 200, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById('webcam-container').appendChild(webcam.canvas);
  labelContainer = document.getElementById('label-container');
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement('div'));
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  const resultDiv = document.getElementById('result');
  let details = '';

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }

  const maxPrediction = Math.max(...prediction.map(pred => pred.probability));
  const maxIndex = prediction.findIndex(pred => pred.probability === maxPrediction);
  const labels = ['book', 'mobile', 'human', 'glass']; // Replace with your model's labels

  switch (labels[maxIndex]) {
    case 'book':
      // Fetch and display book details (title, author, summary, etc.)
      fetchBookDetails().then(bookDetails => {
        details = `${bookDetails.title}`;
        resultDiv.innerText = `Details: ${details}`;
      });
      break;
    case 'mobile':
      // Fetch and display mobile details (brand, model, features, etc.)
      fetchMobileDetails().then(mobileDetails => {
        details = `${mobileDetails.title}`;
        resultDiv.innerText = `Details: ${details}`;
      });
      break;
    case 'human':
      // Fetch and display human details (name, age, occupation, etc.)
      fetchHumanDetails().then(humanDetails => {
        details = `${humanDetails.title}`;
        resultDiv.innerText = `Details: ${details}`;
      });
      break;
    case 'glass':
      // Fetch and display glass details (material, style, color, etc.)
      fetchGlassDetails().then(glassDetails => {
        details = `${glassDetails.title}`;
        resultDiv.innerText = `Details: ${details}`;
      });
      break;
    case 'pen':
        // Fetch and display pen details (material, style, color, etc.)
        fetchPenDetails().then(penDetails => {
            details = `${penDetails.title}`;
            resultDiv.innerText = `Details: ${details}`;
        });
    break;
    default:
      details = 'No details available';
      resultDiv.innerText = `Details: ${details}`;
      break;
  }
}

// Function to fetch book details
async function fetchBookDetails() {
  // Simulating fetching details without an API or database
  const bookDetails = {
    title: 'Its a book'
  };
  return bookDetails;
}

// Function to fetch mobile details
async function fetchMobileDetails() {
  // Simulating fetching details without an API or database
  const mobileDetails = {
    title: 'Its a mobile',
  };
  return mobileDetails;
}

// Function to fetch human details
async function fetchHumanDetails() {
  // Simulating fetching details without an API or database
  const humanDetails = {
    title: 'Its a human'
  };
  return humanDetails;
}

// Function to fetch glass details
async function fetchGlassDetails() {
  // Simulating fetching details without an API or database
  const glassDetails = {
    title: 'Its a glass'
  };
  return glassDetails;
}

async function fetchPenDetails() {
    // Simulating fetching details without an API or database
    const penDetails = {
      title: 'Its a pen'
    };
    return penDetails;
  }

// Initialize the app
init();
