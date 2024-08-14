import { SignUp } from '@clerk/clerk-react'
import './signup.css'
function SignUpPage() {
  return (
    <div className='signup'>
      <SignUp path="/sign-up" signInUrl='/sign-in' />
    </div>
  )
}

export default SignUpPage