import { getEntityManager } from '@typedorm/core';
import express from 'express';
//import Joi from 'joi';

import { checkToken } from '../config/safeRoutes';
import Organisation from '../models/organisation';

const router = express.Router();
// Route: <HOST>:PORT/api/organisations/

/*const OrgSchema = Joi.object().keys({
    name: Joi.string().required(),
});
*/
router.post('/create', checkToken, async (req, res) => {
    // Joy Validation
    console.log(req.body);

    /*const result = OrgSchema.validate(req.body);
    if (result.error) {
        res.status(422).json({
            success: false,
            msg: `Validation err: ${result.error.details[0].message}`,
        });
        return;
    }*/
    const { name } = req.body;
    getEntityManager().find(Organisation, { orgName: name }).then((org) => {
        console.log(">>");
        if (org.items.length>0) {
            res.json({ success: false, msg: `Organisation ${name} already exists` });
        } else {
            let newOrg = new Organisation();
            newOrg.orgName = name;
            newOrg.status = "Onboarding";
            newOrg.active = true;

            getEntityManager().create<Organisation>(newOrg).then((o) => {
                res.json({ success: true, OrganisationID: o.orgName, msg: 'The organisation was successfully created' });
            });
        }

    })
});

router.post('/update', checkToken, async (req, res) => {
    const { orgId, orgName } = req.body;
    getEntityManager().find(Organisation, { orgName: orgName }).then((org) => {
        if (org.items.length === 1) {
            getEntityManager().update(Organisation,{id : orgId},{orgName:orgName}).then(()=>{
                res.json({ success: true });
            })
            .catch(()=>{
                res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
            });

        } else {
            res.json({ success: false, msg: 'Error updating organisation' });
        }
    })
});


export default router;