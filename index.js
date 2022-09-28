"use strict";
const textareaInput = document.getElementById("inputValues");
const outputUniqueValue = document.getElementById("outputValueUnique");
const button = document.getElementById("button");
const sliderValue = document.getElementById("sliderValue");
const slider = document.getElementById("numberOfAllocations");
let tBodyEl = document.querySelector("tbody");
let umrObjectArraySorted;
let numberOfUsers = 0;
button.addEventListener("click", () => {
  const textAreaValue = textareaInput.value;
  const originalInputValue = textAreaValue.split("\n");
  //   const inputArrayFiltered = JSON.stringify([...new Set(originalInputValue)]);

  //convetring the
  const umrAndCount = checkForOccurance(originalInputValue);
  const umrObjectArray = [];
  for (const key in umrAndCount) {
    let obj = { umrNumber: key, noOfDuplicates: umrAndCount[key] };
    umrObjectArray.push(obj);
  }

  // dont know why, but the umrObjectArray and the sorted array has the output in a sorted manner
  umrObjectArraySorted = umrObjectArray.sort(function (a, b) {
    if (a.noOfDuplicates < b.noOfDuplicates) return 1;
    if (a.noOfDuplicates > b.noOfDuplicates) return -1;
    return 0;
  });

  //   return true;
  numberOfUsers = slider.value;
  // sliderValue.value = numberOfUsers;
  // console.log("*********************************");
  //handeling the allocations
  allocateToUsers(numberOfUsers, umrObjectArraySorted, originalInputValue);
  console.log("*********************************");
});

function checkForOccurance(bulkUMR) {
  let umrAndCount = {};

  for (let i = 0; i < bulkUMR.length; i++) {
    let umr = bulkUMR[i];
    umrAndCount[umr] = umrAndCount[umr] ? umrAndCount[umr] + 1 : 1;
  }
  return umrAndCount;
}

slider.addEventListener("input", () => {
  sliderValue.value = slider.value;
});

function allocateToUsers(noOfUsers, umrArray, originalInput) {
  let allocation = [];
  const ListOfUsers = [];
  let RemainingAllocations = [];
  let obj;
  for (let i = 0; i < noOfUsers; i++) {
    ListOfUsers[i] = prompt(`Enter User ${i + 1} ID: `);
  }
  console.log("Allocation Part");
  console.log("Number of Users: " + noOfUsers);
  RemainingAllocations = umrArray.slice(); //so that we dont change the original Array

  while (RemainingAllocations.length > 0) {
    for (let i = 0; i < noOfUsers; i++) {
      obj = {
        userName: ListOfUsers[i],
        allocaredUmr: RemainingAllocations.shift(),
      };
      allocation.push(obj);
    }
    RemainingAllocations.reverse();
  }

  //code to gather the output values
  // const userIndex = [];
  // for (let i = 0; i < allocation.length; i++) {
  //   //get the index of the user names, in the array of objects
  //   userIndex.push(Object.keys(allocation[i]));
  // }
  replaceWithUsername(originalInput, allocation);
}
let originalInputArray = [];
let newUserNameArray = [];
function replaceWithUsername(originalInput, allocation) {
  originalInputArray = originalInput.slice();
  let userName, allocatedUmr;

  // console.log("originalInputArray" + originalInputArray[item]);
  // allocation.forEach((e) => {
  //   console.log("Object: ");
  //   console.log(e);
  //   console.log("User Name : " + e.userName);
  //   console.log("Alocated UMR : ");
  //   console.log(e.allocaredUmr["umrNumber"]);

  //   for (let item in originalInputArray) {
  //     // if (originalInputArray[item] === e.allocaredUmr["umrNumber"]) {
  //     //   originalInputArray[item] = "What the fuck";
  //     // }
  //   }

  //   //NOW YOU JUST HAVE TO REPLACE THE VALUE IN THE OG ARRAY WITH THE USERNAME
  // });

  console.log(originalInputArray);
  const filteredAllocation = allocation.filter((e) => {
    return e.allocaredUmr !== undefined;
  });
  console.log(filteredAllocation);

  filteredAllocation.forEach((e) => {
    console.log(`${e.allocaredUmr["umrNumber"]} Is Allocated To ${e.userName}`);

    const allocatedUmr = e.allocaredUmr["umrNumber"];
    const allocatedUserName = e.userName;
    originalInputArray.forEach((item) => {
      if (item == allocatedUmr) {
        let newIndex = originalInputArray.indexOf(item);
        originalInputArray[newIndex] = allocatedUserName;
      }
    });
  });
  for (let i = 0; i < originalInputArray.length; i++) {
    // the logic to push data into the table

    tBodyEl.innerHTML += `
      <tr>
       <td>${originalInput[i]}</td>
        <td>${originalInputArray[i]}</td>
     </tr>
    `;
  }
}

/*
 if (e.allocaredUmr.hasOwnProperty(umrNumber)) {
      console.log(`${e.allocaredUmr[umrNumber]} Is Allocated To ${e.userName}`);
    }


allocation[e].hasOwnProperty("allocaredUmr")

  for (let item in originalInputArray) {
    allocation.forEach((e) => {
      if (originalInputArray[item] === e["allocaredUmr"]) {
    console.log(originalInputArray[item]);
        
      }
      // userName = ["userName"];
      // allocatedUmr = e["allocaredUmr"];
    });
    console.log(originalInputArray[item]);
  }

  // umrArray.forEach((e) => {
  //   for (let i = 0; i < noOfUsers; i++) {
  //     obj = { user: ListOfUsers[i], umrSet: umrArray[e] };
  //     allocation.push(obj);
  //     umrArray.shift();
  //   }});

 {
  /* check if the numbers are matching
  let user ={
  userID: '1',
  allocatedUMR: 'the key from UMR array',
  count:'The value from the UMR array
  }
  
  */
/*
  let user = {};
  console.log("Number of Users " + noOfUsers);
  console.log("Number of UMR set : ");

  UMRList.forEach((object) => {
    //now we have all the objects that were inside the array
    //allocate the obj to users do not bother about the count for now.
    for (const umr in object) {
      console.log(umr);
    }
  });

  //umrList is an Array
} 

*/
