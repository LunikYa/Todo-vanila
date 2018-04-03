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

    if(!i)
    	listTasks.innerHTML = '';
        
    for(; i < arr.length; i++){
        if (!arr[i].remove) {            
        let imgDel  = document.createElement('img'),
            imgComp = document.createElement('img'),
            li      = document.createElement('li');

            imgDel.classList.add('img-del');
            imgDel.addEventListener('click', removeTask);
            imgDel.dataset.index = i;
            imgDel.src = './img/delete.png';
            
            imgComp.classList.add('img-complete');
            imgComp.addEventListener('click', completeTask);
            imgComp.dataset.index = i;
            imgComp.src = './img/check.png';
            
            if(!arr[i].complete) {
            	li.classList.add('list-item');
            	imgComp.src = './img/uncheck.png'; 
            	
            }else {
            	li.classList.add('list-item-complete');
            	imgComp.src = './img/check.png'
            }
            
            li.textContent = arr[i].val;
            li.appendChild(imgComp);
            li.appendChild(imgDel);                
            listTasks.appendChild(li);
        }
    }   
}

function removeTask(event){
    let i = event.target.dataset.index;
    // console.log(event.target, i, tasksArr, listTasks.children[i])

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
        event.target.src = './img/check.png'
    } else{
        listTasks.children[i].classList.replace('list-item-complete', 'list-item');
        event.target.src = './img/uncheck.png'
    }
}

function showStats (elem){
    let total = document.createElement('p');
    elem.textContent = 'Total ' + tasksArr.length;
}

function removeAll(){

    let res = tasksArr.filter((item, i)=>{
        return !item.complete
    })

    tasksArr.length = 0;
    tasksArr = [...res];
    showTasks(res, true);
}

let check = false;

function completeAll(event){	
    for (let i = 0; i < tasksArr.length; i++) {
        tasksArr[i].complete = !tasksArr[i].complete;
    }
    if(check && tasksArr.length){
    	event.target.src = './img/complete-all.png';
    	check = !check
    } else if(tasksArr.length){
    	event.target.src = './img/check-complete-all.png'
    	check = !check
    }
    showTasks(tasksArr, true);
}

function sortTasks(event){
	
	let items = document.querySelectorAll('.item-sorter-active');
	if(event.target.tagName ==='SPAN'){

	for(let i = 0; i < items.length; i++){
		items[i].className = ('item-sorter')
	}
		event.target.className = ('item-sorter-active')
	}
	let result = tasksArr.filter((item, i)=>{
        if(event.target.textContent === 'All'){
        	return item 
        }
        else if(event.target.textContent === 'Completed'){
        	return (item.complete) ? true : false
        }
        else if(event.target.textContent === 'Active'){        	
        	return (!item.complete) ? true : false
        }
    })
    showTasks(result, true);	
}
