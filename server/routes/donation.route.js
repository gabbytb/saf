module.exports = app => {


    const router = require('express').Router();
    const donation = require('../controllers/donation.controller');



    router.post("/api/v1/admin/donations/manage/create", donation.createDonation);

    router.get("/api/v3/admin/donations/manage", donation.findAllDonations);
    router.get("/api/v3/admin/donations/manage/activeDonations", donation.totalActiveDonations);
    router.get("/api/v3/admin/donations/manage/inactiveDonations", donation.totalInactiveDonations);

    //// router.get("/api/v1/admin/donations/manage/:isActive", donations.findAllActiveDonations); 
    
    // router.get("/api/v1/admin/donations/manage/:uri", donations.findDonationByUrl);

    router.get("/api/v3/admin/donations/manage/:id", donation.findDonationById);

    // router.put("/api/v1/admin/blogs/manage/post/update", donations.updateDonation);

    // router.delete("/api/v1/admin/blogs/manage/post/delete/:id", donations.deleteSingleDonation);

    // router.delete("/api/v1/admin/blogs/manage/posts/cleanup", donations.deleteAllDonation);


    app.use('/', router);

};