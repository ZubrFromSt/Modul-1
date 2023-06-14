// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


const userId = new URL(location.href).searchParams.get('userId');

fetch(`http://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
        console.log(user)
        const block = document.getElementsByClassName('wrap')[0];
        const ul = document.createElement('div');
        ul.classList.add("info_user");
        ul.innerHTML = `<h1>Info about ${user.name} :</h1>`
        recursiveBuild(user, ul);
        block.appendChild(ul);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add("buttonContainer");
        block.appendChild(buttonContainer);
        const button = document.createElement('button');
        buttonContainer.append(button);
        button.innerText = 'Post of current user';
        button.onclick = () => {
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
          .then((res) => res.json())
          .then((posts => {
            console.log(posts)
            const pos = document.getElementsByClassName('wrap')[0];
            const ul = document.createElement('ul');
            ul.classList.add("posts__list")
            pos.appendChild(ul);
            const container = document.createElement('div');
            container.classList.add('container');
            recursiveBuild(posts, ul)
            const children = [...ul.children]
            for (let i = 0; i < children.length; i++) {
                const item = children[i];
                const button = document.createElement('button');
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add("buttonContainer");
                button.innerText = 'Post';
                item.appendChild(buttonContainer);
                buttonContainer.append(button);
                button.addEventListener("click", function() {
                location.href = `post-details.html?postId=${posts[i].id}`;
              })
             
            }

        }))
        }

    });

function liCreator(key, value, parent) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${key}:</b> ${value}`;
    parent.appendChild(li);
}

function ulBuilder(key, object, parent) {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    ul.classList.add("posts__inner-list")
    li.innerHTML = `<b>${+key || +key == 0? (+key + 1): key}:</b>`;
    parent.appendChild(li);
    li.appendChild(ul);
    recursiveBuild(object, ul);
}

function recursiveBuild(object, parent) {
    for (const key in object) {
        typeof object[key] === 'object'
            ? ulBuilder(key, object[key], parent)
            : liCreator(key, object[key], parent)
    }
}
