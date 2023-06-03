// Importation des modules nécessaires
const router = require('express').Router();
const users = require('../model/allUser'); // Importation du modèle d'utilisateurs
const customers = require('../model/allUser'); // Importation du modèle de clients
const historyModel = require('../model/histoyModel'); // Importation du modèle d'historique
const Admin = require('../model/adminModel'); // Importation du modèle d'administrateur

// Route pour la page d'accueil
router.get('/', (req,res)=> {
    res.render('home') // Rend la vue "home"
});

// Route pour ajouter un utilisateur
router.get('/adduser', (req, res) => {
    res.render('addUser', {title: "Add User", msg:''}) // Rend la vue "addUser" avec des données supplémentaires
});

// Route pour traiter la création d'un utilisateur
router.post('/adduser',(req, res) =>{
    // Extraction des données du formulaire
    const {userName, userEmail, userNumber, userAmount} = req.body;

    // Création d'un nouvel utilisateur
    const User = new customers({
        name: userName,
        email: userEmail,
        contact: userNumber,
        amount: userAmount,
    });

    // Enregistrement de l'utilisateur dans la base de données
    User.save().then(()=>{
        res.render('addUser', {title: "Add User", msg:'User Added Successfully'}) // Rend la vue "addUser" avec un message de succès
    }).catch((err)=>{
        console.log(err)
    })
});

// Route pour afficher tous les utilisateurs
router.get('/data',(req,res) => {
    const allData = customers.find({}); // Recherche tous les utilisateurs dans la base de données
    allData.exec((err, data) => {
        if(err){
            throw err;
        }
        else{
            res.render('viewUser',{title: "View Users", data:data}); // Rend la vue "viewUser" avec les données des utilisateurs
        }
    });
});

// Route pour supprimer un utilisateur
router.get('/delete/:id',(req,res)=> {
    const id = req.params.id;
    const updateData = customers.findByIdAndDelete({"_id":id}); // Recherche et supprime l'utilisateur correspondant à l'ID
    updateData.exec((err,data) => {
        if(err){throw err}
        else{
            res.redirect('/data'); // Redirige vers la page affichant tous les utilisateurs
        }
    });
});

// Route pour afficher les détails d'un utilisateur
router.get("/view/:id",(req,res) => {
    const id = req.params.id;
    const Sender = customers.find({"_id": id}); // Recherche l'utilisateur correspondant à l'ID
    const allUser = customers.find({}); // Recherche tous les utilisateurs
    Sender.exec((err,uData)=>{
        if(err)
        {
            throw err;
        }
        else{
            allUser.exec((err, rData) => {
                if(err){
                    throw err;
                }
                else{
                    res.render('view',{title: 'view', data: uData, records: rData}) // Rend la vue "view" avec les données de l'utilisateur et tous les utilisateurs
                }
            });
        }
    });
});

