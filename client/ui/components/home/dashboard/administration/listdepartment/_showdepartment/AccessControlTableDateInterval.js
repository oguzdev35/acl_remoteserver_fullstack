import React from 'react';
import MaterialTable from 'material-table';
import trLocale from 'date-fns/locale/tr';

import { useDispatch, useSelector, useStore } from 'react-redux';

import { createRule } from '../../../../../../../store/actions/rule.action';
import { listPlace } from '../../../../../../../store/actions/place.action';



export default (props) => {

  const userId = useStore().getState().user._id;
  const { departmentId } = props;
  const places = useSelector( state => state.places);
  const [placeId, setPlaceId] = React.useState("");
  const rules = useSelector( state => state.rules);

  React.useEffect( () => {
    dispatch(listPlace({
      userId: userId
    }));
  }, []);

  React.useEffect( () => {
    if(places) {
      const _placeId = places.find(({departments}) => departments.includes(departmentId))._id;
      setPlaceId(_placeId);
    }
  }, [places]);

  React.useEffect( () => {
    if(rules) {
        const newData = {
          fromDate: _fromDate,
          toDate: _toDate,
          fromTime: _fromClock,
          toTime: _toClock,
          door: 
        }
        setState((prevState) => {
        const data = [...prevState.data];
        data.push(newData);
        return { ...prevState, data };
      });
    }
  }, [rules])

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    columns: [
        { title: 'Kapı', field: 'door', type: 'string' },
        { title: 'Başlangıç Tarihi', field: 'fromDate', type: 'date'},
        { title: 'Bitiş Tarihi', field: 'toDate', type: 'date'},
        { title: 'Başlangıç Saati', field: 'fromTime', type: 'time'},
        { title: 'Bitiş Saati', field: 'toTime', type: 'time'},
    ],
    data: [
        
    ],
  });

  return (
    <MaterialTable
      title=""
      style={{width: '100%'}}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd:  (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              Promise.resolve(dispatch(createRule({
                newRule: {
                  department: departmentId,
                  door: doorId,
                  dateType: 1,
                  dateInterval: {
                    from: newData.fromDate,
                    to: newData.toDate
                  },
                  clockInterval: {
                    from: newData.fromTime,
                    to: newData.toTime
                  }
                },
                placeId: placeId,
                userId: userId
              })))
              // setState((prevState) => {
              //   const data = [...prevState.data];
              //   data.push(newData);
              //   return { ...prevState, data };
              // });
            }, 0);
          })
          ,
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      localization={{
        body: {
            addTooltip: 'Ekle',
            deleteTooltip: 'Sil',
            editTooltip: 'Düzenle',
            emptyDataSourceMessage: 'Gösterilecek bir veri bulunmamaktadır.',
            editRow: {
              cancelTooltip: 'İptal',
              saveTooltip: 'Kaydet',
              deleteText: 'Sil'
            },
            dateTimePickerLocalization: trLocale
            
        },
        toolbar: {
            searchPlaceholder: 'Arama',
            searchTooltip: 'Arama'
        },
        pagination: {
            labelRowsSelect: 'Satır',
            firstTooltip: 'İlk Sayfa',
            lastTooltip: 'Son Sayfa',
            previousTooltip: 'Önceki Sayfa',
            nextTooltip: 'Sonraki Sayfa'
        },
        header: {
            actions: 'İşlemler'
        }
      }}
    />
  );
}