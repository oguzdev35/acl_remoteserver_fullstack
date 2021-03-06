import Place from '../models/place.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
    const place = new Place(req.body);
    const user = req.profile;
    place.save()
        .then( () => {
        user.places.push(place);
        user.save()
            .then( () => res.status(200).json(place))
            .catch( err => res.status(400).json({
                'error': dbErrorHandler.getErrorMessage(err)
            }))
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const list = (req, res) => {
    const user = req.profile;
    const isMaster = req.isMaster;
    const auth = req.auth;
    Place.find().select('name rules address logs createdAt updatedAt blocks persons departments')
        .then( places => {
            if(isMaster && auth._id == user._id){
                return res.status(200).json(places)
            }
            return res.status(200).json(
                places.filter( place => user.places.includes(place.id))
            )
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}


const placeByID = (req, res, next, id) => {
    Place.findById(id)
        .then( place => {
            if(!place)
                return res.status(406).json({
                    'error': "Yer ismi sistemimizde bulunamamıştır."
                })
            req.place = place;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Yer ismi ararken sistemimizde bir sorun oluştu."
        }))
}

const bodyID = (req, res, next) => {
    const id = req.body.meta.placeId;
    Place.findById(id)
        .then( place => {
            if(!place)
                return res.status(406).json({
                    'error': "Yer ismi sistemimizde bulunamamıştır."
                })
            req.place = place;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Yer ismi ararken sistemimizde bir sorun oluştu."
        }))
}

const inUser = (req, res, next) => {
    const user = req.profile;
    const place = req.place;

    if(!user.places.includes(place._id) && !req.isMaster){
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }

    next();
}

const read = (req, res) => {
    return res.status(200).json(req.place);
}

const update = (req, res) => {
    let place = req.place;
    place = extend(place, req.body);
    place.updated = Date.now();

    place.save()
        .then( () => res.status(200).json(place))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const remove = (req, res) => {
    let place = req.place;
    const user = req.profile;
    place.remove()
        .then( deletedPlace => {
            user.places.pull(deletedPlace);
            user.save()
            .then( () => res.status(200).json(deletedPlace))
            .catch( err => res.status(400).json({
                'error': dbErrorHandler.getErrorMessage(err)
            }))
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

export default {
    create, list, placeByID, read, 
    update, remove, inUser, bodyID
};
