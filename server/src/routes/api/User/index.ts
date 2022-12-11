import express from "express";
import { Database } from "../../../database";
import { newId } from "../../utils/id";
import { access } from "../../utils/access";
import { Util } from "../../utils/data";
import { User, UserHistory, UserHistoryType } from "./interfaces";

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
            picture: req.body.picture ?? null,
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

/**
 * POST /api/user/readlater/:articleId
 */
router.post('/readlater/:articleId', access, async (req, res) => {
    let update;

    if(req.body.remove) {
        let old = await Users.schema.findOne({ 'id': req.body.userId })
        if(!old) return null;
        let array: UserHistory[] = [...old.data.history];

        array = array.filter((h) => h.refId !== req.params.articleId);

        let response = await Util.set(Users, `${req.body.userId}.history`, array);
        update = response.data;
    } else {
        update = await newHistoryObj({
            userId: req.body.userId,
            refId: req.params.articleId,
            type: 'READLATER',
        });
    }

    return res.send(update).status(200);
});

async function newHistoryObj(data: {
    userId: string,
    refId: string,
    type: UserHistoryType,
}) {
    let old = await Users.schema.findOne({ 'id': data.userId });

    if(!old) return null;
    let array: UserHistory[] = [...old.data.history];

    if(array.find((h) => h.refId == data.refId && h.type == data.type)) {
        return null;
    }

    array.push({
        date: new Date(),
        id: newId(),
        refId: data.refId as string,
        type: data.type,
    });

    let req = await Util.set(Users, `${data.userId}.history`, array);
    return req.data;
}

export default router;