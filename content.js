function fillFields(data) {
  const fieldMapping = [
    { key: 'firstName', keywords: ['first name', 'given name'] },
    { key: 'lastName', keywords: ['last name'] },
    { key: 'phone', keywords: ['phone', 'candidate_phone'] },
    { key: 'email', keywords: ['email', 'candidate_email]' ]},
    { key: 'address1', keywords: ['address line 1', 'address'] },
    { key: 'address2', keywords: ['address line 2'] },
    { key: 'portfolio', keywords: ['portfolio'] },
    { key: 'about', keywords: ['about', 'tell us about yourself'] }
  ];
  function getCandidateText(el) {
    return (
      (el.getAttribute('placeholder') || '') +
      ' ' +
      (el.getAttribute('name') || '') +
      ' ' +
      (el.getAttribute('id') || '') +
      ' ' +
      (el.getAttribute('aria-label') || '')
    ).toLowerCase();
  }
  document.querySelectorAll('input[required], textarea').forEach((el) => {
    const text = getCandidateText(el);
    console.log("text: ", text);
    fieldMapping.forEach(({ key, keywords }) => {
      if (keywords.some(kw => text.includes(kw)) && data[key]) {
        el.value = data[key];
        el.setAttribute('data-autofilled', 'true');
      }
    });
  });
}

chrome.storage.sync.get(
  ['firstName', 'lastName', 'phone', 'email', 'address1', 'address2', 'portfolio', 'about'],
  (data) => {
    // Initial fill on page load
    fillFields(data);

    // Monitor for dynamic changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          fillFields(data);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
);
