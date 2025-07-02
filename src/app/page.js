import UserForm from "@/Components/UserForm";
// import { Provider } from "react-redux";
// import store from "@/store/store";
export default function Home() {
  return (
    <div className="m-full h-lvh flex items-center justify-center">
      {/* <Provider store={store}> */}
        <UserForm />
      {/* </Provider> */}
    </div>
  );
}
