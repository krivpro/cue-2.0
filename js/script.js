// // Структура данных:
// // speeches = [
// //   {
// //     id: Number,
// //     title: String,
// //     description: String,
// //     sets: [
// //       {
// //         id: Number,
// //         title: String,
// //         songs: [
// //           {
// //             songId: Number, // ID песни из общего списка
// //             order: Number   // Порядок в сете
// //           }
// //         ]
// //       }
// //     ]
// //   }
// // ]
// // songs = [
// //   {
// //     id: Number,
// //     title: String,
// //     text: String
// //   }
// // ]

// let speeches = []; // Все выступления
// let songs = []; // Все песни
// let currentSpeechId = null; // Текущее выбранное выступление
// let currentSetId = null; // Текущий редактируемый сет
// let currentSongId = null; // Текущая редактируемая песня
// let currentSetForAddingSong = null; // Текущий сет для добавления песни
// let currentPerformanceSet = null; // Текущий сет в режиме выступления
// let currentSongIndex = 0; // Индекс текущей песни в выступлении
// let currentFontSize = 16; // Текущий размер шрифта в режиме выступления (px)

// const ICONS = {
//   add: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 12L17 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
//   edit: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1369 3.46967C14.9963 3.32902 14.8055 3.25 14.6066 3.25C14.4077 3.25 14.2169 3.32902 14.0763 3.46967L4.88388 12.6621C4.78965 12.7563 4.72223 12.8739 4.68856 13.0028L3.68856 16.8313C3.62127 17.0889 3.69561 17.3629 3.88388 17.5511C4.07215 17.7394 4.34614 17.8138 4.60375 17.7465L8.43218 16.7465C8.56111 16.7128 8.67874 16.6454 8.77297 16.5511L17.9654 7.35876C18.2582 7.06586 18.2582 6.59099 17.9654 6.2981L15.1369 3.46967ZM6.08843 13.5788L14.6066 5.06066L16.3744 6.82843L7.8562 15.3466L5.46344 15.9716L6.08843 13.5788Z" fill="currentColor"/><path d="M4 19.25C3.58579 19.25 3.25 19.5858 3.25 20C3.25 20.4142 3.58579 20.75 4 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H4Z" fill="currentColor"/></svg>`,
//   delete: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z" fill="currentColor"/><path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z" fill="currentColor"/><path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z" fill="currentColor"/></svg>`,
//   play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2661 10.4837C20.258 11.2512 20.258 12.7487 19.2661 13.5162C16.2685 15.8356 12.9213 17.6637 9.34979 18.9322L8.69731 19.1639C7.44904 19.6073 6.13053 18.7627 5.96154 17.4742C5.48938 13.8739 5.48938 10.126 5.96154 6.52574C6.13053 5.23719 7.44904 4.39263 8.69732 4.83597L9.34979 5.06771C12.9213 6.33619 16.2685 8.16434 19.2661 10.4837ZM18.3481 12.3298C18.5639 12.1628 18.5639 11.837 18.3481 11.6701C15.4763 9.44796 12.2695 7.69648 8.84777 6.4812L8.19529 6.24947C7.87034 6.13406 7.49691 6.35401 7.44881 6.72079C6.99363 10.1915 6.99363 13.8084 7.4488 17.2791C7.49691 17.6459 7.87034 17.8658 8.19529 17.7504L8.84777 17.5187C12.2695 16.3034 15.4763 14.5519 18.3481 12.3298Z" fill="currentColor"/></svg>`,
//   up: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303C16.2374 10.8232 15.7626 10.8232 15.4697 10.5303L12.75 7.81066L12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5L11.25 7.81066L8.53033 10.5303Z" fill="currentColor"/></svg>`,
//   down: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 16.1893L15.4697 13.4697C15.7626 13.1768 16.2374 13.1768 16.5303 13.4697C16.8232 13.7626 16.8232 14.2374 16.5303 14.5303L12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L7.46967 14.5303C7.17678 14.2374 7.17678 13.7626 7.46967 13.4697C7.76256 13.1768 8.23744 13.1768 8.53033 13.4697L11.25 16.1893L11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5L12.75 16.1893Z" fill="currentColor"/></svg>`,
//   grip: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="16" r="1.5" fill="currentColor"/><circle cx="9" cy="8" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="16" r="1.5" fill="currentColor"/><circle cx="15" cy="8" r="1.5" fill="currentColor"/></svg>`,
//   zoomIn: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2001 6.95007C10.6143 6.95007 10.9501 7.28586 10.9501 7.70007V9.45007H12.7001C13.1143 9.45007 13.4501 9.78586 13.4501 10.2001C13.4501 10.6143 13.1143 10.9501 12.7001 10.9501H10.9501V12.7001C10.9501 13.1143 10.6143 13.4501 10.2001 13.4501C9.78586 13.4501 9.45007 13.1143 9.45007 12.7001V10.9501H7.70007C7.28586 10.9501 6.95007 10.6143 6.95007 10.2001C6.95007 9.78586 7.28586 9.45007 7.70007 9.45007H9.45007V7.70007C9.45007 7.28586 9.78586 6.95007 10.2001 6.95007Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.39866 14.9446C7.85544 17.4014 11.7349 17.5685 14.3851 15.4458L19.5408 20.6014C19.8337 20.8943 20.3085 20.8943 20.6014 20.6014C20.8943 20.3085 20.8943 19.8337 20.6014 19.5408L15.4458 14.3851C17.5685 11.7349 17.4014 7.85544 14.9446 5.39866C12.3086 2.76262 8.0347 2.76262 5.39866 5.39866C2.76262 8.0347 2.76262 12.3086 5.39866 14.9446ZM6.45932 6.45932C4.40907 8.50957 4.40907 11.8337 6.45932 13.8839C8.50807 15.9327 11.8288 15.9342 13.8794 13.8884L13.8839 13.8839L13.8885 13.8794C15.9342 11.8288 15.9327 8.50807 13.8839 6.45932C11.8337 4.40907 8.50957 4.40907 6.45932 6.45932Z" fill="currentColor"/></svg>`,
//   zoomOut: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.69995 9.45007C7.28574 9.45007 6.94995 9.78586 6.94995 10.2001C6.94995 10.6143 7.28574 10.9501 7.69995 10.9501H12.7C13.1142 10.9501 13.45 10.6143 13.45 10.2001C13.45 9.78586 13.1142 9.45007 12.7 9.45007H7.69995Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.39854 14.9446C7.85532 17.4014 11.7348 17.5685 14.385 15.4458L19.5407 20.6014C19.8335 20.8943 20.3084 20.8943 20.6013 20.6014C20.8942 20.3085 20.8942 19.8337 20.6013 19.5408L15.4457 14.3851C17.5683 11.7349 17.4013 7.85544 14.9445 5.39866C12.3084 2.76262 8.03458 2.76262 5.39854 5.39866C2.7625 8.0347 2.7625 12.3086 5.39854 14.9446ZM6.4592 6.45932C4.40895 8.50957 4.40895 11.8337 6.4592 13.8839C8.50795 15.9327 11.8287 15.9342 13.8793 13.8884L13.8838 13.8839L13.8883 13.8794C15.9341 11.8288 15.9326 8.50807 13.8838 6.45932C11.8336 4.40907 8.50945 4.40907 6.4592 6.45932Z" fill="currentColor"/></svg>`
// };

