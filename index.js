let wordsCache = [];

function cleanupDuplicateAndLegacyUi() {
  const appCards = Array.from(document.querySelectorAll('main.app'));
  const primaryApp = appCards[0];

  if (!primaryApp) {
    throw new Error('No .app container found.');
  }

  appCards.slice(1).forEach((node) => node.remove());

  ['#belowDisplay', '#pagecolorFooter', '#userCustomSeparator'].forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (!primaryApp.contains(node)) {
        node.remove();
      }
    });
  });

  document.querySelectorAll('body > h1').forEach((heading) => {
    if (!primaryApp.contains(heading) && heading.textContent.trim() === 'Password Generator') {
      heading.remove();
    }
  });

  return primaryApp;
}

async function loadWords() {
  if (wordsCache.length) return wordsCache;

  const response = await fetch('words.json');
  if (!response.ok) {
    throw new Error(`Could not load words.json: ${response.status}`);
  }

  const data = await response.json();
  wordsCache = data.commonWords || [];
  return wordsCache;
}

function pickWord(words) {
  return words[Math.floor(Math.random() * words.length)] || '';
}

function applyTheme(isDarkMode) {
  document.body.classList.toggle('dark-mode', isDarkMode);
}

function createHandlers(elements) {
  const {
    passwordDisplay,
    wordCount,
    separatorToggle,
    darkModeToggle,
    statusLabel
  } = elements;

  async function generatePassword() {
    statusLabel.textContent = 'Generating...';

    try {
      const words = await loadWords();
      const selected = [];

      for (let i = 0; i < Number(wordCount.value); i += 1) {
        selected.push(pickWord(words));
      }

      const separator = separatorToggle.checked ? '-' : '';
      passwordDisplay.textContent = selected.join(separator);
      statusLabel.textContent = 'Generated';
    } catch (error) {
      passwordDisplay.textContent = 'Unable to generate password';
      statusLabel.textContent = 'Error loading word list';
      console.error(error);
    }
  }

  async function copyPassword() {
    const value = passwordDisplay.textContent || '';

    if (!value) {
      statusLabel.textContent = 'Generate a password first';
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      statusLabel.textContent = 'Copied';
    } catch (error) {
      statusLabel.textContent = 'Clipboard unavailable';
      console.error(error);
    }
  }

  function toggleDarkMode() {
    applyTheme(darkModeToggle.checked);
    localStorage.setItem('darkMode', darkModeToggle.checked ? 'true' : 'false');
  }

  return { generatePassword, copyPassword, toggleDarkMode };
}

window.addEventListener('DOMContentLoaded', () => {
  const app = cleanupDuplicateAndLegacyUi();

  const elements = {
    passwordDisplay: app.querySelector('#passwordDisplay'),
    wordCount: app.querySelector('#wordCount'),
    separatorToggle: app.querySelector('#separatorToggle'),
    darkModeToggle: app.querySelector('#darkModeToggle'),
    generateButton: app.querySelector('#generateButton'),
    copyButton: app.querySelector('#copyButton'),
    statusLabel: app.querySelector('#status')
  };

  const { generatePassword, copyPassword, toggleDarkMode } = createHandlers(elements);

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  elements.darkModeToggle.checked = savedDarkMode;
  applyTheme(savedDarkMode);

  elements.generateButton.addEventListener('click', generatePassword);
  elements.copyButton.addEventListener('click', copyPassword);
  elements.darkModeToggle.addEventListener('change', toggleDarkMode);

  elements.passwordDisplay.addEventListener('focus', () => {
    elements.statusLabel.textContent = 'Editing';
  });

  elements.passwordDisplay.addEventListener('input', () => {
    elements.statusLabel.textContent = 'Edited';
  });

  generatePassword();
});