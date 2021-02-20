// let burger array
let burger = []

// Helper function to hide items
const hide = (el) => {
    el.style.display = 'none';
};
const show = (el) => {
    el.style.display = 'inline';
};

 // Helper function to grab todos
 const getTodos = () => {
    fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success in getting todos:', data);
        todos = data;
        console.log(data)
      });
};



// $("#submit").click(function() {
//     let devourList = $(".devourList")
//     let li = $("<li>")
//     let input = $("<input>")
//     let button = $("<button>")
//     const burgerInput = $(".burgerName").val()

//     input.attr({
//         type: "text",
//         class: "burgerText",
//         value: burgerInput,
//         readonly: true
//     })

//     button.text("Devour It!")
//     button.attr({
//         class: "devourButton",
//         data: "false"
//     })

//     li.append(input)
//     li.append(button)

//     devourList.append(li)

//     // var test = $(".burgerName").val()
//     // console.log(test)
// })