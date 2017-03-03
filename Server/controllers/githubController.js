import Github from '../models/githubModel'

const setUserInfo = (request) => {
  return {
    displayName: request.displayName,
    username: request.username,
    profileUrl: request.profileUrl,
    avatarUrl: request._json.avatar_url,
    bio: request._json.bio
  }
}

export const save = (req, res, next) => {
  const displayName = req.user.displayName
  const username = req.user.username
  const profileUrl = req.user.profileUrl
  const avatarUrl = req.user._json.avatar_url
  const bio = req.user._json.bio
  
  const userScheme = setUserInfo(req.user)

  Github.findOne({
    username: username
  }, (err, existingUser) => {
    if (err)
      return next(err)

    if (existingUser)
      return next(existingUser)

    let githubUser = new Github({
      displayName: displayName,
      username: username,
      profileUrl: profileUrl,
      avatarUrl: avatarUrl,
      bio: bio
    })

    githubUser.save((err, user) => {
      if (err)
        return next(err)

      return next(userScheme)
    })
  })
}
