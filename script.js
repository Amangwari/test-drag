const itemsData = [
    { name: 'Apple', type: 'fruit' },
    { name: 'Banana', type: 'fruit' },
    { name: 'Carrot', type: 'vegetable' },
    { name: 'Potato', type: 'vegetable' },
    { name: 'Grapes', type: 'fruit' },
    { name: 'Tomato', type: 'vegetable' },
];

const shuffledItems = itemsData.sort(() => Math.random() - 0.5);
const shuffledContainer = document.getElementById('shuffled-items');

// Create and display shuffled items
shuffledItems.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.name;
    div.className = 'item';
    div.draggable = true;
    div.dataset.type = item.type;

    div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.name);
        div.classList.add('dragging');
    });

    div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
    });

    shuffledContainer.appendChild(div);
});

// Add drop event listeners to the droppable boxes
const fruitBox = document.getElementById('fruit-box');
const vegetableBox = document.getElementById('vegetable-box');
let itemsDropped = 0;

// Function to check if all items are correctly placed
function checkWinCondition() {
    if (itemsDropped === shuffledItems.length) {
        alert("You Win!");
    }
}

[fruitBox, vegetableBox].forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    box.addEventListener('drop', (e) => {
        e.preventDefault();
        const itemName = e.dataTransfer.getData('text/plain');
        const draggedItem = Array.from(shuffledContainer.children).find(item => item.textContent === itemName);
        
        if (draggedItem) {
            const itemType = draggedItem.dataset.type;
            if ((box.id === 'fruit-box' && itemType === 'fruit') || (box.id === 'vegetable-box' && itemType === 'vegetable')) {
                box.appendChild(draggedItem);
                itemsDropped++;
                setTimeout(() => {
                    box.querySelectorAll('.item').forEach((item, index) => {
                        item.style.order = index;
                    });
                }, 100);
                checkWinCondition();
            } else {
                // Return item to original position with animation
                const originalPosition = shuffledContainer.getBoundingClientRect();
                draggedItem.classList.add('return-animation');
                shuffledContainer.appendChild(draggedItem);
                
                // Reset the animation after the duration
                setTimeout(() => {
                    draggedItem.classList.remove('return-animation');
                }, 500);
            }
        }
    });
});
