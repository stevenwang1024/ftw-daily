const sharetribeSdk = require('sharetribe-flex-sdk');
const v4 = require('uuid');
const { lang } = require('moment');

const sdk = sharetribeSdk.createInstance({
  clientId: 'ead24f5a-be7a-4417-b859-1eb7bbcff5b1',
//   baseUrl: '/',
});

// login and show as current user 
// sdk.login({
//     username: "jessica.huang@example.com",
//     password: "secret-pass"
//   }).then(loginRes => {
//     sdk.currentUser.show().then(res => {
//         console.log(res.data.profile);
//     })
//   });


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

// Query listings
sdk.listings.query({
  pub_education_category: "language_class",
  // keywords: "Found",
}).then(res => {
  // res.data contains the response data
  
  console.log(res.data);
});

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

// // Create listing
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const titles = ["Application ", "Subject Tutoring ", "Language ","Summer Camp ","Custimization ", "Coaching "];
// const education_application_categorys = ["high_school","elementary_middle","college","grad_school","mba","other"];
// const education_categories = ["college_admission", "tutoring", "language_class","holiday_camp","customization","coaching"];
// const target_clients = ["high school students", "college students", "young professionals"];
// const include_profile = [true, false];
// const languages = ["English", "Mandarin","Spanish","Other"];

// sdk.login({
//   username: "jessica.huang@example.com",
//   password: "secret-pass"
// }).then(loginRes => {

//   for (var i=0; i < 100; i++) {
//     // const title = getRandomInt(0, titles.length-1);
//     const edu_app_cat = getRandomInt(0, education_application_categorys.length-1);
//     const edu_cat = getRandomInt(0, education_categories.length-1);
//     const tgt_cli = getRandomInt(0, target_clients.length-1);
//     const incl_prof = getRandomInt(0,1);
//     const lan = getRandomInt(0, languages.length-1);

//     const title_v = titles[edu_cat].concat(getRandomInt(1, 10000).toString()) ;
//     const edu_cat_val = education_categories[edu_cat];
//     const edu_app_cat_val = (edu_cat_val=="college_admission") ?education_application_categorys[edu_app_cat] : null;
//     const tgt_cli_val = target_clients[tgt_cli];
//     const incl_prof_val = include_profile[incl_prof];
//     const lan_val = (edu_cat_val == "language_class") ? languages[lan] : null;
     
//     sdk.ownListings.create({
//       title: title_v,
//       description: "recommended",
      
//       publicData: {
//         education_category: edu_cat_val,
//         education_application_category: edu_app_cat_val,
//         include_provider_profile: incl_prof_val,
//         target_client: tgt_cli_val,
//         language: lan_val,
//         edu_service_detial: "1. Negotiate detial info. \n 2. Discuss a pack \n 3. pay \n 4. deliver ",
//       },
//     }, {
//       expand: true,
//       }).then(res => {
//     });
//   }
// });

