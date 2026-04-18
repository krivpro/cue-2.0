// Структура данных:
// speeches = [
//   {
//     id: Number,
//     title: String,
//     description: String,
//     sets: [
//       {
//         id: Number,
//         title: String,
//         songs: [
//           {
//             songId: Number, // ID песни из общего списка
//             order: Number   // Порядок в сете
//           }
//         ]
//       }
//     ]
//   }
// ]
// songs = [
//   {
//     id: Number,
//     title: String,
//     text: String
//   }
// ]

let speeches = []; // Все выступления
let songs = []; // Все песни
let currentSpeechId = null; // Текущее выбранное выступление
let currentSetId = null; // Текущий редактируемый сет
let currentSongId = null; // Текущая редактируемая песня
let currentSetForAddingSong = null; // Текущий сет для добавления песни
let currentPerformanceSet = null; // Текущий сет в режиме выступления
let currentSongIndex = 0; // Индекс текущей песни в выступлении

const ICONS = {
  add: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 12L17 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  edit: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1369 3.46967C14.9963 3.32902 14.8055 3.25 14.6066 3.25C14.4077 3.25 14.2169 3.32902 14.0763 3.46967L4.88388 12.6621C4.78965 12.7563 4.72223 12.8739 4.68856 13.0028L3.68856 16.8313C3.62127 17.0889 3.69561 17.3629 3.88388 17.5511C4.07215 17.7394 4.34614 17.8138 4.60375 17.7465L8.43218 16.7465C8.56111 16.7128 8.67874 16.6454 8.77297 16.5511L17.9654 7.35876C18.2582 7.06586 18.2582 6.59099 17.9654 6.2981L15.1369 3.46967ZM6.08843 13.5788L14.6066 5.06066L16.3744 6.82843L7.8562 15.3466L5.46344 15.9716L6.08843 13.5788Z" fill="currentColor"/><path d="M4 19.25C3.58579 19.25 3.25 19.5858 3.25 20C3.25 20.4142 3.58579 20.75 4 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H4Z" fill="currentColor"/></svg>`,
  delete: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z" fill="currentColor"/><path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z" fill="currentColor"/><path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z" fill="currentColor"/></svg>`,
  play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2661 10.4837C20.258 11.2512 20.258 12.7487 19.2661 13.5162C16.2685 15.8356 12.9213 17.6637 9.34979 18.9322L8.69731 19.1639C7.44904 19.6073 6.13053 18.7627 5.96154 17.4742C5.48938 13.8739 5.48938 10.126 5.96154 6.52574C6.13053 5.23719 7.44904 4.39263 8.69732 4.83597L9.34979 5.06771C12.9213 6.33619 16.2685 8.16434 19.2661 10.4837ZM18.3481 12.3298C18.5639 12.1628 18.5639 11.837 18.3481 11.6701C15.4763 9.44796 12.2695 7.69648 8.84777 6.4812L8.19529 6.24947C7.87034 6.13406 7.49691 6.35401 7.44881 6.72079C6.99363 10.1915 6.99363 13.8084 7.4488 17.2791C7.49691 17.6459 7.87034 17.8658 8.19529 17.7504L8.84777 17.5187C12.2695 16.3034 15.4763 14.5519 18.3481 12.3298Z" fill="currentColor"/></svg>`,
  up: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303C16.2374 10.8232 15.7626 10.8232 15.4697 10.5303L12.75 7.81066L12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5L11.25 7.81066L8.53033 10.5303Z" fill="currentColor"/></svg>`,
  down: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 16.1893L15.4697 13.4697C15.7626 13.1768 16.2374 13.1768 16.5303 13.4697C16.8232 13.7626 16.8232 14.2374 16.5303 14.5303L12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L7.46967 14.5303C7.17678 14.2374 7.17678 13.7626 7.46967 13.4697C7.76256 13.1768 8.23744 13.1768 8.53033 13.4697L11.25 16.1893L11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5L12.75 16.1893Z" fill="currentColor"/></svg>`
};

function getPreparedPresetSongs() {
  const presetSongs = Array.isArray(window.PRESET_SONGS) ? window.PRESET_SONGS : [];

  return presetSongs.map((song, index) => ({
    id: index + 1,
    title: (song.title || '').trim(),
    text: (song.text || '').trim()
  })).filter(song => song.title);
}

function mergePresetSongs(existingSongs) {
  const preparedPresetSongs = getPreparedPresetSongs();
  const mergedSongs = Array.isArray(existingSongs) ? [...existingSongs] : [];

  preparedPresetSongs.forEach((presetSong) => {
    const hasSong = mergedSongs.some(
      (song) => song.title === presetSong.title && (song.text || '') === (presetSong.text || '')
    );

    if (!hasSong) {
      mergedSongs.push(presetSong);
    }
  });

  return mergedSongs;
}

