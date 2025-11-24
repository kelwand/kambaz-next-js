import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";


export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!uid) return;

    const loadUser = async () => {
      const data = await client.findUserById(uid);
      setUser(data);
    };

    loadUser();
  }, [uid]);

  if (!uid || !user) return null;

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0">
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary fs-1" />
      </div>

      <hr />

      <div className="text-danger fs-4">
        {user.firstName} {user.lastName}
      </div>

      <b>Role:</b> {user.role} <br />
      <b>Login ID:</b> {user.loginId} <br />
      <b>Section:</b> {user.section} <br />
      <b>Total Activity:</b> {user.totalActivity}

       <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={onClose}
              className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
    </div>
  );
}
