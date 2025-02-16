interface ProfilePageProps {
    params: { userID: string }; // ✅ Type for params
  }
  
  export default async function UserHomePage({ params }: ProfilePageProps) {
    const { userID } = await params; // ✅ Extract userID from URL
  
    return (
      <div className="w-full h-full border border-black">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p>User ID: {userID}</p>
      </div>
    );
  }
  