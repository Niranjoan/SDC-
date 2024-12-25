document.getElementById('addItem').addEventListener('click', () => {
    const itemSection = document.getElementById('itemSection');
    const newItem = document.querySelector('.item').cloneNode(true);
    newItem.querySelectorAll('input').forEach(input => input.value = '');
    itemSection.appendChild(newItem);
  });
  
  document.getElementById('invoiceForm').addEventListener('submit', event => {
    event.preventDefault();
  
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const items = document.querySelectorAll('.item');
  
    const invoiceBody = document.querySelector('#invoiceTable tbody');
    invoiceBody.innerHTML = '';
  
    let total = 0;
  
    items.forEach(item => {
      const desc = item.querySelector('.itemDesc').value;
      const qty = parseInt(item.querySelector('.itemQty').value);
      const price = parseFloat(item.querySelector('.itemPrice').value);
      const tax = parseFloat(item.querySelector('.itemTax').value);
  
      const subtotal = qty * price * (1 + tax / 100);
      total += subtotal;
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${desc}</td>
        <td>${qty}</td>
        <td>$${price.toFixed(2)}</td>
        <td>${tax}%</td>
        <td>$${subtotal.toFixed(2)}</td>
      `;
      invoiceBody.appendChild(row);
    });
  
    document.getElementById('customerDetails').innerHTML = `
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Address:</strong> ${customerAddress}</p>
    `;
  
    document.getElementById('totalAmount').innerHTML = `
      <p><strong>Total Amount: </strong>$${total.toFixed(2)}</p>
    `;
  
    document.getElementById('invoice').classList.remove('hidden');
  });
  
  document.getElementById('printInvoice').addEventListener('click', () => {
    window.print();
  });