const breakfastMenu = ['Pancakes', 'Eggs Benedict', 'Oatmeal', 'Frittata'];
const mainCourseMenu = ['Steak', 'Pasta', 'Burger', 'Salmon'];
const dessertMenu = ['Cake', 'Ice Cream', 'Pudding', 'Fruit Salad'];

document.getElementById("breakfastTotalItems").innerHTML =
    `<strong>Total Items:</strong> ${breakfastMenu.length}`;

const breakfastMenuItemsHTML = breakfastMenu
    .map((item, index) => `<p>Item ${index + 1}: ${item}</p>`)
    .join("");

document.getElementById("breakfastMenuItems").innerHTML = breakfastMenuItemsHTML;

document.getElementById("maincourseTotalItems").innerHTML =
    `<strong>Total Items:</strong> ${mainCourseMenu.length}`;

let mainCourseItemsHTML = "";

mainCourseMenu.forEach((item, index) => {
    mainCourseItemsHTML += `<p>Item ${index + 1}: ${item}</p>`;
});

document.getElementById("maincourseMenuItems").innerHTML = mainCourseItemsHTML;

document.getElementById("dessertTotalItems").innerHTML =
    `<strong>Total Items:</strong> ${dessertMenu.length}`;

let dessertItemsHTML = "";

for (let i = 0; i < dessertMenu.length; i++) {
    dessertItemsHTML += `<p>Item ${i + 1}: ${dessertMenu[i]}</p>`;
}

document.getElementById("dessertMenuItems").innerHTML = dessertItemsHTML;