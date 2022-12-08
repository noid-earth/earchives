import express from "express";
import { Database } from "../../../database";
import { access } from "../../utils/access";
import { User } from "./interfaces";

const router = express.Router();
export const Users = new Database({ collection: 'users', database: 'Users' });

/**
 * GET /api/user/list
 */
 router.get('/list', access, async (req, res) => {
    const data = await Users.schema.find({ });
    return res.send(data.map((a: any) => a.data));
});

/**
 * GET /api/user/get/:id
 */
 router.get('/get/:id', access, async (req, res) => {
    let userId = req.params.id;
    let user = await Users.schema.findOne({ 'data.providerId': userId }) || await Users.schema.findOne({ 'data.id': userId });

    return res.send(user?.data ? user?.data : undefined);
});

/**
 * GET /api/user/ensure/:id
 */
router.post('/ensure/:id', access, async (req, res) => {
    let userId = req.params.id;
    let user =  await Users.schema.findOne({ 'data.id': userId }) || 
                await Users.schema.findOne({ 'data.providerId': userId }) ||
                await Users.schema.findOne({ 'data.providerId': req.body.providerId });

    if(user) {
        return res.send(user.data);
    } else {
        const uid = () => `${Date.now().toString().slice(8, 14)}`;
        const id = uid();

        const new_data: User = {
            createdAt: new Date(),
            id: id,
            provider: req.body.provider,
            providerId: req.body.providerId,
            name: req.body.name ?? '',
            picture: req.body.picture,
            email: req.body.email,
            details: {
                emailVerified: false,
                articleWriter: false,
                feedWriter: false,
                private: true,
                administrator: false,
            },
            history: [
                {
                    date: new Date(),
                    id: uid(),
                    refId: null,
                    type: null,
                }
            ],
        };

        await Users.schema.create({
            id: id,
            data: new_data,
        })

        return res.send(new_data);
    }
})

export default router;