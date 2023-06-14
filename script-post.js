// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const postId = new URL(location.href).searchParams.get('postId');

console.log(postId);

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((post) => {
        console.log(post)
        const block = document.getElementsByClassName('wrap')[0];
        const ul = document.createElement('ul')
        ul.classList.add("comments__list")
        recursiveBuild(post, ul);
        block.appendChild(ul);
    });

    function liCreator(key, value, parent) {
        const li = document.createElement('li');
        li.innerHTML = `<b>${key}:</b> ${value}`;
        parent.appendChild(li);
    }
    
    function ulBuilder(key, object, parent) {
        const li = document.createElement('li');
        const ul = document.createElement('ul');
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
    