// Получаем элементы DOM
const elements = {
  burger: document.querySelector('.header__burger'),
  menu: document.querySelector('.menu'),
  menuList: document.querySelector('.menu__list'),
  newSpeechBtn: document.getElementById('newSpeechBtn'),
  speechEditor: document.getElementById('speechEditor'),
  workspaceTitle: document.querySelector('.workspace__title'),
  addSetBtn: document.getElementById('addSetBtn'),
  setsContainer: document.getElementById('setsContainer'),
  setModal: document.getElementById('setModal'),
  setNameInput: document.getElementById('setNameInput'),
  closeSetBtn: document.getElementById('closeSetBtn'),
  cancelSetBtn: document.getElementById('cancelSetBtn'),
  saveSetBtn: document.getElementById('saveSetBtn'),
  addSongToSetBtn: document.getElementById('addSongToSetBtn'),
  setSongsList: document.getElementById('setSongsList'),
  // Элементы режима выступления
  performanceModal: document.getElementById('performanceModal'),
  performanceTitle: document.getElementById('performanceTitle'),
  performanceProgress: document.getElementById('performanceProgress'),
  prevSongBtn: document.getElementById('prevSongBtn'),
  nextSongBtn: document.getElementById('nextSongBtn'),
  closePerformanceBtn: document.getElementById('closePerformanceBtn'),
  currentSongTitle: document.getElementById('currentSongTitle'),
  currentSongNumber: document.getElementById('currentSongNumber'),
  currentSongText: document.getElementById('currentSongText'),
  // Элементы для песен
  songsBtn: document.getElementById('songsBtn'),
  songsModal: document.getElementById('songsModal'),
  closeSongsBtn: document.getElementById('closeSongsBtn'),
  addSongBtn: document.getElementById('addSongBtn'),
  songsList: document.getElementById('songsList'),
  songEditModal: document.getElementById('songEditModal'),
  songEditTitle: document.getElementById('songEditTitle'),
  songTitleInput: document.getElementById('songTitleInput'),
  songTextInput: document.getElementById('songTextInput'),
  cancelSongBtn: document.getElementById('cancelSongBtn'),
  saveSongBtn: document.getElementById('saveSongBtn'),
  // Элементы для модальных окон
  errorModal: document.getElementById('errorModal'),
  errorMessage: document.getElementById('errorMessage'),
  errorOkBtn: document.getElementById('errorOkBtn'),
  confirmModal: document.getElementById('confirmModal'),
  confirmMessage: document.getElementById('confirmMessage'),
  confirmCancelBtn: document.getElementById('confirmCancelBtn'),
  confirmOkBtn: document.getElementById('confirmOkBtn'),
  // Элементы для добавления песен в сет
  addSongToSetModal: document.getElementById('addSongToSetModal'),
  closeAddSongToSetBtn: document.getElementById('closeAddSongToSetBtn'),
  songSearchInput: document.getElementById('songSearchInput'),
  songsSelectorList: document.getElementById('songsSelectorList')
};



// Инициализация приложения
function init() {
  loadFromLocalStorage();
  setupEventListeners();
  renderSpeeches();
}

// Загрузка данных из localStorage
function loadFromLocalStorage() {
  const savedSpeeches = localStorage.getItem('speeches');
  if (savedSpeeches) {
    speeches = JSON.parse(savedSpeeches);
  }
  
  const savedSongs = localStorage.getItem('songs');
  if (savedSongs) {
    songs = mergePresetSongs(JSON.parse(savedSongs));
  } else {
    songs = getPreparedPresetSongs();
  }
}

// Сохранение данных в localStorage
function saveToLocalStorage() {
  localStorage.setItem('speeches', JSON.stringify(speeches));
  localStorage.setItem('songs', JSON.stringify(songs));
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Бургер-меню для мобильных
  elements.burger?.addEventListener('click', () => {
    elements.menu.classList.toggle('menu--open');
  });

  // Создание нового выступления
  elements.newSpeechBtn.addEventListener('click', createNewSpeech);

  // Добавление нового сета
  elements.addSetBtn.addEventListener('click', addNewSet);

  // Модальное окно сета
  elements.closeSetBtn.addEventListener('click', closeSetModal);
  elements.cancelSetBtn.addEventListener('click', closeSetModal);
  elements.saveSetBtn.addEventListener('click', saveSetChanges);
  elements.addSongToSetBtn.addEventListener('click', () => openAddSongToSetModal(currentSetId));
  elements.setModal.addEventListener('click', (e) => {
    if (e.target === elements.setModal) closeSetModal();
  });

  // Обработчики для песен
  elements.songsBtn.addEventListener('click', openSongsModal);
  elements.closeSongsBtn.addEventListener('click', closeSongsModal);
  elements.addSongBtn.addEventListener('click', () => openSongEditModal());
  elements.cancelSongBtn.addEventListener('click', closeSongEditModal);
  elements.saveSongBtn.addEventListener('click', saveSongChanges);
  

  
  // Закрытие модальных окон по клику вне их
  elements.songsModal.addEventListener('click', (e) => {
    if (e.target === elements.songsModal) closeSongsModal();
  });
  elements.songEditModal.addEventListener('click', (e) => {
    if (e.target === elements.songEditModal) closeSongEditModal();
  });
  
  // Обработчики для модальных окон ошибок и подтверждений
  elements.errorOkBtn.addEventListener('click', closeErrorModal);
  elements.confirmCancelBtn.addEventListener('click', closeConfirmModal);
  elements.confirmOkBtn.addEventListener('click', () => {
    if (window.confirmCallback) {
      window.confirmCallback();
      window.confirmCallback = null;
    }
    closeConfirmModal();
  });
  
  elements.errorModal.addEventListener('click', (e) => {
    if (e.target === elements.errorModal) closeErrorModal();
  });
  elements.confirmModal.addEventListener('click', (e) => {
    if (e.target === elements.confirmModal) closeConfirmModal();
  });
  
  // Обработчики для добавления песен в сет
  elements.closeAddSongToSetBtn.addEventListener('click', closeAddSongToSetModal);
  elements.addSongToSetModal.addEventListener('click', (e) => {
    if (e.target === elements.addSongToSetModal) closeAddSongToSetModal();
  });
  elements.songSearchInput.addEventListener('input', filterSongsInSelector);
  
  // Обработчики для режима выступления
  elements.closePerformanceBtn.addEventListener('click', closePerformance);
  elements.prevSongBtn.addEventListener('click', () => navigateSong('prev'));
  elements.nextSongBtn.addEventListener('click', () => navigateSong('next'));
  
  // Горячие клавиши для навигации
  document.addEventListener('keydown', (e) => {
    if (currentPerformanceSet) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateSong('prev');
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        navigateSong('next');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePerformance();
      }
    }
  });
}

