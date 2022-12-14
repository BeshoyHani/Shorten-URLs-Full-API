export default interface ILink {
    _id?: string,
    userID: String,
    creatorID: string,
    shortURL: String,
    shortID: string,
    originalURL: String,
    date: Date,
    clicks: Number,
    img: string,
    title: String,
    category: String,
}