// function getPreparedPresetSongs() {
//   const presetSongs = Array.isArray(window.PRESET_SONGS) ? window.PRESET_SONGS : [];

//   return presetSongs.map((song, index) => ({
//     id: index + 1,
//     title: (song.title || '').trim(),
//     text: (song.text || '').trim()
//   })).filter(song => song.title);
// }

// function mergePresetSongs(existingSongs) {
//   const preparedPresetSongs = getPreparedPresetSongs();
//   const mergedSongs = Array.isArray(existingSongs) ? [...existingSongs] : [];

//   preparedPresetSongs.forEach((presetSong) => {
//     const hasSong = mergedSongs.some(
//       (song) => song.title === presetSong.title && (song.text || '') === (presetSong.text || '')
//     );

//     if (!hasSong) {
//       mergedSongs.push(presetSong);
//     }
//   });

//   return mergedSongs;
// }

// // Получаем элементы DOM
// const elements = {
//   burger: document.querySelector('.header__burger'),
//   menu: document.querySelector('.menu'),
//   menuList: document.querySelector('.menu__list'),
//   newSpeechBtn: document.getElementById('newSpeechBtn'),
//   speechEditor: document.getElementById('speechEditor'),
//   workspaceTitle: document.querySelector('.workspace__title'),
//   addSetBtn: document.getElementById('addSetBtn'),
//   setsContainer: document.getElementById('setsContainer'),
//   setModal: document.getElementById('setModal'),
//   setNameInput: document.getElementById('setNameInput'),
//   closeSetBtn: document.getElementById('closeSetBtn'),
//   cancelSetBtn: document.getElementById('cancelSetBtn'),
//   saveSetBtn: document.getElementById('saveSetBtn'),
//   addSongToSetBtn: document.getElementById('addSongToSetBtn'),
//   setSongsList: document.getElementById('setSongsList'),
//   // Элементы режима выступления
//   performanceModal: document.getElementById('performanceModal'),
//   performanceTitle: document.getElementById('performanceTitle'),
//   performanceProgress: document.getElementById('performanceProgress'),
//   prevSongBtn: document.getElementById('prevSongBtn'),
//   nextSongBtn: document.getElementById('nextSongBtn'),
//   closePerformanceBtn: document.getElementById('closePerformanceBtn'),
//   currentSongTitle: document.getElementById('currentSongTitle'),
//   currentSongNumber: document.getElementById('currentSongNumber'),
//   currentSongText: document.getElementById('currentSongText'),
//   // Кнопки масштабирования текста
//   zoomInBtn: null,
//   zoomOutBtn: null,
//   // Элементы для песен
//   songsBtn: document.getElementById('songsBtn'),
//   settingsBtn: document.getElementById('settingsBtn'),
//   songsModal: document.getElementById('songsModal'),
//   closeSongsBtn: document.getElementById('closeSongsBtn'),
//   addSongBtn: document.getElementById('addSongBtn'),
//   songsList: document.getElementById('songsList'),
//   songEditModal: document.getElementById('songEditModal'),
//   songEditTitle: document.getElementById('songEditTitle'),
//   songTitleInput: document.getElementById('songTitleInput'),
//   songTextInput: document.getElementById('songTextInput'),
//   cancelSongBtn: document.getElementById('cancelSongBtn'),
//   saveSongBtn: document.getElementById('saveSongBtn'),
//   // Элементы для модальных окон
//   errorModal: document.getElementById('errorModal'),
//   errorMessage: document.getElementById('errorMessage'),
//   errorOkBtn: document.getElementById('errorOkBtn'),
//   confirmModal: document.getElementById('confirmModal'),
//   confirmMessage: document.getElementById('confirmMessage'),
//   confirmCancelBtn: document.getElementById('confirmCancelBtn'),
//   confirmOkBtn: document.getElementById('confirmOkBtn'),
//   // Элементы для добавления песен в сет
//   addSongToSetModal: document.getElementById('addSongToSetModal'),
//   closeAddSongToSetBtn: document.getElementById('closeAddSongToSetBtn'),
//   songSearchInput: document.getElementById('songSearchInput'),
//   songsSelectorList: document.getElementById('songsSelectorList')
// };

// // Инициализация приложения
// function init() {
//   applySavedTheme();
//   loadFromLocalStorage();
//   setupEventListeners();
//   renderSpeeches();
//   createZoomButtons();
// }

// function applySavedTheme() {
//   const savedTheme = localStorage.getItem('theme');
//   const isDarkTheme = savedTheme === 'dark';
//   document.body.classList.toggle('theme-dark', isDarkTheme);
//   if (elements.settingsBtn) {
//     elements.settingsBtn.setAttribute('aria-pressed', String(isDarkTheme));
//   }
// }

// function toggleTheme() {
//   const isDarkTheme = document.body.classList.toggle('theme-dark');
//   localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
//   if (elements.settingsBtn) {
//     elements.settingsBtn.setAttribute('aria-pressed', String(isDarkTheme));
//   }
// }

// // Создание кнопок масштабирования в режиме выступления
// function createZoomButtons() {
//   const performanceHeaderControls = document.querySelector('.performance-header__controls');
//   if (!performanceHeaderControls) return;
  
//   // Создаем контейнер для кнопок масштабирования
//   const zoomContainer = document.createElement('div');
//   zoomContainer.className = 'performance-zoom-controls';
//   zoomContainer.style.display = 'flex';
//   zoomContainer.style.gap = '8px';
//   zoomContainer.style.marginRight = '8px';
  
