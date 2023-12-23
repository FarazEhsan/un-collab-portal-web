
import Button from '@/components/button/Button'
import Input from '@/components/form/Input'
import getManagementApiToken from '@/utils/auth0token'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'


let userNameError = ''
export default function AddUser() {

 
  async function submitForm(formData: FormData) {
    "use server"
    console.log('Form Data before', formData)
    const userName = formData.get('username')
    console.log('Username', userName)
    userNameError = userName? '' : 'Username is required'
    console.log('Username Error', userNameError)
    if(formData.get('username') && formData.get('firstname') && formData.get('lastname') && formData.get('email')){

      const token=  await getManagementApiToken()
      console.log('Token', token)

     const userRes=  await fetch('https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/users', {
        method:'POST',
        
        headers:{
          'Content-Type': 'application/json',
          "Accept": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "email": formData.get('email'),
            "connection": "Username-Password-Authentication",
            "password": "Falcon_303303",
        })
      })
      console.log('User Response', userRes.status)

      if(userRes.status === 409){
        userNameError = 'User already exists'
      }

      else if(userRes.status === 201){

        // 1- Get the roles and Assign role to the userI
        // 2- Send email to the user to reset password
        
        const userJson = await userRes.json()
        console.log('User Json', userJson)
        const userId = userJson.user_id
        console.log('User Id', userId)
        const rolesRes = await fetch('https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/roles', {
          method:'GET',
          headers:{
            "Accept": "application/json",
            "authorization": `Bearer ${token}`
          }}
        )
          if(rolesRes.status === 200){
            const rolesJson = await rolesRes.json()
            console.log('Roles Json', rolesJson)


            const userRole= rolesJson.filter( (role: { name: string }) => role.name === 'user')
            console.log('User Role', userRole)
            const userRoleRes = await fetch(`https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/users/${userId}/roles`, {
              method:'POST',
              
              headers:{
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                  "roles": [userRole[0].id]
              }),
            })
            console.log('User Role Response', userRoleRes.status)
            if(userRoleRes.status === 200){
              console.log('User Role Assigned')
            }
          }
        // const userRoleRes = await fetch(`https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/roles/rol_8GZ6J4Z8d3QaWVQm/users`, {
        //   method:'POST',
          
        //   headers:{
        //     'Content-Type': 'application/json',
        //     "Accept": "application/json",
        //     "authorization": `Bearer ${token}`
        //   },
        //   body: JSON.stringify({
        //       "users": [userId]
        //   })
        // })
        // const userUpdateRes = await fetch(`https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/users/${userId}`, {
        //   method:'PATCH',
          
        //   headers:{
        //     'Content-Type': 'application/json',
        //     "Accept": "application/json",
        //     "authorization": `Bearer ${token}`
        //   },
        //   body: JSON.stringify({
        //       user_metadata: {
        //       "first_login":true 
        //    }
        //   })
        // })
        // console.log('User Update Response', userUpdateRes.status)
        // if(userUpdateRes.status === 200){
        //   const userUpdateJson = await userUpdateRes.json()
        //   console.log('User Update Json', userUpdateJson)
        // }
        
        const userPasswordResetRes = await fetch ('https://dev-huxjkvfkb5f36hh4.us.auth0.com/dbconnections/change_password',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "authorization": `Bearer ${token}`
          },
          body:JSON.stringify({
            "client_id":process.env.AUTH0_CLIENT_ID,
            "email": formData.get('email'),
            "connection":"Username-Password-Authentication"
          })

        })

        console.log('User Password Reset Response', userPasswordResetRes.status)
        if(userPasswordResetRes.status === 200){
          //const userPasswordResetJson = await userPasswordResetRes.json()
          console.log('User Password Reset Json', userPasswordResetRes)
        }
      }
     // return userRes
  
    }



    return {userNameError}
  }
  //display error message when Input is empty
  return (
    <div className='w-3/5 p-8'>
    <form action={submitForm}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">User Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Add user info to create </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <div className="mt-2">
                <Input label={'Username'} name={'username'} type='text' placeholder='Unqiue Username' error={userNameError}></Input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <Input label={'First Name'} name={'firstname'} type='text' placeholder='First Name'></Input>
              </div>
            </div>

            <div className="sm:col-span-3">

              <div className="mt-2">
                <Input label={'Last Name'} name={'lastname'} type='text' placeholder='Last Name'></Input>
              </div>
            </div>

            <div className="sm:col-span-3">

              <div className="mt-2">
                <Input label={'Email'} name={'email'} type='email' placeholder='user@email.com'></Input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
{/* 
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>*/}
          </div> 
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div> */}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>

        <Button type="submit"> Save</Button>
        {/* <button   
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        
        >
          Save
        </button> */}
      </div>
    </form>
    </div>
  )
}