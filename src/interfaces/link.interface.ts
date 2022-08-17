export default interface ILink {
    _id?: string,
    userID: String,
    shortURL: String,
    originalURL: String,
    date: Date,
    clicks: Number,
    img: string,
    title: String,
    description: String,
    category: String,
}