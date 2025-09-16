# TODO: Add ID Number Field to Personal Details Form and Enforce Login

## Tasks
- [x] Update Frontend/src/pages/LoginView.vue to store ID Number in localStorage after successful login
- [x] Update Frontend/src/pages/PersonalDetails.vue to add ID Number field to the form and load it from localStorage
- [x] Update PersonalDetails.vue to fetch user details from DB and fill the form on page load
- [x] Add navigation guard in Frontend/src/router.js to enforce login before accessing protected routes
- [ ] Test the login flow to ensure ID Number is stored and loaded correctly (added console logs for debugging)
- [ ] Test navigation guard to ensure unauthenticated users are redirected to login
- [ ] Check console logs in PersonalDetails.vue to debug why data is not displaying
- [ ] Optionally, update Backend/index.js /update-personal-details endpoint to handle ID Number updates if required

## Notes
- ID Number is already in the registration form and backend.
- Navigation guard ensures user is logged in before accessing PersonalDetails, so idNumber is always available.
- Personal details now load from DB on page load as requested.
