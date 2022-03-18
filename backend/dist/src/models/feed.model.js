"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FeedSchema = new mongoose_1.Schema({
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    title: {
        type: String,
        required: [true, 'The title is obligatory']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: {
        updatedAt: 'update_at', createdAt: 'created_at'
    },
    collection: 'movies'
});
FeedSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, movie = __rest(_a, ["__v"]);
    return movie;
};
exports.default = (0, mongoose_1.model)('Feed', FeedSchema);
//# sourceMappingURL=feed.model.js.map