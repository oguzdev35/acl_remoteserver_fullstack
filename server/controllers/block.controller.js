import Block from '../models/block.model';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';


const create = (req, res) => {
    const block = new Block(req.body);
    const place = req.place;
    block.save()
        .then( () => {
        place.blocks.push(block);
        place.save()
            .then( () => res.status(200).json(block))
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
    const place = req.place;
    const isMaster = req.isMaster;
    const auth = req.auth;
    Block.find().select('name logs doors createdAt updatedAt')
        .then( blocks => {
            if(isMaster && auth._id == user._id){
                return res.status(200).json(blocks)
            }
            return res.status(200).json(
                blocks.filter( block => place.blocks.includes(block._id))
            )
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}


const blockByID = (req, res, next, id) => {
    Block.findById(id)
        .then( block => {
            if(!block)
                return res.status(406).json({
                    'error': "Block not found"
                })
            req.block = block;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Block not able to be retrived"
        }))
}

const inPlace = (req, res, next) => {
    const place = req.place;
    const block = req.block;

    if(!place.blocks.includes(block._id)){
        console.log('blockcontroller - inplace')
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }

    next();
}

const read = (req, res) => {
    let block = req.block;
    return res.status(200).json(block);
}

const update = (req, res) => {
    let block = req.block;
    block = extend(block, req.body);
    block.updated = Date.now();

    block.save()
        .then( () => res.status(200).json(block))
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const remove = (req, res) => {
    let block = req.block;
    const place = req.place;
    block.remove()
        .then( deletedBlock => {
            place.blocks.pull(deletedBlock);
            place.save()
                .then( () => res.status(200).json(deletedBlock))
                .catch( err => res.status(400).json({
                    'error': dbErrorHandler.getErrorMessage(err)
                }))
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

export default {
    create, list, blockByID, read, 
    update, remove, inPlace
};
