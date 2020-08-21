import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent,
  Grid, List, Card , CardHeader,
  ListItem, ListItemText, ListItemIcon,
  Checkbox, Button, Divider
} from '@material-ui/core';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { listDepartment } from '../../../../../../../store/actions/department.action';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList(props) {
  
  const {
    handleClose, open, personalId, placeId
  } = props;

  const userId = useStore().getState().user._id;

  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  React.useEffect( () => {
    dispatch(listDepartment({
      userId: userId,
      placeId: placeId
    }))
  }, [])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seçildi`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="department-auth-stepper">Personel Departman Ataması</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>{customList('Seçilmeyenler', left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
          <Grid item>{customList('Seçilenler', right)}</Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default props => {

  const {personalId} = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  return (
      <React.Fragment>
          <Button
              variant="outlined"
              onClick={handleOpen}
          >
              Personel Departman Ataması Yap
          </Button>
          <TransferList 
              personalId={personalId} 
              open={open} 
              handleClose={handleClose} 
          />
      </React.Fragment>
  )
}