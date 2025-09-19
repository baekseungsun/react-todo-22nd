document.addEventListener('DOMContentLoaded', () => {
  //menu tab
  const menuTab = document.getElementById('menuTab');
  const openBtn = document.querySelector('.menu');
  const closeBtn = document.getElementById('closeMenu');

  //open and close menu drawer
  const openDrawer = () => {
    menuTab.classList.add('active');
  };
  const closeDrawer = () => {
    menuTab.classList.remove('active');
  };

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);

  //close menu when clicked outside of menu tab
  document.addEventListener('click', (e) => {
    if (
      menuTab.classList.contains('active') &&
      !menuTab.contains(e.target) &&
      !openBtn.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  //close menu when user presses esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuTab.classList.contains('active')) closeDrawer();
  });

  //define date manipulating buttons
  const today = document.querySelector('.today');
  const prevBtn = document.getElementById('yesterday');
  const nextBtn = document.getElementById('tomorrow');

  //get date
  let current = new Date();
  const fmt = { year: 'numeric', month: 'long', day: 'numeric' };

  //Date manipulation
  function render() {
    today.textContent = current.toLocaleDateString(undefined, fmt);
  }
  render();

  //define next and last week buttons in menu
  const nWeek = document.querySelector('.nWeek');
  const lWeek = document.querySelector('.lWeek');

  //피드백 주신 대로 changWeek함수를 만들고 +7/-7을 인자로 남겨 처리했습니다
  function changeDays(offSetDays) {
    current.setDate(current.getDate() + offSetDays);
    render();
    loadList(current);
    ifNoEvents();
  }
  nWeek.addEventListener('click', () => {
    changeDays(7);
  });
  lWeek.addEventListener('click', () => {
    changeDays(-7);
  });

  prevBtn.addEventListener('click', () => {
    changeDays(-1);
  });

  nextBtn.addEventListener('click', () => {
    changeDays(1);
  });

  //when the date is clicked on, change current date to today
  today.addEventListener('click', () => {
    current = new Date();
    render();
    loadList(current);
  });

  const dateKey = (d) => new Date(d).toLocaleDateString('en-CA');
  // "YYYY-MM-DD" in local time
  const storageKey = (d) => `${dateKey(d)}`;

  const numEvent = document.querySelector('.numEvent');

  //saves the events for a date
  function saveList(date) {
    const dateData = {
      dateTodoEl: todoEl.innerHTML,
      dateTodos: todos,
    };
    sessionStorage.setItem(storageKey(date), JSON.stringify(dateData));
  }

  //loads the events for a date
  function loadList(date) {
    const raw = sessionStorage.getItem(storageKey(date) || '');
    if (raw) {
      const parsed = JSON.parse(raw);
      todoEl.innerHTML = parsed.dateTodoEl;
      todos = parsed.dateTodos;
    } else {
      todos = [];
      todoEl.innerHTML = '';
    }
    getNumEvent();
  }

  const input = document.querySelector('.input');
  const add = document.querySelector('.register');
  const todoEl = document.querySelector('.todoEl');
  const clearAll = document.querySelector('.clearAll');

  let todos = [];

  //event listener that is restored once loaded from storage
  todoEl.addEventListener('click', (e) => {
    //선택된 li
    const li = e.target.closest('li');
    //선택된 li의 index number을 idx라 명명
    const id = li.dataset.id;
    const idx = todos.findIndex((t) => t.id === id);

    //delete button
    if (e.target && e.target.classList.contains('delEvent')) {
      todos.splice(idx, 1);
    }

    //done button
    if (e.target && e.target.classList.contains('doneEvent')) {
      todos[idx].done = !todos[idx].done;
      console.log('done');
    }
    //pin and unpin events
    if (e.target && e.target.classList.contains('pinEvent')) {
      todos[idx].pinned = !todos[idx].pinned;
    }

    renderTodos();
    saveList(current);
    ifNoEvents();
    getNumEvent();
  });

  //add event using enter and button click
  add.addEventListener('click', () => {
    if (input.value !== '') {
      addToList(input.value);
      input.value = '';
      saveList(current);
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value !== '') {
      addToList(input.value);
      input.value = '';
      saveList(current);
    }
  });

  function addToList(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      done: false,
      pinned: false,
      text: text,
    };
    todos.push(newTodo);
    saveList();
    renderTodos();
  }

  function renderTodos() {
    const sorted = [...todos].sort((a, b) => b.pinned - a.pinned);
    todoEl.innerHTML = '';

    for (const t of sorted) {
      const li = document.createElement('li');
      li.dataset.id = t.id;
      li.className = t.pinned ? 'pinned' : '';
      li.innerHTML = `
                <button class="doneEvent">${t.done ? 'Undone' : 'Done'}</button>
                <span class="text ${t.done ? 'markDone' : ''}">${t.text}</span>
                <button class="pinEvent ${t.pinned ? 'markPin' : ''}">
                    ${t.pinned ? 'Unpin' : 'Pin'}
                </button>
                <button class="delEvent">Delete</button>
                `;
      todoEl.appendChild(li);
    }
    getNumEvent();
  }

  //clear all events for a date
  function clearALlEvents(date) {
    todos = [];
    renderTodos();
    saveList(current);
    ifNoEvents();
  }
  clearAll.addEventListener('click', () => {
    clearALlEvents(current);
    getNumEvent();
  });

  function ifNoEvents() {
    if (todos.length === 0) {
      sessionStorage.removeItem(storageKey(current));
    }
  }

  //get the number of Events
  function getNumEvent() {
    numEvent.textContent = 'To-do: ' + todoEl.children.length;
  }

  //calendar manipulation
  const menuContent = document.getElementById('menuContent');
  const datePickerEl = document.createElement('input');
  datePickerEl.type = 'date';
  datePickerEl.className = 'menuDatePicker'; // make it obvious
  menuContent.appendChild(datePickerEl);
  datePickerEl.addEventListener('change', () => {
    if (!datePickerEl.value) return;
    const [y, m, d] = datePickerEl.value.split('-').map(Number);
    saveList(current);
    current = new Date(y, m - 1, d);
    render();
    loadList(current);
  });
});
