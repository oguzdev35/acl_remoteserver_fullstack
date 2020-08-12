import Log from '../models/log.model';

const list = (req, res) => {
    const user = req.profile;
    console.log(user.logs)
    return res.status(200).json({logs: user.logs})
};

const read = (req, res) => {
    return res.status(200).json(req.log)
};

const remove = (req, res) => {
    let log = req.log;
    const user = req.profile;
    log.remove()
        .then( deletedLog => {
          user.logs.pull(deletedLog);
          user.save()
            .then( () => res.status(200).json(deletedLog))
            .catch( err => res.status(400).json({
                'error': dbErrorHandler.getErrorMessage(err)
            }))
        })
        .catch( err => res.status(400).json({
            'error': dbErrorHandler.getErrorMessage(err)
        }));
}

const logByID = (req, res, next, id) => {
    Log.findById(id)
        .then( log => {
            if(!log)
                return res.status(406).json({
                    'error': "Log not found"
                })
            req.log = log;
            next();
        })
        .catch( err => res.status(400).json({
            'error': "Log not able to be retrived"
        }))
  }

const inUser = (req, res, next) => {
    const user = req.profile;
    const log = req.log;

    if(!user.logs.includes(log.id)){
        return res.status(403).json({
            'error': "User is not authorized"
        });
    }

    next();
}

export default {
    list, read, logByID, remove,
    inUser
}