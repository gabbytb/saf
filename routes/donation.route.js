module.exports = app => {


    const router = require('express').Router();
    const donations = require('../controllers/donation.controller');



    router.post("/api/v1/admin/donations/manage/create", donations.createDonation);

    // router.get("/api/v1/admin/donations/manage", donations.findAllDonations);
    // router.get("/api/v1/admin/donations/manage/activeDonations", donations.totalActiveDonations);
    // router.get("/api/v1/admin/donations/manage/inActiveDonations", donations.totalInactiveDonations);

    //// router.get("/api/v1/admin/donations/manage/:isActive", donations.findAllActiveDonations); 
    
    // router.get("/api/v1/admin/donations/manage/:uri", donations.findDonationByUrl);

    // router.get("/api/v1/admin/donations/manage/:id", donations.findDonationById);

    // router.put("/api/v1/admin/blogs/manage/post/update", donations.updateDonation);

    // router.delete("/api/v1/admin/blogs/manage/post/delete/:id", donations.deleteSingleDonation);

    // router.delete("/api/v1/admin/blogs/manage/posts/cleanup", donations.deleteAllDonation);


    app.use('/', router);

};