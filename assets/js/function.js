
const switchInput= document.querySelector('.ipt-switch-2');
const inputSwitch2 = switchInput.addEventListener('click', blurData)

function config() {
    document.getElementById('csvFileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const text = e.target.result;
                displayCSVData(text);
            };
            reader.readAsText(file);
        }
    });
    
     function displayCSVData(csv) {
        const lines = csv.split("\n");
        const container = document.getElementById("csvTable");
    
        // Clear previous content
        container.innerHTML = '';
    
        // Create cards from CSV data
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].trim(); // Remove extra spaces at start/end of line
    
            // Check if the line is empty or contains only delimiters
            if (row === "" || row.split(";").every(cell => cell.trim() === "")) {
                continue; // Skip empty lines
            }
    
            const cells = row.split(";").map(cell => cell.trim()); // Clean spaces in cells
            const postCard = document.createElement("div");
            postCard.className = "post-card"; // Use the post-card class
    
            // Add content to the post card
            cells.forEach(cell => {
                const p = document.createElement("p");
               
                // If the cell contains "Negative", "Irrelevant", "Positive", or "Neutral", hide it
                if (["Negative", "Positive", "Neutral"].includes(cell)) {
                    contentFoundNegative = cell === "Negative"; // Floutage seulement si c'est "Negative"
                    p.textContent = ""; // Hide the text
                    p.classList.add('hidden-text');
                } else{
                    p.textContent = cell;
                    postCard.appendChild(p);
                }

                function blurData(){
                    const container = document.getElementById("csvTable");
                    const paragraphs = container.querySelectorAll('p'); 
                
                    paragraphs.forEach((p, index) => {
                        const cellText = p.textContent;
                        
                        const contentFoundNegative = cellText === "Negative"; 
                        
                        if (switchInput.checked && contentFoundNegative) {
                            p.classList.add('blur-text'); 
                        } else {
                            p.classList.remove('blur-text');
                        }
                    });
                }
            });
    
            // Add like button with heart icon
            const likeButton = document.createElement("button");
            likeButton.innerHTML = '<i class="fas fa-heart"></i> <span class="hide-text">l</span>'; // Ajoute le texte "Like" avec la classe hide-text
    
            likeButton.className = "like-button"; // Add class for styling
            likeButton.onclick = function() {
                // Toggle liked state
                this.classList.toggle("liked");
                const heartIcon = this.querySelector("i");
                heartIcon.style.color = this.classList.contains("liked") ? "red" : "black"; // Change color on like
            };
    
            postCard.appendChild(likeButton);
            container.appendChild(postCard);
        }
    }
}

