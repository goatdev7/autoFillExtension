document.addEventListener('DOMContentLoaded', () => {
    // Load saved options
    chrome.storage.sync.get(
      ['firstName', 'lastName', 'phone', 'address1', 'address2', 'portfolio', 'about'],
      (data) => {
        document.getElementById('firstName').value = data.firstName || '';
        document.getElementById('lastName').value = data.lastName || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('candidate_email').value = data.email || '';
        document.getElementById('address1').value = data.address1 || '';
        document.getElementById('address2').value = data.address2 || '';
        document.getElementById('portfolio').value = data.portfolio || '';
        document.getElementById('about').value = data.about || '';
      }
    );
  
    // Save options on form submit
    document.getElementById('options-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const options = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('candidate_email').value,
        address1: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        portfolio: document.getElementById('portfolio').value,
        about: document.getElementById('about').value
      };
      chrome.storage.sync.set(options, () => {
        console.log('Options saved.');
      });
    });
  });
  