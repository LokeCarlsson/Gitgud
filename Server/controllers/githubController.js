import user from '../models/userModel'
import axios from 'axios'

export const save = (request) => {
  // console.log(request.user)
  console.log('my code: ', request.query.code)
  axios.get('https://api.github.com/authorizations', {
    params: {
      Authorization : '8a940109eb8d033ae12b'
    }
  })
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  })


  // const query = {"username": request.user.username}
  // const update = {orgs: []}
  // const options = {new: true}
  // user.findOneAndUpdate(query, update, options, function(err, person) {
  //   if (err) {
  //     console.log('got an error')
  //   }
  //   console.log(person)
  //   return person
  // })
}

export const getOrgs = () => {
  return [
    'hej',
    'imaorg',
    'osvosv'
  ]
}