//   // Кнопка увеличения
//   const zoomInBtn = document.createElement('button');
//   zoomInBtn.className = 'performance-header__btn icon-btn';
//   zoomInBtn.innerHTML = ICONS.zoomIn;
//   zoomInBtn.title = 'Увеличить текст (Ctrl +)';
//   zoomInBtn.setAttribute('aria-label', 'Увеличить текст');
//   zoomInBtn.addEventListener('click', increaseFontSize);
  
//   // Кнопка уменьшения
//   const zoomOutBtn = document.createElement('button');
//   zoomOutBtn.className = 'performance-header__btn icon-btn';
//   zoomOutBtn.innerHTML = ICONS.zoomOut;
//   zoomOutBtn.title = 'Уменьшить текст (Ctrl -)';
//   zoomOutBtn.setAttribute('aria-label', 'Уменьшить текст');
//   zoomOutBtn.addEventListener('click', decreaseFontSize);
  
//   // Кнопка сброса масштаба
//   const zoomResetBtn = document.createElement('button');
//   zoomResetBtn.className = 'performance-header__btn icon-btn';
//   zoomResetBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
//   zoomResetBtn.title = 'Сбросить масштаб (Ctrl 0)';
//   zoomResetBtn.setAttribute('aria-label', 'Сбросить масштаб');
//   zoomResetBtn.addEventListener('click', resetFontSize);
  
//   zoomContainer.appendChild(zoomInBtn);
//   zoomContainer.appendChild(zoomOutBtn);
//   zoomContainer.appendChild(zoomResetBtn);
  
//   // Вставляем кнопки перед существующими
//   performanceHeaderControls.insertBefore(zoomContainer, performanceHeaderControls.firstChild);
  
//   elements.zoomInBtn = zoomInBtn;
//   elements.zoomOutBtn = zoomOutBtn;
// }

// // Увеличение размера шрифта
// function increaseFontSize() {
//   if (currentFontSize < 40) {
//     currentFontSize += 2;
//     applyFontSize();
//   }
// }

// // Уменьшение размера шрифта
// function decreaseFontSize() {
//   if (currentFontSize > 10) {
//     currentFontSize -= 2;
//     applyFontSize();
//   }
// }

// // Сброс размера шрифта
// function resetFontSize() {
//   currentFontSize = 16;
//   applyFontSize();
// }

// // Применение размера шрифта к тексту
// function applyFontSize() {
//   if (elements.currentSongText) {
//     elements.currentSongText.style.fontSize = `${currentFontSize}px`;
//     elements.currentSongText.style.lineHeight = `${currentFontSize * 1.5}px`;
//   }
// }

// // Загрузка данных из localStorage
// function loadFromLocalStorage() {
//   const savedSpeeches = localStorage.getItem('speeches');
//   if (savedSpeeches) {
//     speeches = JSON.parse(savedSpeeches);
//   }
  
//   const savedSongs = localStorage.getItem('songs');
//   if (savedSongs) {
//     songs = mergePresetSongs(JSON.parse(savedSongs));
//   } else {
//     songs = getPreparedPresetSongs();
//   }
  
//   // Загружаем сохранённый размер шрифта
//   const savedFontSize = localStorage.getItem('performanceFontSize');
//   if (savedFontSize) {
//     currentFontSize = parseInt(savedFontSize);
//     if (isNaN(currentFontSize) || currentFontSize < 10) currentFontSize = 16;
//     if (currentFontSize > 40) currentFontSize = 40;
//   }
// }

// // Сохранение данных в localStorage
// function saveToLocalStorage() {
//   localStorage.setItem('speeches', JSON.stringify(speeches));
//   localStorage.setItem('songs', JSON.stringify(songs));
//   localStorage.setItem('performanceFontSize', currentFontSize);
// }

// // Настройка обработчиков событий
// function setupEventListeners() {
//   // Бургер-меню для мобильных
//   elements.burger?.addEventListener('click', () => {
//     elements.menu.classList.toggle('menu--open');
//   });

//   // Создание нового выступления
//   elements.newSpeechBtn.addEventListener('click', createNewSpeech);
//   elements.settingsBtn?.addEventListener('click', toggleTheme);

//   // Добавление нового сета
//   elements.addSetBtn.addEventListener('click', addNewSet);

//   // Модальное окно сета
//   elements.closeSetBtn.addEventListener('click', closeSetModal);
//   elements.cancelSetBtn.addEventListener('click', closeSetModal);
//   elements.saveSetBtn.addEventListener('click', saveSetChanges);
//   elements.addSongToSetBtn.addEventListener('click', () => openAddSongToSetModal(currentSetId));
//   elements.setModal.addEventListener('click', (e) => {
//     if (e.target === elements.setModal) closeSetModal();
//   });

//   // Обработчики для песен
//   elements.songsBtn.addEventListener('click', openSongsModal);
//   elements.closeSongsBtn.addEventListener('click', closeSongsModal);
//   elements.addSongBtn.addEventListener('click', () => openSongEditModal());
//   elements.cancelSongBtn.addEventListener('click', closeSongEditModal);
//   elements.saveSongBtn.addEventListener('click', saveSongChanges);
  
//   // Закрытие модальных окон по клику вне их
//   elements.songsModal.addEventListener('click', (e) => {
//     if (e.target === elements.songsModal) closeSongsModal();
//   });
//   elements.songEditModal.addEventListener('click', (e) => {
//     if (e.target === elements.songEditModal) closeSongEditModal();
//   });
  
//   // Обработчики для модальных окон ошибок и подтверждений
//   elements.errorOkBtn.addEventListener('click', closeErrorModal);
//   elements.confirmCancelBtn.addEventListener('click', closeConfirmModal);
//   elements.confirmOkBtn.addEventListener('click', () => {
//     if (window.confirmCallback) {
//       window.confirmCallback();
//       window.confirmCallback = null;
//     }
//     closeConfirmModal();
//   });
  
//   elements.errorModal.addEventListener('click', (e) => {
//     if (e.target === elements.errorModal) closeErrorModal();
//   });
//   elements.confirmModal.addEventListener('click', (e) => {
//     if (e.target === elements.confirmModal) closeConfirmModal();
//   });
  
//   // Обработчики для добавления песен в сет
//   elements.closeAddSongToSetBtn.addEventListener('click', closeAddSongToSetModal);
//   elements.addSongToSetModal.addEventListener('click', (e) => {
//     if (e.target === elements.addSongToSetModal) closeAddSongToSetModal();
//   });
//   elements.songSearchInput.addEventListener('input', filterSongsInSelector);
  
//   // Обработчики для режима выступления
//   elements.closePerformanceBtn.addEventListener('click', closePerformance);
//   elements.prevSongBtn.addEventListener('click', () => navigateSong('prev'));
//   elements.nextSongBtn.addEventListener('click', () => navigateSong('next'));
  
