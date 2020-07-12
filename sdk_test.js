const sharetribeSdk = require('sharetribe-flex-sdk');
const v4 = require('uuid');

const sdk = sharetribeSdk.createInstance({
  clientId: 'ead24f5a-be7a-4417-b859-1eb7bbcff5b1',
//   baseUrl: '/',
});

// login and show as current user 
sdk.login({
    username: "jessica.huang@example.com",
    password: "secret-pass"
  }).then(loginRes => {
    sdk.currentUser.show().then(res => {
        console.log(res.data.profile);
    })
  });


// // Create user:
// sdk.currentUser.create({
//     email: "jessica.huang@example.com",
//     password: "secret-pass",
//     firstName: "Jessica",
//     lastName: "Huang",
//     displayName: "Edu Co.",
//     bio: "Hello, I am Jessica.",
//     publicData: {
//       location: {address: "425 43rd St", 
//                  city: "New York",
//                  state: "NY",
//                  zipcode: "10025"},
//       certificates: ["IECA", "AICA"] 
//     },
//     protectedData: {
//       phoneNumber: "+1-202-555-5555"
//     },
//   }, {
//     expand: true
//   }).then(res => {
//     // res.data
//   });



// // Change password for user 
// sdk.login({
//     username: "jessica.huang@example.com",
//     password: "more-secret-pass"
//   }).then(loginRes => {
//     sdk.currentUser.changePassword({
//         currentPassword: "more-secret-pass",
//         newPassword: "secret-pass"}, {
//             expand: true
//         }).then(res => {});
// });
        
// sdk.login({
//   username:"stevenwang1024@gmail.com",
//   password:"20001702"
// }).then(loginRes => {
//   sdk.stripeAccount.fetch().then(res => {
//     console.log(res.data);
//   });
// });


// // Listing details
// sdk.login({
//   username:"stevenwang1024@gmail.com",
//   password:"20001702"
// }).then(loginRes => {  
//   sdk.listings.show({id:'5ef56113-78c0-4ccb-a333-27fdf305edab'}).then(res => {
//     console.log(res.data);
//   }); 
// }); 

// // Query listings
// sdk.listings.query({
//   price: "10,10000",
//   keywords: "Found",
// }).then(res => {
//   // res.data contains the response data
//   console.log(res.data);
// });

// // show listings under login user
// sdk.login({
//       username: "stevenwang1024@gmail.com",
//       password: "20001702"
//     }).then(loginRes => {
//         sdk.ownListings.query({}).then(res => {
//           // res.data contains the response data
//         console.log(res.data);
//         });
// });

// // Query transactions (need a user login)
// sdk.login({
//   username:"stevenwang1024@gmail.com",
//   password:"20001702"
// }).then(loginRes => {
//   sdk.transactions.query({
//     only: "sale",
//     // lastTransitions: ["transition/request"]
//   }).then(res => {
//     // res.data contains the response data
//     console.log(res.data[1]);
//   });
// });

// Update user profile
// sdk.login({
//   username: "jessica.huang@example.com",
//   password: "secret-pass"
// }).then(loginRes => {
//   sdk.currentUser.updateProfile({
//     publicData: {
//       age: 35,
//       industry: "Education",
//       services_offered: ["test prep", "essay writing", "complete applications", "select colleges"],
//       services_not_offered: ["online tutoring"],
//       recognitions:[],
//       credentials:{background: true, 
//                    memberships: ["IECA", "ACAA"]
//                   },
//     },
//     protectedData: {
//       phoneNumber: "+1-202-555-4444",
//       wechat: "jessicahuang1234",
//     },
//     privateData: {
//       discoveredServiceVia: "Twitter"
//     }
//   }, {
//     expand: true,
//     // include: ["profileImage"]
//   }).then(res => {
//     console.log(res.data);
//   });
// });

