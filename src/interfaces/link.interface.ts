export default interface ILink {
    _id?: string,
    userID: String,
    shortURL: String,
    originalURL: String,
    date: Date,
    clicks: Number,
    title: {
        type: String,
        default: ''
    }
    description: {
        type: String,
        default: ''
    }
    category: {
        type: String,
        default: 'None'
    }
}