// Создание нового выступления
function createNewSpeech() {
  const newSpeech = {
    id: Date.now(), // Используем timestamp как ID
    title: `Выступление ${speeches.length + 1}`,
    description: '',
    sets: []
  };
  
  speeches.push(newSpeech);
  saveToLocalStorage();
  renderSpeeches();
  selectSpeech(newSpeech.id); // Автоматически выбираем новое выступление
}

// Отрисовка списка выступлений
function renderSpeeches() {
  elements.menuList.innerHTML = '';
  
  if (speeches.length === 0) {
    elements.menuList.innerHTML = '<div class="empty-msg">Нет выступлений</div>';
    showEmptyWorkspace();
    return;
  }

  speeches.forEach(speech => {
    const item = document.createElement('li');
    item.className = 'menu__item';
    if (speech.id === currentSpeechId) {
      item.classList.add('menu__item--active');
    }
    item.dataset.id = speech.id;

    const container = document.createElement('div');
    container.className = 'menu__item-container';

    // Название выступления
    const title = document.createElement('span');
    title.className = 'menu__item-title';
    title.textContent = speech.title;
    title.addEventListener('click', () => selectSpeech(speech.id));

    // Кнопки управления
    const actions = document.createElement('div');
    actions.className = 'menu__item-actions';

    // Кнопка добавления сета
    const addSetBtn = document.createElement('button');
    addSetBtn.className = 'menu-icon-btn';
    addSetBtn.innerHTML = ICONS.add;
    addSetBtn.title = 'Добавить сет';
    addSetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addNewSetToSpeech(speech.id);
    });

    // Кнопка редактирования
    const editBtn = document.createElement('button');
    editBtn.className = 'menu-icon-btn';
    editBtn.innerHTML = ICONS.edit;
    editBtn.title = 'Редактировать';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startRenamingSpeech(speech.id);
    });

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'menu-icon-btn';
    deleteBtn.innerHTML = ICONS.delete;
    deleteBtn.title = 'Удалить';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteSpeech(speech.id);
    });

    actions.append(addSetBtn, editBtn, deleteBtn);
    container.append(title, actions);
    
    // Счетчик сетов
    const counter = document.createElement('div');
    counter.className = 'menu__item-counter';
    counter.textContent = `Сетов: ${speech.sets.length}`;

    item.append(container, counter);
    elements.menuList.appendChild(item);
  });
}

// Показываем пустую рабочую область
function showEmptyWorkspace() {
  elements.workspaceTitle.textContent = 'Выберите выступление';
  elements.speechEditor.value = '';
  elements.addSetBtn.classList.add('hidden');
  elements.setsContainer.innerHTML = '';
}

// Выбор выступления для просмотра/редактирования
function selectSpeech(speechId) {
  currentSpeechId = speechId;
  const speech = speeches.find(s => s.id === speechId);
  
  if (speech) {
    elements.workspaceTitle.textContent = speech.title;
    elements.speechEditor.value = speech.description;
    elements.addSetBtn.classList.remove('hidden');
    renderSets(speech.sets);
  }
  
  renderSpeeches(); // Обновляем список, чтобы подсветить активное
}

