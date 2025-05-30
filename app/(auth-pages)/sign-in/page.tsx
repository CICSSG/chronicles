import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex grow p-10 pb-10'>
      <div className="m-auto w-fit">
        <SignIn
          forceRedirectUrl={"/admin"}
          withSignUp={false}
          appearance={{
            layout: {
              logoImageUrl: '/images/CICSSG.png',
              logoPlacement: 'inside',
              unsafe_disableDevelopmentModeWarnings: true,
            }
          }}
        />
      </div>
    </div>
  )
}