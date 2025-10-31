"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, ChangeEvent } from "react";
import { add } from "./addReducer";
import { FormControl, Button } from "react-bootstrap";
import type { RootState } from "../../store"; 

export default function AddRedux() {
  const [a, setA] = useState<number>(12);
  const [b, setB] = useState<number>(23);

  const sum = useSelector((state: RootState) => state.addReducer.sum);

  const dispatch = useDispatch();

  const handleAChange = (e: ChangeEvent<HTMLInputElement>) => {
    setA(parseInt(e.target.value) || 0);
  };

  const handleBChange = (e: ChangeEvent<HTMLInputElement>) => {
    setB(parseInt(e.target.value) || 0);
  };

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>

      <FormControl type="number" value={a} onChange={handleAChange} />
      <FormControl type="number" value={b} onChange={handleBChange} />

      <Button
        id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}
      >
        Add Redux
      </Button>

      <hr />
    </div>
  );
}
