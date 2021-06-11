import React, { useContext, useEffect, useState } from 'react';
import WidgetsGrid from '../../components/widgets-grid/widgets-grid.component';
import WidgetCard from '../../components/widget-card/widget-card.component';
import { AuthContext } from '../../../shared/context/auth.context';

const DashboardPage = () => {
  const auth = useContext(AuthContext);

  const [usersCount, setUsersCount] = useState(0);
  const [profilesCount, setProfilesCount] = useState(0);
  const [adultUsersCount, setAdultUsersCount] = useState(0);

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${auth.token}` }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/users/count')
      .then(res => res.json())
      .then(result => {
          const { count } = result;
          setUsersCount(count);
        }, error => {
          console.log(error);
          setUsersCount(0);
        }
      );

    fetch('http://localhost:5000/api/profiles/count', requestOptions)
      .then(res => res.json())
      .then(result => {
          const { count } = result;
          setProfilesCount(count);
        }, error => {
          console.log(error);
          setProfilesCount(0);
        }
      );

    fetch('http://localhost:5000/api/profiles/adultCount', requestOptions)
      .then(res => res.json())
      .then(result => {
          const { adultCount } = result;
          setAdultUsersCount(adultCount);
        }, error => {
          console.log(error);
          setAdultUsersCount(0);
        }
      );
  }, []);

  return (
    <div className={'container'}>
      <h2>Dashboard:</h2>
      <WidgetsGrid>
        <WidgetCard key={'users'} title={'Users'} amount={usersCount} />
        <WidgetCard key={'profiles'} title={'Profiles'} amount={profilesCount} />
        <WidgetCard
          key={'profiles-aged'}
          title={'Profiles over 18 years old'}
          amount={adultUsersCount}
        />
      </WidgetsGrid>
    </div>
  );
};

export default DashboardPage;