//   // Горячие клавиши для навигации и масштабирования
//   document.addEventListener('keydown', (e) => {
//     if (currentPerformanceSet) {
//       if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
//         e.preventDefault();
//         navigateSong('prev');
//       } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
//         e.preventDefault();
//         navigateSong('next');
//       } else if (e.key === 'Escape') {
//         e.preventDefault();
//         closePerformance();
//       } else if (e.ctrlKey && e.key === '=') {
//         e.preventDefault();
//         increaseFontSize();
//       } else if (e.ctrlKey && e.key === '-') {
//         e.preventDefault();
//         decreaseFontSize();
//       } else if (e.ctrlKey && e.key === '0') {
//         e.preventDefault();
//         resetFontSize();
//       }
//     }
//   });
// }

// // Создание нового выступления
// function createNewSpeech() {
//   const newSpeech = {
//     id: Date.now(),
//     title: `Выступление ${speeches.length + 1}`,
//     description: '',
//     sets: []
//   };
  
//   speeches.push(newSpeech);
//   saveToLocalStorage();
//   renderSpeeches();
//   selectSpeech(newSpeech.id);
// }

// // Отрисовка списка выступлений
// function renderSpeeches() {
//   elements.menuList.innerHTML = '';
  
//   if (speeches.length === 0) {
//     elements.menuList.innerHTML = '<div class="empty-msg">Нет выступлений</div>';
//     showEmptyWorkspace();
//     return;
//   }

//   speeches.forEach(speech => {
//     const item = document.createElement('li');
//     item.className = 'menu__item';
//     if (speech.id === currentSpeechId) {
//       item.classList.add('menu__item--active');
//     }
//     item.dataset.id = speech.id;

//     const container = document.createElement('div');
//     container.className = 'menu__item-container';

//     // Название выступления
//     const title = document.createElement('span');
//     title.className = 'menu__item-title';
//     title.textContent = speech.title;
//     title.addEventListener('click', () => selectSpeech(speech.id));

//     // Кнопки управления
//     const actions = document.createElement('div');
//     actions.className = 'menu__item-actions';

//     // Кнопка добавления сета
//     const addSetBtn = document.createElement('button');
//     addSetBtn.className = 'menu-icon-btn';
//     addSetBtn.innerHTML = ICONS.add;
//     addSetBtn.title = 'Добавить сет';
//     addSetBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       addNewSetToSpeech(speech.id);
//     });

//     // Кнопка редактирования
//     const editBtn = document.createElement('button');
//     editBtn.className = 'menu-icon-btn';
//     editBtn.innerHTML = ICONS.edit;
//     editBtn.title = 'Редактировать';
//     editBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       startRenamingSpeech(speech.id);
//     });

//     // Кнопка удаления
//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'menu-icon-btn';
//     deleteBtn.innerHTML = ICONS.delete;
//     deleteBtn.title = 'Удалить';
//     deleteBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       deleteSpeech(speech.id);
//     });

//     actions.append(addSetBtn, editBtn, deleteBtn);
//     container.append(title, actions);
    
//     // Счетчик сетов
//     const counter = document.createElement('div');
//     counter.className = 'menu__item-counter';
//     counter.textContent = `Сетов: ${speech.sets.length}`;

//     item.append(container, counter);
//     elements.menuList.appendChild(item);
//   });
// }

// // Показываем пустую рабочую область
// function showEmptyWorkspace() {
//   elements.workspaceTitle.textContent = 'Выберите выступление';
//   elements.speechEditor.value = '';
//   elements.addSetBtn.classList.add('hidden');
//   elements.setsContainer.innerHTML = '';
// }

// // Выбор выступления для просмотра/редактирования
// function selectSpeech(speechId) {
//   currentSpeechId = speechId;
//   const speech = speeches.find(s => s.id === speechId);
  
//   if (speech) {
//     elements.workspaceTitle.textContent = speech.title;
//     elements.speechEditor.value = speech.description;
//     elements.addSetBtn.classList.remove('hidden');
//     renderSets(speech.sets);
//   }
  
//   renderSpeeches();
// }

// // Отрисовка списка сетов с drag-and-drop
// function renderSets(sets) {
//   elements.setsContainer.innerHTML = '';
  
//   if (sets.length === 0) {
//     elements.setsContainer.innerHTML = '<div class="empty-msg">Сетов пока нет</div>';
//     return;
//   }

//   sets.forEach(set => {
//     const setItem = document.createElement('div');
//     setItem.className = 'set-item';
//     setItem.dataset.id = set.id;

//     const setHeader = document.createElement('div');
//     setHeader.className = 'set-item__header';

//     const title = document.createElement('div');
//     title.className = 'set-item__title';
//     title.textContent = set.title;

//     const actions = document.createElement('div');
//     actions.className = 'set-item__actions';

//     // Кнопка выступления
//     const performBtn = document.createElement('button');
//     performBtn.className = 'set-item__btn set-item__btn--perform';
//     performBtn.innerHTML = ICONS.play;
//     performBtn.title = 'Выступить';
//     performBtn.addEventListener('click', () => startPerformance(set.id));

//     // Кнопка редактирования
//     const editBtn = document.createElement('button');
//     editBtn.className = 'set-item__btn';
//     editBtn.innerHTML = ICONS.edit;
//     editBtn.addEventListener('click', () => openSetModal(set.id));

//     // Кнопка удаления
//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'set-item__btn';
//     deleteBtn.innerHTML = ICONS.delete;
//     deleteBtn.addEventListener('click', () => deleteSet(set.id));

//     actions.append(performBtn, editBtn, deleteBtn);
//     setHeader.append(title, actions);
//     setItem.appendChild(setHeader);

//     // Список песен в сете с drag-and-drop
//     if (set.songs && set.songs.length > 0) {
//       const songsList = document.createElement('div');
//       songsList.className = 'set-songs-list';
//       songsList.setAttribute('data-set-id', set.id);
      
//       // Сортируем песни по порядку
//       const sortedSongs = [...set.songs].sort((a, b) => a.order - b.order);
      
//       sortedSongs.forEach((songInSet, index) => {
//         const song = songs.find(s => s.id === songInSet.songId);
//         if (song) {
//           const songItem = createDraggableSongItem(set.id, songInSet, song, index, sortedSongs.length);
//           songsList.appendChild(songItem);
//         }
//       });

