// В index.html
// 1 отримати масив об'єктів з endpoint а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
//котра має детальну інфорацію про об'єкт на який клікнули

fetch('http://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {
        const container = document.getElementsByClassName('container')[0];
        const block_1 = document.createElement('div');
        const block_2 = document.createElement('div');
        block_1.classList.add("block_1");
        block_2.classList.add("block_2");
        container.appendChild(block_1);
        container.appendChild(block_2);
        for (const user of users) {
            const user_block = document.createElement('div');
            user_block.classList.add("user-block");
            user_block.innerText = `${user.id}: ${user.name}`;
            if (user.id % 2 !== 0) {
                block_1.appendChild(user_block);
                const button = document.createElement('button');
                button.innerText = 'Info';
                user_block.appendChild(button);
                button.onclick = () => {
                    location.href = `user-details.html?userId=${user.id}`;
                }
            } else if (user.id % 2 !== 1){
                block_2.appendChild(user_block);
                const button = document.createElement('button');
                button.innerText = 'Info';
                user_block.appendChild(button);
                button.onclick = () => {
                    location.href = `user-details.html?userId=${user.id}`;
                }
            }
        }
})