// Отрисовка списка сетов
function renderSets(sets) {
  elements.setsContainer.innerHTML = '';
  
  if (sets.length === 0) {
    elements.setsContainer.innerHTML = '<div class="empty-msg">Сетов пока нет</div>';
    return;
  }

  sets.forEach(set => {
    const setItem = document.createElement('div');
    setItem.className = 'set-item';
    setItem.dataset.id = set.id;

    const setHeader = document.createElement('div');
    setHeader.className = 'set-item__header';

    const title = document.createElement('div');
    title.className = 'set-item__title';
    title.textContent = set.title;

    const actions = document.createElement('div');
    actions.className = 'set-item__actions';

    // Кнопка выступления
    const performBtn = document.createElement('button');
    performBtn.className = 'set-item__btn set-item__btn--perform';
    performBtn.innerHTML = ICONS.play;
    performBtn.title = 'Выступить';
    performBtn.addEventListener('click', () => startPerformance(set.id));

    // Кнопка редактирования
    const editBtn = document.createElement('button');
    editBtn.className = 'set-item__btn';
    editBtn.innerHTML = ICONS.edit;
    editBtn.addEventListener('click', () => openSetModal(set.id));

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'set-item__btn';
    deleteBtn.innerHTML = ICONS.delete;
    deleteBtn.addEventListener('click', () => deleteSet(set.id));

    actions.append(performBtn, editBtn, deleteBtn);
    setHeader.append(title, actions);
    setItem.appendChild(setHeader);

    // Список песен в сете
    if (set.songs && set.songs.length > 0) {
      const songsList = document.createElement('div');
      songsList.className = 'set-songs-list';
      
      // Сортируем песни по порядку
      const sortedSongs = [...set.songs].sort((a, b) => a.order - b.order);
      
      sortedSongs.forEach((songInSet, index) => {
        const song = songs.find(s => s.id === songInSet.songId);
        if (song) {
          const songItem = document.createElement('div');
          songItem.className = 'set-song-item';
          songItem.dataset.songId = songInSet.songId;

          const songInfo = document.createElement('div');
          songInfo.className = 'set-song-item__info';

          const songNumber = document.createElement('div');
          songNumber.className = 'set-song-item__number';
          songNumber.textContent = `${songInSet.order}.`;

          const songTitle = document.createElement('div');
          songTitle.className = 'set-song-item__title';
          songTitle.textContent = song.title;

          songInfo.append(songNumber, songTitle);

          const songActions = document.createElement('div');
          songActions.className = 'set-song-item__actions';

          // Кнопки перестановки
          if (index > 0) {
            const moveUpBtn = document.createElement('button');
            moveUpBtn.className = 'set-song-item__btn';
            moveUpBtn.innerHTML = ICONS.up;
            moveUpBtn.title = 'Поднять выше';
            moveUpBtn.addEventListener('click', () => moveSongInSet(set.id, songInSet.songId, 'up'));
            songActions.appendChild(moveUpBtn);
          }

          if (index < sortedSongs.length - 1) {
            const moveDownBtn = document.createElement('button');
            moveDownBtn.className = 'set-song-item__btn';
            moveDownBtn.innerHTML = ICONS.down;
            moveDownBtn.title = 'Опустить ниже';
            moveDownBtn.addEventListener('click', () => moveSongInSet(set.id, songInSet.songId, 'down'));
            songActions.appendChild(moveDownBtn);
          }

          // Кнопка удаления из сета
          const removeBtn = document.createElement('button');
          removeBtn.className = 'set-song-item__btn';
          removeBtn.innerHTML = ICONS.delete;
          removeBtn.title = 'Удалить из сета';
          removeBtn.addEventListener('click', () => removeSongFromSet(set.id, songInSet.songId));
          songActions.appendChild(removeBtn);

          songItem.append(songInfo, songActions);
          songsList.appendChild(songItem);
        }
      });

      setItem.appendChild(songsList);
    } else {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'set-empty-msg';
      emptyMsg.textContent = 'В сете пока нет песен';
      setItem.appendChild(emptyMsg);
    }

    elements.setsContainer.appendChild(setItem);
  });
}

// Добавление сета в текущее выступление
function addNewSet() {
  if (!currentSpeechId) return;
  addNewSetToSpeech(currentSpeechId);
}

// Добавление сета в конкретное выступление
function addNewSetToSpeech(speechId) {
  const speech = speeches.find(s => s.id === speechId);
  if (!speech) return;

  const newSet = {
    id: Date.now(),
    title: `Сет ${speech.sets.length + 1}`,
    songs: []
  };

  speech.sets.push(newSet);
  saveToLocalStorage();
  
  // Обновляем интерфейс
  if (currentSpeechId === speechId) {
    renderSets(speech.sets);
  }
  renderSpeeches();
}

// Открытие модалки редактирования сета
function openSetModal(setId) {
  if (!currentSpeechId) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  const set = speech.sets.find(s => s.id === setId);
  if (!set) return;

  currentSetId = setId;
  elements.setNameInput.value = set.title;
  elements.setModal.classList.add('modal--active');
  
  // Отображаем песни в сете
  renderSetSongs(set);
}

