"use client";

import { redirect } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";

interface UserProfile {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

export default function Profile() {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: { accountReducer: { currentUser: UserProfile | null } }) =>
      state.accountReducer.currentUser
  );

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = useCallback(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) return null;

  return (
    <div id="wd-profile-screen" className="p-3">
      <h3 className="mb-3">Profile</h3>

      <FormControl
        id="wd-username"
        className="mb-2"
        defaultValue={profile.username}
        onChange={(e) =>
          setProfile({ ...profile, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        type="password"
        className="mb-2"
        defaultValue={profile.password}
        onChange={(e) =>
          setProfile({ ...profile, password: e.target.value })
        }
      />

      <FormControl
        id="wd-firstname"
        className="mb-2"
        defaultValue={profile.firstName}
        onChange={(e) =>
          setProfile({ ...profile, firstName: e.target.value })
        }
      />

      <FormControl
        id="wd-lastname"
        className="mb-2"
        defaultValue={profile.lastName}
        onChange={(e) =>
          setProfile({ ...profile, lastName: e.target.value })
        }
      />

      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        defaultValue={profile.dob}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      <FormControl
        id="wd-email"
        type="email"
        className="mb-2"
        defaultValue={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      <select
        id="wd-role"
        className="form-control mb-2"
        defaultValue={profile.role}
        onChange={(e) =>
          setProfile({
            ...profile,
            role: e.target.value as UserProfile["role"],
          })
        }
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
        Sign out
      </Button>
    </div>
  );
}
