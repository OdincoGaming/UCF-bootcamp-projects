    //  ============================= START CODING BELOW! =============================================

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAX-vNf9UQDztwGYMScE06vNDrNh4cTCug",
      authDomain: "train-schedule-assignmen-db69d.firebaseapp.com",
      databaseURL: "https://train-schedule-assignmen-db69d.firebaseio.com",
      projectId: "train-schedule-assignmen-db69d",
      storageBucket: "train-schedule-assignmen-db69d.appspot.com",
      messagingSenderId: "992788115747",
      appId: "1:992788115747:web:00782f8e34104479a91c96"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    // STORAGE VARIABLES
    var trains = [];

    //================================================================
    //================================================================
    //================================================================

    // CLICK EVENT
    $("#add-train").on("click", function(event) {

        event.preventDefault();
        localStorage.clear();

        // TRAIN DETAILS
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstOut = $("#firstOut-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        // STORAGE
        var newObject = {name: name, destination: destination, firstOut: firstOut, frequency: frequency};
        trains.push(newObject);
        database.ref().set({trains: trains});

        // WRAP UP
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#firstOut-input").val("");
        $("#frequency-input").val("");
    });

    //================================================================
    //================================================================
    //================================================================

    // FIREBASE WATCHER
    database.ref().on("value", function(snapshot) {
      // Console.log the "snapshot" value (a point-in-time representation of the database)
      // This "snapshot" allows the page to get the most current values in firebase.
      trains = snapshot.val().trains;
      console.log(trains);
      $("#schedule").empty();
            // ITERATE THROUGH DATA
            for(var i = 0; i < trains.length; i++){

              // CREATE CARDS FROM DATA
              var name = trains[i].name;
              var destination = trains[i].destination;
              var firstOut = trains[i].firstOut;
              var frequency = trains[i].frequency;
      
              // CARD
              var newRow = $("<div>").addClass("row");
              var newCol = $("<div>").addClass("col-lg-12");
              var newCard = $("<div>").addClass("card card-default");
              var newHeader = $("<div>").addClass("card-header").attr("id", name)
              var newName = $("<h3>").text(name);
              var newBody = $("<div>").addClass("card-body").attr("id", "recent-train");
              var newDestination = $("<h4>").attr("id", destination).text(destination);
              var newFirstOut = $("<h4>").attr("id", firstOut).text(firstOut);
              var newFrequency = $("<h4>").attr("id", frequency).text(frequency);
      
              newHeader.append(newName);
              newBody.append(newDestination).append(newFirstOut).append(newFrequency);
              newCard.append(newHeader).append(newBody);
              newCol.append(newCard);
              newRow.append(newCol);
              $("#schedule").append(newRow);
            }

      // Create Error Handling
      // Then include Firebase error logging
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });