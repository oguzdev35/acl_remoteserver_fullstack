import React from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';


export default () => {

  const notifications = useSelector( state => state.notifications);
  const [prevId, setPrevId] = React.useState(0);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect( () => {
    notifications.forEach( notification => {
      const {message, type, id} = notification;
      if(id != prevId){
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant: type });
        setPrevId(id);
      }
    })
  }, [notifications])

  return (
    <React.Fragment>
    </React.Fragment>
  );
}