// Сохранение изменений сета
function saveSetChanges() {
  if (!currentSpeechId || !currentSetId) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  const set = speech.sets.find(s => s.id === currentSetId);
  if (!set) return;

  const newTitle = elements.setNameInput.value.trim();
  if (newTitle && newTitle !== set.title) {
    set.title = newTitle;
    saveToLocalStorage();
    renderSets(speech.sets);
    renderSpeeches();
  }

  closeSetModal();
}

// Закрытие модалки сета
function closeSetModal() {
  elements.setModal.classList.remove('modal--active');
  currentSetId = null;
}

// Удаление сета
function deleteSet(setId) {
  if (!currentSpeechId) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  speech.sets = speech.sets.filter(s => s.id !== setId);
  saveToLocalStorage();
  
  renderSets(speech.sets);
  renderSpeeches();
}

// Редактирование названия выступления
function startRenamingSpeech(speechId) {
  const speech = speeches.find(s => s.id === speechId);
  if (!speech) return;

  const menuItem = document.querySelector(`.menu__item[data-id="${speechId}"]`);
  const titleSpan = menuItem.querySelector('.menu__item-title');
  const currentTitle = titleSpan.textContent;

  const input = document.createElement('input');
  input.className = 'menu__item-input';
  input.value = currentTitle;
  
  menuItem.classList.add('editing');
  titleSpan.replaceWith(input);
  input.focus();

  const saveTitle = () => {
    const newTitle = input.value.trim();
    if (newTitle && newTitle !== currentTitle) {
      speech.title = newTitle;
      saveToLocalStorage();
    }
    menuItem.classList.remove('editing');
    renderSpeeches();
    if (currentSpeechId === speechId) {
      elements.workspaceTitle.textContent = newTitle;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveTitle();
    if (e.key === 'Escape') {
      menuItem.classList.remove('editing');
      renderSpeeches();
    }
  });

  input.addEventListener('blur', saveTitle);
}

// Удаление выступления
function deleteSpeech(speechId) {
  speeches = speeches.filter(s => s.id !== speechId);
  saveToLocalStorage();
  
  if (currentSpeechId === speechId) {
    currentSpeechId = null;
    showEmptyWorkspace();
  }
  
  renderSpeeches();
}

// Функции для управления песнями

// Открытие модального окна песен
function openSongsModal() {
  elements.songsModal.classList.add('modal--active');
  renderSongs();
}

// Закрытие модального окна песен
function closeSongsModal() {
  elements.songsModal.classList.remove('modal--active');
}

// Отрисовка списка песен
function renderSongs() {
  elements.songsList.innerHTML = '';
  
  if (songs.length === 0) {
    elements.songsList.innerHTML = '<div class="empty-msg">Песен пока нет</div>';
    return;
  }

  songs.forEach(song => {
    const songItem = document.createElement('div');
    songItem.className = 'song-item';
    songItem.dataset.id = song.id;

    const info = document.createElement('div');
    info.className = 'song-item__info';

    const title = document.createElement('div');
    title.className = 'song-item__title';
    title.textContent = song.title;

    // Показываем начало текста песни, если он есть
    if (song.text) {
      const textPreview = document.createElement('div');
      textPreview.className = 'song-item__text-preview';
      const preview = song.text.length > 100 ? song.text.substring(0, 100) + '...' : song.text;
      textPreview.textContent = preview;
      info.append(title, textPreview);
    } else {
      info.appendChild(title);
    }

    const actions = document.createElement('div');
    actions.className = 'song-item__actions';

    // Кнопка редактирования
    const editBtn = document.createElement('button');
    editBtn.className = 'song-item__btn';
    editBtn.innerHTML = ICONS.edit;
    editBtn.title = 'Редактировать';
    editBtn.addEventListener('click', () => openSongEditModal(song.id));

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'song-item__btn';
    deleteBtn.innerHTML = ICONS.delete;
    deleteBtn.title = 'Удалить';
    deleteBtn.addEventListener('click', () => deleteSong(song.id));

    actions.append(editBtn, deleteBtn);
    songItem.append(info, actions);
    elements.songsList.appendChild(songItem);
  });
}

// Открытие модального окна редактирования песни
function openSongEditModal(songId = null) {
  currentSongId = songId;
  
  if (songId) {
    // Редактирование существующей песни
    const song = songs.find(s => s.id === songId);
    if (song) {
      elements.songEditTitle.textContent = 'Редактировать песню';
      elements.songTitleInput.value = song.title || '';
      elements.songTextInput.value = song.text || '';
    }
  } else {
    // Добавление новой песни
    elements.songEditTitle.textContent = 'Добавить песню';
    elements.songTitleInput.value = '';
    elements.songTextInput.value = '';
  }
  
  elements.songEditModal.classList.add('modal--active');
}

// Закрытие модального окна редактирования песни
function closeSongEditModal() {
  elements.songEditModal.classList.remove('modal--active');
  currentSongId = null;
}

