//const { response } = require("express");

document.addEventListener('DOMContentLoaded', (e) => {
    //List from the index.html stored in a const variable
    const burgerList = $(".burgerList") 
    const devouredList = $(".devouredList")

    // let burger array
    let burgers = []

    //To initialize to adding the burger to the burger list
    const initializeRows = () => {
        burgerList.innerHTML = '';
        const rowsToAdd = [];

        //Empty the current list, to make room for the new list
        burgerList.empty()

        //Pushes a row to be appended to the burger list
        for (let i = 0; i < burgers.length; i++) {
        rowsToAdd.push(createNewRow(burgers[i]));
        }
        rowsToAdd.forEach((row) => burgerList.append(row));
    }

    // Helper function to grab todos and starts the initialize rows function
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
            initializeRows()
        });
    };

    //Returns the burger list item to add to the burger list
    const createNewRow = (burgers) => {
        const newInputRow = $("<li>")
        const newInput = $("<input>")
        const newDevourButton = $("<button>")
        const lineBreak = $("<br>")
        const fullBurgerName = burgers.burger_id + ": " + burgers.name
    
        // Sets the id attributs to the list
        newInputRow.attr("id", burgers.burger_id)

        //Add input attributes for text box and the burger name
        newInput.attr({
            type: "text",
            class: "burgerText",
            value: fullBurgerName
        })

        //Input set to read only 
        newInput.attr("readonly", true)
    
        //Set button attributes and add an event listener
        newDevourButton.attr({
            class: burgers.burger_id, 
            id: "devourButton" 
        })
        newDevourButton.text("Devour It!")
        newDevourButton.on("click", function() {
            devourBurger(burgers.burger_id)
        })
    
        //Adds the list to the index.html page
        newInputRow.append(newInput)
        newInputRow.append(lineBreak)
        newInputRow.append(newDevourButton)
    
        return newInputRow
    }

    //Posts a new burger
    const insertBurger = (e) => {
        e.preventDefault()
        const newBurger = $("#newBurger").val()
        const burger = {
            name: newBurger,
            devourStatus: false
        }
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

    //An event listener is add onto the submit button to initiate the instert burger function
    document.getElementById("Form").addEventListener('submit', insertBurger)

    const devourBurger = (burgerID) => {

        // Burger Value from the burger list
        const burgerRecord = $("#" + burgerID).children().val()

        //Delete burger from burger list
        $("#" + burgerID).empty()

        //Sets a const variable to set the primary key and the devourstatus column
        const burgerUpdate = {
            burger_id: burgerID,
            devourStatus: true
        }

        //Stores list and input into a const variable
        const newInputRow = $("<li>")
        const newInput = $("<input>")

        //Add attributes: text, class, and burger text value
        newInput.attr({
            type: "text",
            class: "burgerText",
            value: burgerRecord
        })

        //input attribute set to read only
        newInput.attr("readonly", true)
    
        newInputRow.append(newInput)
    
        devouredList.append(newInputRow)

        //Adds the updates to the api/burgers route
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
    }

})



