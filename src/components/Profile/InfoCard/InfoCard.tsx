import React from "react";
import "./index.scss";
import { getProfile, updateProfile } from "./../../../DidHelper";

interface IUserProfile {
  name: string;
  description: string;
}

function InfoCard() {
  const [profileData, setProfileData] = React.useState<IUserProfile>({
    name: "None",
    description: "None",
  });
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      await updateProfile();
      const userProfile = await getProfile();
      const profileData: IUserProfile = {
        name: userProfile?.name ?? "None",
        description: userProfile?.description ?? "None",
      };
      setProfileData(profileData);
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="infocard">
      <p className="name">{profileData.name}</p>
      <p className="description">{profileData.description}</p>
    </div>
  );
}

export default InfoCard;
