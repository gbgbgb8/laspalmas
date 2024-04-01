fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');

    for (const section in data) {
      if (section === 'additional_info') continue;

      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('menu-section');

      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = section.replace(/_/g, ' ');
      sectionDiv.appendChild(sectionTitle);

      data[section].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');

        const itemName = document.createElement('span');
        itemName.classList.add('menu-item-name');
        itemName.textContent = item.name;
        itemDiv.appendChild(itemName);

        const itemPrice = document.createElement('span');
        itemPrice.classList.add('menu-item-price');
        itemPrice.textContent = item.price ? `$${item.price}` : '';
        itemDiv.appendChild(itemPrice);

        const itemDescription = document.createElement('div');
        itemDescription.classList.add('menu-item-description');
        itemDescription.textContent = item.description;
        itemDiv.appendChild(itemDescription);

        const itemDescriptionEs = document.createElement('div');
        itemDescriptionEs.classList.add('menu-item-description', 'es');
        itemDescriptionEs.textContent = item.description_es;
        itemDiv.appendChild(itemDescriptionEs);

        sectionDiv.appendChild(itemDiv);
      });

      menuContainer.appendChild(sectionDiv);
    }
  });