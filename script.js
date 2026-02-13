const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 1. 카운트 영역 생성
const countContainer = document.createElement('div');
countContainer.id = 'countContainer';
countContainer.innerHTML = `남은 할 일: <span id="todoCount">0</span>개`;
document.querySelector('.todo-container').insertBefore(countContainer, todoList);
const todoCountSpan = document.getElementById('todoCount');

// 카운트 업데이트
function updateCount() {
    const activeTasks = document.querySelectorAll('li:not(.completed)').length;
    todoCountSpan.textContent = activeTasks;
}

// 할 일 추가
function addTodo() {
    const taskValue = todoInput.value.trim();
    if (taskValue === "") return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <div class="btn-group">
            <button class="edit-btn">수정</button>
            <button class="delete-btn">×</button>
        </div>
    `;

    // 완료 토글
    li.querySelector('.task-text').addEventListener('click', () => {
        li.classList.toggle('completed');
        updateCount();
    });

    // 수정 기능
    li.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.stopPropagation(); // 클릭 이벤트 전이 방지
        const span = li.querySelector('.task-text');
        const newText = prompt("수정할 내용을 입력하세요:", span.textContent);
        if (newText) span.textContent = newText;
    });

    // 삭제 기능
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        updateCount();
    });

    todoList.appendChild(li);
    todoInput.value = "";
    updateCount();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });