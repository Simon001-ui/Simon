// === Configuration de l'API ===
const apiKey = "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"; // <<< Mets ta clé API ici
const apiUrl = "https://api.openai.com/v1/chat/completions";

// === Sélection des éléments HTML ===
const form = document.getElementById('question-form');
const questionInput = document.getElementById('question');
const responseDiv = document.getElementById('response');

// === Animation des 3 points ===
const threeDots = document.getElementById('dots');
const interval = setInterval(() => {
  threeDots.textContent = threeDots.textContent.length === 3 ? '' : threeDots.textContent + '.';
}, 500);

// === Fonction d'appel à l'API GPT ===
async function fetchAnswer(question) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`, // Utilise ta clé API ici
    },
    body: JSON.stringify({
      model: "gpt-4", // Tu utilises GPT-4 ici
      messages: [
        { role: "system", content: "Vous êtes un assistant très utile." },
        { role: "user", content: question }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// === Fonction de gestion de la soumission du formulaire ===
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const question = questionInput.value.trim();
  
  if (question === "") {
    alert("Veuillez poser une question.");
    return;
  }
  
  responseDiv.innerHTML = "Je réfléchis à la réponse" + " <span id='dots'>...</span>";

  try {
    // On récupère la réponse de l'API
    const answer = await fetchAnswer(question);
    responseDiv.innerHTML = answer;
  } catch (error) {
    responseDiv.innerHTML = "Désolé, je n'ai pas pu obtenir la réponse. Veuillez réessayer plus tard.";
  }
  
  questionInput.value = ""; // Réinitialise le champ de saisie après la soumission
});

// === Fonction pour gérer les messages d'animation ===
function startLoadingAnimation() {
  responseDiv.innerHTML = "Je réfléchis à la réponse" + " <span id='dots'>...</span>";
}