// Сохранение изменений песни
function saveSongChanges() {
  const title = elements.songTitleInput.value.trim();
  const text = elements.songTextInput.value.trim();

  if (!title) {
    showErrorModal('Введите название песни');
    return;
  }

  if (currentSongId) {
    // Обновление существующей песни
    const song = songs.find(s => s.id === currentSongId);
    if (song) {
      song.title = title;
      song.text = text;
      console.log('Обновлена песня:', song);
    }
  } else {
    // Создание новой песни
    const newSong = {
      id: Date.now(),
      title,
      text
    };
    songs.push(newSong);
  }

  saveToLocalStorage();
  renderSongs();
  closeSongEditModal();
}

// Удаление песни
function deleteSong(songId) {
  showConfirmModal('Вы уверены, что хотите удалить эту песню?', () => {
    songs = songs.filter(s => s.id !== songId);
    saveToLocalStorage();
    renderSongs();
  });
}

// Функции для работы с модальными окнами

// Показать модальное окно ошибки
function showErrorModal(message) {
  elements.errorMessage.textContent = message;
  elements.errorModal.classList.add('modal--active');
}

// Закрыть модальное окно ошибки
function closeErrorModal() {
  elements.errorModal.classList.remove('modal--active');
}

// Показать модальное окно подтверждения
function showConfirmModal(message, callback) {
  elements.confirmMessage.textContent = message;
  window.confirmCallback = callback;
  elements.confirmModal.classList.add('modal--active');
}

// Закрыть модальное окно подтверждения
function closeConfirmModal() {
  elements.confirmModal.classList.remove('modal--active');
  window.confirmCallback = null;
}

// Отображение песен в модальном окне сета
function renderSetSongs(set) {
  elements.setSongsList.innerHTML = '';
  
  if (!set.songs || set.songs.length === 0) {
    elements.setSongsList.innerHTML = '<div class="empty-msg">В сете пока нет песен</div>';
    return;
  }

  // Сортируем песни по порядку
  const sortedSongs = [...set.songs].sort((a, b) => a.order - b.order);
  
  sortedSongs.forEach((songInSet, index) => {
    const song = songs.find(s => s.id === songInSet.songId);
    if (song) {
      const songItem = document.createElement('div');
      songItem.className = 'set-song-modal-item';
      songItem.dataset.songId = songInSet.songId;

      const songInfo = document.createElement('div');
      songInfo.className = 'set-song-modal-item__info';

      const songNumber = document.createElement('div');
      songNumber.className = 'set-song-modal-item__number';
      songNumber.textContent = `${songInSet.order}.`;

      const songTitle = document.createElement('div');
      songTitle.className = 'set-song-modal-item__title';
      songTitle.textContent = song.title;

      songInfo.append(songNumber, songTitle);

      const songActions = document.createElement('div');
      songActions.className = 'set-song-modal-item__actions';

      // Кнопки перестановки
      if (index > 0) {
        const moveUpBtn = document.createElement('button');
        moveUpBtn.className = 'set-song-modal-item__btn';
        moveUpBtn.innerHTML = ICONS.up;
        moveUpBtn.title = 'Поднять выше';
        moveUpBtn.addEventListener('click', () => moveSongInSetModal(set.id, songInSet.songId, 'up'));
        songActions.appendChild(moveUpBtn);
      }

      if (index < sortedSongs.length - 1) {
        const moveDownBtn = document.createElement('button');
        moveDownBtn.className = 'set-song-modal-item__btn';
        moveDownBtn.innerHTML = ICONS.down;
        moveDownBtn.title = 'Опустить ниже';
        moveDownBtn.addEventListener('click', () => moveSongInSetModal(set.id, songInSet.songId, 'down'));
        songActions.appendChild(moveDownBtn);
      }

      // Кнопка удаления из сета
      const removeBtn = document.createElement('button');
      removeBtn.className = 'set-song-modal-item__btn set-song-modal-item__btn--remove';
      removeBtn.innerHTML = ICONS.delete;
      removeBtn.title = 'Удалить из сета';
      removeBtn.addEventListener('click', () => removeSongFromSetModal(set.id, songInSet.songId));
      songActions.appendChild(removeBtn);

      songItem.append(songInfo, songActions);
      elements.setSongsList.appendChild(songItem);
    }
  });
}

// Функции для добавления песен в сеты

// Открытие модального окна добавления песни в сет
function openAddSongToSetModal(setId) {
  currentSetForAddingSong = setId;
  elements.addSongToSetModal.classList.add('modal--active');
  renderSongsSelector();
}

// Закрытие модального окна добавления песни в сет
function closeAddSongToSetModal() {
  elements.addSongToSetModal.classList.remove('modal--active');
  currentSetForAddingSong = null;
  elements.songSearchInput.value = '';
}