//       // Добавляем обработчики drag-and-drop для контейнера
//       setupDragAndDrop(songsList, set.id);
//       setItem.appendChild(songsList);
//     } else {
//       const emptyMsg = document.createElement('div');
//       emptyMsg.className = 'set-empty-msg';
//       emptyMsg.textContent = 'В сете пока нет песен';
//       setItem.appendChild(emptyMsg);
//     }

//     elements.setsContainer.appendChild(setItem);
//   });
// }

// // Создание элемента песни с поддержкой drag-and-drop
// function createDraggableSongItem(setId, songInSet, song, index, totalCount) {
//   const songItem = document.createElement('div');
//   songItem.className = 'set-song-item';
//   songItem.setAttribute('data-song-id', songInSet.songId);
//   songItem.setAttribute('data-order', songInSet.order);
//   songItem.setAttribute('draggable', 'true');
  
//   songItem.style.cursor = 'grab';
//   songItem.style.userSelect = 'none';
  
//   const songInfo = document.createElement('div');
//   songInfo.className = 'set-song-item__info';

//   const dragHandle = document.createElement('div');
//   dragHandle.className = 'set-song-item__drag-handle';
//   dragHandle.innerHTML = ICONS.grip;
//   dragHandle.style.cursor = 'grab';
//   dragHandle.style.marginRight = '8px';
//   dragHandle.style.display = 'inline-flex';
//   dragHandle.style.alignItems = 'center';

//   const songNumber = document.createElement('div');
//   songNumber.className = 'set-song-item__number';
//   songNumber.textContent = `${songInSet.order}.`;

//   const songTitle = document.createElement('div');
//   songTitle.className = 'set-song-item__title';
//   songTitle.textContent = song.title;

//   songInfo.append(dragHandle, songNumber, songTitle);

//   const songActions = document.createElement('div');
//   songActions.className = 'set-song-item__actions';

//   const removeBtn = document.createElement('button');
//   removeBtn.className = 'set-song-item__btn';
//   removeBtn.innerHTML = ICONS.delete;
//   removeBtn.title = 'Удалить из сета';
//   removeBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     removeSongFromSet(setId, songInSet.songId);
//   });
//   songActions.appendChild(removeBtn);

//   songItem.append(songInfo, songActions);
  
//   songItem.addEventListener('dragstart', handleDragStart);
//   songItem.addEventListener('dragend', handleDragEnd);
//   songItem.addEventListener('dragover', handleDragOver);
//   songItem.addEventListener('drop', handleDrop);
  
//   return songItem;
// }

// // Переменные для drag-and-drop
// let dragSourceItem = null;
// let dragSourceSetId = null;

// function handleDragStart(e) {
//   dragSourceItem = this;
//   dragSourceSetId = this.closest('.set-songs-list').getAttribute('data-set-id');
//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/plain', '');
//   this.style.opacity = '0.5';
// }

// function handleDragEnd(e) {
//   if (dragSourceItem) {
//     dragSourceItem.style.opacity = '';
//   }
//   dragSourceItem = null;
//   dragSourceSetId = null;
  
//   document.querySelectorAll('.set-song-item').forEach(item => {
//     item.classList.remove('drag-over');
//   });
// }

// function handleDragOver(e) {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = 'move';
  
//   document.querySelectorAll('.set-song-item').forEach(item => {
//     item.classList.remove('drag-over');
//   });
//   this.classList.add('drag-over');
// }

// function handleDrop(e) {
//   e.preventDefault();
//   e.stopPropagation();
  
//   this.classList.remove('drag-over');
  
//   if (!dragSourceItem || dragSourceItem === this) return;
  
//   const targetItem = this;
//   const sourceSetId = dragSourceSetId;
//   const targetSetId = targetItem.closest('.set-songs-list').getAttribute('data-set-id');
  
//   const sourceSongId = parseInt(dragSourceItem.getAttribute('data-song-id'));
//   const targetSongId = parseInt(targetItem.getAttribute('data-song-id'));
  
//   if (isNaN(sourceSongId) || isNaN(targetSongId)) return;
  
//   if (sourceSetId === targetSetId) {
//     reorderSongsInSet(parseInt(sourceSetId), sourceSongId, targetSongId);
//   }
// }

// // Переупорядочивание песен в сете
// function reorderSongsInSet(setId, sourceSongId, targetSongId) {
//   if (!currentSpeechId) return;
  
//   const speech = speeches.find(s => s.id === currentSpeechId);
//   if (!speech) return;
  
//   const set = speech.sets.find(s => s.id === setId);
//   if (!set || !set.songs) return;
  
//   const sourceIndex = set.songs.findIndex(s => s.songId === sourceSongId);
//   const targetIndex = set.songs.findIndex(s => s.songId === targetSongId);
  
//   if (sourceIndex === -1 || targetIndex === -1) return;
  
//   const [movedSong] = set.songs.splice(sourceIndex, 1);
//   set.songs.splice(targetIndex, 0, movedSong);
  
//   set.songs.forEach((song, idx) => {
//     song.order = idx + 1;
//   });
  
//   saveToLocalStorage();
//   renderSets(speech.sets);
  
//   if (currentSetId === setId) {
//     renderSetSongs(set);
//   }
  
//   showSuccessMessage('Порядок песен изменён');
// }

// function setupDragAndDrop(container, setId) {
//   container.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   });
// }

// // Добавление сета в текущее выступление
// function addNewSet() {
//   if (!currentSpeechId) return;
//   addNewSetToSpeech(currentSpeechId);
// }

// // Добавление сета в конкретное выступление
// function addNewSetToSpeech(speechId) {
//   const speech = speeches.find(s => s.id === speechId);
//   if (!speech) return;

//   const newSet = {
//     id: Date.now(),
//     title: `Сет ${speech.sets.length + 1}`,
//     songs: []
//   };

//   speech.sets.push(newSet);
//   saveToLocalStorage();
  
//   if (currentSpeechId === speechId) {
//     renderSets(speech.sets);
//   }
//   renderSpeeches();
// }

// // Открытие модалки редактирования сета
// function openSetModal(setId) {
//   if (!currentSpeechId) return;
  
//   const speech = speeches.find(s => s.id === currentSpeechId);
//   if (!speech) return;

//   const set = speech.sets.find(s => s.id === setId);
//   if (!set) return;

//   currentSetId = setId;
//   elements.setNameInput.value = set.title;
//   elements.setModal.classList.add('modal--active');
  
//   renderSetSongs(set);
// }

// // Сохранение изменений сета
// function saveSetChanges() {
//   if (!currentSpeechId || !currentSetId) return;
  
