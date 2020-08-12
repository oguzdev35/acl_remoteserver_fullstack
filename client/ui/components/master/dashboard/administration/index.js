import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import VerticalTab from './VerticalTab';
import Content from './Content';

import { listUser } from '../../../../../store/actions/users.action';

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


import AddUser from './adduser';
import ListUser from './listpersons';


const contents = [
  {
    idx: 0, label: 'Kullanıcı Kayıt', 
    Component: contentInjection(AddUser)
  },
  {
    idx: 1, label: 'Kullanıcı Listesi', 
    Component: contentInjection(ListUser)
  }
]

export default () => {

  const classes = useStyles();
  const [contentValue, setContentValue] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(listUser());
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