// Отрисовка списка песен для выбора
function renderSongsSelector() {
  elements.songsSelectorList.innerHTML = '';
  
  if (songs.length === 0) {
    elements.songsSelectorList.innerHTML = '<div class="empty-msg">Песен пока нет</div>';
    return;
  }

  const speech = speeches.find(s => s.id === currentSpeechId);
  const set = speech?.sets.find(s => s.id === currentSetForAddingSong);
  const existingSongIds = set?.songs?.map(s => s.songId) || [];

  songs.forEach(song => {
    const isAlreadyInSet = existingSongIds.includes(song.id);
    
    const songItem = document.createElement('div');
    songItem.className = 'song-selector-item';
    songItem.dataset.songId = song.id;

    const info = document.createElement('div');
    info.className = 'song-selector-item__info';

    const title = document.createElement('div');
    title.className = 'song-selector-item__title';
    title.textContent = song.title;

    // Показываем начало текста песни, если он есть
    if (song.text) {
      const textPreview = document.createElement('div');
      textPreview.className = 'song-selector-item__text-preview';
      const preview = song.text.length > 100 ? song.text.substring(0, 100) + '...' : song.text;
      textPreview.textContent = preview;
      info.append(title, textPreview);
    } else {
      info.appendChild(title);
    }

    const addBtn = document.createElement('button');
    addBtn.className = 'song-selector-item__add-btn';
    addBtn.textContent = isAlreadyInSet ? 'Уже в сете' : 'Добавить';
    addBtn.disabled = isAlreadyInSet;
    
    if (!isAlreadyInSet) {
      addBtn.addEventListener('click', () => addSongToSet(song.id));
    }

    songItem.append(info, addBtn);
    elements.songsSelectorList.appendChild(songItem);
  });
}

