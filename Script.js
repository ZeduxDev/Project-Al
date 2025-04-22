// Create the mod panel container (styled like a terminal window)
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '50px';
panel.style.left = '50px';
panel.style.width = '300px';
panel.style.height = '450px';
panel.style.backgroundColor = '#111';
panel.style.color = '#00ff00';
panel.style.fontFamily = 'Courier New, monospace';
panel.style.zIndex = '999999';
panel.style.borderRadius = '10px';
panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
panel.style.padding = '10px';
panel.style.overflow = 'hidden';
panel.style.border = '2px solid #00ff00';
panel.innerHTML = `<h3 style="margin-top: 0; font-size: 18px;">Active Learn Console</h3>`;

// Make the panel draggable
let isDragging = false;
let offsetX, offsetY;

panel.onmousedown = function(e) {
    isDragging = true;
    offsetX = e.clientX - panel.getBoundingClientRect().left;
    offsetY = e.clientY - panel.getBoundingClientRect().top;
    document.body.style.cursor = 'move';
};

document.onmousemove = function(e) {
    if (isDragging) {
        panel.style.left = e.clientX - offsetX + 'px';
        panel.style.top = e.clientY - offsetY + 'px';
    }
};

document.onmouseup = function() {
    isDragging = false;
    document.body.style.cursor = 'default';
};

// Add a command input box
const inputBox = document.createElement('input');
inputBox.style.width = '100%';
inputBox.style.backgroundColor = '#222';
inputBox.style.color = '#00ff00';
inputBox.style.border = '1px solid #00ff00';
inputBox.style.padding = '5px';
inputBox.style.marginTop = '10px';
inputBox.style.fontFamily = 'Courier New, monospace';
inputBox.style.fontSize = '14px';
inputBox.placeholder = 'Enter command...';
panel.appendChild(inputBox);

// Add a button to process commands
const executeButton = document.createElement('button');
executeButton.textContent = 'Execute';
executeButton.style.width = '100%';
executeButton.style.marginTop = '5px';
executeButton.style.backgroundColor = '#333';
executeButton.style.color = '#00ff00';
executeButton.style.border = '1px solid #00ff00';
executeButton.style.padding = '5px';
executeButton.style.fontFamily = 'Courier New, monospace';
executeButton.onclick = function() {
    const command = inputBox.value.trim();
    if (command === 'changeColor') {
        document.body.style.backgroundColor = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
        console.log("Color changed.");
    } else if (command === 'toggleVisibility') {
        const targetElement = document.querySelector('.mCSB_container');
        if (targetElement) {
            targetElement.style.display = targetElement.style.display === 'none' ? 'block' : 'none';
            console.log("Toggled visibility of .mCSB_container.");
        }
    } else if (command === 'alertMessage') {
        const customMessage = prompt('Enter your message:');
        alert(customMessage);
    } else {
        console.log(`Unknown command: ${command}`);
    }
    inputBox.value = '';  // Clear the input after command execution
};
panel.appendChild(executeButton);

// Add the "Rapid trigger vocab learn" button
const vocabLearnButton = document.createElement('button');
vocabLearnButton.textContent = 'Rapid trigger vocab learn';
vocabLearnButton.style.width = '100%';
vocabLearnButton.style.marginTop = '5px';
vocabLearnButton.style.backgroundColor = '#333';
vocabLearnButton.style.color = '#00ff00';
vocabLearnButton.style.border = '1px solid #00ff00';
vocabLearnButton.style.padding = '5px';
vocabLearnButton.style.fontFamily = 'Courier New, monospace';
vocabLearnButton.onclick = function() {
    const containerIndex = 3; // Define the container index
	
	// Check if the container exists before proceeding
	const containers = document.querySelectorAll('.mCSB_container');
	if (containers.length > containerIndex) {
		const container = containers[containerIndex];
		let text = container.cloneNode(true);

		// Remove unwanted elements
		text.querySelectorAll('button, a, .previous, .next').forEach(el => el.remove());
		text = text.innerText.replace(/Progress|\d+\/\d+|Next|Previous/g, '').trim();

        document.querySelector('#userInputText').innerText = text

		console.log(text);
	} else {
		console.error(`Container at index ${containerIndex} does not exist.`);
		alert("Error this is not my side this error is active learn being dumb")
	}
};
panel.appendChild(vocabLearnButton);

const vocabLearnButton2 = document.createElement('button');
vocabLearnButton2.textContent = 'Get raw copy';
vocabLearnButton2.style.width = '100%';
vocabLearnButton2.style.marginTop = '5px';
vocabLearnButton2.style.backgroundColor = '#333';
vocabLearnButton2.style.color = '#00ff00';
vocabLearnButton2.style.border = '1px solid #00ff00';
vocabLearnButton2.style.padding = '5px';
vocabLearnButton2.style.fontFamily = 'Courier New, monospace';
vocabLearnButton2.onclick = function() {
    const containerIndex = 3; // Define the container index
	
	// Check if the container exists before proceeding
	const containers = document.querySelectorAll('.mCSB_container');

    const container = containers[containerIndex];
    let text = container.cloneNode(true);

    // Remove unwanted elements
    text.querySelectorAll('button, a, .previous, .next').forEach(el => el.remove());
    text = text.innerText.replace(/Progress|\d+\/\d+|Next|Previous/g, '').trim();

    navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });      
};

const vocabLearnButton3 = document.createElement('button');
vocabLearnButton3.textContent = 'Get raw dev code copy';
vocabLearnButton3.style.width = '100%';
vocabLearnButton3.style.marginTop = '5px';
vocabLearnButton3.style.backgroundColor = '#333';
vocabLearnButton3.style.color = '#00ff00';
vocabLearnButton3.style.border = '1px solid #00ff00';
vocabLearnButton3.style.padding = '5px';
vocabLearnButton3.style.fontFamily = 'Courier New, monospace';
vocabLearnButton3.onclick = function() {
    text = `
    const container = document.querySelectorAll('.mCSB_container')[3];
    let text = container.cloneNode(true);

    text.querySelectorAll('button, a, .previous, .next').forEach(el => el.remove());
    text = text.innerText.replace(/Progress|\\d+\\/\\d+|Next|Previous/g, '').trim();

    console.log(text);
    `

    navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });      
};


panel.appendChild(vocabLearnButton);
panel.appendChild(vocabLearnButton2);
panel.appendChild(vocabLearnButton3);

// Append the mod panel to the body
document.body.appendChild(panel);