//   const speech = speeches.find(s => s.id === currentSpeechId);
//   if (!speech) return;

//   const set = speech.sets.find(s => s.id === currentSetId);
//   if (!set) return;

//   const newTitle = elements.setNameInput.value.trim();
//   if (newTitle && newTitle !== set.title) {
//     set.title = newTitle;
//     saveToLocalStorage();
//     renderSets(speech.sets);
//     renderSpeeches();
//   }

//   closeSetModal();
// }

// // Закрытие модалки сета
// function closeSetModal() {
//   elements.setModal.classList.remove('modal--active');
//   currentSetId = null;
// }

// // Удаление сета
// function deleteSet(setId) {
//   if (!currentSpeechId) return;
  
//   const speech = speeches.find(s => s.id === currentSpeechId);
//   if (!speech) return;

//   speech.sets = speech.sets.filter(s => s.id !== setId);
//   saveToLocalStorage();
  
//   renderSets(speech.sets);
//   renderSpeeches();
// }

// // Редактирование названия выступления
// function startRenamingSpeech(speechId) {
//   const speech = speeches.find(s => s.id === speechId);
//   if (!speech) return;

//   const menuItem = document.querySelector(`.menu__item[data-id="${speechId}"]`);
//   const titleSpan = menuItem.querySelector('.menu__item-title');
//   const currentTitle = titleSpan.textContent;

//   const input = document.createElement('input');
//   input.className = 'menu__item-input';
//   input.value = currentTitle;
  
//   menuItem.classList.add('editing');
//   titleSpan.replaceWith(input);
//   input.focus();

//   const saveTitle = () => {
//     const newTitle = input.value.trim();
//     if (newTitle && newTitle !== currentTitle) {
//       speech.title = newTitle;
//       saveToLocalStorage();
//     }
//     menuItem.classList.remove('editing');
//     renderSpeeches();
//     if (currentSpeechId === speechId) {
//       elements.workspaceTitle.textContent = newTitle;
//     }
//   };

//   input.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') saveTitle();
//     if (e.key === 'Escape') {
//       menuItem.classList.remove('editing');
//       renderSpeeches();
//     }
//   });

//   input.addEventListener('blur', saveTitle);
// }

// // Удаление выступления
// function deleteSpeech(speechId) {
//   speeches = speeches.filter(s => s.id !== speechId);
//   saveToLocalStorage();
  
//   if (currentSpeechId === speechId) {
//     currentSpeechId = null;
//     showEmptyWorkspace();
//   }
  
//   renderSpeeches();
// }

// // Функции для управления песнями

// function openSongsModal() {
//   elements.songsModal.classList.add('modal--active');
//   renderSongs();
// }

// function closeSongsModal() {
//   elements.songsModal.classList.remove('modal--active');
// }

// function renderSongs() {
//   elements.songsList.innerHTML = '';
  
//   if (songs.length === 0) {
//     elements.songsList.innerHTML = '<div class="empty-msg">Песен пока нет</div>';
//     return;
//   }

//   songs.forEach(song => {
//     const songItem = document.createElement('div');
//     songItem.className = 'song-item';
//     songItem.dataset.id = song.id;

//     const info = document.createElement('div');
//     info.className = 'song-item__info';

//     const title = document.createElement('div');
//     title.className = 'song-item__title';
//     title.textContent = song.title;

//     if (song.text) {
//       const textPreview = document.createElement('div');
//       textPreview.className = 'song-item__text-preview';
//       const preview = song.text.length > 100 ? song.text.substring(0, 100) + '...' : song.text;
//       textPreview.textContent = preview;
//       info.append(title, textPreview);
//     } else {
//       info.appendChild(title);
//     }

//     const actions = document.createElement('div');
//     actions.className = 'song-item__actions';

//     const editBtn = document.createElement('button');
//     editBtn.className = 'song-item__btn';
//     editBtn.innerHTML = ICONS.edit;
//     editBtn.title = 'Редактировать';
//     editBtn.addEventListener('click', () => openSongEditModal(song.id));

//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'song-item__btn';
//     deleteBtn.innerHTML = ICONS.delete;
//     deleteBtn.title = 'Удалить';
//     deleteBtn.addEventListener('click', () => deleteSong(song.id));

//     actions.append(editBtn, deleteBtn);
//     songItem.append(info, actions);
//     elements.songsList.appendChild(songItem);
//   });
// }

// function openSongEditModal(songId = null) {
//   currentSongId = songId;
  
//   if (songId) {
//     const song = songs.find(s => s.id === songId);
//     if (song) {
//       elements.songEditTitle.textContent = 'Редактировать песню';
//       elements.songTitleInput.value = song.title || '';
//       elements.songTextInput.value = song.text || '';
//     }
//   } else {
//     elements.songEditTitle.textContent = 'Добавить песню';
//     elements.songTitleInput.value = '';
//     elements.songTextInput.value = '';
//   }
  
//   elements.songEditModal.classList.add('modal--active');
// }

// function closeSongEditModal() {
//   elements.songEditModal.classList.remove('modal--active');
//   currentSongId = null;
// }

// function saveSongChanges() {
//   const title = elements.songTitleInput.value.trim();
//   const text = elements.songTextInput.value.trim();

//   if (!title) {
//     showErrorModal('Введите название песни');
//     return;
//   }

//   if (currentSongId) {
//     const song = songs.find(s => s.id === currentSongId);
//     if (song) {
//       song.title = title;
//       song.text = text;
//     }
//   } else {
//     const newSong = {
//       id: Date.now(),
//       title,
//       text
//     };
//     songs.push(newSong);
//   }

//   saveToLocalStorage();
//   renderSongs();
//   closeSongEditModal();
// }

// function deleteSong(songId) {
//   showConfirmModal('Вы уверены, что хотите удалить эту песню?', () => {
//     songs = songs.filter(s => s.id !== songId);
//     saveToLocalStorage();
//     renderSongs();
//   });
// }

// // Функции для работы с модальными окнами

// function showErrorModal(message) {
//   elements.errorMessage.textContent = message;
//   elements.errorModal.classList.add('modal--active');
// }

// function closeErrorModal() {
//   elements.errorModal.classList.remove('modal--active');
// }

// function showConfirmModal(message, callback) {
//   elements.confirmMessage.textContent = message;
//   window.confirmCallback = callback;
//   elements.confirmModal.classList.add('modal--active');
// }

// function closeConfirmModal() {
//   elements.confirmModal.classList.remove('modal--active');
//   window.confirmCallback = null;
// }

