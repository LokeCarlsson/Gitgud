import axios from 'axios'
import Github from '../models/githubModel'

export const saveOrgs = (request, res) => {
  const query = {"username": request.user.username}
  const update = {organizations: request.body.data}
  const options = {new: true}

  Github.findOneAndUpdate(query, update, options, function(err, person) {
    if (err) {
      res.status(400).json(err)
    }
    res.status(200).json(person)
  })
}

export const getOrgs = (request, res) => {
  Github.findOne({"username": request.user.username}, (err, existingUser) => {
    if (err)
      res.status(400).json(err)

    res.status(200).json(existingUser.organizations)
  })
}

export const fetchOrgs = (request, res) => {
  return axios.get('https://api.github.com/user/orgs', {
      headers: {
        Authorization: 'token ' + request.user.githubToken,
        'User-Agent': 'Gitgud'
      }
    })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
}