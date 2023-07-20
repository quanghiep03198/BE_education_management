import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { IArticle } from '../../types/article.type'
import { toCapitalize } from '../../helpers/toolkit'


const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
        },
        userPosts: {
            type: String,
            required: true,
        },
        userPicture: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false,
        expires: '30d' // auto delete after 37 weeks
    }
)

ArticleSchema.plugin(mongoosePaginate)

ArticleSchema.pre('save', function (next) {
    this.title = toCapitalize(this.title)
    next()
})


const ArticleModel = mongoose.model<IArticle>('Article', ArticleSchema)

export default ArticleModel