// // Отображение песен в модальном окне сета с drag-and-drop
// function renderSetSongs(set) {
//   elements.setSongsList.innerHTML = '';
  
//   if (!set.songs || set.songs.length === 0) {
//     elements.setSongsList.innerHTML = '<div class="empty-msg">В сете пока нет песен</div>';
//     return;
//   }

//   const sortedSongs = [...set.songs].sort((a, b) => a.order - b.order);
  
//   sortedSongs.forEach((songInSet, index) => {
//     const song = songs.find(s => s.id === songInSet.songId);
//     if (song) {
//       const songItem = createDraggableSongModalItem(set.id, songInSet, song, index, sortedSongs.length);
//       elements.setSongsList.appendChild(songItem);
//     }
//   });
  
//   setupModalDragAndDrop(elements.setSongsList, set.id);
// }

// function createDraggableSongModalItem(setId, songInSet, song, index, totalCount) {
//   const songItem = document.createElement('div');
//   songItem.className = 'set-song-modal-item';
//   songItem.setAttribute('data-song-id', songInSet.songId);
//   songItem.setAttribute('data-order', songInSet.order);
//   songItem.setAttribute('draggable', 'true');
  
//   songItem.style.cursor = 'grab';
//   songItem.style.userSelect = 'none';

//   const songInfo = document.createElement('div');
//   songInfo.className = 'set-song-modal-item__info';

//   const dragHandle = document.createElement('div');
//   dragHandle.className = 'set-song-modal-item__drag-handle';
//   dragHandle.innerHTML = ICONS.grip;
//   dragHandle.style.cursor = 'grab';
//   dragHandle.style.marginRight = '8px';
//   dragHandle.style.display = 'inline-flex';
//   dragHandle.style.alignItems = 'center';

//   const songNumber = document.createElement('div');
//   songNumber.className = 'set-song-modal-item__number';
//   songNumber.textContent = `${songInSet.order}.`;

//   const songTitle = document.createElement('div');
//   songTitle.className = 'set-song-modal-item__title';
//   songTitle.textContent = song.title;

//   songInfo.append(dragHandle, songNumber, songTitle);

//   const songActions = document.createElement('div');
//   songActions.className = 'set-song-modal-item__actions';

//   const removeBtn = document.createElement('button');
//   removeBtn.className = 'set-song-modal-item__btn set-song-modal-item__btn--remove';
//   removeBtn.innerHTML = ICONS.delete;
//   removeBtn.title = 'Удалить из сета';
//   removeBtn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     removeSongFromSetModal(setId, songInSet.songId);
//   });
//   songActions.appendChild(removeBtn);

//   songItem.append(songInfo, songActions);
  
//   songItem.addEventListener('dragstart', handleModalDragStart);
//   songItem.addEventListener('dragend', handleModalDragEnd);
//   songItem.addEventListener('dragover', handleModalDragOver);
//   songItem.addEventListener('drop', handleModalDrop);
  
//   return songItem;
// }

// // Переменные для drag-and-drop в модальном окне
// let modalDragSourceItem = null;
// let modalDragSourceSetId = null;

// function handleModalDragStart(e) {
//   modalDragSourceItem = this;
//   modalDragSourceSetId = currentSetId;
//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/plain', '');
//   this.style.opacity = '0.5';
// }

// function handleModalDragEnd(e) {
//   if (modalDragSourceItem) {
//     modalDragSourceItem.style.opacity = '';
//   }
//   modalDragSourceItem = null;
//   modalDragSourceSetId = null;
  
//   document.querySelectorAll('.set-song-modal-item').forEach(item => {
//     item.classList.remove('drag-over');
//   });
// }

// function handleModalDragOver(e) {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = 'move';
  
//   document.querySelectorAll('.set-song-modal-item').forEach(item => {
//     item.classList.remove('drag-over');
//   });
//   this.classList.add('drag-over');
// }

// function handleModalDrop(e) {
//   e.preventDefault();
//   e.stopPropagation();
  
//   this.classList.remove('drag-over');
  
//   if (!modalDragSourceItem || modalDragSourceItem === this) return;
  
//   const sourceSongId = parseInt(modalDragSourceItem.getAttribute('data-song-id'));
//   const targetSongId = parseInt(this.getAttribute('data-song-id'));
  
//   if (isNaN(sourceSongId) || isNaN(targetSongId)) return;
  
//   reorderSongsInSet(currentSetId, sourceSongId, targetSongId);
// }

// function setupModalDragAndDrop(container, setId) {
//   container.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'move';
//   });
// }

// // Функции для добавления песен в сеты

// function openAddSongToSetModal(setId) {
//   currentSetForAddingSong = setId;
//   elements.addSongToSetModal.classList.add('modal--active');
//   renderSongsSelector();
// }

// function closeAddSongToSetModal() {
//   elements.addSongToSetModal.classList.remove('modal--active');
//   currentSetForAddingSong = null;
//   elements.songSearchInput.value = '';
// }

// function renderSongsSelector() {
//   elements.songsSelectorList.innerHTML = '';
  
//   if (songs.length === 0) {
//     elements.songsSelectorList.innerHTML = '<div class="empty-msg">Песен пока нет</div>';
//     return;
//   }

//   const speech = speeches.find(s => s.id === currentSpeechId);
//   const set = speech?.sets.find(s => s.id === currentSetForAddingSong);
//   const existingSongIds = set?.songs?.map(s => s.songId) || [];

//   songs.forEach(song => {
//     const isAlreadyInSet = existingSongIds.includes(song.id);
    
//     const songItem = document.createElement('div');
//     songItem.className = 'song-selector-item';
//     songItem.dataset.songId = song.id;

//     const info = document.createElement('div');
//     info.className = 'song-selector-item__info';

//     const title = document.createElement('div');
//     title.className = 'song-selector-item__title';
//     title.textContent = song.title;

//     if (song.text) {
//       const textPreview = document.createElement('div');
//       textPreview.className = 'song-selector-item__text-preview';
//       const preview = song.text.length > 100 ? song.text.substring(0, 100) + '...' : song.text;
//       textPreview.textContent = preview;
//       info.append(title, textPreview);
//     } else {
//       info.appendChild(title);
//     }

//     const addBtn = document.createElement('button');
//     addBtn.className = 'song-selector-item__add-btn';
//     addBtn.textContent = isAlreadyInSet ? 'Уже в сете' : 'Добавить';
//     addBtn.disabled = isAlreadyInSet;
    
//     if (!isAlreadyInSet) {
//       addBtn.addEventListener('click', () => addSongToSet(song.id));
//     }

