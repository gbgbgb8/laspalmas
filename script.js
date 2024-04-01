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

          table.appendChild(row);
        });

        sectionDiv.appendChild(table);
        menuContainer.appendChild(sectionDiv);
      }
    }
  });