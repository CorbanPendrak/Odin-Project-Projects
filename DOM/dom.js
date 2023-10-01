const container = document.querySelector("#container");

const redParagraph = document.createElement('p');
redParagraph.textContent = "Hey I'm red!";
redParagraph.style.color = 'red';
container.appendChild(redParagraph);

const blueHeader = document.createElement('h3');
blueHeader.textContent = "I'm a blue h3!"
blueHeader.style.color = 'blue';
container.appendChild(blueHeader);

const div = document.createElement('div');
div.style.cssText = 'border: solid black 5px; background-color: pink';

const divHeader = document.createElement('h1');
divHeader.textContent = "I'm in a div";
div.appendChild(divHeader)

const divParagraph = document.createElement('p');
divParagraph.textContent = "ME TOO!"

container.appendChild(div);

alert("DOM updated!")