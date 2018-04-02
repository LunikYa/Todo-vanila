let inputTasker   = document.getElementById('js-new-task'),
    conteinerTask = document.getElementById('js-task-conteiner'),
    listTasks     = document.getElementById('js-list-tasks'),
    stats         = document.getElementById('js-stats');

inputTasker.addEventListener('keyup', createTask);

let tasksArr = [];

function createTask (event){    
    if (event.keyCode === 13 && event.target.value !== ''){
        tasksArr.push({
            val: event.target.value,
            remove: false,
            complete: false,
        })
        event.target.value = '';
        showTasks(tasksArr);                
    }
}   

function showTasks(arr, first){
    showStats(stats);

    let i = (first) ? 0 : arr.length - 1;

    if(!i){
        console.log('del')
        listTasks.innerHTML = '';
    }
    
    for(; i < arr.length; i++){
        if (!arr[i].remove) {
            
        let buttonDel  = document.createElement('button'),
            buttonComp = document.createElement('button'),
            li         = document.createElement('li');

            buttonDel.textContent = 'Del';
            buttonDel.classList.add('button-del');
            buttonDel.addEventListener('click', removeTask);
            buttonDel.dataset.index = i;
            
            buttonComp.textContent = 'Ok';
            buttonComp.classList.add('button-complete');
            buttonComp.addEventListener('click', completeTask);
            buttonComp.dataset.index = i;
            
            (!arr[i].complete) ? li.classList.add('list-item') : li.classList.add('list-item-complete')     
            
            li.textContent = arr[i].val;
            li.appendChild(buttonComp);
            li.appendChild(buttonDel);                
            listTasks.appendChild(li);
            }
    }   
}

function removeTask(event){
    let i = event.target.dataset.index;
    console.log(event.target, i, tasksArr, listTasks.children[i])

    if (tasksArr[i]){
        tasksArr[i].remove = true;
        tasksArr.splice(i, 1);      
    }
    
    showTasks(tasksArr, true);
    showStats(stats);    
}

function completeTask(event){
    let i      = event.target.dataset.index,
        status = tasksArr[i].complete;

    tasksArr[i].complete = !tasksArr[i].complete;

    if(!status){
        listTasks.children[i].classList.replace('list-item', 'list-item-complete');
    } else{
        listTasks.children[i].classList.replace('list-item-complete', 'list-item');
    }
}

function showStats (elem){
    let total = document.createElement('p');
    elem.textContent = 'Total ' + tasksArr.length;
}

function removeAll(){

    let res = tasksArr.filter((item, i)=>{
        console.log(i)
        return !item.complete
    })

    tasksArr.length = 0;
    tasksArr = [...res];
    showTasks(tasksArr, true);
}

function completeAll(){
    for (let i = 0; i < tasksArr.length; i++) {
        tasksArr[i].complete = !tasksArr[i].complete;
    }
    showTasks(tasksArr, true);
}