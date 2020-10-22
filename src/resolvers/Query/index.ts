import Post from "../../models/Post"
import User from "../../models/User"
import { Ctx, Shoe, ShoeInput, Team } from "../../types"

export const Query = {
  getUsers: async () => {
    const users = await User.find({})
    return users
  },

  getMe: async (_: never, args: { id: string }) => {
    try {
      const user = await User.findById(args.id)

      if (!user) {
        throw new Error(`no user found with ${args.id}`)
      }

      return user
    } catch (err) {
      console.error(err.message)
    }
  },

  getPosts: async () => {
    const posts = await Post.find().populate("author")
    return posts
  },

  getUserById: async (
    parent: never,
    args: { id: string },
    { req, res }: Ctx,
  ) => {
    const user = await User.findById(args.id)
    return user
  },
  shoes: (_: never, args: { input: ShoeInput }) => {
    if (args.input.brand) {
      return [
        { brand: "NIKE", size: 12, sport: "football" },
        { brand: "JORDAN", size: 13, sport: "basketball" },
        { brand: "REEBOK", size: 11, season: "winter" },
        { brand: "ADIDAS", size: 15, season: "summer" },
      ].filter(
        shoe => shoe.brand.toLowerCase() === args.input.brand.toLowerCase(),
      ) as Shoe[]
    } else {
      return [
        { brand: "NIKE", size: 12, sport: "football" },
        { brand: "JORDAN", size: 13, sport: "basketball" },
        { brand: "REEBOK", size: 11, season: "winter" },
        { brand: "ADIDAS", size: 15, season: "summer" },
      ] as Shoe[]
    }
  },

  teams: () => {
    return [
      { name: "LEGIA", year: 1916 },
      { name: "LAKERS", year: 1947 },
      { name: "MANU", year: 1902 },
    ] as Team[]
  },
}