//     songItem.append(info, addBtn);
//     elements.songsSelectorList.appendChild(songItem);
//   });
// }

// function filterSongsInSelector() {
//   const searchTerm = elements.songSearchInput.value.toLowerCase();
//   const songItems = elements.songsSelectorList.querySelectorAll('.song-selector-item');
  
//   songItems.forEach(item => {
//     const title = item.querySelector('.song-selector-item__title').textContent.toLowerCase();
//     const textPreview = item.querySelector('.song-selector-item__text-preview')?.textContent.toLowerCase() || '';
    
//     if (title.includes(searchTerm) || textPreview.includes(searchTerm)) {
//       item.style.display = 'flex';
//     } else {
//       item.style.display = 'none';
//     }
//   });
// }

// function addSongToSet(songId) {
//   if (!currentSpeechId || !currentSetForAddingSong) return;
  
//   const speech = speeches.find(s => s.id === currentSpeechId);
//   if (!speech) return;

//   const set = speech.sets.find(s => s.id === currentSetForAddingSong);
//   if (!set) return;

//   if (!set.songs) {
//     set.songs = [];
//   }

//   const newSongInSet = {
//     songId: songId,
//     order: set.songs.length + 1
//   };

//   set.songs.push(newSongInSet);
//   saveToLocalStorage();
  
//   renderSongsSelector();
//   renderSets(speech.sets);
  
//   if (currentSetId === currentSetForAddingSong) {
//     renderSetSongs(set);
//   }
  
//   showSuccessMessage('Песня добавлена в сет');
// }

// function showSuccessMessage(message) {
//   const successDiv = document.createElement('div');
//   successDiv.style.cssText = `
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     background: #4CAF50;
//     color: white;
//     padding: 12px 20px;
//     border-radius: 6px;
//     z-index: 2000;
//     font-size: 14px;
//   `;
//   successDiv.textContent = message;
//   document.body.appendChild(successDiv);
  
//   setTimeout(() => {
//     document.body.removeChild(successDiv);
//   }, 3000);
// }

// // Функции для управления песнями в сетах

// function removeSongFromSet(setId, songId) {
//   showConfirmModal('Удалить эту песню из сета?', () => {
//     if (!currentSpeechId) return;
    
//     const speech = speeches.find(s => s.id === currentSpeechId);
//     if (!speech) return;

//     const set = speech.sets.find(s => s.id === setId);
//     if (!set || !set.songs) return;

//     set.songs = set.songs.filter(s => s.songId !== songId);
    
//     set.songs.forEach((song, index) => {
//       song.order = index + 1;
//     });

//     saveToLocalStorage();
//     renderSets(speech.sets);
//     renderSongsSelector();
    
//     showSuccessMessage('Песня удалена из сета');
//   });
// }

// function removeSongFromSetModal(setId, songId) {
//   showConfirmModal('Удалить эту песню из сета?', () => {
//     if (!currentSpeechId) return;
    
//     const speech = speeches.find(s => s.id === currentSpeechId);
//     if (!speech) return;

//     const set = speech.sets.find(s => s.id === setId);
//     if (!set || !set.songs) return;

//     set.songs = set.songs.filter(s => s.songId !== songId);
    
//     set.songs.forEach((song, index) => {
//       song.order = index + 1;
//     });

//     saveToLocalStorage();
//     renderSets(speech.sets);
//     renderSongsSelector();
//     renderSetSongs(set);
    
//     showSuccessMessage('Песня удалена из сета');
//   });
// }

// // Функции режима выступления

// function startPerformance(setId) {
//   if (!currentSpeechId) return;
  
//   const speech = speeches.find(s => s.id === currentSpeechId);
//   if (!speech) return;

//   const set = speech.sets.find(s => s.id === setId);
//   if (!set || !set.songs || set.songs.length === 0) {
//     showErrorModal('В сете нет песен для выступления');
//     return;
//   }

//   currentPerformanceSet = set;
//   currentSongIndex = 0;
  
//   elements.performanceTitle.textContent = `${speech.title} - ${set.title}`;
//   elements.performanceModal.classList.add('modal--active');
  
//   // Применяем сохранённый размер шрифта
//   applyFontSize();
  
//   showCurrentSong();
// }

// function closePerformance() {
//   elements.performanceModal.classList.remove('modal--active');
//   currentPerformanceSet = null;
//   currentSongIndex = 0;
//   // Сохраняем размер шрифта
//   saveToLocalStorage();
// }

// function showCurrentSong() {
//   if (!currentPerformanceSet || !currentPerformanceSet.songs) return;
  
//   const sortedSongs = [...currentPerformanceSet.songs].sort((a, b) => a.order - b.order);
//   const currentSongInSet = sortedSongs[currentSongIndex];
  
//   if (!currentSongInSet) return;
  
//   const song = songs.find(s => s.id === currentSongInSet.songId);
//   if (!song) return;
  
//   elements.currentSongTitle.textContent = song.title;
//   elements.currentSongNumber.textContent = `${currentSongInSet.order}.`;
  
//   const songText = song.text || 'Текст песни не добавлен';
//   elements.currentSongText.textContent = songText;
  
//   elements.performanceProgress.textContent = `Песня ${currentSongIndex + 1} из ${sortedSongs.length}`;
  
//   elements.prevSongBtn.disabled = currentSongIndex === 0;
//   elements.nextSongBtn.disabled = currentSongIndex === sortedSongs.length - 1;
  
//   elements.prevSongBtn.style.opacity = currentSongIndex === 0 ? '0.3' : '1';
//   elements.nextSongBtn.style.opacity = currentSongIndex === sortedSongs.length - 1 ? '0.3' : '1';
  
//   // Применяем размер шрифта при смене песни
//   applyFontSize();
// }

// function navigateSong(direction) {
//   if (!currentPerformanceSet || !currentPerformanceSet.songs) return;
  
//   const sortedSongs = [...currentPerformanceSet.songs].sort((a, b) => a.order - b.order);
  
//   if (direction === 'prev' && currentSongIndex > 0) {
//     currentSongIndex--;
//     showCurrentSong();
//   } else if (direction === 'next' && currentSongIndex < sortedSongs.length - 1) {
//     currentSongIndex++;
//     showCurrentSong();
//   } else if (direction === 'next' && currentSongIndex === sortedSongs.length - 1) {
//     showConfirmModal('Выступление завершено! Закрыть режим выступления?', () => {
//       closePerformance();
//     });
//   }
// }

// // Запускаем приложение
// init();