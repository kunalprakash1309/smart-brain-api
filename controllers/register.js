const handleRegister = (req, res, db, bycrpt) => {
    const {email, password, name} = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    const hash = bycrpt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return db('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).send('unable register'))
}

module.exports = {

    handleRegister: handleRegister
}


