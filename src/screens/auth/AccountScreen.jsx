import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoadingModal from '../../shared/Loading/LoadingModal';
import UserGuestScreen from '../userGuestScreen/UserGuestScreen';
import ProfileScreen from '../account/profile/ProfileScreen';

const AccountScreen = () => {
  const [hasLogged, setHasLogged] = useState(null);
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (hasLogged === null) return <LoadingModal />;

  return hasLogged ? (
    <ProfileScreen onReload={onReload} />
  ) : (
    <UserGuestScreen />
  );
};

export default AccountScreen;