// Route pour effectuer un transfert
router.post('/transfer',(req,res) => {
    const {SenderID, SenderName,SenderEmail, reciverName, reciverEmail,transferAmount} = req.body;
    const history = new historyModel({
        sName: SenderName,
        sEmail: SenderEmail,
        rName: reciverName,
        rEmail:reciverEmail,
        amount: transferAmount
    });

    if(reciverName === 'Select Reciver Name' || reciverEmail === 'Select Reciver Email'){
        res.render('sucess',{title: "sucess", value:"", msg: "", errmsg: "All fields are require!"});
    }else{
        const Sender = customers.find({"_id": SenderID}); // Recherche l'expéditeur
        const Reciver = customers.find({"name": reciverName, "email": reciverEmail}); // Recherche le destinataire

        Promise.all([Sender,Reciver]).then(([senderData,reciverData]) => {
            senderData.forEach( async (c) => {
                if(c.name === reciverName || c.email === reciverEmail || c.amount < transferAmount){
                    res.render('sucess',{title: "sucess", value:"", msg: "", errmsg: "Process Not Complete due to incorrect reciver details!"});
                }else{
                    let updateAmount = parseInt(c.amount) - parseInt(transferAmount);
                    await customers.findOneAndUpdate({"name" : SenderName}, {"$set": {"amount": updateAmount}});
                    history.save().then((r)=>{
                    }).catch(err => {console.log(err)});
                    
                    reciverData.forEach( async (e) => {
                        let updateAmount = parseInt(e.amount) + parseInt(transferAmount);
                        await customers.findOneAndUpdate({"name": reciverName}, {"$set": {"amount": updateAmount }});
                    });
                }

                res.render('sucess',{title: "sucess", value:"True", msg: "Transfer Sucessfull"});
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
});

// Route pour afficher l'historique
router.get('/history',(req,res)=>{
    const hist = historyModel.find({}); // Recherche tous les enregistrements d'historique
    hist.exec((err, hdata) => {
        if(err){
            throw err;
        }
        else{
            res.render('history',{title: 'History', data: hdata}); // Rend la vue "history" avec les données de l'historique
        }
    });
});

// Route pour supprimer un enregistrement d'historique
router.get('/remove/:id',(req,res)=> {
    const id = req.params.id;
    const updateData = historyModel.findByIdAndDelete({"_id":id}); // Recherche et supprime l'enregistrement d'historique correspondant à l'ID
    updateData.exec((err,data) => {
        if(err){throw err}
        else{
            res.redirect('/history'); // Redirige vers la page affichant l'historique
        }
    });
});

// Route pour la page de connexion
router.get('/login', (req, res) => {
    res.render('login', {title: "Login Admin", msg:''}) // Rend la vue "login" avec des données supplémentaires
});

// Route pour traiter la connexion de l'administrateur
router.post('/login', (req, res) => {
    const { adminName, adminPassword } = req.body;
    Admin.findOne({ username: adminName }, (err, admin) => {
        if (err) {
            res.redirect('/login?loginFailed=true'); // Redirige vers la page de connexion en cas d'erreur de recherche
        } else {
            if (!admin) {
                res.redirect('/login?loginFailed=true'); // Redirige vers la page de connexion si l'administrateur n'est pas trouvé
            } else {
                if (admin.password === adminPassword) {
                    req.session.loggedIn = true;
                    res.redirect('/dashboard'); // Redirige vers le tableau de bord en cas de connexion réussie
                } else {
                    res.redirect('/login?loginFailed=true'); // Redirige vers la page de connexion si le mot de passe est incorrect
                }
            }
        }
    });
});

// Middleware pour vérifier si l'utilisateur est connecté
const checkAuth = (req, res, next) => {
    if (req.session && req.session.admin) {
        // L'utilisateur est connecté, poursuit l'exécution de la prochaine route
        next();
    } else {
        // L'utilisateur n'est pas connecté, redirige vers la page de connexion
        res.redirect('/login');
    }
};

// Route pour le tableau de bord de l'administrateur
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {title: "Dashboard Admin", msg:''}) // Rend la vue "dashboard" avec des données supplémentaires
    if (req.session.loggedIn) {
        // L'utilisateur est connecté, affiche la page du tableau de bord
        res.render('dashboard', { title: 'Dashboard' });
    } else {
        // L'utilisateur n'est pas connecté, redirige vers la page de connexion
        res.redirect('/login');
    }
});  

// Route pour la déconnexion
router.get('/logout', (req, res) => {
    // Détruire la session
    req.session.destroy();

    // Rediriger vers la page de connexion ou une autre page appropriée
    res.redirect('/');
});

// Route pour la messagerie de l'administrateur
router.get('/chat', (req, res) => {
    if (req.session.loggedIn) {
        // L'utilisateur est connecté, affiche la page de messagerie
        res.render('chat', {title: "Chat Admin", msg:''});
    } else {
        // L'utilisateur n'est pas connecté, redirige vers la page de connexion
        res.redirect('/login');
    }
});

module.exports = router; // Exporte le routeur pour une utilisation dans d'autres fichiers
