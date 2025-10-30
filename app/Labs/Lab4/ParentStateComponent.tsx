"use client";
import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

export default function ParentStateComponent() {
  const [counter, setCounter] = useState(0);

  return (
    <div id="wd-parent-state">
      <h2>Parent State Component</h2>
      <h3>Counter in Parent: {counter}</h3>

      <ChildStateComponent counter={counter} setCounter={setCounter} />

      <hr />
    </div>
  );
}