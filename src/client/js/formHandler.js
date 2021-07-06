function handleSubmit(event) {
    event.preventDefault()

    let formUrl = document.getElementById('name').value


if (Client.checkForName(formUrl)) {
  const url = 'http://localhost:8080/userUrl';
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ formUrl: formUrl }),
  })
    .then((res) => res.json())
    .then(function (res) {

// do some faces
if (res.score_tag=="P+"){
      document.getElementById('score').innerHTML =
        'Score: ' + res.score_tag + ' (Strong Positive) 😁';
}
if (res.score_tag == 'P') {
  document.getElementById('score').innerHTML = 'Score: ' + res.score_tag + ' (Positive) 😊';
}

if (res.score_tag == 'NEU') {
  document.getElementById('score').innerHTML =
    'Score: ' + res.score_tag + ' (Neuteral) 😐';
}
if (res.score_tag == 'N') {
  document.getElementById('score').innerHTML =
    'Score: ' + res.score_tag + ' (Negative) 😕';
}
if (res.score_tag == 'N+') {
  document.getElementById('score').innerHTML =
    'Score: ' + res.score_tag + ' (Strong Negative) 😤';
}
if (res.score_tag == 'NONE') {
  document.getElementById('score').innerHTML =
    'Score: ' + res.score_tag + ' (None) 😶';
}

  document.getElementById('agreement').innerHTML =
    'Agreement: ' + res.agreement;
      document.getElementById('subjectivity').innerHTML =
        'Subjectivity: ' + res.subjectivity;
      document.getElementById('confident').innerHTML =
        'Confidence: ' + res.confidence;
      document.getElementById('ironic').innerHTML = 'Irony: ' + res.irony;
    });
} else {
  alert('Not a valid URL, please try again.');
};
}

export { handleSubmit }