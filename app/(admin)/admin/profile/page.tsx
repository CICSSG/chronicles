import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Profile() {
  return (
    <div className="flex items-center justify-center w-full ">
      <UserProfile
        appearance={{
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
          baseTheme: dark,
        }}
      />
    </div>
  );
}
