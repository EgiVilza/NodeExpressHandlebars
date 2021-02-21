//const { response } = require("express");

document.addEventListener('DOMContentLoaded', (e) => {
    //List from the index.html stored in a const variable
    const burgerList = $(".burgerList") 
    const devouredList = $(".devouredList")

    // let burger array
    let burgers = []

    const initializeRows = () => {
        burgerList.innerHTML = '';
        const rowsToAdd = [];
        burgerList.empty()
        for (let i = 0; i < burgers.length; i++) {
        rowsToAdd.push(createNewRow(burgers[i]));
        }
        rowsToAdd.forEach((row) => burgerList.append(row));
    }

    // Helper function to grab todos
    const getBurgers = () => {
        fetch('/api/burgers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            burgers = data;
            console.log(burgers)
            initializeRows()
        });
    };

    const createNewRow = (burgers) => {
        const newInputRow = $("<li>")
        const newInput = $("<input>")
        const newDevourButton = $("<button>")
        const lineBreak = $("<br>")
        const fullBurgerName = burgers.burger_id + ": " + burgers.name
    
        newInputRow.attr("id", burgers.burger_id)

        newInput.attr({
            type: "text",
            class: "burgerText",
            value: fullBurgerName
        })

        newInput.attr("readonly", true)
    
        newDevourButton.attr({
            class: burgers.burger_id, 
            id: "devourButton" 
        })
        newDevourButton.text("Devour It!")
        newDevourButton.on("click", function() {
            devourBurger(burgers.burger_id)
        })
    
        newInputRow.append(newInput)
        newInputRow.append(lineBreak)
        newInputRow.append(newDevourButton)
    
        return newInputRow
    }

    const insertBurger = (e) => {
        e.preventDefault()
        const newBurger = $("#newBurger").val()
        const burger = {
            name: newBurger,
            devourStatus: false
        }
        //console.log(burger)
        if (burger.name) {
            fetch('/api/burgers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(burger)
            })
            .then((response) => response.json())
            .then(getBurgers())
        }
    }

    document.getElementById("Form").addEventListener('submit', insertBurger)

    const devourBurger = (burgerID) => {

        // Burger Value from the burger list
        const burgerRecord = $("#" + burgerID).children().val()
        //Delete burger from burger list
        $("#" + burgerID).empty()

        const burgerUpdate = {
            burger_id: burgerID,
            devourStatus: true
        }

        const newInputRow = $("<li>")
        const newInput = $("<input>")

        newInput.attr({
            type: "text",
            class: "burgerText",
            value: burgerRecord
        })

        newInput.attr("readonly", true)
    
        newInputRow.append(newInput)
    
        devouredList.append(newInputRow)

        if (burgerUpdate.burger_id) {
            fetch('/api/burgers', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(burgerUpdate)
            })
            .then((response) => response.json())
            .then((response) => console.log(response))
        }

        //return burgers
    }

})



