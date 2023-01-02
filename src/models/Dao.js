import mongoose from 'mongoose';

import User from './User.js';
import Gallery from './Gallery.js';
import Artwork from './Artwork.js';

import config from '../config/config.js';

export default class Dao {
    constructor() {
        mongoose.set("strictQuery", false);
        this.connection = mongoose.connect(`mongodb+srv://coder:123@cluster0.lwstatk.mongodb.net/?retryWrites=true&w=majority`)

        // mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@cluster0.lwstatk.mongodb.net/?retryWrites=true&w=majority
        const timestamps = { timestamps: { createdAt: 'created_at', updatedAt: 'updated_ad' } };
        const userSchema = mongoose.Schema(User.schema, timestamps)
        const gallerySchema = mongoose.Schema(Gallery.schema, timestamps)
        const artworkSchema = mongoose.Schema(Artwork.schema, timestamps)

        this.models = {
            [User.model]: mongoose.model(User.model, userSchema),
            [Gallery.model]: mongoose.model(Gallery.model, gallerySchema),
            [Artwork.model]: mongoose.model(Artwork.model, artworkSchema),
        }
    }

    getAll = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe')
        return this.models[entity].find(params).lean();
    }

    findOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe')
        return this.models[entity].findOne(params).lean();
    }

    save = (document, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].create(document);
    }
}