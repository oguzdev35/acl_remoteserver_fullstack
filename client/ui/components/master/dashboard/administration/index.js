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
  const globalState = useStore().getState();


  switch(true){
    case stateDependencies.includes('users'):
      dispatch(listUser());
      break;
    case stateDependencies.includes('places'):
      dispatch(listPlace({userId: useStore().getState().user._id}));
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
import ListBlock from './listblock';
import AddPerson from './addperson';
import ListPerson from './listperson';
import AddDepartment from './adddepartment';
import ListDepartment from './listdepartment';
import AddDoor from './adddoor';
import ListDoor from './listdoor';

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
    Component: contentInjection(AddBlock, ['places', 'users'])
  },
  {
    idx: 5, label: 'Blok Listesi',
    Component: contentInjection(ListBlock, ['places'])
  },
  {
    idx: 6, label: 'Personel Kayıt',
    Component: contentInjection(AddPerson, ['places'])
  },
  {
    idx: 7, label: 'Personel Listesi',
    Component: contentInjection(ListPerson, ['places'])
  },
  {
    idx: 8, label: 'Departman Kayıt',
    Component: contentInjection(AddDepartment, ['places'])
  },
  {
    idx: 9, label: 'Departman Listesi',
    Component: contentInjection(ListDepartment, ['places'])
  },
  {
    idx: 10, label: 'Kapı Kayıt',
    Component: contentInjection(AddDoor, ['places'])
  },
  {
    idx: 11, label: 'Kapı Listesi',
    Component: contentInjection(ListDoor, ['places'])
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


