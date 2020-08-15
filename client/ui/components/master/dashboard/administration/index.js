import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, useStore } from 'react-redux';

import VerticalTab from './VerticalTab';
import Content from './Content';

import { listUser } from '../../../../../store/actions/users.action';
import { listPlace } from '../../../../../store/actions/place.action';
import { listBlock } from '../../../../../store/actions/block.action';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '30vw',
    display: 'flex',
  },
  content: {
    margin: theme.spacing(1)
  }
}));

const contentInjection = (Component, stateDependencies = [], props) => () => {

  const classes = useStyles();
  const dispatch = useDispatch();


  switch(true){
    case stateDependencies.includes('users'):
      dispatch(listUser());
      break;
    case stateDependencies.includes('places'):
      dispatch(listPlace({userId: useStore().getState().user._id}));
      break;
    case stateDependencies.includes('blocks'):
      Promise.resolve(dispatch(listPlace({userId: useStore().getState().user._id})))
        .then( () => {
            dispatch(listBlock({
              placeId: useStore().getState().places[0]._id,
              userId: useStore().getState().user._id
            }));
          })
        .catch( err => console.log(err.message));
      break;
    default:
      break;
  }

  return <div className={classes.content}>
    <Component {...props} />
  </div>

};


import AddUser from './adduser';
import ListUser from './listuser';
import AddPlace from './addplace';
import ListPlace from './listplace';
import AddBlock from './addblock';
// import ListBlock from './listblock';

const ListBlock = () => {
  return (
    <> Hello </>
  )
}


const contents = [
  {
    idx: 0, label: 'Kullanıcı Kayıt', 
    Component: contentInjection(AddUser)
  },
  {
    idx: 1, label: 'Kullanıcı Listesi', 
    Component: contentInjection(ListUser)
  },
  {
    idx: 2, label: 'Yer Kayıt',
    Component: contentInjection(AddPlace)
  },
  {
    idx: 3, label: 'Yer Listesi',
    Component: contentInjection(ListPlace)
  },
  {
    idx: 4, label: 'Blok Kayıt',
    Component: contentInjection(AddBlock, ['places'])
  },
  {
    idx: 5, label: 'Blok Listesi',
    Component: contentInjection(ListBlock)
  }
];

export default () => {

  const classes = useStyles();
  const [contentValue, setContentValue] = React.useState(0);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(false);

  React.useEffect( () => {
    Promise.resolve(dispatch(listUser()))
      .then( () => setPage(true))
      .catch( err => console.error(err.message))
  }, [])

  if(!page) return <> Loading </>

  return (
    <div className={classes.root}>
        <VerticalTab 
          setContentValue={setContentValue} 
          contentValue={contentValue} 
          contents={contents}
        />
        <Content 
          value={contentValue} 
          contents={contents}
          className={classes.content}
        />
    </div>
  )
}


