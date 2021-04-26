import DashboardPage from "./app/DashboardPage";
import CreatePage from "./CreatePage";
import { CreatePostPage } from "./CreatePostPage";
import { DeletePage } from "./DeletePage";
import LoginPage from "./LoginPage";
import { MeetingRating } from "./MeetingRating";
import ProfilePage from "./ProfilePage";
import UserList from "./UserList";

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
    /* <Route path="/post/:postId" exact component={PostDisplay} /> */
];

export default routes;