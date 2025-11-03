"use client";
import { useSelector } from "react-redux";
import store from "../../store"; 

export type RootState = ReturnType<typeof store.getState>;

export default function HelloRedux() {
  const { message } = useSelector((state: RootState) => state.helloReducer);
  
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}