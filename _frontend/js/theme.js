;(() => {
  const STORAGE_KEY = 'iso-tc211-theme'
  const DARK_CLASS = 'dark'

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add(DARK_CLASS)
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light'
    setTheme(current === 'dark' ? 'light' : 'dark')
  }

  setTheme(getPreferredTheme())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  })

  window.__theme = { toggle: toggleTheme, get: getPreferredTheme, set: setTheme }
})()
