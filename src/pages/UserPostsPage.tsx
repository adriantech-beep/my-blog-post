import UserPosts from "../features/userPost/UserPosts";

const UserPostsPage = () => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-4">My posts</h2>
      <UserPosts />
    </div>
  );
};

export default UserPostsPage;
