let order = [];

fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    const additionalInfoContainer = document.getElementById('additional-info');

    for (const section in data) {
      if (section === 'additional_info') {
        const additionalInfo = data[section];
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = 'Additional Information';
        details.appendChild(summary);

        const ul = document.createElement('ul');
        additionalInfo.forEach(info => {
          const li = document.createElement('li');
          li.textContent = info;
          ul.appendChild(li);
        });

        details.appendChild(ul);
        additionalInfoContainer.appendChild(details);
      } else {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('menu-section');

        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section.replace(/_/g, ' ');
        sectionDiv.appendChild(sectionTitle);

        const table = document.createElement('table');
        table.setAttribute('role', 'grid');

        data[section].forEach(item => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = item.name;
          row.appendChild(nameCell);

          const priceCell = document.createElement('td');
          priceCell.textContent = item.price ? `$${item.price}` : '';
          row.appendChild(priceCell);

          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = item.description;
          row.appendChild(descriptionCell);

          const descriptionEsCell = document.createElement('td');
          descriptionEsCell.textContent = item.description_es;
          row.appendChild(descriptionEsCell);

          const addToOrderCell = document.createElement('td');
          const addToOrderButton = document.createElement('button');
          addToOrderButton.textContent = 'Add to Order';
          addToOrderButton.classList.add('add-to-order');
          addToOrderButton.setAttribute('data-item-name', item.name);
          addToOrderButton.setAttribute('data-item-price', item.price);
          addToOrderCell.appendChild(addToOrderButton);
          row.appendChild(addToOrderCell);

          table.appendChild(row);
        });

        sectionDiv.appendChild(table);
        menuContainer.appendChild(sectionDiv);
      }
    }

    // Add event listeners to "Add to Order" buttons
    const addToOrderButtons = document.querySelectorAll('.add-to-order');
    addToOrderButtons.forEach(button => {
      button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item-name');
        const itemPrice = parseFloat(button.getAttribute('data-item-price'));
        addToOrder(itemName, itemPrice);
      });
    });

    // Handle "Place Order" button click
    const placeOrderButton = document.getElementById('place-order');
    placeOrderButton.addEventListener('click', placeOrder);
  });

function addToOrder(itemName, itemPrice) {
  order.push({ name: itemName, price: itemPrice });
  updateOrderSummary();
}

function updateOrderSummary() {
  const orderItemsList = document.getElementById('order-items');
  orderItemsList.innerHTML = '';

  order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    orderItemsList.appendChild(li);
  });

  const totalCost = order.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

function placeOrder() {
  // Generate printable or shareable order summary
  const orderSummary = `Order Summary:\n${order.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n')}`;
  alert(orderSummary);
  // Reset order
  order = [];
  updateOrderSummary();
}