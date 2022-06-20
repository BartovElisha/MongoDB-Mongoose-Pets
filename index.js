console.log("Hello Mongoose Application...");

const mongoose = require('mongoose');

// Use Schemes
const pet = require('./Models/pet');
const viterenar = require('./Models/viterenar');
const petOwner = require('./Models/petOwner');

try {
    mongoose.connect('mongodb://localhost:27017/Pets');
    console.log('Connected to Mongodb Server...');

    // Create new Pets
    // createNewPet("Zevs",2,"Visskass");
    // createNewPet("Vaska",5,"Milk");
    // createNewPet("Syava",14,"Meet");
    // createNewPet("Vini",7,"Meet");

    // Create new Viterenars
    // createNewViterenar("Moshe","Vaknin","088587286");
    // createNewViterenar("Arie","Alter","088587287");
    // createNewViterenar("Oleg","Rupin","088587288");
    // createNewViterenar("Polina","Gitsis","088587289");

    // Create new Pet Owners
    // createNewPetOwner("Elisha","Bartov","alisher.b@gmail.com",43,"Moshe",["Zevs","Vaska","Syava","Vini"]);
    // createNewPetOwner("Renata","Fayziev","renatulya.f@gmail.com",36,"Arie",["Zevs","Vini"]);
    // createNewPetOwner("Evelin","Bartov","evelin.b@gmail.com",10,"Polina",["Zevs","Vini"]);
    // createNewPetOwner("Ira","TBD1","ira@gmail.com",53,"Oleg",["Vini"]);
    // createNewPetOwner("Max","TBD1","max@gmail.com",58,"Oleg",["Vini"]);

    // Display Pets
    displayPet("Zevs");
    displayPet("Vaska");
    displayPet("Syava");
    displayPet("Vini");

    // Display Viterenars
    displayViterenar("Moshe");
    displayViterenar("Arie");
    displayViterenar("Oleg");
    displayViterenar("Polina");

    // Display Pet Owners
    displayPetOwner("Elisha");
    displayPetOwner("Renata");
    displayPetOwner("Evelin");
    displayPetOwner("Ira");
    displayPetOwner("Max");

    dispAllPetsAndVeterenars();
}
catch (error) {
    console.log("Error:" + error);
}
finally {
    console.log("Success !!!");
    console.log("By By !!!");
}

// CRUD (Create Read Update Delete) Functions 
// Create
async function createNewPet(petName,age,prefferedFood) {
    const newPet = new pet({
        petName: petName,
        age: age,
        prefferedFood: prefferedFood
    });

    let result = await newPet.save();
}

async function createNewViterenar(firstName,lastName,mobileNumber) {
    const newViterenar = new viterenar({
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber
    });

    let result = await newViterenar.save();
}

async function createNewPetOwner(firstName,lastName,email,age,viterenarFirstName,petNamesArray) {
    const newPetOwner = new petOwner({
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        //viterenar_id:, -- will be updated leter
        //pets_id:,      -- will be updated leter 
    });

    // Find ID of Viterenar and reffer it to Pet Owner
    const viterenarResult = await viterenar.find({firstName: `${viterenarFirstName}`});
    newPetOwner.viterenar_id = viterenarResult[0]._id; 

    // Find ID of All Pets and reffer it to Pet Owner    
    // for option:
    for(let i = 0; i < petNamesArray.length; i++) {
        const petResult = await pet.find({petName: `${petNamesArray[i]}`});
        newPetOwner.pets_id[i] = petResult[0]._id;
    }
    // ForEach option NOT WORKING !!!!!
    // petNamesArray.forEach(
    //     async (element) => {
    //         let singlePet = await pet.find({petName: `${element}`});
    //         console.log(singlePet[0].petName);
    //         newPetOwner.pets_id = singlePet._id;    
    //     });

    let result = await newPetOwner.save();
}

// Read
async function displayPet(petName) {
    const result = await pet.find({petName: `${petName}`});

    //console.log("Pet Data: "+result); // To show the original Data
    console.log("------------ Pets Data ------------");
    console.log("Pet id: "+result[0]._id);
    console.log("Pet Name: "+result[0].petName);
    console.log("Pet Age: "+result[0].age);
    console.log("Pet Preffered Food: "+result[0].prefferedFood);
}

async function displayViterenar(firstName) {
    const result = await viterenar.find({firstName: `${firstName}`});

    //console.log("Viterenar Data: "+result); // To show the original Data
    console.log("------------ Viterenars Data ------------");
    console.log("Viterenar id: "+result[0]._id);
    console.log("Viterenar First Name: "+result[0].firstName);
    console.log("Viterenar Last Name: "+result[0].lastName);
    console.log("Viterenar Mobile Phone: "+result[0].mobileNumber);
}

async function displayPetOwner(firstName) {
    const result = await petOwner.find({firstName: `${firstName}`});

    // console.log("Pet Owner Data: "+result); // To show the original Data
    console.log("------------ Pet Owners Data ------------");
    // console.log("Pet Owner "+result[0]);
    console.log("Pet Owner id: "+result[0]._id);
    console.log("Pet Owner First Name: "+result[0].firstName);
    console.log("Pet Owner Last Name: "+result[0].lastName);
    console.log("Pet Owner email: "+result[0].email);
    console.log("Pet Owner Age: "+result[0].age);
    console.log("Pet Owner Viterenar_id: "+result[0].viterenar_id);
    console.log("Pet Owner Pets_id: "+result[0].pets_id);
}

async function displayPetsOfOwner(petOwnerFirstName) {
    // find pet owner by name (find methode)
    console.log("-----------------------------------------");
    console.log("Pets Owner: "+petOwnerFirstName);
    

    // Find IDs of pets refferenced to Pet Owner
    const result = await petOwner.find({firstName: `${petOwnerFirstName}`});
    console.log(`Pets Owner ${petOwnerFirstName} has Pets IDs: ${result[0].pets_id}`);
   
    // find all pets of the pets owner using findById methode.
    for(let i = 0;i < result[0].pets_id.length; i++) {
        let singlePet = await pet.findById(result[0].pets_id[i]);
        console.log(`Pet ${i+1}: ${singlePet.petName}`);        
    }

    // find viterenar of the pets owner using findById methode.
    let findViterenar = await viterenar.findById(result[0].viterenar_id);
    displayViterenar(findViterenar.firstName);
    console.log("-----------------------------------------");
}

async function dispAllPetsAndVeterenars () {
    // Display All Pets and Viterenars of petOwner
    await displayPetsOfOwner("Elisha");
    await displayPetsOfOwner("Renata");
    await displayPetsOfOwner("Evelin");
    await displayPetsOfOwner("Ira");
    await displayPetsOfOwner("Max");
}

// Update

// Delete
