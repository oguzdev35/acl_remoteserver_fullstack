import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, useStore } from 'react-redux';

import VerticalTab from './VerticalTab';
import Content from './Content';

import { listPlace } from '../../../../../store/actions/place.action';

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


import ListPlace from './listplace';
import ListBlock from './listblock';
import AddPerson from './addperson';
import ListPerson from './listperson';
import ListDoor from './listdoor';
import AddDepartment from './adddepartment';
import ListDepartment from './listdepartment';

const contents = [
  {
    idx: 0, label: 'Yer Listesi',
    Component: contentInjection(ListPlace)
  },
  {
    idx: 1, label: 'Blok Listesi',
    Component: contentInjection(ListBlock, ['places'])
  },
  {
    idx: 2, label: 'Kapı Listesi',
    Component: contentInjection(ListDoor, ['places'])
  },
  {
    idx: 3, label: 'Personel Kayıt',
    Component: contentInjection(AddPerson, ['places'])
  },
  {
    idx: 4, label: 'Personel Listesi',
    Component: contentInjection(ListPerson, ['places'])
  },
  {
    idx: 5, label: 'Departman Kayıt',
    Component: contentInjection(AddDepartment, ['places'])
  },
  {
    idx: 6, label: 'Departman Listesi',
    Component: contentInjection(ListDepartment, ['places'])
  },
];

export default () => {

  const classes = useStyles();
  const [contentValue, setContentValue] = React.useState(0);

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


