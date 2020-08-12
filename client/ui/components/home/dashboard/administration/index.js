import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import VerticalTab from './VerticalTab';
import Content from './Content';

import { listPerson } from '../../../../../store/actions/person.action';

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

const contentInjection = (Component, props) => () => {

  const classes = useStyles();

  return <div className={classes.content}>
    <Component {...props} />
  </div>

};


import AddPerson from './addperson';
import ListPerson from './listpersons';


const contents = [
  {
    idx: 0, label: 'Personel Listesi', 
    Component: contentInjection(ListPerson)
  },
  {
    idx: 1, label: 'Personel Kayıt', 
    Component: contentInjection(AddPerson)
  }
]

export default () => {

  const classes = useStyles();
  const [contentValue, setContentValue] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(listPerson());
  }, [])

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