// Фильтрация песен в селекторе
function filterSongsInSelector() {
  const searchTerm = elements.songSearchInput.value.toLowerCase();
  const songItems = elements.songsSelectorList.querySelectorAll('.song-selector-item');
  
  songItems.forEach(item => {
    const title = item.querySelector('.song-selector-item__title').textContent.toLowerCase();
    const textPreview = item.querySelector('.song-selector-item__text-preview')?.textContent.toLowerCase() || '';
    
    if (title.includes(searchTerm) || textPreview.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Добавление песни в сет
function addSongToSet(songId) {
  if (!currentSpeechId || !currentSetForAddingSong) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  const set = speech.sets.find(s => s.id === currentSetForAddingSong);
  if (!set) return;

  // Инициализируем массив песен, если его нет
  if (!set.songs) {
    set.songs = [];
  }

  // Добавляем песню в конец сета
  const newSongInSet = {
    songId: songId,
    order: set.songs.length + 1
  };

  set.songs.push(newSongInSet);
  saveToLocalStorage();
  
  // Обновляем интерфейс
  renderSongsSelector();
  renderSets(speech.sets);
  
  // Если модальное окно сета открыто, обновляем его
  if (currentSetId === currentSetForAddingSong) {
    renderSetSongs(set);
  }
  
  showSuccessMessage('Песня добавлена в сет');
}

// Показать сообщение об успехе
function showSuccessMessage(message) {
  // Временно показываем сообщение (можно заменить на более красивое уведомление)
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 2000;
    font-size: 14px;
  `;
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    document.body.removeChild(successDiv);
  }, 3000);
}

// Функции для управления песнями в сетах

// Удаление песни из сета (из основного списка)
function removeSongFromSet(setId, songId) {
  showConfirmModal('Удалить эту песню из сета?', () => {
    if (!currentSpeechId) return;
    
    const speech = speeches.find(s => s.id === currentSpeechId);
    if (!speech) return;

    const set = speech.sets.find(s => s.id === setId);
    if (!set || !set.songs) return;

    // Удаляем песню из сета
    set.songs = set.songs.filter(s => s.songId !== songId);
    
    // Пересчитываем порядок
    set.songs.forEach((song, index) => {
      song.order = index + 1;
    });

    saveToLocalStorage();
    renderSets(speech.sets);
    renderSongsSelector(); // Обновляем селектор песен
    
    showSuccessMessage('Песня удалена из сета');
  });
}

// Удаление песни из сета (из модального окна)
function removeSongFromSetModal(setId, songId) {
  showConfirmModal('Удалить эту песню из сета?', () => {
    if (!currentSpeechId) return;
    
    const speech = speeches.find(s => s.id === currentSpeechId);
    if (!speech) return;

    const set = speech.sets.find(s => s.id === setId);
    if (!set || !set.songs) return;

    // Удаляем песню из сета
    set.songs = set.songs.filter(s => s.songId !== songId);
    
    // Пересчитываем порядок
    set.songs.forEach((song, index) => {
      song.order = index + 1;
    });

    saveToLocalStorage();
    renderSets(speech.sets);
    renderSongsSelector(); // Обновляем селектор песен
    renderSetSongs(set); // Обновляем модальное окно сета
    
    showSuccessMessage('Песня удалена из сета');
  });
}

// Изменение порядка песни в сете (из основного списка)
function moveSongInSet(setId, songId, direction) {
  if (!currentSpeechId) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  const set = speech.sets.find(s => s.id === setId);
  if (!set || !set.songs) return;

  // Находим текущую позицию песни
  const currentIndex = set.songs.findIndex(s => s.songId === songId);
  if (currentIndex === -1) return;

  // Определяем новую позицию
  let newIndex;
  if (direction === 'up' && currentIndex > 0) {
    newIndex = currentIndex - 1;
  } else if (direction === 'down' && currentIndex < set.songs.length - 1) {
    newIndex = currentIndex + 1;
  } else {
    return; // Нельзя двигать дальше
  }

  // Меняем местами песни
  const temp = set.songs[currentIndex];
  set.songs[currentIndex] = set.songs[newIndex];
  set.songs[newIndex] = temp;

  // Пересчитываем порядок
  set.songs.forEach((song, index) => {
    song.order = index + 1;
  });

  saveToLocalStorage();
  renderSets(speech.sets);
  
  const directionText = direction === 'up' ? 'поднята' : 'опущена';
  showSuccessMessage(`Песня ${directionText}`);
}

// Изменение порядка песни в сете (из модального окна)
function moveSongInSetModal(setId, songId, direction) {
  if (!currentSpeechId) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  const set = speech.sets.find(s => s.id === setId);
  if (!set || !set.songs) return;

  // Находим текущую позицию песни
  const currentIndex = set.songs.findIndex(s => s.songId === songId);
  if (currentIndex === -1) return;

  // Определяем новую позицию
  let newIndex;
  if (direction === 'up' && currentIndex > 0) {
    newIndex = currentIndex - 1;
  } else if (direction === 'down' && currentIndex < set.songs.length - 1) {
    newIndex = currentIndex + 1;
  } else {
    return; // Нельзя двигать дальше
  }

  // Меняем местами песни
  const temp = set.songs[currentIndex];
  set.songs[currentIndex] = set.songs[newIndex];
  set.songs[newIndex] = temp;

  // Пересчитываем порядок
  set.songs.forEach((song, index) => {
    song.order = index + 1;
  });

  saveToLocalStorage();
  renderSets(speech.sets);
  renderSetSongs(set); // Обновляем модальное окно сета
  
  const directionText = direction === 'up' ? 'поднята' : 'опущена';
  showSuccessMessage(`Песня ${directionText}`);
}

// Функции режима выступления

// Начать выступление
function startPerformance(setId) {
  if (!currentSpeechId) return;
  
  const speech = speeches.find(s => s.id === currentSpeechId);
  if (!speech) return;

  const set = speech.sets.find(s => s.id === setId);
  if (!set || !set.songs || set.songs.length === 0) {
    showErrorModal('В сете нет песен для выступления');
    return;
  }

  currentPerformanceSet = set;
  currentSongIndex = 0;
  
  // Устанавливаем заголовок выступления
  elements.performanceTitle.textContent = `${speech.title} - ${set.title}`;
  
  // Открываем модальное окно
  elements.performanceModal.classList.add('modal--active');
  
  // Показываем первую песню
  showCurrentSong();
}

// Закрыть режим выступления
function closePerformance() {
  elements.performanceModal.classList.remove('modal--active');
  currentPerformanceSet = null;
  currentSongIndex = 0;
}

// Показать текущую песню
function showCurrentSong() {
  if (!currentPerformanceSet || !currentPerformanceSet.songs) return;
  
  const sortedSongs = [...currentPerformanceSet.songs].sort((a, b) => a.order - b.order);
  const currentSongInSet = sortedSongs[currentSongIndex];
  
  if (!currentSongInSet) return;
  
  const song = songs.find(s => s.id === currentSongInSet.songId);
  if (!song) return;
  
  // Обновляем информацию о песне
  elements.currentSongTitle.textContent = song.title;
  elements.currentSongNumber.textContent = `${currentSongInSet.order}.`;
  
  // Обрабатываем текст песни
  const songText = song.text || 'Текст песни не добавлен';
  elements.currentSongText.textContent = songText;
  
  // Обновляем прогресс
  elements.performanceProgress.textContent = `Песня ${currentSongIndex + 1} из ${sortedSongs.length}`;
  
  // Обновляем состояние кнопок
  elements.prevSongBtn.disabled = currentSongIndex === 0;
  elements.nextSongBtn.disabled = currentSongIndex === sortedSongs.length - 1;
  
  // Визуальное отображение состояния кнопок
  elements.prevSongBtn.style.opacity = currentSongIndex === 0 ? '0.3' : '1';
  elements.nextSongBtn.style.opacity = currentSongIndex === sortedSongs.length - 1 ? '0.3' : '1';
}

// Навигация по песням
function navigateSong(direction) {
  if (!currentPerformanceSet || !currentPerformanceSet.songs) return;
  
  const sortedSongs = [...currentPerformanceSet.songs].sort((a, b) => a.order - b.order);
  
  if (direction === 'prev' && currentSongIndex > 0) {
    currentSongIndex--;
    showCurrentSong();
  } else if (direction === 'next' && currentSongIndex < sortedSongs.length - 1) {
    currentSongIndex++;
    showCurrentSong();
  } else if (direction === 'next' && currentSongIndex === sortedSongs.length - 1) {
    // Последняя песня - показываем сообщение о завершении
    showConfirmModal('Выступление завершено! Закрыть режим выступления?', () => {
      closePerformance();
    });
  }
}



// Запускаем приложение
init();
