import DashboardPage from "./app/DashboardPage";
import PostDisplayPage from "./app/PostDisplayPage";
import CreatePage from "./app/CreatePage";
import { CreatePostPage } from "./app/CreatePostPage";
import { DeletePage } from "./app/DeletePage";
import LoginPage from "./app/LoginPage";
import { MeetingRating } from "./app/MeetingRating";
import ProfilePage from "./app/ProfilePage";
import UserList from "./app/UserList";

export const routes = [
    { path: "/login", component: LoginPage },
    { path: "/:userName/deleteaccount", component: DeletePage },
    { path: "/createaccount", component: CreatePage },
    { path: "/:userName/createpost", component: CreatePostPage },
    { path: "/dashboard/:username", component: DashboardPage },
    { path: "/post/:meetingId/rating/:userName", component: MeetingRating },
    { path: "/users/:username", component: UserList },
    { path: "/profile/:usernameLooking/:usernamePassed", exact: true, component: ProfilePage },
    { path: "/", exact: true, component: LoginPage },
    { path: "/post/:postId/:username", exact: true, component: PostDisplayPage }
];

export default routes;