document.addEventListener('DOMContentLoaded', function () {
  const customerSelect = document.getElementById('customerSelect');
  const customerDetailsDiv = document.getElementById('customerDetails');
  const noSelectionMsg = document.getElementById('noSelectionMsg');
  const refreshBtn = document.getElementById('refreshBtn');

  // We'll fetch registered customers from localStorage if available (simulate persistent storage)
  // Format: localStorage key = 'registeredCustomers' (JSON string)
  // If not found, empty array

  function getRegisteredCustomers() {
    const data = localStorage.getItem('registeredCustomers');
    return data ? JSON.parse(data) : [];
  }

  function saveRegisteredCustomers(customers) {
    localStorage.setItem('registeredCustomers', JSON.stringify(customers));
  }

  // On this page, we load customers from localStorage and populate the dropdown
  function populateCustomerSelect() {
    const customers = getRegisteredCustomers();
    // Clear existing options except placeholder
    customerSelect.innerHTML = '<option value="">-- Select Customer --</option>';

    customers.forEach((cust, idx) => {
      const option = document.createElement('option');
      option.value = idx; // index key
      option.textContent = cust.name + ' (' + cust.email + ')';
      customerSelect.appendChild(option);
    });
  }

  // Simulate fetching bank details: balance and credit score
  // For demo, return random or computed values

  function getBankDetails(customer) {
    // For demo:
    // Balance: $500 to $10000, random fixed for each unique email by hashing email to number
    // Credit score: 300 to 850, also pseudo-random by email
    const seed = customer.email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

    function pseudoRandom(min, max) {
      const val = (Math.sin(seed + min) * 10000) % 1;
      return Math.floor(min + Math.abs(val) * (max - min));
    }

    const balance = pseudoRandom(500, 10000);
    const creditScore = pseudoRandom(300, 850);

    return { balance, creditScore };
  }

  function displayCustomerDetails(cust) {
    const { balance, creditScore } = getBankDetails(cust);
    document.getElementById('detailName').textContent = cust.name;
    document.getElementById('detailEmail').textContent = cust.email;
    document.getElementById('detailContact').textContent = cust.contact;
    document.getElementById('detailType').textContent = cust.type.charAt(0).toUpperCase() + cust.type.slice(1);
    document.getElementById('detailBalance').textContent = `$${balance.toLocaleString()}`;

    // Update credit score bar - width from 0 to 100% scaled based on score out of 850 max
    const creditScoreBar = document.getElementById('creditScoreBar');
    const percent = ((creditScore - 300) / (850 - 300)) * 100;
    creditScoreBar.style.width = percent + '%';
    creditScoreBar.textContent = creditScore;

    customerDetailsDiv.style.display = 'block';
    noSelectionMsg.style.display = 'none';
  }

  function clearDetails() {
    customerDetailsDiv.style.display = 'none';
    noSelectionMsg.style.display = 'block';
  }

  // Initialize dropdown on page load
  populateCustomerSelect();

  // Event: When user selects a customer from dropdown
  customerSelect.addEventListener('change', function () {
    const index = customerSelect.value;
    if (index === '') {
      clearDetails();
      return;
    }
    const customers = getRegisteredCustomers();
    const selectedCustomer = customers[index];
    if (selectedCustomer) {
      displayCustomerDetails(selectedCustomer);
    } else {
      clearDetails();
    }
  });

  // Refresh button just reloads the customer list data and details updated again
  refreshBtn.addEventListener('click', function () {
    populateCustomerSelect();
    // Reset selection and details display
    customerSelect.value = '';
    clearDetails();
  });
});
