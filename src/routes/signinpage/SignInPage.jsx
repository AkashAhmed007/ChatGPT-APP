import { SignIn } from '@clerk/clerk-react'
import './signin.css'
function SignInPage() {
  return (
    <div className='signin'>
      <SignIn path="/sign-in" signUpUrl='/sign-up'/>
    </div>
  )
}

export default SignInPage