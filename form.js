document.addEventListener('DOMContentLoaded', function () {
  // Initialize customers from localStorage or empty array
  const customers = JSON.parse(localStorage.getItem('registeredCustomers')) || [];

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isValidPhoneNumber(phone) {
    const pattern = /^\d{7,15}$/;
    return pattern.test(phone);
  }

  function renderTable() {
    const tableBody = document.getElementById('customerTableBody');
    const noCustomersRow = document.getElementById('noCustomersRow');
    tableBody.innerHTML = '';
    if (customers.length === 0) {
      if (noCustomersRow) noCustomersRow.style.display = '';
      return;
    } else {
      if (noCustomersRow) noCustomersRow.style.display = 'none';
    }
    customers.forEach((customer, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.contact}</td>
        <td>${capitalizeFirstLetter(customer.type)}</td>
        <td>
          <button class="btn-edit" data-index="${idx}">Edit</button>
          <button class="btn-delete" data-index="${idx}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
    // Attach event listeners for delete and edit
    tableBody.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (confirm('Are you sure you want to delete this customer?')) {
          customers.splice(index, 1);
          saveCustomersToLocal();
          renderTable();
        }
      });
    });
    tableBody.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        const customer = customers[index];
        document.getElementById('nameInput').value = customer.name;
        document.getElementById('emailInput').value = customer.email;
        document.getElementById('contactInput').value = customer.contact;
        document.getElementById('typeInput').value = customer.type;
        // Remove the customer so that saving will update it
        customers.splice(index, 1);
        saveCustomersToLocal();
        renderTable();
      });
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function saveCustomersToLocal() {
    localStorage.setItem('registeredCustomers', JSON.stringify(customers));
  }

  document.getElementById('addCustomerBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const contact = document.getElementById('contactInput').value.trim();
    const accountType = document.getElementById('typeInput').value;

    if (!name || !email || !contact || !accountType) {
      alert('Please fill all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPhoneNumber(contact)) {
      alert(
        'Please enter a valid phone number (digits only, 7-15 characters).'
      );
      return;
    }

    // Prevent duplicate emails
    if (customers.some(cust => cust.email.toLowerCase() === email.toLowerCase())) {
      alert('This email is already registered.');
      return;
    }

    customers.push({ name, email, contact, type: accountType });
    renderTable();

    saveCustomersToLocal();

    document.getElementById('customerForm').reset();
  });

  // Initial render of existing customers if any
  renderTable();
});
